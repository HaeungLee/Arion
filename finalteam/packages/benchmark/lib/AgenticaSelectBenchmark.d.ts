import type { Agentica } from "@agentica/core";
import type { ILlmSchema } from "@samchon/openapi";
import type { tags } from "typia";
import type { IAgenticaSelectBenchmarkEvent } from "./structures/IAgenticaSelectBenchmarkEvent";
import type { IAgenticaSelectBenchmarkResult } from "./structures/IAgenticaSelectBenchmarkResult";
import type { IAgenticaSelectBenchmarkScenario } from "./structures/IAgenticaSelectBenchmarkScenario";
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
export declare class AgenticaSelectBenchmark<Model extends ILlmSchema.Model> {
    private agent_;
    private scenarios_;
    private config_;
    private histories_;
    private result_;
    /**
     * Initializer Constructor.
     *
     * @param props Properties of the selection benchmark
     */
    constructor(props: AgenticaSelectBenchmark.IProps<Model>);
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
    execute(listener?: (event: IAgenticaSelectBenchmarkEvent<Model>) => void): Promise<IAgenticaSelectBenchmarkResult<Model>>;
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
    report(): Record<string, string>;
    private step;
}
export declare namespace AgenticaSelectBenchmark {
    /**
     * Properties of the {@link AgenticaSelectBenchmark} constructor.
     */
    interface IProps<Model extends ILlmSchema.Model> {
        /**
         * AI agent instance.
         */
        agent: Agentica<Model>;
        /**
         * List of scenarios what you expect.
         */
        scenarios: IAgenticaSelectBenchmarkScenario<Model>[];
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
    }
}
