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
exports.getRetry = getRetry;
exports.groupByArray = groupByArray;
exports.uniqBy = uniqBy;
exports.generateHashFromCtx = generateHashFromCtx;
const sha2_1 = require("@noble/hashes/sha2");
const utils_1 = require("@noble/hashes/utils");
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
function getRetry(count) {
    if (count < 1) {
        throw new Error("count should be greater than 0");
    }
    return (fn) => __awaiter(this, void 0, void 0, function* () {
        let lastError = null;
        for (let i = 0; i < count; i++) {
            try {
                return yield fn();
            }
            catch (e) {
                lastError = e;
                if (i === count - 1) {
                    throw e;
                }
            }
        }
        // count should be greater than 0.
        throw lastError;
    });
}
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
function groupByArray(array, count) {
    if (count < 1) {
        throw new Error("count should be greater than 0");
    }
    if (array.length === 0) {
        return [];
    }
    if (array.length < count) {
        return [array];
    }
    const grouped = [];
    for (let i = 0; i < array.length; i += count) {
        grouped.push(array.slice(i, i + count));
    }
    return grouped;
}
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
function uniqBy(array, selector) {
    const seen = new Set();
    return array.filter((item) => {
        const key = selector(item);
        if (seen.has(key)) {
            return false;
        }
        seen.add(key);
        return true;
    });
}
/**
 * Generates a hash from an Agentica ctx.operations.array.
 *
 * @param ctx - The Agentica context to generate a hash from
 * @returns A hash of the Agentica context
 */
function generateHashFromCtx(ctx) {
    const target = JSON.stringify(ctx.operations.array);
    const bytes = (0, utils_1.utf8ToBytes)(target);
    const hash = (0, sha2_1.sha256)(bytes);
    const binary = String.fromCharCode(...hash);
    return btoa(binary);
}
//# sourceMappingURL=utils.js.map