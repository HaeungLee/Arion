import type { AgenticaDescribeHistory } from "@agentica/core";
import type { ILlmSchema } from "@samchon/openapi";
export declare function AgenticaChatDescribeMessageMovie<Model extends ILlmSchema.Model>({ history, }: AgenticaChatDescribeMessageMovie.IProps<Model>): import("react/jsx-runtime").JSX.Element;
export declare namespace AgenticaChatDescribeMessageMovie {
    interface IProps<Model extends ILlmSchema.Model> {
        history: AgenticaDescribeHistory<Model>;
    }
}
