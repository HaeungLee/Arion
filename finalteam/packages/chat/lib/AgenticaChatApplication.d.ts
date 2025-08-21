import type { Agentica } from "@agentica/core";
import type { ILlmSchema } from "@samchon/openapi";
export declare function AgenticaChatApplication<Model extends ILlmSchema.Model>(props: AgenticaChatApplication.IProps<Model>): import("react/jsx-runtime").JSX.Element;
export declare namespace AgenticaChatApplication {
    interface IProps<Model extends ILlmSchema.Model> {
        agent: Agentica<Model>;
        title?: string;
    }
}
