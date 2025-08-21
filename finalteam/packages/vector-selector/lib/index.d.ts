import type { AgenticaContext } from "@agentica/core";
import type { ILlmSchema } from "@samchon/openapi";
export interface IAgenticaVectorSelectorBootProps<SchemaModel extends ILlmSchema.Model> {
    strategy: IAgenticaVectorSelectorStrategy<SchemaModel>;
}
export interface IAgenticaVectorSelectorStrategy<SchemaModel extends ILlmSchema.Model> {
    searchTool: (ctx: AgenticaContext<SchemaModel>, query: string) => Promise<{
        name: string;
        description: string | undefined;
    }[]>;
    embedContext: (props: {
        ctx: AgenticaContext<SchemaModel>;
        setEmbedded: () => void;
    }) => Promise<void>;
}
export declare function BootAgenticaVectorSelector<SchemaModel extends ILlmSchema.Model>(props: IAgenticaVectorSelectorBootProps<SchemaModel>): (ctx: AgenticaContext<SchemaModel>) => Promise<void>;
export declare function useEmbeddedContext<SchemaModel extends ILlmSchema.Model>(): {
    readonly isEmbedded: (ctx: AgenticaContext<SchemaModel>) => boolean;
    readonly setEmbedded: (ctx: AgenticaContext<SchemaModel>) => void;
};
