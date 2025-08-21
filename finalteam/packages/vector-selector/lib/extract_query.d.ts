import type { AgenticaContext } from "@agentica/core";
import type { ILlmSchema } from "@samchon/openapi";
export declare function extractQuery<SchemaModel extends ILlmSchema.Model>(ctx: AgenticaContext<SchemaModel>): Promise<string[]>;
