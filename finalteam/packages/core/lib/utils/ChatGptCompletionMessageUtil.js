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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGptCompletionMessageUtil = void 0;
const __typia_transform__validateReport = __importStar(require("typia/lib/internal/_validateReport.js"));
const typia_1 = __importDefault(require("typia"));
const ByteArrayUtil_1 = require("./ByteArrayUtil");
const ChatGptTokenUsageAggregator_1 = require("./ChatGptTokenUsageAggregator");
function transformCompletionChunk(source) {
    const str = source instanceof Uint8Array ? ByteArrayUtil_1.ByteArrayUtil.toUtf8(source) : source;
    const result = JSON.parse(str);
    const valid = (() => { const _io0 = input => "string" === typeof input.id && (Array.isArray(input.choices) && input.choices.every(elem => "object" === typeof elem && null !== elem && _io1(elem))) && "number" === typeof input.created && "string" === typeof input.model && "chat.completion.chunk" === input.object && (null === input.service_tier || undefined === input.service_tier || "auto" === input.service_tier || "default" === input.service_tier || "flex" === input.service_tier) && (undefined === input.system_fingerprint || "string" === typeof input.system_fingerprint) && (null === input.usage || undefined === input.usage || "object" === typeof input.usage && null !== input.usage && _io9(input.usage)); const _io1 = input => "object" === typeof input.delta && null !== input.delta && false === Array.isArray(input.delta) && _io2(input.delta) && (null === input.finish_reason || "length" === input.finish_reason || "function_call" === input.finish_reason || "stop" === input.finish_reason || "tool_calls" === input.finish_reason || "content_filter" === input.finish_reason) && "number" === typeof input.index && (null === input.logprobs || undefined === input.logprobs || "object" === typeof input.logprobs && null !== input.logprobs && _io6(input.logprobs)); const _io2 = input => (null === input.content || undefined === input.content || "string" === typeof input.content) && (undefined === input.function_call || "object" === typeof input.function_call && null !== input.function_call && false === Array.isArray(input.function_call) && _io3(input.function_call)) && (null === input.refusal || undefined === input.refusal || "string" === typeof input.refusal) && (undefined === input.role || "user" === input.role || "developer" === input.role || "system" === input.role || "assistant" === input.role || "tool" === input.role) && (undefined === input.tool_calls || Array.isArray(input.tool_calls) && input.tool_calls.every(elem => "object" === typeof elem && null !== elem && _io4(elem))); const _io3 = input => (undefined === input.arguments || "string" === typeof input.arguments) && (undefined === input.name || "string" === typeof input.name); const _io4 = input => "number" === typeof input.index && (undefined === input.id || "string" === typeof input.id) && (undefined === input["function"] || "object" === typeof input["function"] && null !== input["function"] && false === Array.isArray(input["function"]) && _io5(input["function"])) && (undefined === input.type || "function" === input.type); const _io5 = input => (undefined === input.arguments || "string" === typeof input.arguments) && (undefined === input.name || "string" === typeof input.name); const _io6 = input => (null === input.content || Array.isArray(input.content) && input.content.every(elem => "object" === typeof elem && null !== elem && _io7(elem))) && (null === input.refusal || Array.isArray(input.refusal) && input.refusal.every(elem => "object" === typeof elem && null !== elem && _io7(elem))); const _io7 = input => "string" === typeof input.token && (null === input.bytes || Array.isArray(input.bytes) && input.bytes.every(elem => "number" === typeof elem)) && "number" === typeof input.logprob && (Array.isArray(input.top_logprobs) && input.top_logprobs.every(elem => "object" === typeof elem && null !== elem && _io8(elem))); const _io8 = input => "string" === typeof input.token && (null === input.bytes || Array.isArray(input.bytes) && input.bytes.every(elem => "number" === typeof elem)) && "number" === typeof input.logprob; const _io9 = input => "number" === typeof input.completion_tokens && "number" === typeof input.prompt_tokens && "number" === typeof input.total_tokens && (undefined === input.completion_tokens_details || "object" === typeof input.completion_tokens_details && null !== input.completion_tokens_details && false === Array.isArray(input.completion_tokens_details) && _io10(input.completion_tokens_details)) && (undefined === input.prompt_tokens_details || "object" === typeof input.prompt_tokens_details && null !== input.prompt_tokens_details && false === Array.isArray(input.prompt_tokens_details) && _io11(input.prompt_tokens_details)); const _io10 = input => (undefined === input.accepted_prediction_tokens || "number" === typeof input.accepted_prediction_tokens) && (undefined === input.audio_tokens || "number" === typeof input.audio_tokens) && (undefined === input.reasoning_tokens || "number" === typeof input.reasoning_tokens) && (undefined === input.rejected_prediction_tokens || "number" === typeof input.rejected_prediction_tokens); const _io11 = input => (undefined === input.audio_tokens || "number" === typeof input.audio_tokens) && (undefined === input.cached_tokens || "number" === typeof input.cached_tokens); const _vo0 = (input, _path, _exceptionable = true) => ["string" === typeof input.id || _report(_exceptionable, {
            path: _path + ".id",
            expected: "string",
            value: input.id
        }), (Array.isArray(input.choices) || _report(_exceptionable, {
            path: _path + ".choices",
            expected: "Array<ChatCompletionChunk.Choice>",
            value: input.choices
        })) && input.choices.map((elem, _index8) => ("object" === typeof elem && null !== elem || _report(_exceptionable, {
            path: _path + ".choices[" + _index8 + "]",
            expected: "ChatCompletionChunk.Choice",
            value: elem
        })) && _vo1(elem, _path + ".choices[" + _index8 + "]", true && _exceptionable) || _report(_exceptionable, {
            path: _path + ".choices[" + _index8 + "]",
            expected: "ChatCompletionChunk.Choice",
            value: elem
        })).every(flag => flag) || _report(_exceptionable, {
            path: _path + ".choices",
            expected: "Array<ChatCompletionChunk.Choice>",
            value: input.choices
        }), "number" === typeof input.created || _report(_exceptionable, {
            path: _path + ".created",
            expected: "number",
            value: input.created
        }), "string" === typeof input.model || _report(_exceptionable, {
            path: _path + ".model",
            expected: "string",
            value: input.model
        }), "chat.completion.chunk" === input.object || _report(_exceptionable, {
            path: _path + ".object",
            expected: "\"chat.completion.chunk\"",
            value: input.object
        }), null === input.service_tier || undefined === input.service_tier || "auto" === input.service_tier || "default" === input.service_tier || "flex" === input.service_tier || _report(_exceptionable, {
            path: _path + ".service_tier",
            expected: "(\"auto\" | \"default\" | \"flex\" | null | undefined)",
            value: input.service_tier
        }), undefined === input.system_fingerprint || "string" === typeof input.system_fingerprint || _report(_exceptionable, {
            path: _path + ".system_fingerprint",
            expected: "(string | undefined)",
            value: input.system_fingerprint
        }), null === input.usage || undefined === input.usage || ("object" === typeof input.usage && null !== input.usage || _report(_exceptionable, {
            path: _path + ".usage",
            expected: "(CompletionUsage | null | undefined)",
            value: input.usage
        })) && _vo9(input.usage, _path + ".usage", true && _exceptionable) || _report(_exceptionable, {
            path: _path + ".usage",
            expected: "(CompletionUsage | null | undefined)",
            value: input.usage
        })].every(flag => flag); const _vo1 = (input, _path, _exceptionable = true) => [("object" === typeof input.delta && null !== input.delta && false === Array.isArray(input.delta) || _report(_exceptionable, {
            path: _path + ".delta",
            expected: "ChatCompletionChunk.Choice.Delta",
            value: input.delta
        })) && _vo2(input.delta, _path + ".delta", true && _exceptionable) || _report(_exceptionable, {
            path: _path + ".delta",
            expected: "ChatCompletionChunk.Choice.Delta",
            value: input.delta
        }), null === input.finish_reason || "length" === input.finish_reason || "function_call" === input.finish_reason || "stop" === input.finish_reason || "tool_calls" === input.finish_reason || "content_filter" === input.finish_reason || _report(_exceptionable, {
            path: _path + ".finish_reason",
            expected: "(\"content_filter\" | \"function_call\" | \"length\" | \"stop\" | \"tool_calls\" | null)",
            value: input.finish_reason
        }), "number" === typeof input.index || _report(_exceptionable, {
            path: _path + ".index",
            expected: "number",
            value: input.index
        }), null === input.logprobs || undefined === input.logprobs || ("object" === typeof input.logprobs && null !== input.logprobs || _report(_exceptionable, {
            path: _path + ".logprobs",
            expected: "(ChatCompletionChunk.Choice.Logprobs | null | undefined)",
            value: input.logprobs
        })) && _vo6(input.logprobs, _path + ".logprobs", true && _exceptionable) || _report(_exceptionable, {
            path: _path + ".logprobs",
            expected: "(ChatCompletionChunk.Choice.Logprobs | null | undefined)",
            value: input.logprobs
        })].every(flag => flag); const _vo2 = (input, _path, _exceptionable = true) => [null === input.content || undefined === input.content || "string" === typeof input.content || _report(_exceptionable, {
            path: _path + ".content",
            expected: "(null | string | undefined)",
            value: input.content
        }), undefined === input.function_call || ("object" === typeof input.function_call && null !== input.function_call && false === Array.isArray(input.function_call) || _report(_exceptionable, {
            path: _path + ".function_call",
            expected: "(ChatCompletionChunk.Choice.Delta.FunctionCall | undefined)",
            value: input.function_call
        })) && _vo3(input.function_call, _path + ".function_call", true && _exceptionable) || _report(_exceptionable, {
            path: _path + ".function_call",
            expected: "(ChatCompletionChunk.Choice.Delta.FunctionCall | undefined)",
            value: input.function_call
        }), null === input.refusal || undefined === input.refusal || "string" === typeof input.refusal || _report(_exceptionable, {
            path: _path + ".refusal",
            expected: "(null | string | undefined)",
            value: input.refusal
        }), undefined === input.role || "user" === input.role || "developer" === input.role || "system" === input.role || "assistant" === input.role || "tool" === input.role || _report(_exceptionable, {
            path: _path + ".role",
            expected: "(\"assistant\" | \"developer\" | \"system\" | \"tool\" | \"user\" | undefined)",
            value: input.role
        }), undefined === input.tool_calls || (Array.isArray(input.tool_calls) || _report(_exceptionable, {
            path: _path + ".tool_calls",
            expected: "(Array<ChatCompletionChunk.Choice.Delta.ToolCall> | undefined)",
            value: input.tool_calls
        })) && input.tool_calls.map((elem, _index9) => ("object" === typeof elem && null !== elem || _report(_exceptionable, {
            path: _path + ".tool_calls[" + _index9 + "]",
            expected: "ChatCompletionChunk.Choice.Delta.ToolCall",
            value: elem
        })) && _vo4(elem, _path + ".tool_calls[" + _index9 + "]", true && _exceptionable) || _report(_exceptionable, {
            path: _path + ".tool_calls[" + _index9 + "]",
            expected: "ChatCompletionChunk.Choice.Delta.ToolCall",
            value: elem
        })).every(flag => flag) || _report(_exceptionable, {
            path: _path + ".tool_calls",
            expected: "(Array<ChatCompletionChunk.Choice.Delta.ToolCall> | undefined)",
            value: input.tool_calls
        })].every(flag => flag); const _vo3 = (input, _path, _exceptionable = true) => [undefined === input.arguments || "string" === typeof input.arguments || _report(_exceptionable, {
            path: _path + ".arguments",
            expected: "(string | undefined)",
            value: input.arguments
        }), undefined === input.name || "string" === typeof input.name || _report(_exceptionable, {
            path: _path + ".name",
            expected: "(string | undefined)",
            value: input.name
        })].every(flag => flag); const _vo4 = (input, _path, _exceptionable = true) => ["number" === typeof input.index || _report(_exceptionable, {
            path: _path + ".index",
            expected: "number",
            value: input.index
        }), undefined === input.id || "string" === typeof input.id || _report(_exceptionable, {
            path: _path + ".id",
            expected: "(string | undefined)",
            value: input.id
        }), undefined === input["function"] || ("object" === typeof input["function"] && null !== input["function"] && false === Array.isArray(input["function"]) || _report(_exceptionable, {
            path: _path + "[\"function\"]",
            expected: "(ChatCompletionChunk.Choice.Delta.ToolCall.Function | undefined)",
            value: input["function"]
        })) && _vo5(input["function"], _path + "[\"function\"]", true && _exceptionable) || _report(_exceptionable, {
            path: _path + "[\"function\"]",
            expected: "(ChatCompletionChunk.Choice.Delta.ToolCall.Function | undefined)",
            value: input["function"]
        }), undefined === input.type || "function" === input.type || _report(_exceptionable, {
            path: _path + ".type",
            expected: "(\"function\" | undefined)",
            value: input.type
        })].every(flag => flag); const _vo5 = (input, _path, _exceptionable = true) => [undefined === input.arguments || "string" === typeof input.arguments || _report(_exceptionable, {
            path: _path + ".arguments",
            expected: "(string | undefined)",
            value: input.arguments
        }), undefined === input.name || "string" === typeof input.name || _report(_exceptionable, {
            path: _path + ".name",
            expected: "(string | undefined)",
            value: input.name
        })].every(flag => flag); const _vo6 = (input, _path, _exceptionable = true) => [null === input.content || (Array.isArray(input.content) || _report(_exceptionable, {
            path: _path + ".content",
            expected: "(Array<ChatCompletionTokenLogprob> | null)",
            value: input.content
        })) && input.content.map((elem, _index10) => ("object" === typeof elem && null !== elem || _report(_exceptionable, {
            path: _path + ".content[" + _index10 + "]",
            expected: "ChatCompletionTokenLogprob",
            value: elem
        })) && _vo7(elem, _path + ".content[" + _index10 + "]", true && _exceptionable) || _report(_exceptionable, {
            path: _path + ".content[" + _index10 + "]",
            expected: "ChatCompletionTokenLogprob",
            value: elem
        })).every(flag => flag) || _report(_exceptionable, {
            path: _path + ".content",
            expected: "(Array<ChatCompletionTokenLogprob> | null)",
            value: input.content
        }), null === input.refusal || (Array.isArray(input.refusal) || _report(_exceptionable, {
            path: _path + ".refusal",
            expected: "(Array<ChatCompletionTokenLogprob> | null)",
            value: input.refusal
        })) && input.refusal.map((elem, _index11) => ("object" === typeof elem && null !== elem || _report(_exceptionable, {
            path: _path + ".refusal[" + _index11 + "]",
            expected: "ChatCompletionTokenLogprob",
            value: elem
        })) && _vo7(elem, _path + ".refusal[" + _index11 + "]", true && _exceptionable) || _report(_exceptionable, {
            path: _path + ".refusal[" + _index11 + "]",
            expected: "ChatCompletionTokenLogprob",
            value: elem
        })).every(flag => flag) || _report(_exceptionable, {
            path: _path + ".refusal",
            expected: "(Array<ChatCompletionTokenLogprob> | null)",
            value: input.refusal
        })].every(flag => flag); const _vo7 = (input, _path, _exceptionable = true) => ["string" === typeof input.token || _report(_exceptionable, {
            path: _path + ".token",
            expected: "string",
            value: input.token
        }), null === input.bytes || (Array.isArray(input.bytes) || _report(_exceptionable, {
            path: _path + ".bytes",
            expected: "(Array<number> | null)",
            value: input.bytes
        })) && input.bytes.map((elem, _index12) => "number" === typeof elem || _report(_exceptionable, {
            path: _path + ".bytes[" + _index12 + "]",
            expected: "number",
            value: elem
        })).every(flag => flag) || _report(_exceptionable, {
            path: _path + ".bytes",
            expected: "(Array<number> | null)",
            value: input.bytes
        }), "number" === typeof input.logprob || _report(_exceptionable, {
            path: _path + ".logprob",
            expected: "number",
            value: input.logprob
        }), (Array.isArray(input.top_logprobs) || _report(_exceptionable, {
            path: _path + ".top_logprobs",
            expected: "Array<ChatCompletionTokenLogprob.TopLogprob>",
            value: input.top_logprobs
        })) && input.top_logprobs.map((elem, _index13) => ("object" === typeof elem && null !== elem || _report(_exceptionable, {
            path: _path + ".top_logprobs[" + _index13 + "]",
            expected: "ChatCompletionTokenLogprob.TopLogprob",
            value: elem
        })) && _vo8(elem, _path + ".top_logprobs[" + _index13 + "]", true && _exceptionable) || _report(_exceptionable, {
            path: _path + ".top_logprobs[" + _index13 + "]",
            expected: "ChatCompletionTokenLogprob.TopLogprob",
            value: elem
        })).every(flag => flag) || _report(_exceptionable, {
            path: _path + ".top_logprobs",
            expected: "Array<ChatCompletionTokenLogprob.TopLogprob>",
            value: input.top_logprobs
        })].every(flag => flag); const _vo8 = (input, _path, _exceptionable = true) => ["string" === typeof input.token || _report(_exceptionable, {
            path: _path + ".token",
            expected: "string",
            value: input.token
        }), null === input.bytes || (Array.isArray(input.bytes) || _report(_exceptionable, {
            path: _path + ".bytes",
            expected: "(Array<number> | null)",
            value: input.bytes
        })) && input.bytes.map((elem, _index14) => "number" === typeof elem || _report(_exceptionable, {
            path: _path + ".bytes[" + _index14 + "]",
            expected: "number",
            value: elem
        })).every(flag => flag) || _report(_exceptionable, {
            path: _path + ".bytes",
            expected: "(Array<number> | null)",
            value: input.bytes
        }), "number" === typeof input.logprob || _report(_exceptionable, {
            path: _path + ".logprob",
            expected: "number",
            value: input.logprob
        })].every(flag => flag); const _vo9 = (input, _path, _exceptionable = true) => ["number" === typeof input.completion_tokens || _report(_exceptionable, {
            path: _path + ".completion_tokens",
            expected: "number",
            value: input.completion_tokens
        }), "number" === typeof input.prompt_tokens || _report(_exceptionable, {
            path: _path + ".prompt_tokens",
            expected: "number",
            value: input.prompt_tokens
        }), "number" === typeof input.total_tokens || _report(_exceptionable, {
            path: _path + ".total_tokens",
            expected: "number",
            value: input.total_tokens
        }), undefined === input.completion_tokens_details || ("object" === typeof input.completion_tokens_details && null !== input.completion_tokens_details && false === Array.isArray(input.completion_tokens_details) || _report(_exceptionable, {
            path: _path + ".completion_tokens_details",
            expected: "(CompletionUsage.CompletionTokensDetails | undefined)",
            value: input.completion_tokens_details
        })) && _vo10(input.completion_tokens_details, _path + ".completion_tokens_details", true && _exceptionable) || _report(_exceptionable, {
            path: _path + ".completion_tokens_details",
            expected: "(CompletionUsage.CompletionTokensDetails | undefined)",
            value: input.completion_tokens_details
        }), undefined === input.prompt_tokens_details || ("object" === typeof input.prompt_tokens_details && null !== input.prompt_tokens_details && false === Array.isArray(input.prompt_tokens_details) || _report(_exceptionable, {
            path: _path + ".prompt_tokens_details",
            expected: "(CompletionUsage.PromptTokensDetails | undefined)",
            value: input.prompt_tokens_details
        })) && _vo11(input.prompt_tokens_details, _path + ".prompt_tokens_details", true && _exceptionable) || _report(_exceptionable, {
            path: _path + ".prompt_tokens_details",
            expected: "(CompletionUsage.PromptTokensDetails | undefined)",
            value: input.prompt_tokens_details
        })].every(flag => flag); const _vo10 = (input, _path, _exceptionable = true) => [undefined === input.accepted_prediction_tokens || "number" === typeof input.accepted_prediction_tokens || _report(_exceptionable, {
            path: _path + ".accepted_prediction_tokens",
            expected: "(number | undefined)",
            value: input.accepted_prediction_tokens
        }), undefined === input.audio_tokens || "number" === typeof input.audio_tokens || _report(_exceptionable, {
            path: _path + ".audio_tokens",
            expected: "(number | undefined)",
            value: input.audio_tokens
        }), undefined === input.reasoning_tokens || "number" === typeof input.reasoning_tokens || _report(_exceptionable, {
            path: _path + ".reasoning_tokens",
            expected: "(number | undefined)",
            value: input.reasoning_tokens
        }), undefined === input.rejected_prediction_tokens || "number" === typeof input.rejected_prediction_tokens || _report(_exceptionable, {
            path: _path + ".rejected_prediction_tokens",
            expected: "(number | undefined)",
            value: input.rejected_prediction_tokens
        })].every(flag => flag); const _vo11 = (input, _path, _exceptionable = true) => [undefined === input.audio_tokens || "number" === typeof input.audio_tokens || _report(_exceptionable, {
            path: _path + ".audio_tokens",
            expected: "(number | undefined)",
            value: input.audio_tokens
        }), undefined === input.cached_tokens || "number" === typeof input.cached_tokens || _report(_exceptionable, {
            path: _path + ".cached_tokens",
            expected: "(number | undefined)",
            value: input.cached_tokens
        })].every(flag => flag); const __is = input => "object" === typeof input && null !== input && _io0(input); let errors; let _report; return input => {
        if (false === __is(input)) {
            errors = [];
            _report = __typia_transform__validateReport._validateReport(errors);
            ((input, _path, _exceptionable = true) => ("object" === typeof input && null !== input || _report(true, {
                path: _path + "",
                expected: "ChatCompletionChunk",
                value: input
            })) && _vo0(input, _path + "", true) || _report(true, {
                path: _path + "",
                expected: "ChatCompletionChunk",
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
    }; })()(result);
    if (valid.success === false) {
        console.error("Invalid ChatCompletionChunk", valid.errors);
    }
    return result;
}
function accumulate(origin, chunk) {
    const choices = origin.choices;
    chunk.choices.forEach((choice) => {
        var _a, _b, _c, _d;
        const accChoice = choices[choice.index];
        if (accChoice != null) {
            choices[choice.index] = mergeChoice(accChoice, choice);
            return;
        }
        choices[choice.index] = {
            index: choice.index,
            finish_reason: (_a = choice.finish_reason) !== null && _a !== void 0 ? _a : null,
            logprobs: (_b = choice.logprobs) !== null && _b !== void 0 ? _b : null,
            message: {
                tool_calls: choice.delta.tool_calls !== undefined
                    ? choice.delta.tool_calls.reduce((acc, cur) => {
                        var _a, _b, _c, _d, _e;
                        acc[cur.index] = {
                            id: (_a = cur.id) !== null && _a !== void 0 ? _a : "",
                            type: "function",
                            function: {
                                name: (_c = (_b = cur.function) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : "",
                                arguments: (_e = (_d = cur.function) === null || _d === void 0 ? void 0 : _d.arguments) !== null && _e !== void 0 ? _e : "",
                            },
                        };
                        return acc;
                    }, [])
                    : undefined,
                content: (_c = choice.delta.content) !== null && _c !== void 0 ? _c : null,
                refusal: (_d = choice.delta.refusal) !== null && _d !== void 0 ? _d : null,
                role: "assistant",
            },
        };
    });
    const usage = (() => {
        if (chunk.usage == null) {
            return origin.usage;
        }
        if (origin.usage == null) {
            return chunk.usage;
        }
        return ChatGptTokenUsageAggregator_1.ChatGptTokenUsageAggregator.sum(origin.usage, chunk.usage);
    })();
    return Object.assign(Object.assign({}, origin), { choices,
        usage });
}
function merge(chunks) {
    const firstChunk = chunks[0];
    if (firstChunk === undefined) {
        throw new Error("No chunks received");
    }
    return chunks.reduce(accumulate, {
        id: firstChunk.id,
        choices: [],
        created: firstChunk.created,
        model: firstChunk.model,
        object: "chat.completion",
        usage: undefined,
        service_tier: firstChunk.service_tier,
        system_fingerprint: firstChunk.system_fingerprint,
    });
}
function mergeChoice(acc, cur) {
    var _a;
    var _b;
    if (acc.finish_reason == null && cur.finish_reason != null) {
        acc.finish_reason = cur.finish_reason;
    }
    if (acc.logprobs == null && cur.logprobs != null) {
        acc.logprobs = cur.logprobs;
    }
    if (cur.delta.content != null) {
        if (acc.message.content == null) {
            acc.message.content = cur.delta.content;
        }
        else {
            acc.message.content += cur.delta.content;
        }
    }
    if (cur.delta.refusal != null) {
        if (acc.message.refusal == null) {
            acc.message.refusal = cur.delta.refusal;
        }
        else {
            acc.message.refusal += cur.delta.refusal;
        }
    }
    if (cur.delta.tool_calls != null) {
        (_a = (_b = acc.message).tool_calls) !== null && _a !== void 0 ? _a : (_b.tool_calls = []);
        const toolCalls = acc.message.tool_calls;
        cur.delta.tool_calls.forEach((toolCall) => {
            var _a, _b, _c, _d, _e;
            const existingToolCall = toolCalls[toolCall.index];
            if (existingToolCall != null) {
                toolCalls[toolCall.index] = mergeToolCalls(existingToolCall, toolCall);
                return;
            }
            toolCalls[toolCall.index] = {
                id: (_a = toolCall.id) !== null && _a !== void 0 ? _a : "",
                type: "function",
                function: {
                    name: (_c = (_b = toolCall.function) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : "",
                    arguments: (_e = (_d = toolCall.function) === null || _d === void 0 ? void 0 : _d.arguments) !== null && _e !== void 0 ? _e : "",
                },
            };
        });
    }
    return acc;
}
function mergeToolCalls(acc, cur) {
    var _a, _b, _c;
    if (cur.function != null) {
        acc.function.arguments += (_a = cur.function.arguments) !== null && _a !== void 0 ? _a : "";
        acc.function.name += (_b = cur.function.name) !== null && _b !== void 0 ? _b : "";
    }
    acc.id += (_c = cur.id) !== null && _c !== void 0 ? _c : "";
    return acc;
}
exports.ChatGptCompletionMessageUtil = {
    transformCompletionChunk,
    accumulate,
    merge,
    mergeChoice,
    mergeToolCalls,
};
//# sourceMappingURL=ChatGptCompletionMessageUtil.js.map