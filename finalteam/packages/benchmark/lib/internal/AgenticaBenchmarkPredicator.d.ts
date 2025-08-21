/**
 * @module
 * This file contains functions to work with AgenticaBenchmarkPredicator.
 *
 * @author Wrtn Technologies
 */
import type { Agentica, AgenticaOperation, MicroAgentica } from "@agentica/core";
import type { ILlmSchema } from "@samchon/openapi";
import type { IAgenticaBenchmarkExpected } from "../structures/IAgenticaBenchmarkExpected";
export declare const AgenticaBenchmarkPredicator: {
    isNext: typeof isNext;
    success: typeof success;
};
declare function isNext<Model extends ILlmSchema.Model>(agent: Agentica<Model> | MicroAgentica<Model>): Promise<string | null>;
/**
 * Check if the called operations match the expected operations.
 *
 * @param props Properties for checking the match of the called operations
 *              and the expected operations
 * @returns `true` if the called operations match the expected operations,
 * otherwise `false`.
 */
export declare function success<Model extends ILlmSchema.Model>(props: {
    /**
     * Expected operations to be called.
     *
     * For 'allOf' within an 'array', the next expected element starts checking from the element that follows the last called element in 'allOf'.
     */
    expected: IAgenticaBenchmarkExpected<Model>;
    /**
     * Specified operations.
     */
    operations: Array<AgenticaOperation<Model>>;
    /**
     * If it's `false`, check the array and let it go even if there's something wrong between them.
     *
     * @default `false`
     */
    strict?: boolean;
}): boolean;
export {};
