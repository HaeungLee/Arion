import type { Agentica } from "@agentica/core";
import type { ILlmSchema } from "@samchon/openapi";
export declare function AgenticaChatMovie<Model extends ILlmSchema.Model>({ agent, title, }: AgenticaChatMovie.IProps<Model>): import("react/jsx-runtime").JSX.Element;
export declare namespace AgenticaChatMovie {
    interface IProps<Model extends ILlmSchema.Model> {
        agent: Agentica<Model>;
        title?: string;
    }
}
