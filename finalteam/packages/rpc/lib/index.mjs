class AgenticaRpcService {
    constructor(props) {
        this.props = props;
        const {agent, listener} = props;
        agent.on("userMessage", (async event => {
            listener.userMessage(event.toJSON()).catch((() => {}));
        }));
        agent.on("assistantMessage", (async evt => {
            await evt.join();
            listener.assistantMessage(evt.toJSON()).catch((() => {}));
        }));
        agent.on("describe", (async evt => {
            await evt.join();
            listener.describe(evt.toJSON()).catch((() => {}));
        }));
        agent.on("initialize", (async evt => {
            listener.initialize(evt.toJSON()).catch((() => {}));
        }));
        agent.on("select", (async evt => {
            listener.select(evt.toJSON()).catch((() => {}));
        }));
        agent.on("cancel", (async evt => {
            listener.cancel(evt.toJSON()).catch((() => {}));
        }));
        agent.on("call", (async evt => {
            const args = await listener.call(evt.toJSON());
            if (args != null) {
                evt.arguments = args;
            }
        }));
        agent.on("execute", (async evt => {
            listener.execute(evt.toJSON()).catch((() => {}));
        }));
    }
    async conversate(content) {
        await this.props.agent.conversate(content);
    }
    async getControllers() {
        return this.props.agent.getControllers();
    }
}

class MicroAgenticaRpcService {
    constructor(props) {
        this.props = props;
        const {agent, listener} = props;
        agent.on("userMessage", (async evt => {
            listener.userMessage(evt.toJSON()).catch((() => {}));
        }));
        agent.on("assistantMessage", (async evt => {
            await evt.join();
            listener.assistantMessage(evt.toJSON()).catch((() => {}));
        }));
        agent.on("describe", (async evt => {
            await evt.join();
            listener.describe(evt.toJSON()).catch((() => {}));
        }));
        agent.on("call", (async evt => {
            const args = await listener.call(evt.toJSON());
            if (args != null) {
                evt.arguments = args;
            }
        }));
        agent.on("execute", (async evt => {
            listener.execute(evt.toJSON()).catch((() => {}));
        }));
    }
    async conversate(content) {
        await this.props.agent.conversate(content);
    }
    async getControllers() {
        return this.props.agent.getControllers();
    }
}

export { AgenticaRpcService, MicroAgenticaRpcService };
//# sourceMappingURL=index.mjs.map
