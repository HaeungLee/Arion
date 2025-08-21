import type { ILlmSchema } from "@samchon/openapi";
import type { IConnection } from "@wrtnlabs/connector-hive-api";
import type { IAgenticaVectorSelectorStrategy } from "..";
export declare function configurePostgresStrategy<SchemaModel extends ILlmSchema.Model>(connection: IConnection<object | undefined>): IAgenticaVectorSelectorStrategy<SchemaModel>;
