import type { AgenticaExecuteHistory } from "@agentica/core";
import type { ILlmSchema } from "@samchon/openapi";
export declare function AgenticaChatExecuteMessageMovie<Model extends ILlmSchema.Model>({ execute, }: AgenticaChatExecuteMessageMovie.IProps<Model>): import("react/jsx-runtime").JSX.Element;
export declare namespace AgenticaChatExecuteMessageMovie {
    interface IProps<Model extends ILlmSchema.Model> {
        execute: AgenticaExecuteHistory<Model>;
    }
}
