import type { ILlmSchema } from "@samchon/openapi";
import type { IAgenticaSelectBenchmarkResult } from "../structures/IAgenticaSelectBenchmarkResult";
export declare function markdown<Model extends ILlmSchema.Model>(result: IAgenticaSelectBenchmarkResult<Model>): Record<string, string>;
