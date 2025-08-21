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
exports.configureSqliteStrategy = configureSqliteStrategy;
const cohere_ai_1 = require("cohere-ai");
const sqlite_vec_1 = require("sqlite-vec");
const utils_1 = require("../utils");
const retry = (0, utils_1.getRetry)(3);
const hashMemo = new Map();
function configureSqliteStrategy(props) {
    const { db, cohereApiKey } = props;
    (0, sqlite_vec_1.load)(db);
    const cohere = new cohere_ai_1.CohereClientV2({
        token: cohereApiKey,
    });
    db.exec(`
    CREATE TABLE IF NOT EXISTS _agentica_vector_selector_embeddings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hash TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      vector BLOB NOT NULL
    )
  `);
    function embed(text, inputType) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield retry(() => __awaiter(this, void 0, void 0, function* () {
                return cohere.embed({
                    texts: [text],
                    inputType,
                    model: "embed-multilingual-light-v3.0",
                    embeddingTypes: ["float"],
                });
            }));
            if ((result.embeddings.float == null) || result.embeddings.float.length === 0) {
                throw new Error("no float embeddings returned");
            }
            const vector = result.embeddings.float[0];
            return vector;
        });
    }
    // it's memoized to avoid generating the same hash for the same context
    // if you know react, it's like useMemo
    const getHash = (ctx) => {
        if (hashMemo.has(ctx)) {
            return hashMemo.get(ctx);
        }
        const hash = (0, utils_1.generateHashFromCtx)(ctx);
        hashMemo.set(ctx, hash);
        return hash;
    };
    // embed each operation in the context.opersation.array
    function embedOperation(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = props.operation.function.name;
            const embedding = yield retry(() => __awaiter(this, void 0, void 0, function* () { var _a; return embed((_a = props.operation.function.description) !== null && _a !== void 0 ? _a : name, "search_document"); }));
            db
                .prepare("INSERT INTO _agentica_vector_selector_embeddings (hash, name, description, vector) VALUES (?, ?, ?, vec_f32(?))")
                .run(props.hash, name, props.operation.function.description, JSON.stringify(embedding));
        });
    }
    function embedContext(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = getHash(props.ctx);
            const prepared = db.prepare(`SELECT name FROM _agentica_vector_selector_embeddings WHERE hash = ?`).all(hash);
            if (prepared.length > 0) {
                props.setEmbedded();
                return;
            }
            yield (0, utils_1.groupByArray)(props.ctx.operations.array, 10).reduce((accPromise, cur) => __awaiter(this, void 0, void 0, function* () {
                yield accPromise;
                yield Promise.all(cur.map((v) => __awaiter(this, void 0, void 0, function* () { return embedOperation({ hash, operation: v }); })));
                return Promise.resolve();
            }), Promise.resolve());
            props.setEmbedded();
        });
    }
    function searchTool(ctx, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = getHash(ctx);
            const vector = yield embed(query, "search_query");
            const result = db.prepare(`
        SELECT name, description, vec_distance_L2(vector, ?) as distance
        FROM _agentica_vector_selector_embeddings
        WHERE hash = ?
        ORDER BY distance
        LIMIT 10
    `).all(JSON.stringify(vector), hash);
            return result;
        });
    }
    return {
        searchTool,
        embedContext,
    };
}
//# sourceMappingURL=sqlite.strategy.js.map