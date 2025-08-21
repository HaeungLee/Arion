import { AgenticaTokenUsage, factory, orchestrate } from "@agentica/core";

import { Semaphore } from "tstl";

import * as __typia_transform__validateReport from "typia/lib/internal/_validateReport.js";

import "typia";

import { v4 } from "uuid";

const AgenticaBenchmarkPredicator = {
    isNext,
    success
};

async function isNext(agent) {
    const last = agent.getHistories().at(-1);
    const llmVendor = agent.getVendor();
    const isAssistantHistory = last?.type === "assistantMessage";
    if (!isAssistantHistory) {
        return null;
    }
    const consent = {
        functions: [ {
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
                required: [ "content", "reply" ],
                additionalProperties: false,
                $defs: {}
            },
            description: "Ask user to consent for what the AI agent wants to do next.\n\nIf AI agent wants to do some function calling at next,\nbut it needs the user's consent about the function calling to do,\nthen call this tool function.",
            validate: (() => {
                const _io0 = input => "string" === typeof input.content && "string" === typeof input.reply;
                const _vo0 = (input, _path, _exceptionable = true) => [ "string" === typeof input.content || _report(_exceptionable, {
                    path: _path + ".content",
                    expected: "string",
                    value: input.content
                }), "string" === typeof input.reply || _report(_exceptionable, {
                    path: _path + ".reply",
                    expected: "string",
                    value: input.reply
                }) ].every((flag => flag));
                const __is = input => "object" === typeof input && null !== input && _io0(input);
                let errors;
                let _report;
                return input => {
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
                };
            })()
        } ]
    }.functions[0];
    const result = await llmVendor.api.chat.completions.create({
        model: llmVendor.model,
        messages: [ {
            role: "system",
            content: [ "You are an helpful assistant.", "", "If what the assistant said seems like to asking for", "user's consent about some function calling at the next step,", "use the tools appropriately to step to the next." ].join("\n")
        }, {
            role: "assistant",
            content: last.text
        } ],
        tools: [ {
            type: "function",
            function: {
                name: consent.name,
                description: consent.description,
                parameters: consent.parameters
            }
        } ],
        tool_choice: "required",
        parallel_tool_calls: false
    }, llmVendor.options);
    const toolCall = (result.choices[0]?.message.tool_calls ?? []).filter((tc => tc.type === "function" && tc.function.name === consent.name))?.[0];
    if (toolCall === undefined) {
        return null;
    }
    const input = (() => {
        const _io0 = input => "string" === typeof input.content && "string" === typeof input.reply;
        const __is = input => "object" === typeof input && null !== input && _io0(input);
        return input => {
            input = JSON.parse(input);
            return __is(input) ? input : null;
        };
    })()(toolCall.function.arguments);
    return input !== null ? input.reply : null;
}

function success(props) {
    return successInner(props).result;
}

function successInner(props) {
    const call = (expected, overrideOperations) => successInner({
        expected,
        operations: overrideOperations ?? props.operations,
        strict: props.strict
    });
    switch (props.expected.type) {
      case "array":
        {
            let take = 0;
            const targetIterator = props.expected.items[Symbol.iterator]();
            let targeted = targetIterator.next();
            while (true) {
                if (targeted.done === true) {
                    return {
                        result: true,
                        take
                    };
                }
                if (take >= props.operations.length) {
                    return {
                        result: false
                    };
                }
                const result = call(targeted.value, props.operations.slice(take));
                if (!result.result) {
                    if (props.strict === true) {
                        return {
                            result: false
                        };
                    }
                    take += 1;
                    continue;
                }
                take += result.take;
                targeted = targetIterator.next();
            }
        }

      case "standalone":
        {
            const target = props.expected.operation;
            const result = props.operations.some((op => op.name === target.name));
            if (result) {
                return {
                    result,
                    take: 1
                };
            }
            return {
                result
            };
        }

      case "anyOf":
        for (const expected of props.expected.anyOf) {
            const callResult = call(expected);
            if (callResult.result) {
                return callResult;
            }
        }
        return {
            result: false
        };

      case "allOf":
        {
            const result = props.expected.allOf.map((expected => call(expected)));
            if (result.every((r => r.result))) {
                return {
                    result: true,
                    take: result.reduce(((acc, r) => Math.max(acc, r.take)), 0)
                };
            }
            return {
                result: false
            };
        }
    }
}

