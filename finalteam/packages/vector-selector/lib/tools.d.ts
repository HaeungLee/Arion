export declare const Tools: {
    readonly extract_query: {
        readonly type: "function";
        readonly function: {
            readonly name: "extract_search_query";
            readonly description: "extract search query from user message\n";
            readonly parameters: {
                readonly type: "object";
                readonly properties: {
                    readonly query_list: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly properties: {
                                readonly reason: {
                                    readonly type: "string";
                                    readonly description: "The reason of the query selection.\n\nJust write the reason why you've determined to select this query.";
                                };
                                readonly query: {
                                    readonly type: "string";
                                    readonly description: "the search query";
                                };
                            };
                            readonly required: readonly ["reason", "query"];
                        };
                    };
                };
                readonly required: readonly ["query_list"];
            };
        };
    };
    readonly select_functions: {
        readonly type: "function";
        readonly function: {
            readonly name: "select_functions";
            readonly description: "Select proper API functions to call.\n\nIf you A.I. agent has found some proper API functions to call\nfrom the conversation with user, please select the API functions\njust by calling this function.\n\nWhen user wants to call a same function multiply, you A.I. agent must\nlist up it multiply in the `functions` property. Otherwise the user has\nrequested to call many different functions, you A.I. agent have to assign\nthem all into the `functions` property.\n\nAlso, if you A.I. agent can't specify a specific function to call due to lack\nof specificity or homogeneity of candidate functions, just assign all of them\nby in the `functions` property too. Instead, when you A.I. agent can specify\na specific function to call, the others would be eliminated.\n\n@example\n```json\n[\n  {\n    \"reason\": \"The user wants to call the function multiply.\",\n    \"function_name\": \"get_user_info\"\n  },\n  {\n    \"reason\": \"The user wants to modify the user info.\",\n    \"function_name\": \"modify_user_info\"\n  }\n]\n```\n";
            readonly parameters: {
                readonly type: "object";
                readonly properties: {
                    readonly function_list: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly properties: {
                                readonly reason: {
                                    readonly type: "string";
                                    readonly description: "The reason of the function selection.\n\nJust write the reason why you've determined to select this function.";
                                };
                                readonly function_name: {
                                    readonly type: "string";
                                    readonly description: "Name of the target function to call.";
                                };
                            };
                            readonly required: readonly ["reason", "function_name"];
                        };
                    };
                };
                readonly required: readonly ["function_list"];
            };
        };
    };
};
