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
exports.extractQuery = extractQuery;
const core_1 = require("@agentica/core");
const tools_1 = require("./tools");
function extractQuery(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const completionStream = yield ctx.request("select", {
            messages: [
                {
                    role: "system",
                    content: [
                        "You are a function searcher. You will extract search queries from the user's message, and the query results will be function names.",
                        "A query is a 2–3 sentence description of the action the user needs to perform.",
                        "Therefore, the extracted queries must be suitable for function search.",
                        "You need to identify the actions required to achieve what the user wants and extract queries that can be used to search for those actions.",
                        "Extract only one query per task.",
                    ].join("\n"),
                },
                ...ctx.histories
                    .map((core_1.factory.decodeHistory))
                    .flat(),
                {
                    role: "user",
                    content: ctx.prompt.contents.map(core_1.factory.decodeUserMessageContent),
                },
            ],
            tool_choice: "required",
            tools: [tools_1.Tools.extract_query],
        });
        const chunks = yield core_1.utils.StreamUtil.readAll(completionStream);
        const completion = core_1.utils.ChatGptCompletionMessageUtil.merge(chunks);
        const queries = (_c = (_b = (_a = completion.choices[0]) === null || _a === void 0 ? void 0 : _a.message.tool_calls) === null || _b === void 0 ? void 0 : _b.flatMap((v) => {
            const arg = JSON.parse(v.function.arguments);
            if (!Array.isArray(arg.query_list)) {
                return [];
            }
            return arg.query_list.map(v => v.query);
        })) !== null && _c !== void 0 ? _c : [];
        return queries;
    });
}
//# sourceMappingURL=extract_query.js.map