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
exports.configurePostgresStrategy = configurePostgresStrategy;
const connector_hive_api_1 = require("@wrtnlabs/connector-hive-api");
const utils_1 = require("../utils");
const retry = (0, utils_1.getRetry)(3);
const filterMap = new Map();
function searchTool(connection) {
    return (ctx, query) => __awaiter(this, void 0, void 0, function* () {
        const filter = filterMap.get(JSON.stringify(ctx.operations.array));
        return retry(() => __awaiter(this, void 0, void 0, function* () {
            return connector_hive_api_1.functional.connector_retrievals.createRetrievalRequest(connection, {
                query,
                limit: 10,
                filter,
            });
        }));
    });
}
function embedOperation(connection) {
    return (controllerName, opList) => __awaiter(this, void 0, void 0, function* () {
        const application = yield retry(() => __awaiter(this, void 0, void 0, function* () {
            return connector_hive_api_1.functional.applications.create(connection, {
                name: controllerName,
                description: undefined,
            });
        })).catch((e) => __awaiter(this, void 0, void 0, function* () {
            if (!(e instanceof connector_hive_api_1.HttpError)) {
                throw e;
            }
            if (e.status !== 409) {
                throw e;
            }
            return retry(() => __awaiter(this, void 0, void 0, function* () {
                return connector_hive_api_1.functional.applications.by_names.getByName(connection, controllerName);
            }));
        }));
        const version = yield retry(() => __awaiter(this, void 0, void 0, function* () {
            return connector_hive_api_1.functional.applications.by_ids.versions.create(connection, application.id, {});
        }));
        // concurrency request count
        yield (0, utils_1.groupByArray)(opList, 10).reduce((accPromise, cur) => __awaiter(this, void 0, void 0, function* () {
            yield accPromise;
            yield Promise.all(cur.map((v) => __awaiter(this, void 0, void 0, function* () {
                return retry(() => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    return connector_hive_api_1.functional.application_versions.by_ids.connectors.create(connection, version.id, { name: v.name, description: (_a = v.function.description) !== null && _a !== void 0 ? _a : "" });
                }));
            })));
            return Promise.resolve();
        }), Promise.resolve());
        return { version, applicationId: application.id };
    });
}
function embedContext(connection) {
    return (props) => __awaiter(this, void 0, void 0, function* () {
        const { ctx, setEmbedded } = props;
        const filter = yield Promise.all(Array.from(ctx.operations.group.entries()).map((_a) => __awaiter(this, [_a], void 0, function* ([key, value]) {
            const result = yield embedOperation(connection)(key, Array.from(value.values()));
            return {
                id: result.applicationId,
                version: result.version.version,
                type: "byId",
            };
        })));
        filterMap.set(JSON.stringify(ctx.operations.array), {
            applications: filter,
        });
        setEmbedded();
    });
}
function configurePostgresStrategy(connection) {
    return {
        searchTool: searchTool(connection),
        embedContext: embedContext(connection),
    };
}
//# sourceMappingURL=postgres.strategy.js.map