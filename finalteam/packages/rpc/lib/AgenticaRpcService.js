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
exports.AgenticaRpcService = void 0;
/**
 * RPC service for the {@link Agentica}.
 *
 * `AgenticaRpcService` is class defining an AI agent service
 * provided from the server to clients through the RPC (Remote Procedure Call)
 * paradigm in the websocket protocol.
 *
 * Client connecting to the `AgenticaRpcService` providing websocket server
 * will call the {@link conversate} function remotely through its basic
 * interface type {@link IAgenticaRpcService} with the RPC paradigm.
 *
 * Also, the client provides the {@link IAgenticaRpcListener} type to the
 * server, so that `AgenticaRpcService` will remotely call the
 * {@link IAgenticaRpcListener listener}'s functions internally.
 *
 * You can open the WebSocket server of the AI agent like below:
 *
 * ```typescript
 * import {
 *   IAgenticaRpcListener,
 *   IAgenticaRpcService,
 *   Agentica,
 *   AgenticaRpcService,
 * } from "@agentica/core";
 * import { WebSocketServer } from "tgrid";
 *
 * const server: WebSocketServer<
 *   null,
 *   IAgenticaRpcService,
 *   IAgenticaRpcListener
 * > = new WebSocketServer();
 * await server.open(3001, async (acceptor) => {
 *   await acceptor.accept(
 *     new AgenticaRpcService({
 *       agent: new Agentica({ ... }),
 *       listener: acceptor.getDriver(),
 *     }),
 *   );
 * });
 * ```
 *
 * @author Samchon
 */
class AgenticaRpcService {
    /**
     * Initializer Constructor.
     *
     * @param props Properties to construct the RPC service
     */
    constructor(props) {
        this.props = props;
        const { agent, listener } = props;
        // ESSENTIAL LISTENERS
        agent.on("userMessage", (event) => __awaiter(this, void 0, void 0, function* () {
            listener.userMessage(event.toJSON()).catch(() => { });
        }));
        agent.on("assistantMessage", (evt) => __awaiter(this, void 0, void 0, function* () {
            yield evt.join();
            listener.assistantMessage(evt.toJSON()).catch(() => { });
        }));
        agent.on("describe", (evt) => __awaiter(this, void 0, void 0, function* () {
            yield evt.join();
            listener.describe(evt.toJSON()).catch(() => { });
        }));
        // OPTIONAL LISTENERS
        agent.on("initialize", (evt) => __awaiter(this, void 0, void 0, function* () {
            listener.initialize(evt.toJSON()).catch(() => { });
        }));
        agent.on("select", (evt) => __awaiter(this, void 0, void 0, function* () {
            listener.select(evt.toJSON()).catch(() => { });
        }));
        agent.on("cancel", (evt) => __awaiter(this, void 0, void 0, function* () {
            listener.cancel(evt.toJSON()).catch(() => { });
        }));
        agent.on("call", (evt) => __awaiter(this, void 0, void 0, function* () {
            const args = yield listener.call(evt.toJSON());
            if (args != null) {
                evt.arguments = args;
            }
        }));
        agent.on("execute", (evt) => __awaiter(this, void 0, void 0, function* () {
            listener.execute(evt.toJSON()).catch(() => { });
        }));
    }
    /**
     * @inheritDoc
     */
    conversate(content) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.props.agent.conversate(content);
        });
    }
    /**
     * @inheritDoc
     */
    getControllers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.props.agent.getControllers();
        });
    }
}
exports.AgenticaRpcService = AgenticaRpcService;
//# sourceMappingURL=AgenticaRpcService.js.map