const MathUtil = {
    round: value => Math.floor(value * 100) / 100
};

const AgenticaBenchmarkUtil = {
    errorToJson,
    expectedToJson
};

function errorToJson(error) {
    if (error instanceof Error) {
        return {
            ...error,
            name: error.name,
            message: error.message,
            stack: error.stack
        };
    }
    return error;
}

function expectedToJson(expected) {
    if (expected.type === "standalone") {
        return {
            type: expected.type,
            operation: {
                name: expected.operation.name,
                description: expected.operation.function.description
            }
        };
    } else if (expected.type === "array") {
        return {
            type: expected.type,
            items: expected.items.map(expectedToJson)
        };
    } else if (expected.type === "allOf") {
        return {
            type: expected.type,
            allOf: expected.allOf.map(expectedToJson)
        };
    } else {
        return {
            type: expected.type,
            anyOf: expected.anyOf.map(expectedToJson)
        };
    }
}

const AgenticaPromptReporter = {
    markdown: markdown$2
};

function markdown$2(p) {
    if (p.type === "userMessage") {
        return [ `### User Input`, p.contents, "" ].join("\n");
    }
    if (p.type === "assistantMessage") {
        return [ `### Assistant`, p.text, "" ].join("\n");
    }
    if (p.type === "systemMessage") {
        return [ `### System`, p.text, "" ].join("\n");
    }
    if (p.type === "select" || p.type === "cancel") {
        return [ `### ${p.type === "select" ? "Select" : "Cancel"}`, `  - controller: ${p.selection.operation.controller.name}`, `  - function: ${p.selection.operation.function.name}`, `  - reason: ${p.selection.reason}`, "", ...(p.selection.operation.function.description?.length ?? 0) !== 0 ? [ p.selection.operation.function.description, "" ] : [] ].join("\n");
    }
    if (p.type === "describe") {
        return [ "### Describe", ...p.executes.map((e => `  - ${e.operation.name}`)), "", ...p.text.split("\n").map((s => `> ${s}`)), "" ].join("\n");
    }
    if (p.type === "execute") {
        return [ "### Execute", `  - name: ${p.operation.name}`, `  - controller: ${p.operation.controller.name}`, `  - function: ${p.operation.function.name}`, "", "```json", JSON.stringify(p.arguments, null, 2), "```", "" ].join("\n");
    }
    throw new Error("Invalid history type");
}

const AgenticaCallBenchmarkReporter = {
    markdown: markdown$1
};

function markdown$1(result) {
    return Object.fromEntries([ [ "./README.md", writeIndex$1(result) ], ...result.experiments.map((exp => [ [ `./${exp.scenario.name}/README.md`, writeExperimentIndex$1(exp) ], ...exp.events.map(((event, i) => [ `./${exp.scenario.name}/${i + 1}.${event.type}.md`, writeExperimentEvent$1(event, i) ])) ])).flat() ]);
}

