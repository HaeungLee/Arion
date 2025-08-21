import type { Agentica } from "@agentica/core";
import type { ILlmSchema } from "@samchon/openapi";
import type { tags } from "typia";
import type { IAgenticaCallBenchmarkEvent } from "./structures/IAgenticaCallBenchmarkEvent";
import type { IAgenticaCallBenchmarkResult } from "./structures/IAgenticaCallBenchmarkResult";
import type { IAgenticaCallBenchmarkScenario } from "./structures/IAgenticaCallBenchmarkScenario";
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
export declare class AgenticaCallBenchmark<Model extends ILlmSchema.Model> {
    private agent_;
    private scenarios_;
    private config_;
    private result_;
    /**
     * Initializer Constructor.
     *
     * @param props Properties of the selection benchmark
     */
    constructor(props: AgenticaCallBenchmark.IProps<Model>);
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
    execute(listener?: (event: IAgenticaCallBenchmarkEvent<Model>) => void): Promise<IAgenticaCallBenchmarkResult<Model>>;
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
    report(): Record<string, string>;
    private step;
}
export declare namespace AgenticaCallBenchmark {
    /**
     * Properties of the {@link AgenticaCallBenchmark} constructor.
     */
    interface IProps<Model extends ILlmSchema.Model> {
        /**
         * AI agent instance.
         */
        agent: Agentica<Model>;
        /**
         * List of scenarios what you expect.
         */
        scenarios: IAgenticaCallBenchmarkScenario<Model>[];
        /**
         * Configuration for the benchmark.
         */
        config?: Partial<IConfig>;
    }
    /**
     * Configuration for the benchmark.
     *
     * `AgenticaSelectBenchmark.IConfig` is a data structure which
     * represents a configuration for the benchmark, especially the
     * capacity information of the benchmark execution.
     */
    interface IConfig {
        /**
         * Repeat count.
         *
         * The number of repeating count for the benchmark execution
         * for each scenario.
         *
         * @default 10
         */
        repeat: number & tags.Type<"uint32"> & tags.Minimum<1>;
        /**
         * Simultaneous count.
         *
         * The number of simultaneous count for the parallel benchmark
         * execution.
         *
         * If you configure this property greater than `1`, the benchmark
         * for each scenario would be executed in parallel in the given
         * count.
         *
         * @default 10
         */
        simultaneous: number & tags.Type<"uint32"> & tags.Minimum<1>;
        /**
         * Number of consents.
         *
         * AI agent sometimes asks user to consent to the function
         * calling, and perform it at the next step.
         *
         * This property represents the number of consents to allow.
         * If the number of consents from the AI agent exceeds the
         * configured value, the benchmark will be failed.
         *
         * @default 3
         */
        consent: number;
    }
}
