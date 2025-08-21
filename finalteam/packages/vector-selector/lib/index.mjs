import { factory, utils } from "@agentica/core";

import { AgenticaDefaultPrompt } from "@agentica/core/src/constants/AgenticaDefaultPrompt";

import { AgenticaSystemPrompt } from "@agentica/core/src/constants/AgenticaSystemPrompt";

import "@noble/hashes/sha2";

import "@noble/hashes/utils";

const Tools = {
    extract_query: {
        type: "function",
        function: {
            name: "extract_search_query",
            description: "extract search query from user message\n",
            parameters: {
                type: "object",
                properties: {
                    query_list: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                reason: {
                                    type: "string",
                                    description: "The reason of the query selection.\n\nJust write the reason why you've determined to select this query."
                                },
                                query: {
                                    type: "string",
                                    description: "the search query"
                                }
                            },
                            required: [ "reason", "query" ]
                        }
                    }
                },
                required: [ "query_list" ]
            }
        }
    },
    select_functions: {
        type: "function",
        function: {
            name: "select_functions",
            description: `Select proper API functions to call.\n\nIf you A.I. agent has found some proper API functions to call\nfrom the conversation with user, please select the API functions\njust by calling this function.\n\nWhen user wants to call a same function multiply, you A.I. agent must\nlist up it multiply in the \`functions\` property. Otherwise the user has\nrequested to call many different functions, you A.I. agent have to assign\nthem all into the \`functions\` property.\n\nAlso, if you A.I. agent can't specify a specific function to call due to lack\nof specificity or homogeneity of candidate functions, just assign all of them\nby in the \`functions\` property too. Instead, when you A.I. agent can specify\na specific function to call, the others would be eliminated.\n\n@example\n\`\`\`json\n[\n  {\n    "reason": "The user wants to call the function multiply.",\n    "function_name": "get_user_info"\n  },\n  {\n    "reason": "The user wants to modify the user info.",\n    "function_name": "modify_user_info"\n  }\n]\n\`\`\`\n`,
            parameters: {
                type: "object",
                properties: {
                    function_list: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                reason: {
                                    type: "string",
                                    description: "The reason of the function selection.\n\nJust write the reason why you've determined to select this function."
                                },
                                function_name: {
                                    type: "string",
                                    description: "Name of the target function to call."
                                }
                            },
                            required: [ "reason", "function_name" ]
                        }
                    }
                },
                required: [ "function_list" ]
            }
        }
    }
};

async function extractQuery(ctx) {
    const completionStream = await ctx.request("select", {
        messages: [ {
            role: "system",
            content: [ "You are a function searcher. You will extract search queries from the user's message, and the query results will be function names.", "A query is a 2–3 sentence description of the action the user needs to perform.", "Therefore, the extracted queries must be suitable for function search.", "You need to identify the actions required to achieve what the user wants and extract queries that can be used to search for those actions.", "Extract only one query per task." ].join("\n")
        }, ...ctx.histories.map(factory.decodeHistory).flat(), {
            role: "user",
            content: ctx.prompt.contents.map(factory.decodeUserMessageContent)
        } ],
        tool_choice: "required",
        tools: [ Tools.extract_query ]
    });
    const chunks = await utils.StreamUtil.readAll(completionStream);
    const completion = utils.ChatGptCompletionMessageUtil.merge(chunks);
    const queries = completion.choices[0]?.message.tool_calls?.flatMap((v => {
        const arg = JSON.parse(v.function.arguments);
        if (!Array.isArray(arg.query_list)) {
            return [];
        }
        return arg.query_list.map((v => v.query));
    })) ?? [];
    return queries;
}