function writeIndex$1(result) {
    const events = result.experiments.map((r => r.events)).flat();
    const average = events.map((e => e.completed_at.getTime() - e.started_at.getTime())).reduce(((a, b) => a + b), 0) / events.length;
    const aggregate = result.usage.aggregate;
    return [ "# LLM Function Call Benchmark", "## Summary", `  - Aggregation:`, `    - Scenarios: #${result.experiments.length.toLocaleString()}`, `    - Trial: ${events.length}`, `    - Success: ${events.filter((e => e.type === "success")).length}`, `    - Failure: ${events.filter((e => e.type === "failure")).length}`, `    - Average Time: ${MathUtil.round(average).toLocaleString()} ms`, `  - Token Usage`, `    - Total: ${aggregate.total.toLocaleString()}`, `    - Input`, `      - Total: ${aggregate.input.total.toLocaleString()}`, `      - Cached: ${aggregate.input.cached.toLocaleString()}`, `    - Output:`, `      - Total: ${aggregate.output.total.toLocaleString()}`, `      - Reasoning: ${aggregate.output.reasoning.toLocaleString()}`, `      - Accepted Prediction: ${aggregate.output.accepted_prediction.toLocaleString()}`, `      - Rejected Prediction: ${aggregate.output.rejected_prediction.toLocaleString()}`, "", "## Experiments", " Name | Select | Call | Time/Avg ", ":-----|:-------|:-----|----------:", ...result.experiments.map((exp => [ `[${exp.scenario.name}](./${exp.scenario.name}/README.md)`, drawStatus(exp.events, (e => e.type !== "error" && e.select === true)), drawStatus(exp.events, (e => e.type !== "error" && e.call === true)), `${MathUtil.round(exp.events.map((e => e.completed_at.getTime() - e.started_at.getTime())).reduce(((a, b) => a + b), 0) / exp.events.length).toLocaleString()} ms` ].join(" | "))) ].join("\n");
}

function writeExperimentIndex$1(exp) {
    return [ `# ${exp.scenario.name}`, "## Summary", `  - Scenarios: #${exp.events.length.toLocaleString()}`, `  - Success: ${exp.events.filter((e => e.type === "success")).length}`, `  - Failure: ${exp.events.filter((e => e.type === "failure")).length}`, `  - Average Time: ${MathUtil.round(exp.events.map((e => e.completed_at.getTime() - e.started_at.getTime())).reduce(((a, b) => a + b), 0) / exp.events.length).toLocaleString()} ms`, "", "## Events", " Name | Type | Time", ":-----|:-----|----:", ...exp.events.map(((e, i) => [ `[${i + 1}.](./${i + 1}.${e.type}.md)`, e.type, `${MathUtil.round(e.completed_at.getTime() - e.started_at.getTime())} ms` ].join(" | "))), "", "## Scenario", "### User Prompt", exp.scenario.text, "", "### Expected", "```json", JSON.stringify(AgenticaBenchmarkUtil.expectedToJson(exp.scenario.expected), null, 2), "```" ].join("\n");
}

function writeExperimentEvent$1(event, index) {
    return [ `# ${index + 1}. ${event.type}`, "## Summary", `  - Name: ${event.scenario.name}`, `  - Type: ${event.type}`, `  - Time: ${MathUtil.round(event.completed_at.getTime() - event.started_at.getTime()).toLocaleString()} ms`, ...event.type !== "error" ? [ `  - Select: ${event.select ? "✅" : "❌"}`, `  - Call: ${event.call ? "✅" : "❌"}` ] : [], `  - Token Usage:`, `    - Total: ${JSON.stringify(event.usage.aggregate.total)}`, `    - Input`, `      - Total: ${event.usage.aggregate.input.total}`, `      - Cached: ${event.usage.aggregate.input.cached}`, `    - Output:`, `      - Total: ${event.usage.aggregate.output.total}`, `      - Accepted Prediction: ${event.usage.aggregate.output.accepted_prediction}`, `      - Reasoning: ${event.usage.aggregate.output.reasoning}`, `      - Rejected Prediction: ${event.usage.aggregate.output.rejected_prediction}`, "", "## Scenario", "### User Prompt", event.scenario.text, "", "### Expected", "```json", JSON.stringify(AgenticaBenchmarkUtil.expectedToJson(event.scenario.expected), null, 2), "```", "", "## Prompt Histories", ...event.prompts.map(AgenticaPromptReporter.markdown), "", ...event.type === "error" ? [ "## Error", "```json", JSON.stringify(AgenticaBenchmarkUtil.errorToJson(event.error), null, 2), "```" ] : [] ].join("\n");
}

