"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectFunction = selectFunction;
const core_1 = require("@agentica/core");
const AgenticaDefaultPrompt_1 = require("@agentica/core/src/constants/AgenticaDefaultPrompt");
const AgenticaSystemPrompt_1 = require("@agentica/core/src/constants/AgenticaSystemPrompt");
const tools_1 = require("./tools");
function selectFunction(props) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const { ctx, toolList, prevFailures = [], restRetry = 5 } = props;
        const selectCompletion = yield ctx.request("select", {
            messages: [
                {
                    role: "system",
                    content: AgenticaDefaultPrompt_1.AgenticaDefaultPrompt.write(ctx.config),
                },
                {
                    role: "assistant",
                    tool_calls: [
                        {
                            type: "function",
                            id: "getApiFunctions",
                            function: {
                                name: "getApiFunctions",
                                arguments: JSON.stringify({}),
                            },
                        },
                    ],
                },
                {
                    role: "tool",
                    tool_call_id: "getApiFunctions",
                    content: JSON.stringify(toolList),
                },
                ...ctx.histories.flatMap((core_1.factory.decodeHistory)),
                {
                    role: "user",
                    content: ctx.prompt.contents.map(core_1.factory.decodeUserMessageContent),
                },
                {
                    role: "system",
                    content: `${(_d = (_c = (_b = (_a = ctx.config) === null || _a === void 0 ? void 0 : _a.systemPrompt) === null || _b === void 0 ? void 0 : _b.select) === null || _c === void 0 ? void 0 : _c.call(_b, ctx.histories)) !== null && _d !== void 0 ? _d : AgenticaSystemPrompt_1.AgenticaSystemPrompt.SELECT}
          
        
        When selecting functions, consider what the user can call from their perspective, and choose all the functions necessary to accomplish the task.
        Select them in a logical sequence, taking into account the relationships between each function.
        `,
                },
                ...emendMessages(prevFailures),
            ],
            tool_choice: {
                type: "function",
                function: {
                    name: "select_functions",
                },
            },
            parallel_tool_calls: false,
            tools: [tools_1.Tools.select_functions],
        })
            .then((v) => __awaiter(this, void 0, void 0, function* () { return core_1.utils.StreamUtil.readAll(v); }))
            .then(core_1.utils.ChatGptCompletionMessageUtil.merge);
        const toolCalls = selectCompletion.choices
            .filter(v => v.message.tool_calls != null);
        if (toolCalls.length === 0) {
            selectCompletion.choices.forEach((v) => {
                if (v.message.content != null && v.message.content !== "") {
                    const event = core_1.factory.creatAssistantMessageEvent({
                        stream: core_1.utils.toAsyncGenerator(v.message.content),
                        done: () => true,
                        get: () => v.message.content,
                        join: () => __awaiter(this, void 0, void 0, function* () { return v.message.content; }),
                    });
                    ctx.dispatch(event);
                }
            });
        }
        const failures = toolCalls.reduce((acc, cur) => {
            var _a;
            (_a = cur.message.tool_calls) === null || _a === void 0 ? void 0 : _a.forEach((tc) => {
                const errors = [];
                const arg = JSON.parse(tc.function.arguments);
                if (!Array.isArray(arg)) {
                    errors.push(JSON.stringify({
                        path: "$input",
                        expected: "array",
                        value: arg,
                    }));
                    return;
                }
                arg.forEach((v, idx) => {
                    if (v.reason == null || typeof v.reason !== "string") {
                        errors.push(JSON.stringify({
                            path: `$$input[${idx}].reason`,
                            expected: "string",
                            value: v.reason,
                        }));
                    }
                    if (v.function_name == null || typeof v.function_name !== "string") {
                        errors.push(JSON.stringify({
                            path: `$$input[${idx}].function_name`,
                            expected: "string",
                            value: v.function_name,
                        }));
                    }
                });
                if (errors.length !== 0) {
                    acc.push({
                        id: tc.id,
                        name: tc.function.name,
                        validation: { data: tc.function.arguments, errors },
                    });
                }
            });
            return acc;
        }, []);
        if (failures.length !== 0) {
            const feedback = [...prevFailures, ...failures];
            if (restRetry === 0) {
                throw new Error(`Failed to select function after ${restRetry} retries\n${JSON.stringify(feedback)}`);
            }
            return selectFunction({
                ctx,
                toolList,
                prevFailures: feedback,
                restRetry: restRetry - 1,
            });
        }
        toolCalls.forEach((v) => {
            v.message.tool_calls.forEach((tc) => {
                const arg = JSON.parse(tc.function.arguments);
                arg.function_list.forEach((v) => {
                    const operation = ctx.operations.flat.get(v.function_name);
                    if (operation === undefined) {
                        return;
                    }
                    const selection = core_1.factory.createOperationSelection({
                        reason: v.reason,
                        operation,
                    });
                    ctx.stack.push(selection);
                    ctx.dispatch(core_1.factory.createSelectEvent({
                        selection,
                    }));
                });
            });
        });
    });
}
function emendMessages(failures) {
    return failures
        .flatMap(f => [
        {
            role: "assistant",
            tool_calls: [
                {
                    type: "function",
                    id: f.id,
                    function: {
                        name: f.name,
                        arguments: JSON.stringify(f.validation.data),
                    },
                },
            ],
        },
        {
            role: "tool",
            content: JSON.stringify(f.validation.errors),
            tool_call_id: f.id,
        },
        {
            role: "system",
            content: [
                "You A.I. assistant has composed wrong typed arguments.",
                "",
                "Correct it at the next function calling.",
            ].join("\n"),
        },
    ]);
}
//# sourceMappingURL=select.js.map