async function selectFunction(props) {
    const {ctx, toolList, prevFailures = [], restRetry = 5} = props;
    const selectCompletion = await ctx.request("select", {
        messages: [ {
            role: "system",
            content: AgenticaDefaultPrompt.write(ctx.config)
        }, {
            role: "assistant",
            tool_calls: [ {
                type: "function",
                id: "getApiFunctions",
                function: {
                    name: "getApiFunctions",
                    arguments: JSON.stringify({})
                }
            } ]
        }, {
            role: "tool",
            tool_call_id: "getApiFunctions",
            content: JSON.stringify(toolList)
        }, ...ctx.histories.flatMap(factory.decodeHistory), {
            role: "user",
            content: ctx.prompt.contents.map(factory.decodeUserMessageContent)
        }, {
            role: "system",
            content: `${ctx.config?.systemPrompt?.select?.(ctx.histories) ?? AgenticaSystemPrompt.SELECT}\n          \n        \n        When selecting functions, consider what the user can call from their perspective, and choose all the functions necessary to accomplish the task.\n        Select them in a logical sequence, taking into account the relationships between each function.\n        `
        }, ...emendMessages(prevFailures) ],
        tool_choice: {
            type: "function",
            function: {
                name: "select_functions"
            }
        },
        parallel_tool_calls: false,
        tools: [ Tools.select_functions ]
    }).then((async v => utils.StreamUtil.readAll(v))).then(utils.ChatGptCompletionMessageUtil.merge);
    const toolCalls = selectCompletion.choices.filter((v => v.message.tool_calls != null));
    if (toolCalls.length === 0) {
        selectCompletion.choices.forEach((v => {
            if (v.message.content != null && v.message.content !== "") {
                const event = factory.creatAssistantMessageEvent({
                    stream: utils.toAsyncGenerator(v.message.content),
                    done: () => true,
                    get: () => v.message.content,
                    join: async () => v.message.content
                });
                ctx.dispatch(event);
            }
        }));
    }
    const failures = toolCalls.reduce(((acc, cur) => {
        cur.message.tool_calls?.forEach((tc => {
            const errors = [];
            const arg = JSON.parse(tc.function.arguments);
            if (!Array.isArray(arg)) {
                errors.push(JSON.stringify({
                    path: "$input",
                    expected: "array",
                    value: arg
                }));
                return;
            }
            arg.forEach(((v, idx) => {
                if (v.reason == null || typeof v.reason !== "string") {
                    errors.push(JSON.stringify({
                        path: `$$input[${idx}].reason`,
                        expected: "string",
                        value: v.reason
                    }));
                }
                if (v.function_name == null || typeof v.function_name !== "string") {
                    errors.push(JSON.stringify({
                        path: `$$input[${idx}].function_name`,
                        expected: "string",
                        value: v.function_name
                    }));
                }
            }));
            if (errors.length !== 0) {
                acc.push({
                    id: tc.id,
                    name: tc.function.name,
                    validation: {
                        data: tc.function.arguments,
                        errors
                    }
                });
            }
        }));
        return acc;
    }), []);
    if (failures.length !== 0) {
        const feedback = [ ...prevFailures, ...failures ];
        if (restRetry === 0) {
            throw new Error(`Failed to select function after ${restRetry} retries\n${JSON.stringify(feedback)}`);
        }
        return selectFunction({
            ctx,
            toolList,
            prevFailures: feedback,
            restRetry: restRetry - 1
        });
    }
    toolCalls.forEach((v => {
        v.message.tool_calls.forEach((tc => {
            const arg = JSON.parse(tc.function.arguments);
            arg.function_list.forEach((v => {
                const operation = ctx.operations.flat.get(v.function_name);
                if (operation === undefined) {
                    return;
                }
                const selection = factory.createOperationSelection({
                    reason: v.reason,
                    operation
                });
                ctx.stack.push(selection);
                ctx.dispatch(factory.createSelectEvent({
                    selection
                }));
            }));
        }));
    }));
}

function emendMessages(failures) {
    return failures.flatMap((f => [ {
        role: "assistant",
        tool_calls: [ {
            type: "function",
            id: f.id,
            function: {
                name: f.name,
                arguments: JSON.stringify(f.validation.data)
            }
        } ]
    }, {
        role: "tool",
        content: JSON.stringify(f.validation.errors),
        tool_call_id: f.id
    }, {
        role: "system",
        content: [ "You A.I. assistant has composed wrong typed arguments.", "", "Correct it at the next function calling." ].join("\n")
    } ]));
}

function uniqBy(array, selector) {
    const seen = new Set;
    return array.filter((item => {
        const key = selector(item);
        if (seen.has(key)) {
            return false;
        }
        seen.add(key);
        return true;
    }));
}

function BootAgenticaVectorSelector(props) {
    const {isEmbedded, setEmbedded} = useEmbeddedContext();
    const {searchTool, embedContext} = props.strategy;
    const selectorExecute = async ctx => {
        if (!isEmbedded(ctx)) {
            await embedContext({
                ctx,
                setEmbedded: () => setEmbedded(ctx)
            });
        }
        const queries = await extractQuery(ctx);
        const toolList = await Promise.all(queries.map((async query => searchTool(ctx, query)))).then((res => res.flat().map((v => {
            const op = ctx.operations.flat.get(v.name);
            if (op === undefined || op.protocol !== "http") {
                return v;
            }
            return {
                ...v,
                method: op.function.method,
                path: op.function.path,
                tags: op.function.tags
            };
        })))).then((arr => uniqBy(arr, (v => v.name))));
        if (toolList.length === 0) {
            return;
        }
        await selectFunction({
            ctx,
            toolList
        });
    };
    return selectorExecute;
}

function useEmbeddedContext() {
    const set = new Set;
    return {
        isEmbedded: ctx => set.has(JSON.stringify(ctx.operations.array)),
        setEmbedded: ctx => {
            set.add(JSON.stringify(ctx.operations.array));
        }
    };
}

export { BootAgenticaVectorSelector, useEmbeddedContext };
//# sourceMappingURL=index.mjs.map
