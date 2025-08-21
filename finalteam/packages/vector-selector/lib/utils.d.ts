import type { AgenticaContext } from "@agentica/core";
import type { ILlmSchema } from "@samchon/openapi";
import type { GreaterThan, Integer } from "type-fest";
/** type function to check if a number is greater than 0 */
type GreaterThanZeroInteger<T extends number> = GreaterThan<Integer<T>, 0> extends true ? T : never;
/**
 * This function is used to get a retry function.
 *
 * It will throw an error if the count is not a number,
 * or if the count is not a finite number,
 * or if the count is not an integer,
 * or if the count is less than 1.
 *
 * @param count - The number of times to retry the function.
 * @returns A retry function.
 * @throws {TypeError} If the count is not a number, or if the count is not a finite number, or if the count is not an integer, or if the count is less than 1.
 * @throws {Error} If the function fails to return a value after the specified number of retries.
 */
export declare function getRetry<TCount extends number>(count: GreaterThanZeroInteger<TCount>): <T>(fn: () => Promise<T>) => Promise<T>;
/**
 * This function is used to group an array into a 2-dimensional array.
 *
 * It will throw an error if the count is not a number,
 * or if the count is not a finite number,
 * or if the count is not an integer,
 * or if the count is less than 1.
 *
 * @param array - The array to group.
 * @param count - The number of elements in each group.
 * @returns A 2-dimensional array.
 */
export declare function groupByArray<T, TCount extends number>(array: T[], count: GreaterThanZeroInteger<TCount>): T[][];
/**
 * Removes duplicates from an array.
 * You can specify which value to compare using a property selector function.
 *
 * @param array - Array to remove duplicates from
 * @param selector - Function that selects the value to compare
 * @returns New array with duplicates removed
 *
 * @example
 * ```typescript
 * const users = [
 *   { id: 1, name: 'John' },
 *   { id: 2, name: 'Jane' },
 *   { id: 1, name: 'John' }
 * ];
 *
 * const uniqueUsers = uniqBy(users, user => user.id);
 * // Result: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]
 * ```
 */
export declare function uniqBy<T, K>(array: T[], selector: (item: T) => K): T[];
/**
 * Generates a hash from an Agentica ctx.operations.array.
 *
 * @param ctx - The Agentica context to generate a hash from
 * @returns A hash of the Agentica context
 */
export declare function generateHashFromCtx<SchemaModel extends ILlmSchema.Model>(ctx: AgenticaContext<SchemaModel>): string;
export {};
