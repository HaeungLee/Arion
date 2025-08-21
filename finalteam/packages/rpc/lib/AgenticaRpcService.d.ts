import type { Agentica, IAgenticaController } from "@agentica/core";
import type { ILlmSchema } from "@samchon/openapi";
import type { IAgenticaRpcListener } from "./IAgenticaRpcListener";
import type { IAgenticaRpcService } from "./IAgenticaRpcService";
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
export declare class AgenticaRpcService<Model extends ILlmSchema.Model> implements IAgenticaRpcService<Model> {
    private readonly props;
    /**
     * Initializer Constructor.
     *
     * @param props Properties to construct the RPC service
     */
    constructor(props: AgenticaRpcService.IProps<Model>);
    /**
     * @inheritDoc
     */
    conversate(content: string | Parameters<typeof Agentica.prototype.conversate>[0]): Promise<void>;
    /**
     * @inheritDoc
     */
    getControllers(): Promise<IAgenticaController<Model>[]>;
}
export declare namespace AgenticaRpcService {
    /**
     * Properties of the {@link AgenticaRpcService}.
     */
    interface IProps<Model extends ILlmSchema.Model> {
        /**
         * Target agent to provide as RPC service.
         */
        agent: Agentica<Model>;
        /**
         * Listener to be binded on the agent.
         */
        listener: IAgenticaRpcListener;
    }
}
