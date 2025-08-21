import type { AgenticaOperationSelection } from "@agentica/core";
import type { ILlmSchema } from "@samchon/openapi";
export declare function AgenticaChatFunctionStackSideMovie<Model extends ILlmSchema.Model>(props: AgenticaChatFunctionStackSideMovie.IProps<Model>): import("react/jsx-runtime").JSX.Element;
export declare namespace AgenticaChatFunctionStackSideMovie {
    interface IProps<Model extends ILlmSchema.Model> {
        selections: AgenticaOperationSelection<Model>[];
    }
}