function drawStatus(events, success) {
    const count = Math.floor(events.filter(success).length / events.length * 10);
    return Array.from({
        length: count
    }).fill("■").join("") + Array.from({
        length: 10 - count
    }).fill("□").join("");
}

class AgenticaCallBenchmark {
    constructor(props) {
        this.agent_ = props.agent;
        this.scenarios_ = props.scenarios.slice();
        this.config_ = {
            repeat: props.config?.repeat ?? 10,
            simultaneous: props.config?.simultaneous ?? 10,
            consent: props.config?.consent ?? 3
        };
        this.result_ = null;
    }
    async execute(listener) {
        const started_at = new Date;
        const semaphore = new Semaphore(this.config_.simultaneous);
        const task = this.scenarios_.map((async scenario => {
            const events = await Promise.all(Array.from({
                length: this.config_.repeat
            }).map((async () => {
                await semaphore.acquire();
                const e = await this.step(scenario);
                await semaphore.release();
                if (listener !== undefined) {
                    listener(e);
                }
                return e;
            })));
            return {
                scenario,
                events,
                usage: events.filter((e => e.type !== "error")).map((e => e.usage)).reduce(((acc, cur) => AgenticaTokenUsage.plus(acc, cur)), AgenticaTokenUsage.zero())
            };
        }));
        const experiments = await Promise.all(task);
        return this.result_ = {
            experiments,
            started_at,
            completed_at: new Date,
            usage: experiments.map((p => p.usage)).reduce(((acc, cur) => AgenticaTokenUsage.plus(acc, cur)), AgenticaTokenUsage.zero())
        };
    }
    report() {
        if (this.result_ === null) {
            throw new Error("Benchmark is not executed yet.");
        }
        return AgenticaCallBenchmarkReporter.markdown(this.result_);
    }
    async step(scenario) {
        const agent = this.agent_.clone();
        const started_at = new Date;
        const success = () => AgenticaBenchmarkPredicator.success({
            expected: scenario.expected,
            operations: agent.getHistories().filter((p => p.type === "execute")).map((p => p.operation)),
            strict: false
        });
        const out = () => {
            const select = AgenticaBenchmarkPredicator.success({
                expected: scenario.expected,
                operations: agent.getHistories().filter((p => p.type === "select")).map((p => p.selection.operation)),
                strict: false
            });
            const call = success();
            return {
                type: call ? "success" : "failure",
                scenario,
                select,
                call,
                prompts: agent.getHistories(),
                usage: agent.getTokenUsage(),
                started_at,
                completed_at: new Date
            };
        };
        try {
            await agent.conversate(scenario.text);
            if (success()) {
                return out();
            }
            for (let i = 0; i < this.config_.consent; ++i) {
                const next = await AgenticaBenchmarkPredicator.isNext(agent);
                if (next === null) {
                    break;
                }
                await agent.conversate(next);
                if (success()) {
                    return out();
                }
            }
            return out();
        } catch (error) {
            return {
                type: "error",
                scenario,
                prompts: agent.getHistories(),
                usage: agent.getTokenUsage(),
                error,
                started_at,
                completed_at: new Date
            };
        }
    }
}

const AgenticaSelectBenchmarkReporter = {
    markdown
};

function markdown(result) {
    const iterator = [ [ "./README.md", writeIndex(result) ], ...result.experiments.map((exp => [ [ `./${exp.scenario.name}/README.md`, writeExperimentIndex(exp) ], ...exp.events.map(((event, i) => [ `./${exp.scenario.name}/${i + 1}.${event.type}.md`, writeExperimentEvent(event, i) ])) ])).flat() ];
    return Object.fromEntries(iterator);
}

