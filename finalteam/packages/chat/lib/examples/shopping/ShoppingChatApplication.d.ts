import type { IHttpConnection, ILlmSchema } from "@samchon/openapi";
import type OpenAI from "openai";
export declare function ShoppingChatApplication(props: ShoppingChatApplication.IProps): import("react/jsx-runtime").JSX.Element;
export declare namespace ShoppingChatApplication {
    interface IProps {
        api: OpenAI;
        vendorModel: string;
        schemaModel: ILlmSchema.Model;
        connection: IHttpConnection;
        name: string;
        mobile: string;
        locale?: string;
    }
}
