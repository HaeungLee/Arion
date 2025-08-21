/**
 * @module
 * This file contains functions to work with AgenticaPromptReporter.
 *
 * @author Wrtn Technologies
 */
import type { AgenticaHistory } from "@agentica/core";
import type { ILlmSchema } from "@samchon/openapi";
export declare const AgenticaPromptReporter: {
    markdown: typeof markdown;
};
declare function markdown<Model extends ILlmSchema.Model>(p: AgenticaHistory<Model>): string;
export {};