function writeIndex(result) {
    const events = result.experiments.map((r => r.events)).flat();
    const average = events.map((e => e.completed_at.getTime() - e.started_at.getTime())).reduce(((a, b) => a + b), 0) / events.length;
    const aggregate = result.usage.aggregate;
    return [ "# LLM Function Selection Benchmark", "## Summary", `  - Aggregation:`, `    - Scenarios: #${result.experiments.length.toLocaleString()}`, `    - Trial: ${events.length}`, `    - Success: ${events.filter((e => e.type === "success")).length}`, `    - Failure: ${events.filter((e => e.type === "failure")).length}`, `    - Error: ${events.filter((e => e.type === "error")).length}`, `    - Average Time: ${MathUtil.round(average).toLocaleString()} ms`, `  - Token Usage`, `    - Total: ${aggregate.total.toLocaleString()}`, `    - Input`, `      - Total: ${aggregate.input.total.toLocaleString()}`, `      - Cached: ${aggregate.input.cached.toLocaleString()}`, `    - Output:`, `      - Total: ${aggregate.output.total.toLocaleString()}`, `      - Accepted Prediction: ${aggregate.output.accepted_prediction.toLocaleString()}`, `      - Reasoning: ${aggregate.output.reasoning.toLocaleString()}`, `      - Rejected Prediction: ${aggregate.output.rejected_prediction.toLocaleString()}`, "", "## Experiments", " Name | Status | Time/Avg  ", ":-----|:-------|----------:", ...result.experiments.map((exp => [ `[${exp.scenario.name}](./${exp.scenario.name}/README.md)`, (() => {
        const success = Math.floor(exp.events.filter((e => e.type === "success")).length / exp.events.length * 10);
        return Array.from({
            length: success
        }).fill("■").join("") + Array.from({
            length: 10 - success
        }).fill("□").join("");
    })(), `${MathUtil.round(exp.events.map((event => event.completed_at.getTime() - event.started_at.getTime())).reduce(((a, b) => a + b), 0) / exp.events.length).toLocaleString()} ms` ].join(" | "))) ].join("\n");
}

function writeExperimentIndex(exp) {
    const aggregate = exp.usage.aggregate;
    return [ `# ${exp.scenario.name}`, "## Summary", "  - Aggregation:", `    - Trial: ${exp.events.length}`, `    - Success: ${exp.events.filter((e => e.type === "success")).length}`, `    - Failure: ${exp.events.filter((e => e.type === "failure")).length}`, `    - Error: ${exp.events.filter((e => e.type === "error")).length}`, `    - Average Time: ${MathUtil.round(exp.events.map((event => event.completed_at.getTime() - event.started_at.getTime())).reduce(((a, b) => a + b), 0) / exp.events.length).toLocaleString()} ms`, `  - Token Usage`, `    - Total: ${aggregate.total.toLocaleString()}`, `    - Input`, `      - Total: ${aggregate.input.total.toLocaleString()}`, `      - Cached: ${aggregate.input.cached.toLocaleString()}`, `    - Output:`, `      - Total: ${aggregate.output.total.toLocaleString()}`, `      - Accepted Prediction: ${aggregate.output.accepted_prediction.toLocaleString()}`, `      - Reasoning: ${aggregate.output.reasoning.toLocaleString()}`, `      - Rejected Prediction: ${aggregate.output.rejected_prediction.toLocaleString()}`, "", "## Events", " No | Type | Time", "---:|:-----|----:", ...exp.events.map(((e, i) => [ `[${i + 1}.](./${i + 1}.${e.type}.md)`, e.type, `${MathUtil.round(e.completed_at.getTime() - e.started_at.getTime())} ms` ].join(" | "))), "", "## Scenario", "### User Prompt", exp.scenario.text, "", "### Expected", "```json", JSON.stringify(AgenticaBenchmarkUtil.expectedToJson(exp.scenario.expected), null, 2), "```" ].join("\n");
}

