import { jsx, jsxs, Fragment } from "react/jsx-runtime";

import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import SendIcon from "@mui/icons-material/Send";

import { Card, CardContent, Chip, Typography, CardActions, Button, Collapse, Accordion, AccordionSummary, AccordionDetails, Table, TableHead, TableRow, TableCell, TableBody, useTheme, useMediaQuery, AppBar, Toolbar, IconButton, Drawer, Input, Container } from "@mui/material";

import { toPng } from "html-to-image";

import React, { useState, useRef, useEffect } from "react";

import SmartToyIcon from "@mui/icons-material/SmartToy";

import Markdown from "react-markdown";

import rehypeRaw from "rehype-raw";

import rehypeStringify from "rehype-stringify";

import remarkMermaidPlugin from "remark-mermaid-plugin";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import GradingIcon from "@mui/icons-material/Grading";

import FaceIcon from "@mui/icons-material/Face";

function MarkdownViewer(props) {
    return jsx(Markdown, {
        remarkPlugins: [ remarkMermaidPlugin ],
        rehypePlugins: [ rehypeRaw, rehypeStringify ],
        components: {
            img: ({...props}) => jsx("img", {
                ...props,
                style: {
                    display: "block",
                    maxWidth: "100%",
                    height: "auto"
                }
            })
        },
        children: props.children
    });
}

function AgenticaChatAssistantMessageMovie({prompt}) {
    return jsx("div", {
        style: {
            display: "flex",
            justifyContent: "flex-start"
        },
        children: jsx(Card, {
            elevation: 3,
            style: {
                marginTop: 15,
                marginBottom: 15,
                marginRight: "15%",
                textAlign: "left"
            },
            children: jsxs(CardContent, {
                children: [ jsx(Chip, {
                    icon: jsx(SmartToyIcon, {}),
                    label: "Assistant",
                    variant: "outlined",
                    color: "success"
                }), jsx(MarkdownViewer, {
                    children: prompt.text
                }) ]
            })
        })
    });
}

function AgenticaChatExecuteMessageMovie({execute}) {
    return jsxs(React.Fragment, {
        children: [ jsxs(Typography, {
            variant: "h5",
            children: [ " ", getTitle(execute), " " ]
        }), jsx("hr", {}), jsx(Typography, {
            variant: "h6",
            children: " Description "
        }), jsx(MarkdownViewer, {
            children: execute.operation.function.description
        }), jsx("br", {}), jsx(Typography, {
            variant: "h6",
            children: " Arguments "
        }), jsx(MarkdownViewer, {
            children: [ "```json", JSON.stringify(execute.arguments, null, 2), "```" ].join("\n")
        }), jsx("br", {}), jsx(Typography, {
            variant: "h6",
            children: " Return Value "
        }), jsx(MarkdownViewer, {
            children: [ "```json", JSON.stringify(execute.value, null, 2), "```" ].join("\n")
        }) ]
    });
}

function getTitle(exec) {
    return exec.operation.protocol === "http" ? `${exec.operation.function.method.toUpperCase()} ${exec.operation.function.path}` : exec.operation.function.name;
}

function AgenticaChatDescribeMessageMovie({history}) {
    const [expanded, setExpanded] = useState(false);
    return jsxs(Card, {
        elevation: 3,
        style: {
            marginTop: 15,
            marginBottom: 15,
            marginRight: "15%"
        },
        children: [ jsxs(CardContent, {
            children: [ jsx(Chip, {
                label: "Function Describer",
                variant: "outlined",
                color: "secondary"
            }), jsx(MarkdownViewer, {
                children: history.text
            }) ]
        }), jsx(CardActions, {
            style: {
                textAlign: "right"
            },
            children: jsx(Button, {
                startIcon: jsx(ExpandMoreIcon, {
                    style: {
                        transform: `rotate(${expanded ? 180 : 0}deg)`
                    }
                }),
                onClick: () => setExpanded(!expanded),
                children: expanded ? "Hide Function Calls" : "Show Function Calls"
            })
        }), jsx(Collapse, {
            in: expanded,
            timeout: "auto",
            unmountOnExit: true,
            children: jsx(CardContent, {
                children: history.executes.map((execute => jsx(AgenticaChatExecuteMessageMovie, {
                    execute
                })))
            })
        }) ]
    });
}

