import type { ILlmSchema } from "@samchon/openapi";
export declare function VendorConfigurationMovie(props: VendorConfigurationMovie.IProps): import("react/jsx-runtime").JSX.Element;
export declare namespace VendorConfigurationMovie {
    interface IProps {
        config: IConfig;
        onChange: (config: IConfig) => void;
    }
    interface IConfig {
        schemaModel: ILlmSchema.Model;
        vendorModel: string;
        apiKey: string;
        baseURL?: string | undefined;
    }
    function defaultConfig(): IConfig;
}
