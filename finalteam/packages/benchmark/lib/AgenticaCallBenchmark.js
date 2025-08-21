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
exports.AgenticaCallBenchmark = void 0;
/**
 * @module
 * This file contains the implementation of the AgenticaCallBenchmark class.
 *
 * @author Wrtn Technologies
 */
const core_1 = require("@agentica/core");
const tstl_1 = require("tstl");
const AgenticaBenchmarkPredicator_1 = require("./internal/AgenticaBenchmarkPredicator");
const AgenticaCallBenchmarkReporter_1 = require("./internal/AgenticaCallBenchmarkReporter");
/**
 * LLM function calling selection benchmark.
 *
 * `AgenticaCallBenchmark` is a class for the benchmark of the
 * LLM (Large Model Language) function calling part. It utilizes both
 * `selector` and `caller` agents and tests whether the expected
 * {@link IAgenticaOperation operations} are properly selected and
 * called from the given
 * {@link IAgenticaCallBenchmarkScenario scenarios}.
 *
 * Note that, this `AgenticaCallBenchmark` consumes a lot of time and
 * LLM token costs because it needs the whole process of the
 * {@link Agentica} class with a lot of repetitions. If you don't want
 * such a heavy benchmark, consider to using
 * {@link AgenticaSelectBenchmark} instead. In my experience,
 * {@link Agentica} does not fail to function calling, so the function
 * selection benchmark is much economical.
 *
 * @author Samchon
 */
class AgenticaCallBenchmark {
    /**
     * Initializer Constructor.
     *
     * @param props Properties of the selection benchmark
     */
    constructor(props) {
        var _a, _b, _c, _d, _e, _f;
        this.agent_ = props.agent;
        this.scenarios_ = props.scenarios.slice();
        this.config_ = {
            repeat: (_b = (_a = props.config) === null || _a === void 0 ? void 0 : _a.repeat) !== null && _b !== void 0 ? _b : 10,
            simultaneous: (_d = (_c = props.config) === null || _c === void 0 ? void 0 : _c.simultaneous) !== null && _d !== void 0 ? _d : 10,
            consent: (_f = (_e = props.config) === null || _e === void 0 ? void 0 : _e.consent) !== null && _f !== void 0 ? _f : 3,
        };
        this.result_ = null;
    }
    /**
     * Execute the benchmark.
     *
     * Execute the benchmark of the LLM function calling, and returns
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
     * @returns Results of the function calling benchmark
     */
    execute(listener) {
        return __awaiter(this, void 0, void 0, function* () {
            const started_at = new Date();
            const semaphore = new tstl_1.Semaphore(this.config_.simultaneous);
            const task = this.scenarios_.map((scenario) => __awaiter(this, void 0, void 0, function* () {
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
            }));
            const experiments = yield Promise.all(task);
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
     * `AgenticaCallBenchmark` as markdown files, and returns a dictionary
     * object of the markdown reporting files. The key of the dictionary
     * would be file name, and the value would be the markdown content.
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
        return AgenticaCallBenchmarkReporter_1.AgenticaCallBenchmarkReporter.markdown(this.result_);
    }
    step(scenario) {
        return __awaiter(this, void 0, void 0, function* () {
            const agent = this.agent_.clone();
            const started_at = new Date();
            const success = () => AgenticaBenchmarkPredicator_1.AgenticaBenchmarkPredicator.success({
                expected: scenario.expected,
                operations: agent
                    .getHistories()
                    .filter(p => p.type === "execute")
                    .map(p => p.operation),
                strict: false,
            });
            const out = () => {
                const select = AgenticaBenchmarkPredicator_1.AgenticaBenchmarkPredicator.success({
                    expected: scenario.expected,
                    operations: agent
                        .getHistories()
                        .filter(p => p.type === "select")
                        .map(p => p.selection.operation),
                    strict: false,
                });
                const call = success();
                return {
                    type: (call ? "success" : "failure"),
                    scenario,
                    select,
                    call,
                    prompts: agent.getHistories(),
                    usage: agent.getTokenUsage(),
                    started_at,
                    completed_at: new Date(),
                };
            };
            try {
                yield agent.conversate(scenario.text);
                if (success()) {
                    return out();
                }
                for (let i = 0; i < this.config_.consent; ++i) {
                    const next = yield AgenticaBenchmarkPredicator_1.AgenticaBenchmarkPredicator.isNext(agent);
                    if (next === null) {
                        break;
                    }
                    yield agent.conversate(next);
                    if (success()) {
                        return out();
                    }
                }
                return out();
            }
            catch (error) {
                return {
                    type: "error",
                    scenario,
                    prompts: agent.getHistories(),
                    usage: agent.getTokenUsage(),
                    error,
                    started_at,
                    completed_at: new Date(),
                };
            }
        });
    }
}
exports.AgenticaCallBenchmark = AgenticaCallBenchmark;
//# sourceMappingURL=AgenticaCallBenchmark.js.map