function AgenticaChatSelectMessageMovie({selection}) {
    const [expanded, setExpanded] = useState(false);
    return jsxs(Card, {
        elevation: 3,
        style: {
            marginTop: 15,
            marginBottom: 15,
            marginRight: "15%"
        },
        children: [ jsxs(CardContent, {
            children: [ jsx(Chip, {
                icon: jsx(GradingIcon, {}),
                label: "Function Selector",
                variant: "outlined",
                color: "warning"
            }), jsx("br", {}), jsx("br", {}), "Operation:", selection.operation.protocol === "http" ? jsxs("ul", {
                children: [ jsx("li", {
                    children: selection.operation.function.method.toUpperCase()
                }), jsx("li", {
                    children: selection.operation.function.path
                }) ]
            }) : jsx("ul", {
                children: jsx("li", {
                    children: selection.operation.function.name
                })
            }), jsx(MarkdownViewer, {
                children: selection.reason
            }) ]
        }), jsx(CardActions, {
            style: {
                textAlign: "right"
            },
            children: jsx(Button, {
                onClick: () => setExpanded(!expanded),
                children: expanded ? "Hide Function Description" : "Show Function Description"
            })
        }), jsx(Collapse, {
            in: expanded,
            timeout: "auto",
            unmountOnExit: true,
            children: jsx(CardContent, {
                children: jsx(MarkdownViewer, {
                    children: selection.operation.function.description
                })
            })
        }) ]
    });
}

function AgenticaChatSystemMessageMovie({prompt}) {
    return jsx("div", {
        style: {
            display: "flex",
            justifyContent: "flex-start"
        },
        children: jsx(Card, {
            elevation: 3,
            style: {
                marginTop: 15,
                marginBottom: 15,
                marginRight: "15%",
                textAlign: "left"
            },
            children: jsxs(CardContent, {
                children: [ jsx(Chip, {
                    icon: jsx(SmartToyIcon, {}),
                    label: "System",
                    variant: "outlined",
                    color: "success"
                }), jsx(MarkdownViewer, {
                    children: prompt.text
                }) ]
            })
        })
    });
}

function AgenticaChatUserMessageMovie({prompt}) {
    return jsx("div", {
        style: {
            display: "flex",
            justifyContent: "flex-end"
        },
        children: prompt.contents.map(((content, index) => content.type === "text" ? jsx(Card, {
            elevation: 3,
            style: {
                marginTop: 15,
                marginBottom: 15,
                marginLeft: "15%",
                textAlign: "right",
                backgroundColor: "lightyellow"
            },
            children: jsxs(CardContent, {
                children: [ jsx(Chip, {
                    icon: jsx(FaceIcon, {}),
                    label: "User",
                    variant: "outlined",
                    color: "primary"
                }), jsx(MarkdownViewer, {
                    children: content.text
                }) ]
            })
        }, index) : null))
    });
}

function AgenticaChatMessageMovie({prompt}) {
    if (prompt.type === "assistantMessage") {
        return jsx(AgenticaChatAssistantMessageMovie, {
            prompt
        });
    }
    if (prompt.type === "select") {
        return jsx(AgenticaChatSelectMessageMovie, {
            selection: prompt.selection
        });
    }
    if (prompt.type === "describe") {
        return jsx(AgenticaChatDescribeMessageMovie, {
            history: prompt
        });
    }
    if (prompt.type === "cancel" || prompt.type === "execute") {
        return null;
    }
    if (prompt.type === "userMessage") {
        return jsx(AgenticaChatUserMessageMovie, {
            prompt
        });
    }
    if (prompt.type === "systemMessage") {
        return jsx(AgenticaChatSystemMessageMovie, {
            prompt
        });
    }
    return null;
}

