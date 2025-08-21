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
exports.BootAgenticaVectorSelector = BootAgenticaVectorSelector;
exports.useEmbeddedContext = useEmbeddedContext;
const extract_query_1 = require("./extract_query");
const select_1 = require("./select");
const utils_1 = require("./utils");
function BootAgenticaVectorSelector(props) {
    const { isEmbedded, setEmbedded } = useEmbeddedContext();
    const { searchTool, embedContext } = props.strategy;
    const selectorExecute = (ctx) => __awaiter(this, void 0, void 0, function* () {
        if (!isEmbedded(ctx)) {
            yield embedContext({ ctx, setEmbedded: () => setEmbedded(ctx) });
        }
        const queries = yield (0, extract_query_1.extractQuery)(ctx);
        const toolList = yield Promise.all(queries.map((query) => __awaiter(this, void 0, void 0, function* () { return searchTool(ctx, query); }))).then(res => res.flat().map((v) => {
            const op = ctx.operations.flat.get(v.name);
            if (op === undefined || op.protocol !== "http") {
                return v;
            }
            return Object.assign(Object.assign({}, v), { method: op.function.method, path: op.function.path, tags: op.function.tags });
        })).then(arr => (0, utils_1.uniqBy)(arr, v => v.name));
        if (toolList.length === 0) {
            return;
        }
        yield (0, select_1.selectFunction)({ ctx, toolList });
    });
    return selectorExecute;
}
function useEmbeddedContext() {
    const set = new Set();
    return {
        isEmbedded: (ctx) => set.has(JSON.stringify(ctx.operations.array)),
        setEmbedded: (ctx) => {
            set.add(JSON.stringify(ctx.operations.array));
        },
    };
}
//# sourceMappingURL=index.js.map