function writeExperimentEvent(event, index) {
    return [ `# ${index + 1}. ${event.type}`, `## Summary`, `  - Name: ${event.scenario.name}`, `  - Type: ${event.type}`, `  - Time: ${(event.completed_at.getTime() - event.started_at.getTime()).toLocaleString()} ms`, ...event.type !== "error" ? [ "  - Token Usage", `    - Total: ${event.usage.aggregate.total.toLocaleString()}`, `    - Prompt`, `      - Total: ${event.usage.aggregate.input.total.toLocaleString()}`, `      - Cached: ${event.usage.aggregate.input.cached.toLocaleString()}`, `    - Completion:`, `      - Total: ${event.usage.aggregate.output.total.toLocaleString()}`, `      - Reasoning: ${event.usage.aggregate.output.reasoning.toLocaleString()}`, `      - Accepted Prediction: ${event.usage.aggregate.output.accepted_prediction.toLocaleString()}`, `      - Rejected Prediction: ${event.usage.aggregate.output.rejected_prediction.toLocaleString()}` ] : [], "", "## Scenario", "### User Prompt", event.scenario.text, "", "### Expected", "```json", JSON.stringify(AgenticaBenchmarkUtil.expectedToJson(event.scenario.expected), null, 2), "```", "", ...event.type === "success" || event.type === "failure" ? [ "## Result", ...event.selected.map((s => [ `### ${s.operation.name}`, `  - Controller: \`${s.operation.controller.name}\``, `  - Function: \`${s.operation.function.name}\``, `  - Reason: ${s.reason}`, "", ...s.operation.function.description !== undefined && s.operation.function.description !== "" ? [ s.operation.function.description, "" ] : [] ].join("\n"))) ] : [], ...event.type === "error" ? [ "## Error", "```json", AgenticaBenchmarkUtil.errorToJson(JSON.stringify(event.error, null, 2)), "```", "" ] : [] ].join("\n");
}

class AgenticaSelectBenchmark {
    constructor(props) {
        this.agent_ = props.agent;
        this.scenarios_ = props.scenarios.slice();
        this.config_ = {
            repeat: props.config?.repeat ?? 10,
            simultaneous: props.config?.simultaneous ?? 10
        };
        this.histories_ = props.agent.getHistories().slice();
        this.result_ = null;
    }
    async execute(listener) {
        const started_at = new Date;
        const semaphore = new Semaphore(this.config_.simultaneous);
        const experiments = await Promise.all(this.scenarios_.map((async scenario => {
            const events = await Promise.all(Array.from({
                length: this.config_.repeat
            }).map((async () => {
                await semaphore.acquire();
                const e = await this.step(scenario);
                await semaphore.release();
                if (listener !== undefined) {
                    listener(e);
                }
                return e;
            })));
            return {
                scenario,
                events,
                usage: events.filter((e => e.type !== "error")).map((e => e.usage)).reduce(((acc, cur) => AgenticaTokenUsage.plus(acc, cur)), AgenticaTokenUsage.zero())
            };
        })));
        return this.result_ = {
            experiments,
            started_at,
            completed_at: new Date,
            usage: experiments.map((p => p.usage)).reduce(((acc, cur) => AgenticaTokenUsage.plus(acc, cur)), AgenticaTokenUsage.zero())
        };
    }
    report() {
        if (this.result_ === null) {
            throw new Error("Benchmark is not executed yet.");
        }
        return AgenticaSelectBenchmarkReporter.markdown(this.result_);
    }
    async step(scenario) {
        const started_at = new Date;
        try {
            const usage = AgenticaTokenUsage.zero();
            const historyGetters = [];
            const dispatch = event => {
                if ("toHistory" in event) {
                    if ("join" in event) {
                        historyGetters.push((async () => {
                            await event.join();
                            return event.toHistory();
                        }));
                    } else {
                        historyGetters.push((async () => event.toHistory()));
                    }
                }
            };
            const context = this.agent_.getContext({
                prompt: factory.createUserMessageHistory({
                    id: v4(),
                    created_at: started_at.toISOString(),
                    contents: [ {
                        type: "text",
                        text: scenario.text
                    } ]
                }),
                usage,
                dispatch
            });
            if (typeof context.config?.executor === "function") {
                throw new TypeError("select function is not found");
            }
            await (context.config?.executor?.select ?? orchestrate.select)({
                ...context,
                histories: this.histories_.slice(),
                stack: [],
                ready: () => true
            });
            const histories = await Promise.all(historyGetters.map((async g => g())));
            const selected = histories.filter((p => p.type === "select")).map((p => p.selection));
            return {
                type: AgenticaBenchmarkPredicator.success({
                    expected: scenario.expected,
                    operations: selected.map((s => s.operation))
                }) ? "success" : "failure",
                scenario,
                selected,
                usage,
                assistantPrompts: histories.filter((p => p.type === "assistantMessage")),
                started_at,
                completed_at: new Date
            };
        } catch (error) {
            return {
                type: "error",
                scenario,
                error,
                started_at,
                completed_at: new Date
            };
        }
    }
}

