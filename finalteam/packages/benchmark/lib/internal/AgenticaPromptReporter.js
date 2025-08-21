"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgenticaPromptReporter = void 0;
exports.AgenticaPromptReporter = {
    markdown,
};
function markdown(p) {
    var _a, _b;
    if (p.type === "userMessage") {
        return [`### User Input`, p.contents, ""].join("\n");
    }
    if (p.type === "assistantMessage") {
        return [`### Assistant`, p.text, ""].join("\n");
    }
    if (p.type === "systemMessage") {
        return [`### System`, p.text, ""].join("\n");
    }
    if (p.type === "select" || p.type === "cancel") {
        return [
            `### ${p.type === "select" ? "Select" : "Cancel"}`,
            `  - controller: ${p.selection.operation.controller.name}`,
            `  - function: ${p.selection.operation.function.name}`,
            `  - reason: ${p.selection.reason}`,
            "",
            ...(((_b = (_a = p.selection.operation.function.description) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) !== 0
                ? [p.selection.operation.function.description, ""]
                : []),
        ].join("\n");
    }
    if (p.type === "describe") {
        return [
            "### Describe",
            ...p.executes.map(e => `  - ${e.operation.name}`),
            "",
            ...p.text.split("\n").map(s => `> ${s}`),
            "",
        ].join("\n");
    }
    if (p.type === "execute") {
        return [
            "### Execute",
            `  - name: ${p.operation.name}`,
            `  - controller: ${p.operation.controller.name}`,
            `  - function: ${p.operation.function.name}`,
            "",
            "```json",
            JSON.stringify(p.arguments, null, 2),
            "```",
            "",
        ].join("\n");
    }
    p;
    throw new Error("Invalid history type");
}
//# sourceMappingURL=AgenticaPromptReporter.js.map