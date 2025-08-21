"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgenticaBenchmarkUtil = void 0;
exports.AgenticaBenchmarkUtil = {
    errorToJson,
    expectedToJson,
};
function errorToJson(error) {
    if (error instanceof Error) {
        return Object.assign(Object.assign({}, error), { name: error.name, message: error.message, stack: error.stack });
    }
    return error;
}
function expectedToJson(expected) {
    if (expected.type === "standalone") {
        return {
            type: expected.type,
            operation: {
                name: expected.operation.name,
                description: expected.operation.function.description,
            },
        };
    }
    else if (expected.type === "array") {
        return {
            type: expected.type,
            items: expected.items.map(expectedToJson),
        };
    }
    else if (expected.type === "allOf") {
        return {
            type: expected.type,
            allOf: expected.allOf.map(expectedToJson),
        };
    }
    else {
        return {
            type: expected.type,
            anyOf: expected.anyOf.map(expectedToJson),
        };
    }
}
//# sourceMappingURL=AgenticaBenchmarkUtil.js.map