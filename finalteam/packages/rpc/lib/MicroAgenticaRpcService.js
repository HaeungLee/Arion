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
exports.MicroAgenticaRpcService = void 0;
/**
 * RPC service for the {@link MicroAgentica}.
 *
 * `MicroAgenticaRpcService` is class defining an AI agent service
 * provided from the server to clients through the RPC (Remote Procedure Call)
 * paradigm in the websocket protocol.
 *
 * Client connecting to the `MicroAgenticaRpcService` providing websocket server
 * will call the {@link conversate} function remotely through its basic
 * interface type {@link IAgenticaRpcService} with the RPC paradigm.
 *
 * Also, the client provides the {@link IMicroAgenticaRpcListener} type to the
 * server, so that `MicroAgenticaRpcService` will remotely call the
 * {@link IMicroAgenticaRpcListener listener}'s functions internally.
 *
 * You can open the WebSocket server of the AI agent like below:
 *
 * ```typescript
 * import {
 *   IMicroAgenticaRpcListener,
 *   IAgenticaRpcService,
 *   Agentica,
 *   MicroAgenticaRpcService,
 * } from "@agentica/core";
 * import { WebSocketServer } from "tgrid";
 *
 * const server: WebSocketServer<
 *   null,
 *   IAgenticaRpcService,
 *   IMicroAgenticaRpcListener
 * > = new WebSocketServer();
 * await server.open(3001, async (acceptor) => {
 *   await acceptor.accept(
 *     new MicroAgenticaRpcService({
 *       agent: new MicroAgentica({ ... }),
 *       listener: acceptor.getDriver(),
 *     }),
 *   );
 * });
 * ```
 *
 * @author Samchon
 */
class MicroAgenticaRpcService {
    /**
     * Initializer Constructor.
     *
     * @param props Properties to construct the RPC service
     */
    constructor(props) {
        this.props = props;
        const { agent, listener } = props;
        // ESSENTIAL LISTENERS
        agent.on("userMessage", (evt) => __awaiter(this, void 0, void 0, function* () {
            listener.userMessage(evt.toJSON()).catch(() => { });
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
exports.MicroAgenticaRpcService = MicroAgenticaRpcService;
//# sourceMappingURL=MicroAgenticaRpcService.js.map