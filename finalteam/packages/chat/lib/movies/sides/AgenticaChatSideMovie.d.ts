import type { AgenticaOperationSelection, AgenticaTokenUsage, IAgenticaConfig, IAgenticaVendor } from "@agentica/core";
import type { ILlmSchema } from "@samchon/openapi";
export declare function AgenticaChatSideMovie<Model extends ILlmSchema.Model>(props: AgenticaChatSideMovie.IProps<Model>): import("react/jsx-runtime").JSX.Element;
export declare namespace AgenticaChatSideMovie {
    interface IProps<Model extends ILlmSchema.Model> {
        vendor: IAgenticaVendor;
        config: IAgenticaConfig<Model> | undefined;
        usage: AgenticaTokenUsage;
        selections: AgenticaOperationSelection<Model>[];
        error: Error | null;
    }
}
