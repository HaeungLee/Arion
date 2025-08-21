import type { ILlmSchema } from "@samchon/openapi";
import type { Database } from "better-sqlite3";
import type { IAgenticaVectorSelectorStrategy } from "..";
export interface IAgenticaSqliteVectorSelectorStrategyProps {
    db: Database;
    cohereApiKey: string;
}
export declare function configureSqliteStrategy<SchemaModel extends ILlmSchema.Model>(props: IAgenticaSqliteVectorSelectorStrategyProps): IAgenticaVectorSelectorStrategy<SchemaModel>;