class MicroAgenticaCallBenchmark {
    constructor(props) {
        this.agent_ = props.agent;
        this.scenarios_ = props.scenarios.slice();
        this.config_ = {
            repeat: props.config?.repeat ?? 10,
            simultaneous: props.config?.simultaneous ?? 10,
            consent: props.config?.consent ?? 3
        };
        this.result_ = null;
    }
    async execute(listener) {
        const started_at = new Date;
        const semaphore = new Semaphore(this.config_.simultaneous);
        const task = this.scenarios_.map((async scenario => {
            const events = await Promise.all(Array.from({
                length: this.config_.repeat
            }).map((async () => {
                await semaphore.acquire();
                const e = await this.step(scenario);
                await semaphore.release();
                if (listener !== undefined) {
                    listener(e);
                }
                return e;
            })));
            return {
                scenario,
                events,
                usage: events.filter((e => e.type !== "error")).map((e => e.usage)).reduce(((acc, cur) => AgenticaTokenUsage.plus(acc, cur)), AgenticaTokenUsage.zero())
            };
        }));
        const experiments = await Promise.all(task);
        return this.result_ = {
            experiments,
            started_at,
            completed_at: new Date,
            usage: experiments.map((p => p.usage)).reduce(((acc, cur) => AgenticaTokenUsage.plus(acc, cur)), AgenticaTokenUsage.zero())
        };
    }
    report() {
        if (this.result_ === null) {
            throw new Error("Benchmark is not executed yet.");
        }
        return AgenticaCallBenchmarkReporter.markdown(this.result_);
    }
    async step(scenario) {
        const agent = this.agent_.clone();
        const started_at = new Date;
        const success = () => AgenticaBenchmarkPredicator.success({
            expected: scenario.expected,
            operations: agent.getHistories().filter((p => p.type === "execute")).map((p => p.operation)),
            strict: false
        });
        const out = () => {
            const select = AgenticaBenchmarkPredicator.success({
                expected: scenario.expected,
                operations: agent.getHistories().filter((p => p.type === "execute")).map((p => p.operation)),
                strict: false
            });
            const call = success();
            return {
                type: call ? "success" : "failure",
                scenario,
                select,
                call,
                prompts: agent.getHistories(),
                usage: agent.getTokenUsage(),
                started_at,
                completed_at: new Date
            };
        };
        try {
            await agent.conversate(scenario.text);
            if (success()) {
                return out();
            }
            for (let i = 0; i < this.config_.consent; ++i) {
                const next = await AgenticaBenchmarkPredicator.isNext(agent);
                if (next === null) {
                    break;
                }
                await agent.conversate(next);
                if (success()) {
                    return out();
                }
            }
            return out();
        } catch (error) {
            return {
                type: "error",
                scenario,
                prompts: agent.getHistories(),
                usage: agent.getTokenUsage(),
                error,
                started_at,
                completed_at: new Date
            };
        }
    }
}

export { AgenticaCallBenchmark, AgenticaSelectBenchmark, MicroAgenticaCallBenchmark };
//# sourceMappingURL=index.mjs.map
