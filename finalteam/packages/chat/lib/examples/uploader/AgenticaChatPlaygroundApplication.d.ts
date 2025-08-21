import type { ReactElement } from "react";
import React from "react";
export declare function AgenticaChatUploaderApplication(props: AgenticaChatUploaderApplication.IProps): import("react/jsx-runtime").JSX.Element;
export declare namespace AgenticaChatUploaderApplication {
    interface IProps {
        style?: React.CSSProperties;
        onError?: (error: string) => void;
        onSuccess: (element: ReactElement) => void;
    }
}