function AgenticaChatFunctionStackSideMovie(props) {
    return jsxs(React.Fragment, {
        children: [ jsx(Typography, {
            variant: "h5",
            children: " Function Stack "
        }), jsx("hr", {}), props.selections.map((select => jsxs(Accordion, {
            children: [ jsx(AccordionSummary, {
                expandIcon: jsx(ExpandMoreIcon, {}),
                children: jsx(Typography, {
                    component: "h6",
                    children: select.operation.protocol === "http" ? `${select.operation.function.method.toUpperCase()} ${select.operation.function.path}` : select.operation.function.name
                })
            }), jsxs(AccordionDetails, {
                children: [ jsx("hr", {}), select.reason, jsx("br", {}), jsx("br", {}), jsx(MarkdownViewer, {
                    children: select.operation.function.description
                }) ]
            }) ]
        }))) ]
    });
}

function AgenticaChatTokenUsageSideMovie(props) {
    const price = compute(props.usage);
    return jsxs(React.Fragment, {
        children: [ jsx(Typography, {
            variant: "h5",
            children: " Token Usage "
        }), jsx("hr", {}), jsxs(Table, {
            children: [ jsx(TableHead, {
                children: jsxs(TableRow, {
                    children: [ jsx(TableCell, {
                        children: "Type"
                    }), jsx(TableCell, {
                        children: "Token Usage"
                    }), jsx(TableCell, {
                        children: "Price"
                    }) ]
                })
            }), jsxs(TableBody, {
                children: [ jsxs(TableRow, {
                    children: [ jsx(TableCell, {
                        children: "Total"
                    }), jsx(TableCell, {
                        children: props.usage.aggregate.total.toLocaleString()
                    }), jsxs(TableCell, {
                        children: [ "$", price.total.toLocaleString() ]
                    }) ]
                }), jsxs(TableRow, {
                    children: [ jsx(TableCell, {
                        children: "Input"
                    }), jsx(TableCell, {
                        children: props.usage.aggregate.input.total.toLocaleString()
                    }), jsxs(TableCell, {
                        children: [ "$", price.prompt.toLocaleString() ]
                    }) ]
                }), jsxs(TableRow, {
                    children: [ jsx(TableCell, {
                        children: "Output"
                    }), jsx(TableCell, {
                        children: props.usage.aggregate.output.total.toLocaleString()
                    }), jsxs(TableCell, {
                        children: [ "$", price.completion.toLocaleString() ]
                    }) ]
                }) ]
            }) ]
        }) ]
    });
}

function compute(usage) {
    const prompt = (usage.aggregate.input.total - usage.aggregate.input.cached) * (2.5 / 1e6) + usage.aggregate.input.cached * (1.25 / 1e6);
    const completion = usage.aggregate.output.total * (10 / 1e6);
    return {
        total: prompt + completion,
        prompt,
        completion
    };
}

function AgenticaChatSideMovie(props) {
    return jsxs("div", {
        style: {
            padding: 25
        },
        children: [ props.error !== null ? jsxs(Fragment, {
            children: [ jsx(Typography, {
                variant: "h5",
                color: "error",
                children: "OpenAI Error"
            }), jsx("hr", {}), props.error.message, jsx("br", {}), jsx("br", {}), "Your OpenAI API key may not valid.", jsx("br", {}), jsx("br", {}), jsx("br", {}) ]
        }) : null, jsx(Typography, {
            variant: "h5",
            children: "Agent Information"
        }), jsx("hr", {}), jsxs("ul", {
            children: [ jsxs("li", {
                children: [ "Model:", " ", props.vendor.model ]
            }), jsxs("li", {
                children: [ "Locale:", " ", props.config?.locale ?? navigator.language ]
            }), jsxs("li", {
                children: [ "Timezone:", " ", props.config?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone ]
            }) ]
        }), jsx("br", {}), jsx("br", {}), jsx(AgenticaChatTokenUsageSideMovie, {
            usage: props.usage
        }), jsx("br", {}), jsx("br", {}), jsx(AgenticaChatFunctionStackSideMovie, {
            selections: props.selections
        }) ]
    });
}

