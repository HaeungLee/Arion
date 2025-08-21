import type { AgenticaContext } from "@agentica/core";
import type { ILlmSchema } from "@samchon/openapi";
interface IFailure {
    id: string;
    name: string;
    validation: {
        data: string;
        errors: string[];
    };
}
export declare function selectFunction<SchemaModel extends ILlmSchema.Model>(props: {
    ctx: AgenticaContext<SchemaModel>;
    toolList: object[];
    prevFailures?: IFailure[];
    restRetry?: number;
}): Promise<void>;
export {};
