"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgenticaBenchmarkPredicator = void 0;
exports.success = success;
const __typia_transform__validateReport = __importStar(require("typia/lib/internal/_validateReport.js"));
const typia_1 = __importDefault(require("typia"));
exports.AgenticaBenchmarkPredicator = {
    isNext,
    success,
};
function isNext(agent) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const last = agent
            .getHistories()
            .at(-1);
        /**
         * Agentica Props is private, we can't access it
         * The provided code follows the original source prior to modification.
         * However, due to compilation errors, a workaround was implemented.
         * Please apply any available patches to resolve this issue.
         */
        const llmVendor = agent.getVendor();
        const isAssistantHistory = (last === null || last === void 0 ? void 0 : last.type) === "assistantMessage";
        if (!isAssistantHistory) {
            return null;
        }
        const consent = {
            model: "chatgpt",
            options: {
                reference: false,
                strict: false,
                separate: null
            },
            functions: [
                {
                    name: "consent",
                    parameters: {
                        description: " Properties for asking the user's consent\n\n------------------------------\n\nDescription of the current {@link IConsentProps} type:\n\n> Properties for asking the user's consent",
                        type: "object",
                        properties: {
                            content: {
                                description: "Reason of the message implying what the AI agent wants\nto do at the next step after the user's consent.",
                                type: "string"
                            },
                            reply: {
                                title: "Recommended reply message for the user",
                                description: "Recommended reply message for the user.\n\nThe message what AI agent wants the user to reply\naccepting the AI agent's next job suggestion.",
                                type: "string"
                            }
                        },
                        required: [
                            "content",
                            "reply"
                        ],
                        additionalProperties: false,
                        $defs: {}
                    },
                    description: "Ask user to consent for what the AI agent wants to do next.\n\nIf AI agent wants to do some function calling at next,\nbut it needs the user's consent about the function calling to do,\nthen call this tool function.",
                    validate: (() => { const _io0 = input => "string" === typeof input.content && "string" === typeof input.reply; const _vo0 = (input, _path, _exceptionable = true) => ["string" === typeof input.content || _report(_exceptionable, {
                            path: _path + ".content",
                            expected: "string",
                            value: input.content
                        }), "string" === typeof input.reply || _report(_exceptionable, {
                            path: _path + ".reply",
                            expected: "string",
                            value: input.reply
                        })].every(flag => flag); const __is = input => "object" === typeof input && null !== input && _io0(input); let errors; let _report; return input => {
                        if (false === __is(input)) {
                            errors = [];
                            _report = __typia_transform__validateReport._validateReport(errors);
                            ((input, _path, _exceptionable = true) => ("object" === typeof input && null !== input || _report(true, {
                                path: _path + "",
                                expected: "IConsentProps",
                                value: input
                            })) && _vo0(input, _path + "", true) || _report(true, {
                                path: _path + "",
                                expected: "IConsentProps",
                                value: input
                            }))(input, "$input", true);
                            const success = 0 === errors.length;
                            return success ? {
                                success,
                                data: input
                            } : {
                                success,
                                errors,
                                data: input
                            };
                        }
                        return {
                            success: true,
                            data: input
                        };
                    }; })()
                }
            ]
        }.functions[0];
        const result = yield llmVendor.api.chat.completions.create({
            model: llmVendor.model,
            messages: [
                {
                    role: "system",
                    content: [
                        "You are an helpful assistant.",
                        "",
                        "If what the assistant said seems like to asking for",
                        "user's consent about some function calling at the next step,",
                        "use the tools appropriately to step to the next.",
                    ].join("\n"),
                },
                {
                    role: "assistant",
                    content: last.text,
                },
            ],
            tools: [
                {
                    type: "function",
                    function: {
                        name: consent.name,
                        description: consent.description,
                        parameters: consent.parameters,
                    },
                },
            ],
            tool_choice: "required",
            parallel_tool_calls: false,
        }, llmVendor.options);
        const toolCall = (_c = ((_b = (_a = result.choices[0]) === null || _a === void 0 ? void 0 : _a.message.tool_calls) !== null && _b !== void 0 ? _b : []).filter(tc => tc.type === "function" && tc.function.name === consent.name)) === null || _c === void 0 ? void 0 : _c[0];
        if (toolCall === undefined) {
            return null;
        }
        const input = (() => { const _io0 = input => "string" === typeof input.content && "string" === typeof input.reply; const __is = input => "object" === typeof input && null !== input && _io0(input); return input => { input = JSON.parse(input); return __is(input) ? input : null; }; })()(toolCall.function.arguments);
        return input !== null ? input.reply : null;
    });
}
/**
 * Check if the called operations match the expected operations.
 *
 * @param props Properties for checking the match of the called operations
 *              and the expected operations
 * @returns `true` if the called operations match the expected operations,
 * otherwise `false`.
 */
function success(props) {
    return successInner(props).result;
}
function successInner(props) {
    const call = (expected, overrideOperations) => successInner({
        expected,
        operations: overrideOperations !== null && overrideOperations !== void 0 ? overrideOperations : props.operations,
        strict: props.strict,
    });
    switch (props.expected.type) {
        case "array": {
            let take = 0;
            const targetIterator = props.expected.items[Symbol.iterator]();
            let targeted = targetIterator.next();
            while (true) {
                if (targeted.done === true) {
                    return {
                        result: true,
                        take,
                    };
                }
                if (take >= props.operations.length) {
                    return { result: false };
                }
                const result = call(targeted.value, props.operations.slice(take));
                if (!result.result) {
                    if (props.strict === true) {
                        return { result: false };
                    }
                    take += 1;
                    continue;
                }
                take += result.take;
                targeted = targetIterator.next();
            }
        }
        case "standalone": {
            const target = props.expected.operation;
            const result = props.operations.some(op => op.name === target.name);
            if (result) {
                return { result, take: 1 };
            }
            return {
                result,
            };
        }
        case "anyOf":
            for (const expected of props.expected.anyOf) {
                const callResult = call(expected);
                if (callResult.result) {
                    return callResult;
                }
            }
            return { result: false };
        case "allOf": {
            /**
             * @example
             * expected = [4, 2];
             * called = [1, 2, 3, 4, 5];
             *
             * { result: true, take: 3 };
             */
            const result = props.expected.allOf.map(expected => call(expected));
            if (result.every(r => r.result)) {
                return {
                    result: true,
                    take: result.reduce((acc, r) => Math.max(acc, r.take), 0),
                };
            }
            return {
                result: false,
            };
        }
    }
}
//# sourceMappingURL=AgenticaBenchmarkPredicator.js.map