const SIDE_WIDTH = 450;

function AgenticaChatMovie({agent, title}) {
    const upperDivRef = useRef(null);
    const middleDivRef = useRef(null);
    const bottomDivRef = useRef(null);
    const bodyContainerRef = useRef(null);
    const inputRef = useRef(null);
    const [error, setError] = useState(null);
    const [text, setText] = useState("");
    const [histories, setHistories] = useState(agent.getHistories().slice());
    const [tokenUsage, setTokenUsage] = useState(JSON.parse(JSON.stringify(agent.getTokenUsage())));
    const [height, setHeight] = useState(122);
    const [enabled, setEnabled] = useState(true);
    const [selections, setSelections] = useState([]);
    const [openSide, setOpenSide] = useState(false);
    const handleUserMessage = async event => {
        setHistories((prev => [ ...prev, event.toHistory() ]));
    };
    const handleAssistantMessage = async event => {
        await event.join();
        setHistories((prev => [ ...prev, event.toHistory() ]));
    };
    const handleDescribe = async event => {
        await event.join();
        setHistories((prev => [ ...prev, event.toHistory() ]));
    };
    const handleSelect = evevnt => {
        setHistories((prev => [ ...prev, evevnt.toHistory() ]));
        setSelections((prev => [ ...prev, evevnt.selection ]));
    };
    const handleValidate = event => {
        console.error(event);
    };
    useEffect((() => {
        if (inputRef.current !== null) {
            inputRef.current.select();
        }
        agent.on("assistantMessage", handleAssistantMessage);
        agent.on("userMessage", handleUserMessage);
        agent.on("select", handleSelect);
        agent.on("describe", handleDescribe);
        agent.on("validate", handleValidate);
        setTokenUsage(agent.getTokenUsage());
        return () => {
            agent.off("assistantMessage", handleAssistantMessage);
            agent.off("userMessage", handleUserMessage);
            agent.off("select", handleSelect);
            agent.off("describe", handleDescribe);
            agent.off("validate", handleValidate);
        };
    }), []);
    const handleResize = () => {
        setTimeout((() => {
            if (upperDivRef.current === null || middleDivRef.current === null || bottomDivRef.current === null) {
                return;
            }
            const newHeight = upperDivRef.current.clientHeight + bottomDivRef.current.clientHeight;
            if (newHeight !== height) {
                setHeight(newHeight);
            }
        }));
    };
    const conversate = async () => {
        setText("");
        setEnabled(false);
        handleResize();
        try {
            await agent.conversate(text);
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
                setError(error);
            } else {
                setError(new Error("Unknown error"));
            }
            return;
        }
        histories.splice(0, histories.length);
        histories.push(...agent.getHistories());
        setHistories(histories);
        setTokenUsage(agent.getTokenUsage());
        setEnabled(true);
        const selections = agent.getHistories().filter((h => h.type === "select")).map((h => h.selection));
        for (const cancel of agent.getHistories().filter((h => h.type === "cancel")).map((h => h.selection))) {
            const index = selections.findIndex((s => s.operation.protocol === cancel.operation.protocol && s.operation.controller.name === cancel.operation.controller.name && s.operation.function.name === cancel.operation.function.name));
            if (index !== -1) {
                selections.splice(index, 1);
            }
        }
        setSelections(selections);
    };
    const handleKeyUp = async event => {
        if (event.key === "Enter" && event.shiftKey === false) {
            if (enabled === false) {
                event.preventDefault();
            } else {
                await conversate();
            }
        }
    };
    const capture = async () => {
        if (bodyContainerRef.current === null) {
            return;
        }
        const dataUrl = await toPng(bodyContainerRef.current, {});
        const link = document.createElement("a");
        link.download = "nestia-chat-screenshot.png";
        link.href = dataUrl;
        link.click();
        link.remove();
    };
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
    const bodyMovie = () => jsx("div", {
        style: {
            overflowY: "auto",
            height: "100%",
            width: isMobile ? "100%" : `calc(100% - ${SIDE_WIDTH}px)`,
            margin: 0,
            backgroundColor: "lightblue"
        },
        children: jsx(Container, {
            style: {
                paddingBottom: 50,
                width: "100%",
                minHeight: "100%",
                backgroundColor: "lightblue",
                margin: 0
            },
            ref: bodyContainerRef,
            children: histories.map(((prompt, index) => jsx(AgenticaChatMessageMovie, {
                prompt
            }, index))).filter((elem => elem !== null))
        })
    });
    const sideMovie = () => jsx("div", {
        style: {
            width: isMobile ? undefined : SIDE_WIDTH,
            height: "100%",
            overflowY: "auto",
            backgroundColor: "#eeeeee"
        },
        children: jsx(Container, {
            maxWidth: false,
            onClick: isMobile ? () => setOpenSide(false) : undefined,
            children: jsx(AgenticaChatSideMovie, {
                vendor: agent.getVendor(),
                config: agent.getConfig(),
                usage: tokenUsage,
                selections,
                error
            })
        })
    });
    return jsxs("div", {
        style: {
            width: "100%",
            height: "100%"
        },
        children: [ jsx(AppBar, {
            ref: upperDivRef,
            position: "relative",
            component: "div",
            children: jsxs(Toolbar, {
                children: [ jsx(Typography, {
                    variant: "h6",
                    component: "div",
                    sx: {
                        flexGrow: 1
                    },
                    children: title ?? "Agentica Chatbot"
                }), isMobile ? jsxs(Fragment, {
                    children: [ jsx(IconButton, {
                        onClick: () => void capture().catch((() => {})),
                        children: jsx(AddAPhotoIcon, {})
                    }), jsx(IconButton, {
                        onClick: () => setOpenSide(true),
                        children: jsx(ReceiptLongIcon, {})
                    }) ]
                }) : jsx(Button, {
                    color: "inherit",
                    startIcon: jsx(AddAPhotoIcon, {}),
                    onClick: () => void capture().catch((() => {})),
                    children: "Screenshot Capture"
                }) ]
            })
        }), jsx("div", {
            ref: middleDivRef,
            style: {
                width: "100%",
                height: `calc(100% - ${height}px)`,
                display: "flex",
                flexDirection: "row"
            },
            children: isMobile ? jsxs(Fragment, {
                children: [ bodyMovie(), jsx(Drawer, {
                    anchor: "right",
                    open: openSide,
                    onClose: () => setOpenSide(false),
                    children: sideMovie()
                }) ]
            }) : jsxs(Fragment, {
                children: [ bodyMovie(), sideMovie() ]
            })
        }), jsx(AppBar, {
            ref: bottomDivRef,
            position: "static",
            component: "div",
            color: "inherit",
            children: jsxs(Toolbar, {
                children: [ jsx(Input, {
                    inputRef,
                    fullWidth: true,
                    placeholder: "Conversate with AI Chatbot",
                    value: text,
                    multiline: true,
                    onKeyUp: e => void handleKeyUp(e).catch((() => {})),
                    onChange: e => {
                        setText(e.target.value);
                        handleResize();
                    }
                }), jsx(Button, {
                    variant: "contained",
                    style: {
                        marginLeft: 10
                    },
                    startIcon: jsx(SendIcon, {}),
                    disabled: !enabled,
                    onClick: () => void conversate().catch((() => {})),
                    children: "Send"
                }) ]
            })
        }) ]
    });
}

function AgenticaChatApplication(props) {
    return jsx(AgenticaChatMovie, {
        ...props
    });
}

export { AgenticaChatApplication };
//# sourceMappingURL=index.mjs.map
