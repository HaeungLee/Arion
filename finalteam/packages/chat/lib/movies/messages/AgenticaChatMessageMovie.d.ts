import type { AgenticaHistory } from "@agentica/core";
import type { ILlmSchema } from "@samchon/openapi";
export declare function AgenticaChatMessageMovie<Model extends ILlmSchema.Model>({ prompt, }: AgenticaChatMessageMovie.IProps<Model>): import("react/jsx-runtime").JSX.Element | null;
export declare namespace AgenticaChatMessageMovie {
    interface IProps<Model extends ILlmSchema.Model> {
        prompt: AgenticaHistory<Model>;
    }
}
