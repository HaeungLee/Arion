import type { AgenticaOperationSelection } from "@agentica/core";
import type { ILlmSchema } from "@samchon/openapi";
export declare function AgenticaChatSelectMessageMovie<Model extends ILlmSchema.Model>({ selection, }: AgenticaChatSelectMessageMovie.IProps<Model>): import("react/jsx-runtime").JSX.Element;
export declare namespace AgenticaChatSelectMessageMovie {
    interface IProps<Model extends ILlmSchema.Model> {
        selection: AgenticaOperationSelection<Model>;
    }
}
