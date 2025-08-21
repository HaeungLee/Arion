/**
 * @module
 * This file contains functions to work with AgenticaBenchmarkUtil.
 *
 * @author Wrtn Technologies
 */
import type { ILlmSchema } from "@samchon/openapi";
import type { IAgenticaBenchmarkExpected } from "../structures/IAgenticaBenchmarkExpected";
export declare const AgenticaBenchmarkUtil: {
    errorToJson: typeof errorToJson;
    expectedToJson: typeof expectedToJson;
};
declare function errorToJson<T>(error: T): T | ({
    [k in keyof T]: T[k];
} & {
    name: string;
    message: string;
    stack: string;
});
declare function expectedToJson<Model extends ILlmSchema.Model>(expected: IAgenticaBenchmarkExpected<Model>): any;
export {};
