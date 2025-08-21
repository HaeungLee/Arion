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
exports.AgenticaSelectBenchmark = void 0;
/**
 * @module
 * This file contains the implementation of the AgenticaSelectBenchmark class.
 *
 * @author Wrtn Technologies
 */
const core_1 = require("@agentica/core");
const tstl_1 = require("tstl");
const uuid_1 = require("uuid");
const AgenticaBenchmarkPredicator_1 = require("./internal/AgenticaBenchmarkPredicator");
const AgenticaSelectBenchmarkReporter_1 = require("./internal/AgenticaSelectBenchmarkReporter");
/**
 * LLM function calling selection benchmark.
 *
 * `AgenticaSelectBenchmark` is a class for the benchmark of the
 * LLM (Large Model Language) function calling's selection part.
 * It utilizes the `selector` agent and tests whether the expected
 * {@link IAgenticaOperation operations} are properly selected from
 * the given {@link IAgenticaSelectBenchmarkScenario scenarios}.
 *
 * Note that, this `AgenticaSelectBenchmark` class measures only the
 * selection benchmark, testing whether the `selector` agent can select
 * candidate functions to call as expected. Therefore, it does not test
 * about the actual function calling which is done by the `executor` agent.
 * If you want that feature, use {@link AgenticaCallBenchmark} class instead.
 *
 * @author Samchon
 */
class AgenticaSelectBenchmark {
    /**
     * Initializer Constructor.
     *
     * @param props Properties of the selection benchmark
     */
    constructor(props) {
        var _a, _b, _c, _d;
        this.agent_ = props.agent;
        this.scenarios_ = props.scenarios.slice();
        this.config_ = {
            repeat: (_b = (_a = props.config) === null || _a === void 0 ? void 0 : _a.repeat) !== null && _b !== void 0 ? _b : 10,
            simultaneous: (_d = (_c = props.config) === null || _c === void 0 ? void 0 : _c.simultaneous) !== null && _d !== void 0 ? _d : 10,
        };
        this.histories_ = props.agent.getHistories().slice();
        this.result_ = null;
    }
    /**
     * Execute the benchmark.
     *
     * Execute the benchmark of the LLM function selection, and returns
     * the result of the benchmark.
     *
     * If you wanna see progress of the benchmark, you can pass a callback
     * function as the argument of the `listener`. The callback function
     * would be called whenever a benchmark event is occurred.
     *
     * Also, you can publish a markdown format report by calling
     * the {@link report} function after the benchmark execution.
     *
     * @param listener Callback function listening the benchmark events
     * @returns Results of the function selection benchmark
     */
    execute(listener) {
        return __awaiter(this, void 0, void 0, function* () {
            const started_at = new Date();
            const semaphore = new tstl_1.Semaphore(this.config_.simultaneous);
            const experiments = yield Promise.all(this.scenarios_.map((scenario) => __awaiter(this, void 0, void 0, function* () {
                const events = yield Promise.all(Array.from({ length: this.config_.repeat }).map(() => __awaiter(this, void 0, void 0, function* () {
                    yield semaphore.acquire();
                    const e = yield this.step(scenario);
                    yield semaphore.release();
                    if (listener !== undefined) {
                        listener(e);
                    }
                    return e;
                })));
                return {
                    scenario,
                    events,
                    usage: events
                        .filter(e => e.type !== "error")
                        .map(e => e.usage)
                        .reduce((acc, cur) => core_1.AgenticaTokenUsage.plus(acc, cur), core_1.AgenticaTokenUsage.zero()),
                };
            })));
            return (this.result_ = {
                experiments,
                started_at,
                completed_at: new Date(),
                usage: experiments
                    .map(p => p.usage)
                    .reduce((acc, cur) => core_1.AgenticaTokenUsage.plus(acc, cur), core_1.AgenticaTokenUsage.zero()),
            });
        });
    }
    /**
     * Report the benchmark result as markdown files.
     *
     * Report the benchmark result {@link execute}d by
     * `AgenticaSelectBenchmark` as markdown files, and returns a
     * dictionary object of the markdown reporting files. The key of
     * the dictionary would be file name, and the value would be the
     * markdown content.
     *
     * For reference, the markdown files are composed like below:
     *
     * - `./README.md`
     * - `./scenario-1/README.md`
     * - `./scenario-1/1.success.md`
     * - `./scenario-1/2.failure.md`
     * - `./scenario-1/3.error.md`
     *
     * @returns Dictionary of markdown files.
     */
    report() {
        if (this.result_ === null) {
            throw new Error("Benchmark is not executed yet.");
        }
        return AgenticaSelectBenchmarkReporter_1.AgenticaSelectBenchmarkReporter.markdown(this.result_);
    }
    step(scenario) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const started_at = new Date();
            try {
                const usage = core_1.AgenticaTokenUsage.zero();
                const historyGetters = [];
                const dispatch = (event) => {
                    if ("toHistory" in event) {
                        if ("join" in event) {
                            historyGetters.push(() => __awaiter(this, void 0, void 0, function* () {
                                yield event.join();
                                return event.toHistory();
                            }));
                        }
                        else {
                            historyGetters.push(() => __awaiter(this, void 0, void 0, function* () { return event.toHistory(); }));
                        }
                    }
                };
                const context = this.agent_.getContext({
                    prompt: core_1.factory.createUserMessageHistory({
                        id: (0, uuid_1.v4)(),
                        created_at: started_at.toISOString(),
                        contents: [{
                                type: "text",
                                text: scenario.text,
                            }],
                    }),
                    usage,
                    dispatch,
                });
                if (typeof ((_a = context.config) === null || _a === void 0 ? void 0 : _a.executor) === "function") {
                    throw new TypeError("select function is not found");
                }
                yield ((_d = (_c = (_b = context.config) === null || _b === void 0 ? void 0 : _b.executor) === null || _c === void 0 ? void 0 : _c.select) !== null && _d !== void 0 ? _d : core_1.orchestrate.select)(Object.assign(Object.assign({}, context), { histories: this.histories_.slice(), stack: [], ready: () => true }));
                const histories = yield Promise.all(historyGetters.map((g) => __awaiter(this, void 0, void 0, function* () { return g(); })));
                const selected = histories
                    .filter(p => p.type === "select")
                    .map(p => p.selection);
                return {
                    type: AgenticaBenchmarkPredicator_1.AgenticaBenchmarkPredicator.success({
                        expected: scenario.expected,
                        operations: selected.map(s => s.operation),
                    })
                        ? "success"
                        : "failure",
                    scenario,
                    selected,
                    usage,
                    assistantPrompts: histories
                        // Only the assistant is allowed to emit text events.
                        .filter(p => p.type === "assistantMessage"),
                    started_at,
                    completed_at: new Date(),
                };
            }
            catch (error) {
                return {
                    type: "error",
                    scenario,
                    error,
                    started_at,
                    completed_at: new Date(),
                };
            }
        });
    }
}
exports.AgenticaSelectBenchmark = AgenticaSelectBenchmark;
//# sourceMappingURL=AgenticaSelectBenchmark.js.map