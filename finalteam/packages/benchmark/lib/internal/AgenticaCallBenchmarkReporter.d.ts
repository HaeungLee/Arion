import type { ILlmSchema } from "@samchon/openapi";
import type { IAgenticaCallBenchmarkResult } from "../structures/IAgenticaCallBenchmarkResult";
export declare const AgenticaCallBenchmarkReporter: {
    markdown: typeof markdown;
};
export declare function markdown<Model extends ILlmSchema.Model>(result: IAgenticaCallBenchmarkResult<Model>): Record<string, string>;
