import type { ILlmSchema } from "@samchon/openapi";
import type OpenAI from "openai";
export declare function BbsChatApplication(props: BbsChatApplication.IProps): import("react/jsx-runtime").JSX.Element;
export declare namespace BbsChatApplication {
    interface IProps {
        api: OpenAI;
        vendorModel: string;
        schemaModel: ILlmSchema.Model;
        locale?: string;
        timezone?: string;
    }
}
