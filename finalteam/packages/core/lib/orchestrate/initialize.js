"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = initialize;
const __typia_transform__validateReport = __importStar(require("typia/lib/internal/_validateReport.js"));
const typia_1 = __importDefault(require("typia"));
const AgenticaDefaultPrompt_1 = require("../constants/AgenticaDefaultPrompt");
const AgenticaSystemPrompt_1 = require("../constants/AgenticaSystemPrompt");
const events_1 = require("../factory/events");
const histories_1 = require("../factory/histories");
const ChatGptCompletionMessageUtil_1 = require("../utils/ChatGptCompletionMessageUtil");
const MPSC_1 = require("../utils/MPSC");
const StreamUtil_1 = require("../utils/StreamUtil");
const FUNCTION = {
    model: "chatgpt",
    options: {
        reference: false,
        strict: false,
        separate: null
    },
    functions: [
        {
            name: "getApiFunctions",
            parameters: {
                description: "Current Type: {@link object}",
                type: "object",
                properties: {},
                required: [],
                additionalProperties: false,
                $defs: {
                    RecordstringIChatGptSchema: {
                        description: "Construct a type with a set of properties K of type T",
                        type: "object",
                        properties: {},
                        required: [],
                        additionalProperties: {
                            $ref: "#/$defs/IChatGptSchema"
                        }
                    },
                    IChatGptSchema: {
                        title: "Type schema info of the ChatGPT",
                        description: "Type schema info of the ChatGPT.\n\n`IChatGptSchema` is a type schema info of the ChatGPT function calling.\n\n`IChatGptSchema` basically follows the JSON schema definition of the OpenAPI v3.1\nspeciifcation; {@link OpenApiV3_1.IJsonSchema}.\n\nHowever, the `IChatGptSchema` does not follow the entire specification of\nthe OpenAPI v3.1. It has own specific restrictions and definitions. Here is the\nlist of how `IChatGptSchema` is different with the OpenAPI v3.1 JSON schema.\n\n- Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}\n- Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}\n- Tuple type is banned: {@link OpenApiV3_1.IJsonSchema.ITuple.prefixItems}\n- Constant type is banned: {@link OpenApiV3_1.IJsonSchema.IConstant}\n- Merge {@link OpenApiV3_1.IJsonSchema.IOneOf} to {@link IChatGptSchema.IAnOf}\n- Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link IChatGptSchema.IObject}\n- Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link IChatGptSchema.IReference}\n- When {@link IChatGptSchema.IConfig.strict} mode\n  - Every object properties must be required\n  - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n\nIf compare with the {@link OpenApi.IJsonSchema}, the emended JSON schema specification,\n\n- {@link IChatGptSchema.IAnyOf} instead of the {@link OpenApi.IJsonSchema.IOneOf}\n- {@link IChatGptSchema.IParameters.$defs} instead of the {@link OpenApi.IJsonSchema.IComponents.schemas}\n- {@link IChatGptSchema.IString.enum} instead of the {@link OpenApi.IJsonSchema.IConstant}\n- {@link IChatGptSchema.additionalProperties} is fixed to `false`\n- No tuple type {@link OpenApi.IJsonSchema.ITuple} support\n- When {@link IChatGptSchema.IConfig.strict} mode\n  - Every object properties must be required\n  - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n\nFor reference, if you've composed the `IChatGptSchema` type with the\n{@link IChatGptSchema.IConfig.reference} `false` option (default is `false`),\nonly the recursived named types would be archived into the\n{@link IChatGptSchema.IParameters.$defs}, and the others would be ecaped from the\n{@link IChatGptSchema.IReference} type.\n\nAlso, OpenAI has banned below constraint properties. Instead, `IChatGptSchema`\nfills the {@link IChatGptSchema.__IAttribute.description} property with\nthe comment text like `\"@format uuid\"`.\n\n- {@link OpenApi.IJsonSchema.INumber.minimum}\n- {@link OpenApi.IJsonSchema.INumber.maximum}\n- {@link OpenApi.IJsonSchema.INumber.multipleOf}\n- {@link OpenApi.IJsonSchema.IString.minLength}\n- {@link OpenApi.IJsonSchema.IString.maxLength}\n- {@link OpenApi.IJsonSchema.IString.format}\n- {@link OpenApi.IJsonSchema.IString.pattern}\n- {@link OpenApi.IJsonSchema.IString.contentMediaType}\n- {@link OpenApi.IJsonSchema.IString.default}\n- {@link OpenApi.IJsonSchema.IArray.minItems}\n- {@link OpenApi.IJsonSchema.IArray.maxItems}\n- {@link OpenApi.IJsonSchema.IArray.unique}\n\nAdditionally, OpenAI cannot define the `description` property to the\n{@link IChatGptSchema.IReference} type, and even does not understand\nthe capsulization to the {@link IChatGptSchema.IAnyOf} type.\nTherefore, the `description` is written to the parent object type,\nnot the reference type.\n\n```json\n{\n  \"type\": \"object\",\n  \"description\": \"### Description of {@link something} property.\\n\\n> Hello?\",\n  \"properties\": {\n    \"something\": {\n      \"$ref\": \"#/$defs/SomeObject\"\n    }\n  }\n}\n```",
                        anyOf: [
                            {
                                type: "object",
                                properties: {
                                    "enum": {
                                        title: "Enumeration values",
                                        description: "Enumeration values.",
                                        type: "array",
                                        items: {
                                            type: "boolean"
                                        }
                                    },
                                    type: {
                                        title: "Discriminator value of the type",
                                        description: "Discriminator value of the type.",
                                        type: "string",
                                        "enum": [
                                            "boolean"
                                        ]
                                    },
                                    title: {
                                        title: "Title of the schema",
                                        description: "Title of the schema.",
                                        type: "string"
                                    },
                                    description: {
                                        title: "Detailed description of the schema",
                                        description: "Detailed description of the schema.",
                                        type: "string"
                                    },
                                    deprecated: {
                                        title: "Whether the type is deprecated or not",
                                        description: "Whether the type is deprecated or not.",
                                        type: "boolean"
                                    },
                                    example: {
                                        title: "Example value",
                                        description: "Example value."
                                    },
                                    examples: {
                                        description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                        type: "object",
                                        properties: {},
                                        required: [],
                                        additionalProperties: {}
                                    }
                                },
                                required: [
                                    "type"
                                ],
                                description: "Description of the current {@link IChatGptSchema.IBoolean} type:\n\n> Boolean type info.\n\n------------------------------\n\nDescription of the parent {@link IChatGptSchema} type:\n\n> Type schema info of the ChatGPT.\n> \n> `IChatGptSchema` is a type schema info of the ChatGPT function calling.\n> \n> `IChatGptSchema` basically follows the JSON schema definition of the OpenAPI v3.1\n> speciifcation; {@link OpenApiV3_1.IJsonSchema}.\n> \n> However, the `IChatGptSchema` does not follow the entire specification of\n> the OpenAPI v3.1. It has own specific restrictions and definitions. Here is the\n> list of how `IChatGptSchema` is different with the OpenAPI v3.1 JSON schema.\n> \n> - Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}\n> - Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}\n> - Tuple type is banned: {@link OpenApiV3_1.IJsonSchema.ITuple.prefixItems}\n> - Constant type is banned: {@link OpenApiV3_1.IJsonSchema.IConstant}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IOneOf} to {@link IChatGptSchema.IAnOf}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link IChatGptSchema.IObject}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link IChatGptSchema.IReference}\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> If compare with the {@link OpenApi.IJsonSchema}, the emended JSON schema specification,\n> \n> - {@link IChatGptSchema.IAnyOf} instead of the {@link OpenApi.IJsonSchema.IOneOf}\n> - {@link IChatGptSchema.IParameters.$defs} instead of the {@link OpenApi.IJsonSchema.IComponents.schemas}\n> - {@link IChatGptSchema.IString.enum} instead of the {@link OpenApi.IJsonSchema.IConstant}\n> - {@link IChatGptSchema.additionalProperties} is fixed to `false`\n> - No tuple type {@link OpenApi.IJsonSchema.ITuple} support\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> For reference, if you've composed the `IChatGptSchema` type with the\n> {@link IChatGptSchema.IConfig.reference} `false` option (default is `false`),\n> only the recursived named types would be archived into the\n> {@link IChatGptSchema.IParameters.$defs}, and the others would be ecaped from the\n> {@link IChatGptSchema.IReference} type.\n> \n> Also, OpenAI has banned below constraint properties. Instead, `IChatGptSchema`\n> fills the {@link IChatGptSchema.__IAttribute.description} property with\n> the comment text like `\"@format uuid\"`.\n> \n> - {@link OpenApi.IJsonSchema.INumber.minimum}\n> - {@link OpenApi.IJsonSchema.INumber.maximum}\n> - {@link OpenApi.IJsonSchema.INumber.multipleOf}\n> - {@link OpenApi.IJsonSchema.IString.minLength}\n> - {@link OpenApi.IJsonSchema.IString.maxLength}\n> - {@link OpenApi.IJsonSchema.IString.format}\n> - {@link OpenApi.IJsonSchema.IString.pattern}\n> - {@link OpenApi.IJsonSchema.IString.contentMediaType}\n> - {@link OpenApi.IJsonSchema.IString.default}\n> - {@link OpenApi.IJsonSchema.IArray.minItems}\n> - {@link OpenApi.IJsonSchema.IArray.maxItems}\n> - {@link OpenApi.IJsonSchema.IArray.unique}\n> \n> Additionally, OpenAI cannot define the `description` property to the\n> {@link IChatGptSchema.IReference} type, and even does not understand\n> the capsulization to the {@link IChatGptSchema.IAnyOf} type.\n> Therefore, the `description` is written to the parent object type,\n> not the reference type.\n> \n> ```json\n> {\n>   \"type\": \"object\",\n>   \"description\": \"### Description of {@link something} property.\\n\\n> Hello?\",\n>   \"properties\": {\n>     \"something\": {\n>       \"$ref\": \"#/$defs/SomeObject\"\n>     }\n>   }\n> }\n> ```"
                            },
                            {
                                type: "object",
                                properties: {
                                    "enum": {
                                        title: "Enumeration values",
                                        description: "Enumeration values.",
                                        type: "array",
                                        items: {
                                            type: "number"
                                        }
                                    },
                                    type: {
                                        title: "Discriminator value of the type",
                                        description: "Discriminator value of the type.",
                                        type: "string",
                                        "enum": [
                                            "integer"
                                        ]
                                    },
                                    title: {
                                        title: "Title of the schema",
                                        description: "Title of the schema.",
                                        type: "string"
                                    },
                                    description: {
                                        title: "Detailed description of the schema",
                                        description: "Detailed description of the schema.",
                                        type: "string"
                                    },
                                    deprecated: {
                                        title: "Whether the type is deprecated or not",
                                        description: "Whether the type is deprecated or not.",
                                        type: "boolean"
                                    },
                                    example: {
                                        title: "Example value",
                                        description: "Example value."
                                    },
                                    examples: {
                                        description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                        type: "object",
                                        properties: {},
                                        required: [],
                                        additionalProperties: {}
                                    }
                                },
                                required: [
                                    "type"
                                ],
                                description: "Description of the current {@link IChatGptSchema.IInteger} type:\n\n> Integer type info.\n\n------------------------------\n\nDescription of the parent {@link IChatGptSchema} type:\n\n> Type schema info of the ChatGPT.\n> \n> `IChatGptSchema` is a type schema info of the ChatGPT function calling.\n> \n> `IChatGptSchema` basically follows the JSON schema definition of the OpenAPI v3.1\n> speciifcation; {@link OpenApiV3_1.IJsonSchema}.\n> \n> However, the `IChatGptSchema` does not follow the entire specification of\n> the OpenAPI v3.1. It has own specific restrictions and definitions. Here is the\n> list of how `IChatGptSchema` is different with the OpenAPI v3.1 JSON schema.\n> \n> - Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}\n> - Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}\n> - Tuple type is banned: {@link OpenApiV3_1.IJsonSchema.ITuple.prefixItems}\n> - Constant type is banned: {@link OpenApiV3_1.IJsonSchema.IConstant}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IOneOf} to {@link IChatGptSchema.IAnOf}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link IChatGptSchema.IObject}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link IChatGptSchema.IReference}\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> If compare with the {@link OpenApi.IJsonSchema}, the emended JSON schema specification,\n> \n> - {@link IChatGptSchema.IAnyOf} instead of the {@link OpenApi.IJsonSchema.IOneOf}\n> - {@link IChatGptSchema.IParameters.$defs} instead of the {@link OpenApi.IJsonSchema.IComponents.schemas}\n> - {@link IChatGptSchema.IString.enum} instead of the {@link OpenApi.IJsonSchema.IConstant}\n> - {@link IChatGptSchema.additionalProperties} is fixed to `false`\n> - No tuple type {@link OpenApi.IJsonSchema.ITuple} support\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> For reference, if you've composed the `IChatGptSchema` type with the\n> {@link IChatGptSchema.IConfig.reference} `false` option (default is `false`),\n> only the recursived named types would be archived into the\n> {@link IChatGptSchema.IParameters.$defs}, and the others would be ecaped from the\n> {@link IChatGptSchema.IReference} type.\n> \n> Also, OpenAI has banned below constraint properties. Instead, `IChatGptSchema`\n> fills the {@link IChatGptSchema.__IAttribute.description} property with\n> the comment text like `\"@format uuid\"`.\n> \n> - {@link OpenApi.IJsonSchema.INumber.minimum}\n> - {@link OpenApi.IJsonSchema.INumber.maximum}\n> - {@link OpenApi.IJsonSchema.INumber.multipleOf}\n> - {@link OpenApi.IJsonSchema.IString.minLength}\n> - {@link OpenApi.IJsonSchema.IString.maxLength}\n> - {@link OpenApi.IJsonSchema.IString.format}\n> - {@link OpenApi.IJsonSchema.IString.pattern}\n> - {@link OpenApi.IJsonSchema.IString.contentMediaType}\n> - {@link OpenApi.IJsonSchema.IString.default}\n> - {@link OpenApi.IJsonSchema.IArray.minItems}\n> - {@link OpenApi.IJsonSchema.IArray.maxItems}\n> - {@link OpenApi.IJsonSchema.IArray.unique}\n> \n> Additionally, OpenAI cannot define the `description` property to the\n> {@link IChatGptSchema.IReference} type, and even does not understand\n> the capsulization to the {@link IChatGptSchema.IAnyOf} type.\n> Therefore, the `description` is written to the parent object type,\n> not the reference type.\n> \n> ```json\n> {\n>   \"type\": \"object\",\n>   \"description\": \"### Description of {@link something} property.\\n\\n> Hello?\",\n>   \"properties\": {\n>     \"something\": {\n>       \"$ref\": \"#/$defs/SomeObject\"\n>     }\n>   }\n> }\n> ```"
                            },
                            {
                                type: "object",
                                properties: {
                                    "enum": {
                                        title: "Enumeration values",
                                        description: "Enumeration values.",
                                        type: "array",
                                        items: {
                                            type: "number"
                                        }
                                    },
                                    type: {
                                        title: "Discriminator value of the type",
                                        description: "Discriminator value of the type.",
                                        type: "string",
                                        "enum": [
                                            "number"
                                        ]
                                    },
                                    title: {
                                        title: "Title of the schema",
                                        description: "Title of the schema.",
                                        type: "string"
                                    },
                                    description: {
                                        title: "Detailed description of the schema",
                                        description: "Detailed description of the schema.",
                                        type: "string"
                                    },
                                    deprecated: {
                                        title: "Whether the type is deprecated or not",
                                        description: "Whether the type is deprecated or not.",
                                        type: "boolean"
                                    },
                                    example: {
                                        title: "Example value",
                                        description: "Example value."
                                    },
                                    examples: {
                                        description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                        type: "object",
                                        properties: {},
                                        required: [],
                                        additionalProperties: {}
                                    }
                                },
                                required: [
                                    "type"
                                ],
                                description: "Description of the current {@link IChatGptSchema.INumber} type:\n\n> Number (double) type info.\n\n------------------------------\n\nDescription of the parent {@link IChatGptSchema} type:\n\n> Type schema info of the ChatGPT.\n> \n> `IChatGptSchema` is a type schema info of the ChatGPT function calling.\n> \n> `IChatGptSchema` basically follows the JSON schema definition of the OpenAPI v3.1\n> speciifcation; {@link OpenApiV3_1.IJsonSchema}.\n> \n> However, the `IChatGptSchema` does not follow the entire specification of\n> the OpenAPI v3.1. It has own specific restrictions and definitions. Here is the\n> list of how `IChatGptSchema` is different with the OpenAPI v3.1 JSON schema.\n> \n> - Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}\n> - Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}\n> - Tuple type is banned: {@link OpenApiV3_1.IJsonSchema.ITuple.prefixItems}\n> - Constant type is banned: {@link OpenApiV3_1.IJsonSchema.IConstant}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IOneOf} to {@link IChatGptSchema.IAnOf}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link IChatGptSchema.IObject}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link IChatGptSchema.IReference}\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> If compare with the {@link OpenApi.IJsonSchema}, the emended JSON schema specification,\n> \n> - {@link IChatGptSchema.IAnyOf} instead of the {@link OpenApi.IJsonSchema.IOneOf}\n> - {@link IChatGptSchema.IParameters.$defs} instead of the {@link OpenApi.IJsonSchema.IComponents.schemas}\n> - {@link IChatGptSchema.IString.enum} instead of the {@link OpenApi.IJsonSchema.IConstant}\n> - {@link IChatGptSchema.additionalProperties} is fixed to `false`\n> - No tuple type {@link OpenApi.IJsonSchema.ITuple} support\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> For reference, if you've composed the `IChatGptSchema` type with the\n> {@link IChatGptSchema.IConfig.reference} `false` option (default is `false`),\n> only the recursived named types would be archived into the\n> {@link IChatGptSchema.IParameters.$defs}, and the others would be ecaped from the\n> {@link IChatGptSchema.IReference} type.\n> \n> Also, OpenAI has banned below constraint properties. Instead, `IChatGptSchema`\n> fills the {@link IChatGptSchema.__IAttribute.description} property with\n> the comment text like `\"@format uuid\"`.\n> \n> - {@link OpenApi.IJsonSchema.INumber.minimum}\n> - {@link OpenApi.IJsonSchema.INumber.maximum}\n> - {@link OpenApi.IJsonSchema.INumber.multipleOf}\n> - {@link OpenApi.IJsonSchema.IString.minLength}\n> - {@link OpenApi.IJsonSchema.IString.maxLength}\n> - {@link OpenApi.IJsonSchema.IString.format}\n> - {@link OpenApi.IJsonSchema.IString.pattern}\n> - {@link OpenApi.IJsonSchema.IString.contentMediaType}\n> - {@link OpenApi.IJsonSchema.IString.default}\n> - {@link OpenApi.IJsonSchema.IArray.minItems}\n> - {@link OpenApi.IJsonSchema.IArray.maxItems}\n> - {@link OpenApi.IJsonSchema.IArray.unique}\n> \n> Additionally, OpenAI cannot define the `description` property to the\n> {@link IChatGptSchema.IReference} type, and even does not understand\n> the capsulization to the {@link IChatGptSchema.IAnyOf} type.\n> Therefore, the `description` is written to the parent object type,\n> not the reference type.\n> \n> ```json\n> {\n>   \"type\": \"object\",\n>   \"description\": \"### Description of {@link something} property.\\n\\n> Hello?\",\n>   \"properties\": {\n>     \"something\": {\n>       \"$ref\": \"#/$defs/SomeObject\"\n>     }\n>   }\n> }\n> ```"
                            },
                            {
                                type: "object",
                                properties: {
                                    "enum": {
                                        title: "Enumeration values",
                                        description: "Enumeration values.",
                                        type: "array",
                                        items: {
                                            type: "string"
                                        }
                                    },
                                    type: {
                                        title: "Discriminator value of the type",
                                        description: "Discriminator value of the type.",
                                        type: "string",
                                        "enum": [
                                            "string"
                                        ]
                                    },
                                    title: {
                                        title: "Title of the schema",
                                        description: "Title of the schema.",
                                        type: "string"
                                    },
                                    description: {
                                        title: "Detailed description of the schema",
                                        description: "Detailed description of the schema.",
                                        type: "string"
                                    },
                                    deprecated: {
                                        title: "Whether the type is deprecated or not",
                                        description: "Whether the type is deprecated or not.",
                                        type: "boolean"
                                    },
                                    example: {
                                        title: "Example value",
                                        description: "Example value."
                                    },
                                    examples: {
                                        description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                        type: "object",
                                        properties: {},
                                        required: [],
                                        additionalProperties: {}
                                    }
                                },
                                required: [
                                    "type"
                                ],
                                description: "Description of the current {@link IChatGptSchema.IString} type:\n\n> String type info.\n\n------------------------------\n\nDescription of the parent {@link IChatGptSchema} type:\n\n> Type schema info of the ChatGPT.\n> \n> `IChatGptSchema` is a type schema info of the ChatGPT function calling.\n> \n> `IChatGptSchema` basically follows the JSON schema definition of the OpenAPI v3.1\n> speciifcation; {@link OpenApiV3_1.IJsonSchema}.\n> \n> However, the `IChatGptSchema` does not follow the entire specification of\n> the OpenAPI v3.1. It has own specific restrictions and definitions. Here is the\n> list of how `IChatGptSchema` is different with the OpenAPI v3.1 JSON schema.\n> \n> - Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}\n> - Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}\n> - Tuple type is banned: {@link OpenApiV3_1.IJsonSchema.ITuple.prefixItems}\n> - Constant type is banned: {@link OpenApiV3_1.IJsonSchema.IConstant}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IOneOf} to {@link IChatGptSchema.IAnOf}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link IChatGptSchema.IObject}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link IChatGptSchema.IReference}\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> If compare with the {@link OpenApi.IJsonSchema}, the emended JSON schema specification,\n> \n> - {@link IChatGptSchema.IAnyOf} instead of the {@link OpenApi.IJsonSchema.IOneOf}\n> - {@link IChatGptSchema.IParameters.$defs} instead of the {@link OpenApi.IJsonSchema.IComponents.schemas}\n> - {@link IChatGptSchema.IString.enum} instead of the {@link OpenApi.IJsonSchema.IConstant}\n> - {@link IChatGptSchema.additionalProperties} is fixed to `false`\n> - No tuple type {@link OpenApi.IJsonSchema.ITuple} support\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> For reference, if you've composed the `IChatGptSchema` type with the\n> {@link IChatGptSchema.IConfig.reference} `false` option (default is `false`),\n> only the recursived named types would be archived into the\n> {@link IChatGptSchema.IParameters.$defs}, and the others would be ecaped from the\n> {@link IChatGptSchema.IReference} type.\n> \n> Also, OpenAI has banned below constraint properties. Instead, `IChatGptSchema`\n> fills the {@link IChatGptSchema.__IAttribute.description} property with\n> the comment text like `\"@format uuid\"`.\n> \n> - {@link OpenApi.IJsonSchema.INumber.minimum}\n> - {@link OpenApi.IJsonSchema.INumber.maximum}\n> - {@link OpenApi.IJsonSchema.INumber.multipleOf}\n> - {@link OpenApi.IJsonSchema.IString.minLength}\n> - {@link OpenApi.IJsonSchema.IString.maxLength}\n> - {@link OpenApi.IJsonSchema.IString.format}\n> - {@link OpenApi.IJsonSchema.IString.pattern}\n> - {@link OpenApi.IJsonSchema.IString.contentMediaType}\n> - {@link OpenApi.IJsonSchema.IString.default}\n> - {@link OpenApi.IJsonSchema.IArray.minItems}\n> - {@link OpenApi.IJsonSchema.IArray.maxItems}\n> - {@link OpenApi.IJsonSchema.IArray.unique}\n> \n> Additionally, OpenAI cannot define the `description` property to the\n> {@link IChatGptSchema.IReference} type, and even does not understand\n> the capsulization to the {@link IChatGptSchema.IAnyOf} type.\n> Therefore, the `description` is written to the parent object type,\n> not the reference type.\n> \n> ```json\n> {\n>   \"type\": \"object\",\n>   \"description\": \"### Description of {@link something} property.\\n\\n> Hello?\",\n>   \"properties\": {\n>     \"something\": {\n>       \"$ref\": \"#/$defs/SomeObject\"\n>     }\n>   }\n> }\n> ```"
                            },
                            {
                                $ref: "#/$defs/IChatGptSchema.IArray"
                            },
                            {
                                $ref: "#/$defs/IChatGptSchema.IObject"
                            },
                            {
                                type: "object",
                                properties: {
                                    $ref: {
                                        title: "Reference to the named schema",
                                        description: "Reference to the named schema.\n\nThe `ref` is a reference to the named schema. Format of the `$ref` is\nfollowing the JSON Pointer specification. In the OpenAPI, the `$ref`\nstarts with `#/$defs/` which means the type is stored in\nthe {@link IChatGptSchema.IParameters.$defs} object.\n\n- `#/$defs/SomeObject`\n- `#/$defs/AnotherObject`",
                                        type: "string"
                                    },
                                    title: {
                                        title: "Title of the schema",
                                        description: "Title of the schema.",
                                        type: "string"
                                    },
                                    description: {
                                        title: "Detailed description of the schema",
                                        description: "Detailed description of the schema.",
                                        type: "string"
                                    },
                                    deprecated: {
                                        title: "Whether the type is deprecated or not",
                                        description: "Whether the type is deprecated or not.",
                                        type: "boolean"
                                    },
                                    example: {
                                        title: "Example value",
                                        description: "Example value."
                                    },
                                    examples: {
                                        description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                        type: "object",
                                        properties: {},
                                        required: [],
                                        additionalProperties: {}
                                    }
                                },
                                required: [
                                    "$ref"
                                ],
                                description: "Description of the current {@link IChatGptSchema.IReference} type:\n\n> Reference type directing named schema.\n\n------------------------------\n\nDescription of the parent {@link IChatGptSchema} type:\n\n> Type schema info of the ChatGPT.\n> \n> `IChatGptSchema` is a type schema info of the ChatGPT function calling.\n> \n> `IChatGptSchema` basically follows the JSON schema definition of the OpenAPI v3.1\n> speciifcation; {@link OpenApiV3_1.IJsonSchema}.\n> \n> However, the `IChatGptSchema` does not follow the entire specification of\n> the OpenAPI v3.1. It has own specific restrictions and definitions. Here is the\n> list of how `IChatGptSchema` is different with the OpenAPI v3.1 JSON schema.\n> \n> - Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}\n> - Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}\n> - Tuple type is banned: {@link OpenApiV3_1.IJsonSchema.ITuple.prefixItems}\n> - Constant type is banned: {@link OpenApiV3_1.IJsonSchema.IConstant}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IOneOf} to {@link IChatGptSchema.IAnOf}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link IChatGptSchema.IObject}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link IChatGptSchema.IReference}\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> If compare with the {@link OpenApi.IJsonSchema}, the emended JSON schema specification,\n> \n> - {@link IChatGptSchema.IAnyOf} instead of the {@link OpenApi.IJsonSchema.IOneOf}\n> - {@link IChatGptSchema.IParameters.$defs} instead of the {@link OpenApi.IJsonSchema.IComponents.schemas}\n> - {@link IChatGptSchema.IString.enum} instead of the {@link OpenApi.IJsonSchema.IConstant}\n> - {@link IChatGptSchema.additionalProperties} is fixed to `false`\n> - No tuple type {@link OpenApi.IJsonSchema.ITuple} support\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> For reference, if you've composed the `IChatGptSchema` type with the\n> {@link IChatGptSchema.IConfig.reference} `false` option (default is `false`),\n> only the recursived named types would be archived into the\n> {@link IChatGptSchema.IParameters.$defs}, and the others would be ecaped from the\n> {@link IChatGptSchema.IReference} type.\n> \n> Also, OpenAI has banned below constraint properties. Instead, `IChatGptSchema`\n> fills the {@link IChatGptSchema.__IAttribute.description} property with\n> the comment text like `\"@format uuid\"`.\n> \n> - {@link OpenApi.IJsonSchema.INumber.minimum}\n> - {@link OpenApi.IJsonSchema.INumber.maximum}\n> - {@link OpenApi.IJsonSchema.INumber.multipleOf}\n> - {@link OpenApi.IJsonSchema.IString.minLength}\n> - {@link OpenApi.IJsonSchema.IString.maxLength}\n> - {@link OpenApi.IJsonSchema.IString.format}\n> - {@link OpenApi.IJsonSchema.IString.pattern}\n> - {@link OpenApi.IJsonSchema.IString.contentMediaType}\n> - {@link OpenApi.IJsonSchema.IString.default}\n> - {@link OpenApi.IJsonSchema.IArray.minItems}\n> - {@link OpenApi.IJsonSchema.IArray.maxItems}\n> - {@link OpenApi.IJsonSchema.IArray.unique}\n> \n> Additionally, OpenAI cannot define the `description` property to the\n> {@link IChatGptSchema.IReference} type, and even does not understand\n> the capsulization to the {@link IChatGptSchema.IAnyOf} type.\n> Therefore, the `description` is written to the parent object type,\n> not the reference type.\n> \n> ```json\n> {\n>   \"type\": \"object\",\n>   \"description\": \"### Description of {@link something} property.\\n\\n> Hello?\",\n>   \"properties\": {\n>     \"something\": {\n>       \"$ref\": \"#/$defs/SomeObject\"\n>     }\n>   }\n> }\n> ```"
                            },
                            {
                                $ref: "#/$defs/IChatGptSchema.IAnyOf"
                            },
                            {
                                type: "object",
                                properties: {
                                    type: {
                                        title: "Discriminator value of the type",
                                        description: "Discriminator value of the type.",
                                        type: "string",
                                        "enum": [
                                            "null"
                                        ]
                                    },
                                    title: {
                                        title: "Title of the schema",
                                        description: "Title of the schema.",
                                        type: "string"
                                    },
                                    description: {
                                        title: "Detailed description of the schema",
                                        description: "Detailed description of the schema.",
                                        type: "string"
                                    },
                                    deprecated: {
                                        title: "Whether the type is deprecated or not",
                                        description: "Whether the type is deprecated or not.",
                                        type: "boolean"
                                    },
                                    example: {
                                        title: "Example value",
                                        description: "Example value."
                                    },
                                    examples: {
                                        description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                        type: "object",
                                        properties: {},
                                        required: [],
                                        additionalProperties: {}
                                    }
                                },
                                required: [
                                    "type"
                                ],
                                description: "Description of the current {@link IChatGptSchema.INull} type:\n\n> Null type.\n\n------------------------------\n\nDescription of the parent {@link IChatGptSchema} type:\n\n> Type schema info of the ChatGPT.\n> \n> `IChatGptSchema` is a type schema info of the ChatGPT function calling.\n> \n> `IChatGptSchema` basically follows the JSON schema definition of the OpenAPI v3.1\n> speciifcation; {@link OpenApiV3_1.IJsonSchema}.\n> \n> However, the `IChatGptSchema` does not follow the entire specification of\n> the OpenAPI v3.1. It has own specific restrictions and definitions. Here is the\n> list of how `IChatGptSchema` is different with the OpenAPI v3.1 JSON schema.\n> \n> - Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}\n> - Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}\n> - Tuple type is banned: {@link OpenApiV3_1.IJsonSchema.ITuple.prefixItems}\n> - Constant type is banned: {@link OpenApiV3_1.IJsonSchema.IConstant}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IOneOf} to {@link IChatGptSchema.IAnOf}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link IChatGptSchema.IObject}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link IChatGptSchema.IReference}\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> If compare with the {@link OpenApi.IJsonSchema}, the emended JSON schema specification,\n> \n> - {@link IChatGptSchema.IAnyOf} instead of the {@link OpenApi.IJsonSchema.IOneOf}\n> - {@link IChatGptSchema.IParameters.$defs} instead of the {@link OpenApi.IJsonSchema.IComponents.schemas}\n> - {@link IChatGptSchema.IString.enum} instead of the {@link OpenApi.IJsonSchema.IConstant}\n> - {@link IChatGptSchema.additionalProperties} is fixed to `false`\n> - No tuple type {@link OpenApi.IJsonSchema.ITuple} support\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> For reference, if you've composed the `IChatGptSchema` type with the\n> {@link IChatGptSchema.IConfig.reference} `false` option (default is `false`),\n> only the recursived named types would be archived into the\n> {@link IChatGptSchema.IParameters.$defs}, and the others would be ecaped from the\n> {@link IChatGptSchema.IReference} type.\n> \n> Also, OpenAI has banned below constraint properties. Instead, `IChatGptSchema`\n> fills the {@link IChatGptSchema.__IAttribute.description} property with\n> the comment text like `\"@format uuid\"`.\n> \n> - {@link OpenApi.IJsonSchema.INumber.minimum}\n> - {@link OpenApi.IJsonSchema.INumber.maximum}\n> - {@link OpenApi.IJsonSchema.INumber.multipleOf}\n> - {@link OpenApi.IJsonSchema.IString.minLength}\n> - {@link OpenApi.IJsonSchema.IString.maxLength}\n> - {@link OpenApi.IJsonSchema.IString.format}\n> - {@link OpenApi.IJsonSchema.IString.pattern}\n> - {@link OpenApi.IJsonSchema.IString.contentMediaType}\n> - {@link OpenApi.IJsonSchema.IString.default}\n> - {@link OpenApi.IJsonSchema.IArray.minItems}\n> - {@link OpenApi.IJsonSchema.IArray.maxItems}\n> - {@link OpenApi.IJsonSchema.IArray.unique}\n> \n> Additionally, OpenAI cannot define the `description` property to the\n> {@link IChatGptSchema.IReference} type, and even does not understand\n> the capsulization to the {@link IChatGptSchema.IAnyOf} type.\n> Therefore, the `description` is written to the parent object type,\n> not the reference type.\n> \n> ```json\n> {\n>   \"type\": \"object\",\n>   \"description\": \"### Description of {@link something} property.\\n\\n> Hello?\",\n>   \"properties\": {\n>     \"something\": {\n>       \"$ref\": \"#/$defs/SomeObject\"\n>     }\n>   }\n> }\n> ```"
                            },
                            {
                                type: "object",
                                properties: {
                                    title: {
                                        title: "Title of the schema",
                                        description: "Title of the schema.",
                                        type: "string"
                                    },
                                    description: {
                                        title: "Detailed description of the schema",
                                        description: "Detailed description of the schema.",
                                        type: "string"
                                    },
                                    deprecated: {
                                        title: "Whether the type is deprecated or not",
                                        description: "Whether the type is deprecated or not.",
                                        type: "boolean"
                                    },
                                    example: {
                                        title: "Example value",
                                        description: "Example value."
                                    },
                                    examples: {
                                        description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                        type: "object",
                                        properties: {},
                                        required: [],
                                        additionalProperties: {}
                                    }
                                },
                                required: [],
                                description: "Description of the current {@link IChatGptSchema.IUnknown} type:\n\n> Unknown, the `any` type.\n\n------------------------------\n\nDescription of the parent {@link IChatGptSchema} type:\n\n> Type schema info of the ChatGPT.\n> \n> `IChatGptSchema` is a type schema info of the ChatGPT function calling.\n> \n> `IChatGptSchema` basically follows the JSON schema definition of the OpenAPI v3.1\n> speciifcation; {@link OpenApiV3_1.IJsonSchema}.\n> \n> However, the `IChatGptSchema` does not follow the entire specification of\n> the OpenAPI v3.1. It has own specific restrictions and definitions. Here is the\n> list of how `IChatGptSchema` is different with the OpenAPI v3.1 JSON schema.\n> \n> - Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}\n> - Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}\n> - Tuple type is banned: {@link OpenApiV3_1.IJsonSchema.ITuple.prefixItems}\n> - Constant type is banned: {@link OpenApiV3_1.IJsonSchema.IConstant}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IOneOf} to {@link IChatGptSchema.IAnOf}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link IChatGptSchema.IObject}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link IChatGptSchema.IReference}\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> If compare with the {@link OpenApi.IJsonSchema}, the emended JSON schema specification,\n> \n> - {@link IChatGptSchema.IAnyOf} instead of the {@link OpenApi.IJsonSchema.IOneOf}\n> - {@link IChatGptSchema.IParameters.$defs} instead of the {@link OpenApi.IJsonSchema.IComponents.schemas}\n> - {@link IChatGptSchema.IString.enum} instead of the {@link OpenApi.IJsonSchema.IConstant}\n> - {@link IChatGptSchema.additionalProperties} is fixed to `false`\n> - No tuple type {@link OpenApi.IJsonSchema.ITuple} support\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> For reference, if you've composed the `IChatGptSchema` type with the\n> {@link IChatGptSchema.IConfig.reference} `false` option (default is `false`),\n> only the recursived named types would be archived into the\n> {@link IChatGptSchema.IParameters.$defs}, and the others would be ecaped from the\n> {@link IChatGptSchema.IReference} type.\n> \n> Also, OpenAI has banned below constraint properties. Instead, `IChatGptSchema`\n> fills the {@link IChatGptSchema.__IAttribute.description} property with\n> the comment text like `\"@format uuid\"`.\n> \n> - {@link OpenApi.IJsonSchema.INumber.minimum}\n> - {@link OpenApi.IJsonSchema.INumber.maximum}\n> - {@link OpenApi.IJsonSchema.INumber.multipleOf}\n> - {@link OpenApi.IJsonSchema.IString.minLength}\n> - {@link OpenApi.IJsonSchema.IString.maxLength}\n> - {@link OpenApi.IJsonSchema.IString.format}\n> - {@link OpenApi.IJsonSchema.IString.pattern}\n> - {@link OpenApi.IJsonSchema.IString.contentMediaType}\n> - {@link OpenApi.IJsonSchema.IString.default}\n> - {@link OpenApi.IJsonSchema.IArray.minItems}\n> - {@link OpenApi.IJsonSchema.IArray.maxItems}\n> - {@link OpenApi.IJsonSchema.IArray.unique}\n> \n> Additionally, OpenAI cannot define the `description` property to the\n> {@link IChatGptSchema.IReference} type, and even does not understand\n> the capsulization to the {@link IChatGptSchema.IAnyOf} type.\n> Therefore, the `description` is written to the parent object type,\n> not the reference type.\n> \n> ```json\n> {\n>   \"type\": \"object\",\n>   \"description\": \"### Description of {@link something} property.\\n\\n> Hello?\",\n>   \"properties\": {\n>     \"something\": {\n>       \"$ref\": \"#/$defs/SomeObject\"\n>     }\n>   }\n> }\n> ```"
                            }
                        ]
                    },
                    "IChatGptSchema.IArray": {
                        description: "Array type info.\n\n### Description of {@link items} property:\n\n> Items type info.\n> \n> The `items` means the type of the array elements. In other words, it is\n> the type schema info of the `T` in the TypeScript array type `Array<T>`.",
                        type: "object",
                        properties: {
                            items: {
                                title: "Items type info",
                                $ref: "#/$defs/IChatGptSchema"
                            },
                            type: {
                                title: "Discriminator value of the type",
                                description: "Discriminator value of the type.",
                                type: "string",
                                "enum": [
                                    "array"
                                ]
                            },
                            title: {
                                title: "Title of the schema",
                                description: "Title of the schema.",
                                type: "string"
                            },
                            description: {
                                title: "Detailed description of the schema",
                                description: "Detailed description of the schema.",
                                type: "string"
                            },
                            deprecated: {
                                title: "Whether the type is deprecated or not",
                                description: "Whether the type is deprecated or not.",
                                type: "boolean"
                            },
                            example: {
                                title: "Example value",
                                description: "Example value."
                            },
                            examples: {
                                description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                type: "object",
                                properties: {},
                                required: [],
                                additionalProperties: {}
                            }
                        },
                        required: [
                            "items",
                            "type"
                        ]
                    },
                    "IChatGptSchema.IObject": {
                        description: "Object type info.\n\n### Description of {@link properties} property:\n\n> Properties of the object.\n> \n> The `properties` means a list of key-value pairs of the object's\n> regular properties. The key is the name of the regular property,\n> and the value is the type schema info.",
                        type: "object",
                        properties: {
                            properties: {
                                title: "Properties of the object",
                                $ref: "#/$defs/RecordstringIChatGptSchema"
                            },
                            additionalProperties: {
                                title: "Additional properties' info",
                                description: "Additional properties' info.\n\nThe `additionalProperties` means the type schema info of the additional\nproperties that are not listed in the {@link properties}.\n\nBy the way, if you've configured {@link IChatGptSchema.IConfig.strict} as `true`,\nChatGPT function calling does not support such dynamic key typed properties, so\nthe `additionalProperties` becomes always `false`.",
                                anyOf: [
                                    {
                                        type: "boolean"
                                    },
                                    {
                                        type: "object",
                                        properties: {
                                            "enum": {
                                                title: "Enumeration values",
                                                description: "Enumeration values.",
                                                type: "array",
                                                items: {
                                                    type: "string"
                                                }
                                            },
                                            type: {
                                                title: "Discriminator value of the type",
                                                description: "Discriminator value of the type.",
                                                type: "string",
                                                "enum": [
                                                    "string"
                                                ]
                                            },
                                            title: {
                                                title: "Title of the schema",
                                                description: "Title of the schema.",
                                                type: "string"
                                            },
                                            description: {
                                                title: "Detailed description of the schema",
                                                description: "Detailed description of the schema.",
                                                type: "string"
                                            },
                                            deprecated: {
                                                title: "Whether the type is deprecated or not",
                                                description: "Whether the type is deprecated or not.",
                                                type: "boolean"
                                            },
                                            example: {
                                                title: "Example value",
                                                description: "Example value."
                                            },
                                            examples: {
                                                description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                                type: "object",
                                                properties: {},
                                                required: [],
                                                additionalProperties: {}
                                            }
                                        },
                                        required: [
                                            "type"
                                        ],
                                        description: "Description of the current {@link IChatGptSchema.IString} type:\n\n> String type info.\n\n------------------------------\n\nDescription of the parent {@link IChatGptSchema} type:\n\n> Type schema info of the ChatGPT.\n> \n> `IChatGptSchema` is a type schema info of the ChatGPT function calling.\n> \n> `IChatGptSchema` basically follows the JSON schema definition of the OpenAPI v3.1\n> speciifcation; {@link OpenApiV3_1.IJsonSchema}.\n> \n> However, the `IChatGptSchema` does not follow the entire specification of\n> the OpenAPI v3.1. It has own specific restrictions and definitions. Here is the\n> list of how `IChatGptSchema` is different with the OpenAPI v3.1 JSON schema.\n> \n> - Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}\n> - Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}\n> - Tuple type is banned: {@link OpenApiV3_1.IJsonSchema.ITuple.prefixItems}\n> - Constant type is banned: {@link OpenApiV3_1.IJsonSchema.IConstant}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IOneOf} to {@link IChatGptSchema.IAnOf}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link IChatGptSchema.IObject}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link IChatGptSchema.IReference}\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> If compare with the {@link OpenApi.IJsonSchema}, the emended JSON schema specification,\n> \n> - {@link IChatGptSchema.IAnyOf} instead of the {@link OpenApi.IJsonSchema.IOneOf}\n> - {@link IChatGptSchema.IParameters.$defs} instead of the {@link OpenApi.IJsonSchema.IComponents.schemas}\n> - {@link IChatGptSchema.IString.enum} instead of the {@link OpenApi.IJsonSchema.IConstant}\n> - {@link IChatGptSchema.additionalProperties} is fixed to `false`\n> - No tuple type {@link OpenApi.IJsonSchema.ITuple} support\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> For reference, if you've composed the `IChatGptSchema` type with the\n> {@link IChatGptSchema.IConfig.reference} `false` option (default is `false`),\n> only the recursived named types would be archived into the\n> {@link IChatGptSchema.IParameters.$defs}, and the others would be ecaped from the\n> {@link IChatGptSchema.IReference} type.\n> \n> Also, OpenAI has banned below constraint properties. Instead, `IChatGptSchema`\n> fills the {@link IChatGptSchema.__IAttribute.description} property with\n> the comment text like `\"@format uuid\"`.\n> \n> - {@link OpenApi.IJsonSchema.INumber.minimum}\n> - {@link OpenApi.IJsonSchema.INumber.maximum}\n> - {@link OpenApi.IJsonSchema.INumber.multipleOf}\n> - {@link OpenApi.IJsonSchema.IString.minLength}\n> - {@link OpenApi.IJsonSchema.IString.maxLength}\n> - {@link OpenApi.IJsonSchema.IString.format}\n> - {@link OpenApi.IJsonSchema.IString.pattern}\n> - {@link OpenApi.IJsonSchema.IString.contentMediaType}\n> - {@link OpenApi.IJsonSchema.IString.default}\n> - {@link OpenApi.IJsonSchema.IArray.minItems}\n> - {@link OpenApi.IJsonSchema.IArray.maxItems}\n> - {@link OpenApi.IJsonSchema.IArray.unique}\n> \n> Additionally, OpenAI cannot define the `description` property to the\n> {@link IChatGptSchema.IReference} type, and even does not understand\n> the capsulization to the {@link IChatGptSchema.IAnyOf} type.\n> Therefore, the `description` is written to the parent object type,\n> not the reference type.\n> \n> ```json\n> {\n>   \"type\": \"object\",\n>   \"description\": \"### Description of {@link something} property.\\n\\n> Hello?\",\n>   \"properties\": {\n>     \"something\": {\n>       \"$ref\": \"#/$defs/SomeObject\"\n>     }\n>   }\n> }\n> ```"
                                    },
                                    {
                                        type: "object",
                                        properties: {
                                            "enum": {
                                                title: "Enumeration values",
                                                description: "Enumeration values.",
                                                type: "array",
                                                items: {
                                                    type: "number"
                                                }
                                            },
                                            type: {
                                                title: "Discriminator value of the type",
                                                description: "Discriminator value of the type.",
                                                type: "string",
                                                "enum": [
                                                    "number"
                                                ]
                                            },
                                            title: {
                                                title: "Title of the schema",
                                                description: "Title of the schema.",
                                                type: "string"
                                            },
                                            description: {
                                                title: "Detailed description of the schema",
                                                description: "Detailed description of the schema.",
                                                type: "string"
                                            },
                                            deprecated: {
                                                title: "Whether the type is deprecated or not",
                                                description: "Whether the type is deprecated or not.",
                                                type: "boolean"
                                            },
                                            example: {
                                                title: "Example value",
                                                description: "Example value."
                                            },
                                            examples: {
                                                description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                                type: "object",
                                                properties: {},
                                                required: [],
                                                additionalProperties: {}
                                            }
                                        },
                                        required: [
                                            "type"
                                        ],
                                        description: "Description of the current {@link IChatGptSchema.INumber} type:\n\n> Number (double) type info.\n\n------------------------------\n\nDescription of the parent {@link IChatGptSchema} type:\n\n> Type schema info of the ChatGPT.\n> \n> `IChatGptSchema` is a type schema info of the ChatGPT function calling.\n> \n> `IChatGptSchema` basically follows the JSON schema definition of the OpenAPI v3.1\n> speciifcation; {@link OpenApiV3_1.IJsonSchema}.\n> \n> However, the `IChatGptSchema` does not follow the entire specification of\n> the OpenAPI v3.1. It has own specific restrictions and definitions. Here is the\n> list of how `IChatGptSchema` is different with the OpenAPI v3.1 JSON schema.\n> \n> - Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}\n> - Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}\n> - Tuple type is banned: {@link OpenApiV3_1.IJsonSchema.ITuple.prefixItems}\n> - Constant type is banned: {@link OpenApiV3_1.IJsonSchema.IConstant}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IOneOf} to {@link IChatGptSchema.IAnOf}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link IChatGptSchema.IObject}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link IChatGptSchema.IReference}\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> If compare with the {@link OpenApi.IJsonSchema}, the emended JSON schema specification,\n> \n> - {@link IChatGptSchema.IAnyOf} instead of the {@link OpenApi.IJsonSchema.IOneOf}\n> - {@link IChatGptSchema.IParameters.$defs} instead of the {@link OpenApi.IJsonSchema.IComponents.schemas}\n> - {@link IChatGptSchema.IString.enum} instead of the {@link OpenApi.IJsonSchema.IConstant}\n> - {@link IChatGptSchema.additionalProperties} is fixed to `false`\n> - No tuple type {@link OpenApi.IJsonSchema.ITuple} support\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> For reference, if you've composed the `IChatGptSchema` type with the\n> {@link IChatGptSchema.IConfig.reference} `false` option (default is `false`),\n> only the recursived named types would be archived into the\n> {@link IChatGptSchema.IParameters.$defs}, and the others would be ecaped from the\n> {@link IChatGptSchema.IReference} type.\n> \n> Also, OpenAI has banned below constraint properties. Instead, `IChatGptSchema`\n> fills the {@link IChatGptSchema.__IAttribute.description} property with\n> the comment text like `\"@format uuid\"`.\n> \n> - {@link OpenApi.IJsonSchema.INumber.minimum}\n> - {@link OpenApi.IJsonSchema.INumber.maximum}\n> - {@link OpenApi.IJsonSchema.INumber.multipleOf}\n> - {@link OpenApi.IJsonSchema.IString.minLength}\n> - {@link OpenApi.IJsonSchema.IString.maxLength}\n> - {@link OpenApi.IJsonSchema.IString.format}\n> - {@link OpenApi.IJsonSchema.IString.pattern}\n> - {@link OpenApi.IJsonSchema.IString.contentMediaType}\n> - {@link OpenApi.IJsonSchema.IString.default}\n> - {@link OpenApi.IJsonSchema.IArray.minItems}\n> - {@link OpenApi.IJsonSchema.IArray.maxItems}\n> - {@link OpenApi.IJsonSchema.IArray.unique}\n> \n> Additionally, OpenAI cannot define the `description` property to the\n> {@link IChatGptSchema.IReference} type, and even does not understand\n> the capsulization to the {@link IChatGptSchema.IAnyOf} type.\n> Therefore, the `description` is written to the parent object type,\n> not the reference type.\n> \n> ```json\n> {\n>   \"type\": \"object\",\n>   \"description\": \"### Description of {@link something} property.\\n\\n> Hello?\",\n>   \"properties\": {\n>     \"something\": {\n>       \"$ref\": \"#/$defs/SomeObject\"\n>     }\n>   }\n> }\n> ```"
                                    },
                                    {
                                        type: "object",
                                        properties: {
                                            "enum": {
                                                title: "Enumeration values",
                                                description: "Enumeration values.",
                                                type: "array",
                                                items: {
                                                    type: "number"
                                                }
                                            },
                                            type: {
                                                title: "Discriminator value of the type",
                                                description: "Discriminator value of the type.",
                                                type: "string",
                                                "enum": [
                                                    "integer"
                                                ]
                                            },
                                            title: {
                                                title: "Title of the schema",
                                                description: "Title of the schema.",
                                                type: "string"
                                            },
                                            description: {
                                                title: "Detailed description of the schema",
                                                description: "Detailed description of the schema.",
                                                type: "string"
                                            },
                                            deprecated: {
                                                title: "Whether the type is deprecated or not",
                                                description: "Whether the type is deprecated or not.",
                                                type: "boolean"
                                            },
                                            example: {
                                                title: "Example value",
                                                description: "Example value."
                                            },
                                            examples: {
                                                description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                                type: "object",
                                                properties: {},
                                                required: [],
                                                additionalProperties: {}
                                            }
                                        },
                                        required: [
                                            "type"
                                        ],
                                        description: "Description of the current {@link IChatGptSchema.IInteger} type:\n\n> Integer type info.\n\n------------------------------\n\nDescription of the parent {@link IChatGptSchema} type:\n\n> Type schema info of the ChatGPT.\n> \n> `IChatGptSchema` is a type schema info of the ChatGPT function calling.\n> \n> `IChatGptSchema` basically follows the JSON schema definition of the OpenAPI v3.1\n> speciifcation; {@link OpenApiV3_1.IJsonSchema}.\n> \n> However, the `IChatGptSchema` does not follow the entire specification of\n> the OpenAPI v3.1. It has own specific restrictions and definitions. Here is the\n> list of how `IChatGptSchema` is different with the OpenAPI v3.1 JSON schema.\n> \n> - Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}\n> - Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}\n> - Tuple type is banned: {@link OpenApiV3_1.IJsonSchema.ITuple.prefixItems}\n> - Constant type is banned: {@link OpenApiV3_1.IJsonSchema.IConstant}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IOneOf} to {@link IChatGptSchema.IAnOf}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link IChatGptSchema.IObject}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link IChatGptSchema.IReference}\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> If compare with the {@link OpenApi.IJsonSchema}, the emended JSON schema specification,\n> \n> - {@link IChatGptSchema.IAnyOf} instead of the {@link OpenApi.IJsonSchema.IOneOf}\n> - {@link IChatGptSchema.IParameters.$defs} instead of the {@link OpenApi.IJsonSchema.IComponents.schemas}\n> - {@link IChatGptSchema.IString.enum} instead of the {@link OpenApi.IJsonSchema.IConstant}\n> - {@link IChatGptSchema.additionalProperties} is fixed to `false`\n> - No tuple type {@link OpenApi.IJsonSchema.ITuple} support\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> For reference, if you've composed the `IChatGptSchema` type with the\n> {@link IChatGptSchema.IConfig.reference} `false` option (default is `false`),\n> only the recursived named types would be archived into the\n> {@link IChatGptSchema.IParameters.$defs}, and the others would be ecaped from the\n> {@link IChatGptSchema.IReference} type.\n> \n> Also, OpenAI has banned below constraint properties. Instead, `IChatGptSchema`\n> fills the {@link IChatGptSchema.__IAttribute.description} property with\n> the comment text like `\"@format uuid\"`.\n> \n> - {@link OpenApi.IJsonSchema.INumber.minimum}\n> - {@link OpenApi.IJsonSchema.INumber.maximum}\n> - {@link OpenApi.IJsonSchema.INumber.multipleOf}\n> - {@link OpenApi.IJsonSchema.IString.minLength}\n> - {@link OpenApi.IJsonSchema.IString.maxLength}\n> - {@link OpenApi.IJsonSchema.IString.format}\n> - {@link OpenApi.IJsonSchema.IString.pattern}\n> - {@link OpenApi.IJsonSchema.IString.contentMediaType}\n> - {@link OpenApi.IJsonSchema.IString.default}\n> - {@link OpenApi.IJsonSchema.IArray.minItems}\n> - {@link OpenApi.IJsonSchema.IArray.maxItems}\n> - {@link OpenApi.IJsonSchema.IArray.unique}\n> \n> Additionally, OpenAI cannot define the `description` property to the\n> {@link IChatGptSchema.IReference} type, and even does not understand\n> the capsulization to the {@link IChatGptSchema.IAnyOf} type.\n> Therefore, the `description` is written to the parent object type,\n> not the reference type.\n> \n> ```json\n> {\n>   \"type\": \"object\",\n>   \"description\": \"### Description of {@link something} property.\\n\\n> Hello?\",\n>   \"properties\": {\n>     \"something\": {\n>       \"$ref\": \"#/$defs/SomeObject\"\n>     }\n>   }\n> }\n> ```"
                                    },
                                    {
                                        type: "object",
                                        properties: {
                                            "enum": {
                                                title: "Enumeration values",
                                                description: "Enumeration values.",
                                                type: "array",
                                                items: {
                                                    type: "boolean"
                                                }
                                            },
                                            type: {
                                                title: "Discriminator value of the type",
                                                description: "Discriminator value of the type.",
                                                type: "string",
                                                "enum": [
                                                    "boolean"
                                                ]
                                            },
                                            title: {
                                                title: "Title of the schema",
                                                description: "Title of the schema.",
                                                type: "string"
                                            },
                                            description: {
                                                title: "Detailed description of the schema",
                                                description: "Detailed description of the schema.",
                                                type: "string"
                                            },
                                            deprecated: {
                                                title: "Whether the type is deprecated or not",
                                                description: "Whether the type is deprecated or not.",
                                                type: "boolean"
                                            },
                                            example: {
                                                title: "Example value",
                                                description: "Example value."
                                            },
                                            examples: {
                                                description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                                type: "object",
                                                properties: {},
                                                required: [],
                                                additionalProperties: {}
                                            }
                                        },
                                        required: [
                                            "type"
                                        ],
                                        description: "Description of the current {@link IChatGptSchema.IBoolean} type:\n\n> Boolean type info.\n\n------------------------------\n\nDescription of the parent {@link IChatGptSchema} type:\n\n> Type schema info of the ChatGPT.\n> \n> `IChatGptSchema` is a type schema info of the ChatGPT function calling.\n> \n> `IChatGptSchema` basically follows the JSON schema definition of the OpenAPI v3.1\n> speciifcation; {@link OpenApiV3_1.IJsonSchema}.\n> \n> However, the `IChatGptSchema` does not follow the entire specification of\n> the OpenAPI v3.1. It has own specific restrictions and definitions. Here is the\n> list of how `IChatGptSchema` is different with the OpenAPI v3.1 JSON schema.\n> \n> - Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}\n> - Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}\n> - Tuple type is banned: {@link OpenApiV3_1.IJsonSchema.ITuple.prefixItems}\n> - Constant type is banned: {@link OpenApiV3_1.IJsonSchema.IConstant}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IOneOf} to {@link IChatGptSchema.IAnOf}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link IChatGptSchema.IObject}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link IChatGptSchema.IReference}\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> If compare with the {@link OpenApi.IJsonSchema}, the emended JSON schema specification,\n> \n> - {@link IChatGptSchema.IAnyOf} instead of the {@link OpenApi.IJsonSchema.IOneOf}\n> - {@link IChatGptSchema.IParameters.$defs} instead of the {@link OpenApi.IJsonSchema.IComponents.schemas}\n> - {@link IChatGptSchema.IString.enum} instead of the {@link OpenApi.IJsonSchema.IConstant}\n> - {@link IChatGptSchema.additionalProperties} is fixed to `false`\n> - No tuple type {@link OpenApi.IJsonSchema.ITuple} support\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> For reference, if you've composed the `IChatGptSchema` type with the\n> {@link IChatGptSchema.IConfig.reference} `false` option (default is `false`),\n> only the recursived named types would be archived into the\n> {@link IChatGptSchema.IParameters.$defs}, and the others would be ecaped from the\n> {@link IChatGptSchema.IReference} type.\n> \n> Also, OpenAI has banned below constraint properties. Instead, `IChatGptSchema`\n> fills the {@link IChatGptSchema.__IAttribute.description} property with\n> the comment text like `\"@format uuid\"`.\n> \n> - {@link OpenApi.IJsonSchema.INumber.minimum}\n> - {@link OpenApi.IJsonSchema.INumber.maximum}\n> - {@link OpenApi.IJsonSchema.INumber.multipleOf}\n> - {@link OpenApi.IJsonSchema.IString.minLength}\n> - {@link OpenApi.IJsonSchema.IString.maxLength}\n> - {@link OpenApi.IJsonSchema.IString.format}\n> - {@link OpenApi.IJsonSchema.IString.pattern}\n> - {@link OpenApi.IJsonSchema.IString.contentMediaType}\n> - {@link OpenApi.IJsonSchema.IString.default}\n> - {@link OpenApi.IJsonSchema.IArray.minItems}\n> - {@link OpenApi.IJsonSchema.IArray.maxItems}\n> - {@link OpenApi.IJsonSchema.IArray.unique}\n> \n> Additionally, OpenAI cannot define the `description` property to the\n> {@link IChatGptSchema.IReference} type, and even does not understand\n> the capsulization to the {@link IChatGptSchema.IAnyOf} type.\n> Therefore, the `description` is written to the parent object type,\n> not the reference type.\n> \n> ```json\n> {\n>   \"type\": \"object\",\n>   \"description\": \"### Description of {@link something} property.\\n\\n> Hello?\",\n>   \"properties\": {\n>     \"something\": {\n>       \"$ref\": \"#/$defs/SomeObject\"\n>     }\n>   }\n> }\n> ```"
                                    },
                                    {
                                        $ref: "#/$defs/IChatGptSchema.IArray"
                                    },
                                    {
                                        $ref: "#/$defs/IChatGptSchema.IObject"
                                    },
                                    {
                                        type: "object",
                                        properties: {
                                            $ref: {
                                                title: "Reference to the named schema",
                                                description: "Reference to the named schema.\n\nThe `ref` is a reference to the named schema. Format of the `$ref` is\nfollowing the JSON Pointer specification. In the OpenAPI, the `$ref`\nstarts with `#/$defs/` which means the type is stored in\nthe {@link IChatGptSchema.IParameters.$defs} object.\n\n- `#/$defs/SomeObject`\n- `#/$defs/AnotherObject`",
                                                type: "string"
                                            },
                                            title: {
                                                title: "Title of the schema",
                                                description: "Title of the schema.",
                                                type: "string"
                                            },
                                            description: {
                                                title: "Detailed description of the schema",
                                                description: "Detailed description of the schema.",
                                                type: "string"
                                            },
                                            deprecated: {
                                                title: "Whether the type is deprecated or not",
                                                description: "Whether the type is deprecated or not.",
                                                type: "boolean"
                                            },
                                            example: {
                                                title: "Example value",
                                                description: "Example value."
                                            },
                                            examples: {
                                                description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                                type: "object",
                                                properties: {},
                                                required: [],
                                                additionalProperties: {}
                                            }
                                        },
                                        required: [
                                            "$ref"
                                        ],
                                        description: "Description of the current {@link IChatGptSchema.IReference} type:\n\n> Reference type directing named schema.\n\n------------------------------\n\nDescription of the parent {@link IChatGptSchema} type:\n\n> Type schema info of the ChatGPT.\n> \n> `IChatGptSchema` is a type schema info of the ChatGPT function calling.\n> \n> `IChatGptSchema` basically follows the JSON schema definition of the OpenAPI v3.1\n> speciifcation; {@link OpenApiV3_1.IJsonSchema}.\n> \n> However, the `IChatGptSchema` does not follow the entire specification of\n> the OpenAPI v3.1. It has own specific restrictions and definitions. Here is the\n> list of how `IChatGptSchema` is different with the OpenAPI v3.1 JSON schema.\n> \n> - Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}\n> - Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}\n> - Tuple type is banned: {@link OpenApiV3_1.IJsonSchema.ITuple.prefixItems}\n> - Constant type is banned: {@link OpenApiV3_1.IJsonSchema.IConstant}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IOneOf} to {@link IChatGptSchema.IAnOf}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link IChatGptSchema.IObject}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link IChatGptSchema.IReference}\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> If compare with the {@link OpenApi.IJsonSchema}, the emended JSON schema specification,\n> \n> - {@link IChatGptSchema.IAnyOf} instead of the {@link OpenApi.IJsonSchema.IOneOf}\n> - {@link IChatGptSchema.IParameters.$defs} instead of the {@link OpenApi.IJsonSchema.IComponents.schemas}\n> - {@link IChatGptSchema.IString.enum} instead of the {@link OpenApi.IJsonSchema.IConstant}\n> - {@link IChatGptSchema.additionalProperties} is fixed to `false`\n> - No tuple type {@link OpenApi.IJsonSchema.ITuple} support\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> For reference, if you've composed the `IChatGptSchema` type with the\n> {@link IChatGptSchema.IConfig.reference} `false` option (default is `false`),\n> only the recursived named types would be archived into the\n> {@link IChatGptSchema.IParameters.$defs}, and the others would be ecaped from the\n> {@link IChatGptSchema.IReference} type.\n> \n> Also, OpenAI has banned below constraint properties. Instead, `IChatGptSchema`\n> fills the {@link IChatGptSchema.__IAttribute.description} property with\n> the comment text like `\"@format uuid\"`.\n> \n> - {@link OpenApi.IJsonSchema.INumber.minimum}\n> - {@link OpenApi.IJsonSchema.INumber.maximum}\n> - {@link OpenApi.IJsonSchema.INumber.multipleOf}\n> - {@link OpenApi.IJsonSchema.IString.minLength}\n> - {@link OpenApi.IJsonSchema.IString.maxLength}\n> - {@link OpenApi.IJsonSchema.IString.format}\n> - {@link OpenApi.IJsonSchema.IString.pattern}\n> - {@link OpenApi.IJsonSchema.IString.contentMediaType}\n> - {@link OpenApi.IJsonSchema.IString.default}\n> - {@link OpenApi.IJsonSchema.IArray.minItems}\n> - {@link OpenApi.IJsonSchema.IArray.maxItems}\n> - {@link OpenApi.IJsonSchema.IArray.unique}\n> \n> Additionally, OpenAI cannot define the `description` property to the\n> {@link IChatGptSchema.IReference} type, and even does not understand\n> the capsulization to the {@link IChatGptSchema.IAnyOf} type.\n> Therefore, the `description` is written to the parent object type,\n> not the reference type.\n> \n> ```json\n> {\n>   \"type\": \"object\",\n>   \"description\": \"### Description of {@link something} property.\\n\\n> Hello?\",\n>   \"properties\": {\n>     \"something\": {\n>       \"$ref\": \"#/$defs/SomeObject\"\n>     }\n>   }\n> }\n> ```"
                                    },
                                    {
                                        $ref: "#/$defs/IChatGptSchema.IAnyOf"
                                    },
                                    {
                                        type: "object",
                                        properties: {
                                            title: {
                                                title: "Title of the schema",
                                                description: "Title of the schema.",
                                                type: "string"
                                            },
                                            description: {
                                                title: "Detailed description of the schema",
                                                description: "Detailed description of the schema.",
                                                type: "string"
                                            },
                                            deprecated: {
                                                title: "Whether the type is deprecated or not",
                                                description: "Whether the type is deprecated or not.",
                                                type: "boolean"
                                            },
                                            example: {
                                                title: "Example value",
                                                description: "Example value."
                                            },
                                            examples: {
                                                description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                                type: "object",
                                                properties: {},
                                                required: [],
                                                additionalProperties: {}
                                            }
                                        },
                                        required: [],
                                        description: "Description of the current {@link IChatGptSchema.IUnknown} type:\n\n> Unknown, the `any` type.\n\n------------------------------\n\nDescription of the parent {@link IChatGptSchema} type:\n\n> Type schema info of the ChatGPT.\n> \n> `IChatGptSchema` is a type schema info of the ChatGPT function calling.\n> \n> `IChatGptSchema` basically follows the JSON schema definition of the OpenAPI v3.1\n> speciifcation; {@link OpenApiV3_1.IJsonSchema}.\n> \n> However, the `IChatGptSchema` does not follow the entire specification of\n> the OpenAPI v3.1. It has own specific restrictions and definitions. Here is the\n> list of how `IChatGptSchema` is different with the OpenAPI v3.1 JSON schema.\n> \n> - Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}\n> - Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}\n> - Tuple type is banned: {@link OpenApiV3_1.IJsonSchema.ITuple.prefixItems}\n> - Constant type is banned: {@link OpenApiV3_1.IJsonSchema.IConstant}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IOneOf} to {@link IChatGptSchema.IAnOf}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link IChatGptSchema.IObject}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link IChatGptSchema.IReference}\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> If compare with the {@link OpenApi.IJsonSchema}, the emended JSON schema specification,\n> \n> - {@link IChatGptSchema.IAnyOf} instead of the {@link OpenApi.IJsonSchema.IOneOf}\n> - {@link IChatGptSchema.IParameters.$defs} instead of the {@link OpenApi.IJsonSchema.IComponents.schemas}\n> - {@link IChatGptSchema.IString.enum} instead of the {@link OpenApi.IJsonSchema.IConstant}\n> - {@link IChatGptSchema.additionalProperties} is fixed to `false`\n> - No tuple type {@link OpenApi.IJsonSchema.ITuple} support\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> For reference, if you've composed the `IChatGptSchema` type with the\n> {@link IChatGptSchema.IConfig.reference} `false` option (default is `false`),\n> only the recursived named types would be archived into the\n> {@link IChatGptSchema.IParameters.$defs}, and the others would be ecaped from the\n> {@link IChatGptSchema.IReference} type.\n> \n> Also, OpenAI has banned below constraint properties. Instead, `IChatGptSchema`\n> fills the {@link IChatGptSchema.__IAttribute.description} property with\n> the comment text like `\"@format uuid\"`.\n> \n> - {@link OpenApi.IJsonSchema.INumber.minimum}\n> - {@link OpenApi.IJsonSchema.INumber.maximum}\n> - {@link OpenApi.IJsonSchema.INumber.multipleOf}\n> - {@link OpenApi.IJsonSchema.IString.minLength}\n> - {@link OpenApi.IJsonSchema.IString.maxLength}\n> - {@link OpenApi.IJsonSchema.IString.format}\n> - {@link OpenApi.IJsonSchema.IString.pattern}\n> - {@link OpenApi.IJsonSchema.IString.contentMediaType}\n> - {@link OpenApi.IJsonSchema.IString.default}\n> - {@link OpenApi.IJsonSchema.IArray.minItems}\n> - {@link OpenApi.IJsonSchema.IArray.maxItems}\n> - {@link OpenApi.IJsonSchema.IArray.unique}\n> \n> Additionally, OpenAI cannot define the `description` property to the\n> {@link IChatGptSchema.IReference} type, and even does not understand\n> the capsulization to the {@link IChatGptSchema.IAnyOf} type.\n> Therefore, the `description` is written to the parent object type,\n> not the reference type.\n> \n> ```json\n> {\n>   \"type\": \"object\",\n>   \"description\": \"### Description of {@link something} property.\\n\\n> Hello?\",\n>   \"properties\": {\n>     \"something\": {\n>       \"$ref\": \"#/$defs/SomeObject\"\n>     }\n>   }\n> }\n> ```"
                                    },
                                    {
                                        type: "object",
                                        properties: {
                                            type: {
                                                title: "Discriminator value of the type",
                                                description: "Discriminator value of the type.",
                                                type: "string",
                                                "enum": [
                                                    "null"
                                                ]
                                            },
                                            title: {
                                                title: "Title of the schema",
                                                description: "Title of the schema.",
                                                type: "string"
                                            },
                                            description: {
                                                title: "Detailed description of the schema",
                                                description: "Detailed description of the schema.",
                                                type: "string"
                                            },
                                            deprecated: {
                                                title: "Whether the type is deprecated or not",
                                                description: "Whether the type is deprecated or not.",
                                                type: "boolean"
                                            },
                                            example: {
                                                title: "Example value",
                                                description: "Example value."
                                            },
                                            examples: {
                                                description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                                type: "object",
                                                properties: {},
                                                required: [],
                                                additionalProperties: {}
                                            }
                                        },
                                        required: [
                                            "type"
                                        ],
                                        description: "Description of the current {@link IChatGptSchema.INull} type:\n\n> Null type.\n\n------------------------------\n\nDescription of the parent {@link IChatGptSchema} type:\n\n> Type schema info of the ChatGPT.\n> \n> `IChatGptSchema` is a type schema info of the ChatGPT function calling.\n> \n> `IChatGptSchema` basically follows the JSON schema definition of the OpenAPI v3.1\n> speciifcation; {@link OpenApiV3_1.IJsonSchema}.\n> \n> However, the `IChatGptSchema` does not follow the entire specification of\n> the OpenAPI v3.1. It has own specific restrictions and definitions. Here is the\n> list of how `IChatGptSchema` is different with the OpenAPI v3.1 JSON schema.\n> \n> - Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}\n> - Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}\n> - Tuple type is banned: {@link OpenApiV3_1.IJsonSchema.ITuple.prefixItems}\n> - Constant type is banned: {@link OpenApiV3_1.IJsonSchema.IConstant}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IOneOf} to {@link IChatGptSchema.IAnOf}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link IChatGptSchema.IObject}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link IChatGptSchema.IReference}\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> If compare with the {@link OpenApi.IJsonSchema}, the emended JSON schema specification,\n> \n> - {@link IChatGptSchema.IAnyOf} instead of the {@link OpenApi.IJsonSchema.IOneOf}\n> - {@link IChatGptSchema.IParameters.$defs} instead of the {@link OpenApi.IJsonSchema.IComponents.schemas}\n> - {@link IChatGptSchema.IString.enum} instead of the {@link OpenApi.IJsonSchema.IConstant}\n> - {@link IChatGptSchema.additionalProperties} is fixed to `false`\n> - No tuple type {@link OpenApi.IJsonSchema.ITuple} support\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> For reference, if you've composed the `IChatGptSchema` type with the\n> {@link IChatGptSchema.IConfig.reference} `false` option (default is `false`),\n> only the recursived named types would be archived into the\n> {@link IChatGptSchema.IParameters.$defs}, and the others would be ecaped from the\n> {@link IChatGptSchema.IReference} type.\n> \n> Also, OpenAI has banned below constraint properties. Instead, `IChatGptSchema`\n> fills the {@link IChatGptSchema.__IAttribute.description} property with\n> the comment text like `\"@format uuid\"`.\n> \n> - {@link OpenApi.IJsonSchema.INumber.minimum}\n> - {@link OpenApi.IJsonSchema.INumber.maximum}\n> - {@link OpenApi.IJsonSchema.INumber.multipleOf}\n> - {@link OpenApi.IJsonSchema.IString.minLength}\n> - {@link OpenApi.IJsonSchema.IString.maxLength}\n> - {@link OpenApi.IJsonSchema.IString.format}\n> - {@link OpenApi.IJsonSchema.IString.pattern}\n> - {@link OpenApi.IJsonSchema.IString.contentMediaType}\n> - {@link OpenApi.IJsonSchema.IString.default}\n> - {@link OpenApi.IJsonSchema.IArray.minItems}\n> - {@link OpenApi.IJsonSchema.IArray.maxItems}\n> - {@link OpenApi.IJsonSchema.IArray.unique}\n> \n> Additionally, OpenAI cannot define the `description` property to the\n> {@link IChatGptSchema.IReference} type, and even does not understand\n> the capsulization to the {@link IChatGptSchema.IAnyOf} type.\n> Therefore, the `description` is written to the parent object type,\n> not the reference type.\n> \n> ```json\n> {\n>   \"type\": \"object\",\n>   \"description\": \"### Description of {@link something} property.\\n\\n> Hello?\",\n>   \"properties\": {\n>     \"something\": {\n>       \"$ref\": \"#/$defs/SomeObject\"\n>     }\n>   }\n> }\n> ```"
                                    }
                                ]
                            },
                            required: {
                                title: "List of key values of the required properties",
                                description: "List of key values of the required properties.\n\nThe `required` means a list of the key values of the required\n{@link properties}. If some property key is not listed in the `required`\nlist, it means that property is optional. Otherwise some property key\nexists in the `required` list, it means that the property must be filled.\n\nBelow is an example of the {@link properties} and `required`.\n\n```typescript\ninterface SomeObject {\n  id: string;\n  email: string;\n  name?: string;\n}\n```\n\nAs you can see, `id` and `email` {@link properties} are {@link required},\nso that they are listed in the `required` list.\n\n```json\n{\n  \"type\": \"object\",\n  \"properties\": {\n    \"id\": { \"type\": \"string\" },\n    \"email\": { \"type\": \"string\" },\n    \"name\": { \"type\": \"string\" }\n  },\n  \"required\": [\"id\", \"email\"]\n}\n```",
                                type: "array",
                                items: {
                                    type: "string"
                                }
                            },
                            type: {
                                title: "Discriminator value of the type",
                                description: "Discriminator value of the type.",
                                type: "string",
                                "enum": [
                                    "object"
                                ]
                            },
                            title: {
                                title: "Title of the schema",
                                description: "Title of the schema.",
                                type: "string"
                            },
                            description: {
                                title: "Detailed description of the schema",
                                description: "Detailed description of the schema.",
                                type: "string"
                            },
                            deprecated: {
                                title: "Whether the type is deprecated or not",
                                description: "Whether the type is deprecated or not.",
                                type: "boolean"
                            },
                            example: {
                                title: "Example value",
                                description: "Example value."
                            },
                            examples: {
                                description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                type: "object",
                                properties: {},
                                required: [],
                                additionalProperties: {}
                            }
                        },
                        required: [
                            "properties",
                            "required",
                            "type"
                        ]
                    },
                    "IChatGptSchema.IAnyOf": {
                        description: "Union type.\n\n`IOneOf` represents an union type of the TypeScript (`A | B | C`).\n\nFor reference, even though your Swagger (or OpenAPI) document has\ndefined `anyOf` instead of the `oneOf`, {@link IChatGptSchema} forcibly\nconverts it to `oneOf` type.",
                        type: "object",
                        properties: {
                            anyOf: {
                                title: "List of the union types",
                                description: "List of the union types.",
                                type: "array",
                                items: {
                                    anyOf: [
                                        {
                                            type: "object",
                                            properties: {
                                                "enum": {
                                                    title: "Enumeration values",
                                                    description: "Enumeration values.",
                                                    type: "array",
                                                    items: {
                                                        type: "string"
                                                    }
                                                },
                                                type: {
                                                    title: "Discriminator value of the type",
                                                    description: "Discriminator value of the type.",
                                                    type: "string",
                                                    "enum": [
                                                        "string"
                                                    ]
                                                },
                                                title: {
                                                    title: "Title of the schema",
                                                    description: "Title of the schema.",
                                                    type: "string"
                                                },
                                                description: {
                                                    title: "Detailed description of the schema",
                                                    description: "Detailed description of the schema.",
                                                    type: "string"
                                                },
                                                deprecated: {
                                                    title: "Whether the type is deprecated or not",
                                                    description: "Whether the type is deprecated or not.",
                                                    type: "boolean"
                                                },
                                                example: {
                                                    title: "Example value",
                                                    description: "Example value."
                                                },
                                                examples: {
                                                    description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                                    type: "object",
                                                    properties: {},
                                                    required: [],
                                                    additionalProperties: {}
                                                }
                                            },
                                            required: [
                                                "type"
                                            ],
                                            description: "Description of the current {@link IChatGptSchema.IString} type:\n\n> String type info.\n\n------------------------------\n\nDescription of the parent {@link IChatGptSchema} type:\n\n> Type schema info of the ChatGPT.\n> \n> `IChatGptSchema` is a type schema info of the ChatGPT function calling.\n> \n> `IChatGptSchema` basically follows the JSON schema definition of the OpenAPI v3.1\n> speciifcation; {@link OpenApiV3_1.IJsonSchema}.\n> \n> However, the `IChatGptSchema` does not follow the entire specification of\n> the OpenAPI v3.1. It has own specific restrictions and definitions. Here is the\n> list of how `IChatGptSchema` is different with the OpenAPI v3.1 JSON schema.\n> \n> - Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}\n> - Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}\n> - Tuple type is banned: {@link OpenApiV3_1.IJsonSchema.ITuple.prefixItems}\n> - Constant type is banned: {@link OpenApiV3_1.IJsonSchema.IConstant}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IOneOf} to {@link IChatGptSchema.IAnOf}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link IChatGptSchema.IObject}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link IChatGptSchema.IReference}\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> If compare with the {@link OpenApi.IJsonSchema}, the emended JSON schema specification,\n> \n> - {@link IChatGptSchema.IAnyOf} instead of the {@link OpenApi.IJsonSchema.IOneOf}\n> - {@link IChatGptSchema.IParameters.$defs} instead of the {@link OpenApi.IJsonSchema.IComponents.schemas}\n> - {@link IChatGptSchema.IString.enum} instead of the {@link OpenApi.IJsonSchema.IConstant}\n> - {@link IChatGptSchema.additionalProperties} is fixed to `false`\n> - No tuple type {@link OpenApi.IJsonSchema.ITuple} support\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> For reference, if you've composed the `IChatGptSchema` type with the\n> {@link IChatGptSchema.IConfig.reference} `false` option (default is `false`),\n> only the recursived named types would be archived into the\n> {@link IChatGptSchema.IParameters.$defs}, and the others would be ecaped from the\n> {@link IChatGptSchema.IReference} type.\n> \n> Also, OpenAI has banned below constraint properties. Instead, `IChatGptSchema`\n> fills the {@link IChatGptSchema.__IAttribute.description} property with\n> the comment text like `\"@format uuid\"`.\n> \n> - {@link OpenApi.IJsonSchema.INumber.minimum}\n> - {@link OpenApi.IJsonSchema.INumber.maximum}\n> - {@link OpenApi.IJsonSchema.INumber.multipleOf}\n> - {@link OpenApi.IJsonSchema.IString.minLength}\n> - {@link OpenApi.IJsonSchema.IString.maxLength}\n> - {@link OpenApi.IJsonSchema.IString.format}\n> - {@link OpenApi.IJsonSchema.IString.pattern}\n> - {@link OpenApi.IJsonSchema.IString.contentMediaType}\n> - {@link OpenApi.IJsonSchema.IString.default}\n> - {@link OpenApi.IJsonSchema.IArray.minItems}\n> - {@link OpenApi.IJsonSchema.IArray.maxItems}\n> - {@link OpenApi.IJsonSchema.IArray.unique}\n> \n> Additionally, OpenAI cannot define the `description` property to the\n> {@link IChatGptSchema.IReference} type, and even does not understand\n> the capsulization to the {@link IChatGptSchema.IAnyOf} type.\n> Therefore, the `description` is written to the parent object type,\n> not the reference type.\n> \n> ```json\n> {\n>   \"type\": \"object\",\n>   \"description\": \"### Description of {@link something} property.\\n\\n> Hello?\",\n>   \"properties\": {\n>     \"something\": {\n>       \"$ref\": \"#/$defs/SomeObject\"\n>     }\n>   }\n> }\n> ```"
                                        },
                                        {
                                            type: "object",
                                            properties: {
                                                "enum": {
                                                    title: "Enumeration values",
                                                    description: "Enumeration values.",
                                                    type: "array",
                                                    items: {
                                                        type: "number"
                                                    }
                                                },
                                                type: {
                                                    title: "Discriminator value of the type",
                                                    description: "Discriminator value of the type.",
                                                    type: "string",
                                                    "enum": [
                                                        "number"
                                                    ]
                                                },
                                                title: {
                                                    title: "Title of the schema",
                                                    description: "Title of the schema.",
                                                    type: "string"
                                                },
                                                description: {
                                                    title: "Detailed description of the schema",
                                                    description: "Detailed description of the schema.",
                                                    type: "string"
                                                },
                                                deprecated: {
                                                    title: "Whether the type is deprecated or not",
                                                    description: "Whether the type is deprecated or not.",
                                                    type: "boolean"
                                                },
                                                example: {
                                                    title: "Example value",
                                                    description: "Example value."
                                                },
                                                examples: {
                                                    description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                                    type: "object",
                                                    properties: {},
                                                    required: [],
                                                    additionalProperties: {}
                                                }
                                            },
                                            required: [
                                                "type"
                                            ],
                                            description: "Description of the current {@link IChatGptSchema.INumber} type:\n\n> Number (double) type info.\n\n------------------------------\n\nDescription of the parent {@link IChatGptSchema} type:\n\n> Type schema info of the ChatGPT.\n> \n> `IChatGptSchema` is a type schema info of the ChatGPT function calling.\n> \n> `IChatGptSchema` basically follows the JSON schema definition of the OpenAPI v3.1\n> speciifcation; {@link OpenApiV3_1.IJsonSchema}.\n> \n> However, the `IChatGptSchema` does not follow the entire specification of\n> the OpenAPI v3.1. It has own specific restrictions and definitions. Here is the\n> list of how `IChatGptSchema` is different with the OpenAPI v3.1 JSON schema.\n> \n> - Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}\n> - Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}\n> - Tuple type is banned: {@link OpenApiV3_1.IJsonSchema.ITuple.prefixItems}\n> - Constant type is banned: {@link OpenApiV3_1.IJsonSchema.IConstant}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IOneOf} to {@link IChatGptSchema.IAnOf}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link IChatGptSchema.IObject}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link IChatGptSchema.IReference}\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> If compare with the {@link OpenApi.IJsonSchema}, the emended JSON schema specification,\n> \n> - {@link IChatGptSchema.IAnyOf} instead of the {@link OpenApi.IJsonSchema.IOneOf}\n> - {@link IChatGptSchema.IParameters.$defs} instead of the {@link OpenApi.IJsonSchema.IComponents.schemas}\n> - {@link IChatGptSchema.IString.enum} instead of the {@link OpenApi.IJsonSchema.IConstant}\n> - {@link IChatGptSchema.additionalProperties} is fixed to `false`\n> - No tuple type {@link OpenApi.IJsonSchema.ITuple} support\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> For reference, if you've composed the `IChatGptSchema` type with the\n> {@link IChatGptSchema.IConfig.reference} `false` option (default is `false`),\n> only the recursived named types would be archived into the\n> {@link IChatGptSchema.IParameters.$defs}, and the others would be ecaped from the\n> {@link IChatGptSchema.IReference} type.\n> \n> Also, OpenAI has banned below constraint properties. Instead, `IChatGptSchema`\n> fills the {@link IChatGptSchema.__IAttribute.description} property with\n> the comment text like `\"@format uuid\"`.\n> \n> - {@link OpenApi.IJsonSchema.INumber.minimum}\n> - {@link OpenApi.IJsonSchema.INumber.maximum}\n> - {@link OpenApi.IJsonSchema.INumber.multipleOf}\n> - {@link OpenApi.IJsonSchema.IString.minLength}\n> - {@link OpenApi.IJsonSchema.IString.maxLength}\n> - {@link OpenApi.IJsonSchema.IString.format}\n> - {@link OpenApi.IJsonSchema.IString.pattern}\n> - {@link OpenApi.IJsonSchema.IString.contentMediaType}\n> - {@link OpenApi.IJsonSchema.IString.default}\n> - {@link OpenApi.IJsonSchema.IArray.minItems}\n> - {@link OpenApi.IJsonSchema.IArray.maxItems}\n> - {@link OpenApi.IJsonSchema.IArray.unique}\n> \n> Additionally, OpenAI cannot define the `description` property to the\n> {@link IChatGptSchema.IReference} type, and even does not understand\n> the capsulization to the {@link IChatGptSchema.IAnyOf} type.\n> Therefore, the `description` is written to the parent object type,\n> not the reference type.\n> \n> ```json\n> {\n>   \"type\": \"object\",\n>   \"description\": \"### Description of {@link something} property.\\n\\n> Hello?\",\n>   \"properties\": {\n>     \"something\": {\n>       \"$ref\": \"#/$defs/SomeObject\"\n>     }\n>   }\n> }\n> ```"
                                        },
                                        {
                                            type: "object",
                                            properties: {
                                                "enum": {
                                                    title: "Enumeration values",
                                                    description: "Enumeration values.",
                                                    type: "array",
                                                    items: {
                                                        type: "number"
                                                    }
                                                },
                                                type: {
                                                    title: "Discriminator value of the type",
                                                    description: "Discriminator value of the type.",
                                                    type: "string",
                                                    "enum": [
                                                        "integer"
                                                    ]
                                                },
                                                title: {
                                                    title: "Title of the schema",
                                                    description: "Title of the schema.",
                                                    type: "string"
                                                },
                                                description: {
                                                    title: "Detailed description of the schema",
                                                    description: "Detailed description of the schema.",
                                                    type: "string"
                                                },
                                                deprecated: {
                                                    title: "Whether the type is deprecated or not",
                                                    description: "Whether the type is deprecated or not.",
                                                    type: "boolean"
                                                },
                                                example: {
                                                    title: "Example value",
                                                    description: "Example value."
                                                },
                                                examples: {
                                                    description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                                    type: "object",
                                                    properties: {},
                                                    required: [],
                                                    additionalProperties: {}
                                                }
                                            },
                                            required: [
                                                "type"
                                            ],
                                            description: "Description of the current {@link IChatGptSchema.IInteger} type:\n\n> Integer type info.\n\n------------------------------\n\nDescription of the parent {@link IChatGptSchema} type:\n\n> Type schema info of the ChatGPT.\n> \n> `IChatGptSchema` is a type schema info of the ChatGPT function calling.\n> \n> `IChatGptSchema` basically follows the JSON schema definition of the OpenAPI v3.1\n> speciifcation; {@link OpenApiV3_1.IJsonSchema}.\n> \n> However, the `IChatGptSchema` does not follow the entire specification of\n> the OpenAPI v3.1. It has own specific restrictions and definitions. Here is the\n> list of how `IChatGptSchema` is different with the OpenAPI v3.1 JSON schema.\n> \n> - Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}\n> - Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}\n> - Tuple type is banned: {@link OpenApiV3_1.IJsonSchema.ITuple.prefixItems}\n> - Constant type is banned: {@link OpenApiV3_1.IJsonSchema.IConstant}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IOneOf} to {@link IChatGptSchema.IAnOf}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link IChatGptSchema.IObject}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link IChatGptSchema.IReference}\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> If compare with the {@link OpenApi.IJsonSchema}, the emended JSON schema specification,\n> \n> - {@link IChatGptSchema.IAnyOf} instead of the {@link OpenApi.IJsonSchema.IOneOf}\n> - {@link IChatGptSchema.IParameters.$defs} instead of the {@link OpenApi.IJsonSchema.IComponents.schemas}\n> - {@link IChatGptSchema.IString.enum} instead of the {@link OpenApi.IJsonSchema.IConstant}\n> - {@link IChatGptSchema.additionalProperties} is fixed to `false`\n> - No tuple type {@link OpenApi.IJsonSchema.ITuple} support\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> For reference, if you've composed the `IChatGptSchema` type with the\n> {@link IChatGptSchema.IConfig.reference} `false` option (default is `false`),\n> only the recursived named types would be archived into the\n> {@link IChatGptSchema.IParameters.$defs}, and the others would be ecaped from the\n> {@link IChatGptSchema.IReference} type.\n> \n> Also, OpenAI has banned below constraint properties. Instead, `IChatGptSchema`\n> fills the {@link IChatGptSchema.__IAttribute.description} property with\n> the comment text like `\"@format uuid\"`.\n> \n> - {@link OpenApi.IJsonSchema.INumber.minimum}\n> - {@link OpenApi.IJsonSchema.INumber.maximum}\n> - {@link OpenApi.IJsonSchema.INumber.multipleOf}\n> - {@link OpenApi.IJsonSchema.IString.minLength}\n> - {@link OpenApi.IJsonSchema.IString.maxLength}\n> - {@link OpenApi.IJsonSchema.IString.format}\n> - {@link OpenApi.IJsonSchema.IString.pattern}\n> - {@link OpenApi.IJsonSchema.IString.contentMediaType}\n> - {@link OpenApi.IJsonSchema.IString.default}\n> - {@link OpenApi.IJsonSchema.IArray.minItems}\n> - {@link OpenApi.IJsonSchema.IArray.maxItems}\n> - {@link OpenApi.IJsonSchema.IArray.unique}\n> \n> Additionally, OpenAI cannot define the `description` property to the\n> {@link IChatGptSchema.IReference} type, and even does not understand\n> the capsulization to the {@link IChatGptSchema.IAnyOf} type.\n> Therefore, the `description` is written to the parent object type,\n> not the reference type.\n> \n> ```json\n> {\n>   \"type\": \"object\",\n>   \"description\": \"### Description of {@link something} property.\\n\\n> Hello?\",\n>   \"properties\": {\n>     \"something\": {\n>       \"$ref\": \"#/$defs/SomeObject\"\n>     }\n>   }\n> }\n> ```"
                                        },
                                        {
                                            type: "object",
                                            properties: {
                                                "enum": {
                                                    title: "Enumeration values",
                                                    description: "Enumeration values.",
                                                    type: "array",
                                                    items: {
                                                        type: "boolean"
                                                    }
                                                },
                                                type: {
                                                    title: "Discriminator value of the type",
                                                    description: "Discriminator value of the type.",
                                                    type: "string",
                                                    "enum": [
                                                        "boolean"
                                                    ]
                                                },
                                                title: {
                                                    title: "Title of the schema",
                                                    description: "Title of the schema.",
                                                    type: "string"
                                                },
                                                description: {
                                                    title: "Detailed description of the schema",
                                                    description: "Detailed description of the schema.",
                                                    type: "string"
                                                },
                                                deprecated: {
                                                    title: "Whether the type is deprecated or not",
                                                    description: "Whether the type is deprecated or not.",
                                                    type: "boolean"
                                                },
                                                example: {
                                                    title: "Example value",
                                                    description: "Example value."
                                                },
                                                examples: {
                                                    description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                                    type: "object",
                                                    properties: {},
                                                    required: [],
                                                    additionalProperties: {}
                                                }
                                            },
                                            required: [
                                                "type"
                                            ],
                                            description: "Description of the current {@link IChatGptSchema.IBoolean} type:\n\n> Boolean type info.\n\n------------------------------\n\nDescription of the parent {@link IChatGptSchema} type:\n\n> Type schema info of the ChatGPT.\n> \n> `IChatGptSchema` is a type schema info of the ChatGPT function calling.\n> \n> `IChatGptSchema` basically follows the JSON schema definition of the OpenAPI v3.1\n> speciifcation; {@link OpenApiV3_1.IJsonSchema}.\n> \n> However, the `IChatGptSchema` does not follow the entire specification of\n> the OpenAPI v3.1. It has own specific restrictions and definitions. Here is the\n> list of how `IChatGptSchema` is different with the OpenAPI v3.1 JSON schema.\n> \n> - Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}\n> - Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}\n> - Tuple type is banned: {@link OpenApiV3_1.IJsonSchema.ITuple.prefixItems}\n> - Constant type is banned: {@link OpenApiV3_1.IJsonSchema.IConstant}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IOneOf} to {@link IChatGptSchema.IAnOf}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link IChatGptSchema.IObject}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link IChatGptSchema.IReference}\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> If compare with the {@link OpenApi.IJsonSchema}, the emended JSON schema specification,\n> \n> - {@link IChatGptSchema.IAnyOf} instead of the {@link OpenApi.IJsonSchema.IOneOf}\n> - {@link IChatGptSchema.IParameters.$defs} instead of the {@link OpenApi.IJsonSchema.IComponents.schemas}\n> - {@link IChatGptSchema.IString.enum} instead of the {@link OpenApi.IJsonSchema.IConstant}\n> - {@link IChatGptSchema.additionalProperties} is fixed to `false`\n> - No tuple type {@link OpenApi.IJsonSchema.ITuple} support\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> For reference, if you've composed the `IChatGptSchema` type with the\n> {@link IChatGptSchema.IConfig.reference} `false` option (default is `false`),\n> only the recursived named types would be archived into the\n> {@link IChatGptSchema.IParameters.$defs}, and the others would be ecaped from the\n> {@link IChatGptSchema.IReference} type.\n> \n> Also, OpenAI has banned below constraint properties. Instead, `IChatGptSchema`\n> fills the {@link IChatGptSchema.__IAttribute.description} property with\n> the comment text like `\"@format uuid\"`.\n> \n> - {@link OpenApi.IJsonSchema.INumber.minimum}\n> - {@link OpenApi.IJsonSchema.INumber.maximum}\n> - {@link OpenApi.IJsonSchema.INumber.multipleOf}\n> - {@link OpenApi.IJsonSchema.IString.minLength}\n> - {@link OpenApi.IJsonSchema.IString.maxLength}\n> - {@link OpenApi.IJsonSchema.IString.format}\n> - {@link OpenApi.IJsonSchema.IString.pattern}\n> - {@link OpenApi.IJsonSchema.IString.contentMediaType}\n> - {@link OpenApi.IJsonSchema.IString.default}\n> - {@link OpenApi.IJsonSchema.IArray.minItems}\n> - {@link OpenApi.IJsonSchema.IArray.maxItems}\n> - {@link OpenApi.IJsonSchema.IArray.unique}\n> \n> Additionally, OpenAI cannot define the `description` property to the\n> {@link IChatGptSchema.IReference} type, and even does not understand\n> the capsulization to the {@link IChatGptSchema.IAnyOf} type.\n> Therefore, the `description` is written to the parent object type,\n> not the reference type.\n> \n> ```json\n> {\n>   \"type\": \"object\",\n>   \"description\": \"### Description of {@link something} property.\\n\\n> Hello?\",\n>   \"properties\": {\n>     \"something\": {\n>       \"$ref\": \"#/$defs/SomeObject\"\n>     }\n>   }\n> }\n> ```"
                                        },
                                        {
                                            $ref: "#/$defs/IChatGptSchema.IArray"
                                        },
                                        {
                                            $ref: "#/$defs/IChatGptSchema.IObject"
                                        },
                                        {
                                            type: "object",
                                            properties: {
                                                $ref: {
                                                    title: "Reference to the named schema",
                                                    description: "Reference to the named schema.\n\nThe `ref` is a reference to the named schema. Format of the `$ref` is\nfollowing the JSON Pointer specification. In the OpenAPI, the `$ref`\nstarts with `#/$defs/` which means the type is stored in\nthe {@link IChatGptSchema.IParameters.$defs} object.\n\n- `#/$defs/SomeObject`\n- `#/$defs/AnotherObject`",
                                                    type: "string"
                                                },
                                                title: {
                                                    title: "Title of the schema",
                                                    description: "Title of the schema.",
                                                    type: "string"
                                                },
                                                description: {
                                                    title: "Detailed description of the schema",
                                                    description: "Detailed description of the schema.",
                                                    type: "string"
                                                },
                                                deprecated: {
                                                    title: "Whether the type is deprecated or not",
                                                    description: "Whether the type is deprecated or not.",
                                                    type: "boolean"
                                                },
                                                example: {
                                                    title: "Example value",
                                                    description: "Example value."
                                                },
                                                examples: {
                                                    description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                                    type: "object",
                                                    properties: {},
                                                    required: [],
                                                    additionalProperties: {}
                                                }
                                            },
                                            required: [
                                                "$ref"
                                            ],
                                            description: "Description of the current {@link IChatGptSchema.IReference} type:\n\n> Reference type directing named schema.\n\n------------------------------\n\nDescription of the parent {@link IChatGptSchema} type:\n\n> Type schema info of the ChatGPT.\n> \n> `IChatGptSchema` is a type schema info of the ChatGPT function calling.\n> \n> `IChatGptSchema` basically follows the JSON schema definition of the OpenAPI v3.1\n> speciifcation; {@link OpenApiV3_1.IJsonSchema}.\n> \n> However, the `IChatGptSchema` does not follow the entire specification of\n> the OpenAPI v3.1. It has own specific restrictions and definitions. Here is the\n> list of how `IChatGptSchema` is different with the OpenAPI v3.1 JSON schema.\n> \n> - Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}\n> - Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}\n> - Tuple type is banned: {@link OpenApiV3_1.IJsonSchema.ITuple.prefixItems}\n> - Constant type is banned: {@link OpenApiV3_1.IJsonSchema.IConstant}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IOneOf} to {@link IChatGptSchema.IAnOf}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link IChatGptSchema.IObject}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link IChatGptSchema.IReference}\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> If compare with the {@link OpenApi.IJsonSchema}, the emended JSON schema specification,\n> \n> - {@link IChatGptSchema.IAnyOf} instead of the {@link OpenApi.IJsonSchema.IOneOf}\n> - {@link IChatGptSchema.IParameters.$defs} instead of the {@link OpenApi.IJsonSchema.IComponents.schemas}\n> - {@link IChatGptSchema.IString.enum} instead of the {@link OpenApi.IJsonSchema.IConstant}\n> - {@link IChatGptSchema.additionalProperties} is fixed to `false`\n> - No tuple type {@link OpenApi.IJsonSchema.ITuple} support\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> For reference, if you've composed the `IChatGptSchema` type with the\n> {@link IChatGptSchema.IConfig.reference} `false` option (default is `false`),\n> only the recursived named types would be archived into the\n> {@link IChatGptSchema.IParameters.$defs}, and the others would be ecaped from the\n> {@link IChatGptSchema.IReference} type.\n> \n> Also, OpenAI has banned below constraint properties. Instead, `IChatGptSchema`\n> fills the {@link IChatGptSchema.__IAttribute.description} property with\n> the comment text like `\"@format uuid\"`.\n> \n> - {@link OpenApi.IJsonSchema.INumber.minimum}\n> - {@link OpenApi.IJsonSchema.INumber.maximum}\n> - {@link OpenApi.IJsonSchema.INumber.multipleOf}\n> - {@link OpenApi.IJsonSchema.IString.minLength}\n> - {@link OpenApi.IJsonSchema.IString.maxLength}\n> - {@link OpenApi.IJsonSchema.IString.format}\n> - {@link OpenApi.IJsonSchema.IString.pattern}\n> - {@link OpenApi.IJsonSchema.IString.contentMediaType}\n> - {@link OpenApi.IJsonSchema.IString.default}\n> - {@link OpenApi.IJsonSchema.IArray.minItems}\n> - {@link OpenApi.IJsonSchema.IArray.maxItems}\n> - {@link OpenApi.IJsonSchema.IArray.unique}\n> \n> Additionally, OpenAI cannot define the `description` property to the\n> {@link IChatGptSchema.IReference} type, and even does not understand\n> the capsulization to the {@link IChatGptSchema.IAnyOf} type.\n> Therefore, the `description` is written to the parent object type,\n> not the reference type.\n> \n> ```json\n> {\n>   \"type\": \"object\",\n>   \"description\": \"### Description of {@link something} property.\\n\\n> Hello?\",\n>   \"properties\": {\n>     \"something\": {\n>       \"$ref\": \"#/$defs/SomeObject\"\n>     }\n>   }\n> }\n> ```"
                                        },
                                        {
                                            type: "object",
                                            properties: {
                                                title: {
                                                    title: "Title of the schema",
                                                    description: "Title of the schema.",
                                                    type: "string"
                                                },
                                                description: {
                                                    title: "Detailed description of the schema",
                                                    description: "Detailed description of the schema.",
                                                    type: "string"
                                                },
                                                deprecated: {
                                                    title: "Whether the type is deprecated or not",
                                                    description: "Whether the type is deprecated or not.",
                                                    type: "boolean"
                                                },
                                                example: {
                                                    title: "Example value",
                                                    description: "Example value."
                                                },
                                                examples: {
                                                    description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                                    type: "object",
                                                    properties: {},
                                                    required: [],
                                                    additionalProperties: {}
                                                }
                                            },
                                            required: [],
                                            description: "Description of the current {@link IChatGptSchema.IUnknown} type:\n\n> Unknown, the `any` type.\n\n------------------------------\n\nDescription of the parent {@link IChatGptSchema} type:\n\n> Type schema info of the ChatGPT.\n> \n> `IChatGptSchema` is a type schema info of the ChatGPT function calling.\n> \n> `IChatGptSchema` basically follows the JSON schema definition of the OpenAPI v3.1\n> speciifcation; {@link OpenApiV3_1.IJsonSchema}.\n> \n> However, the `IChatGptSchema` does not follow the entire specification of\n> the OpenAPI v3.1. It has own specific restrictions and definitions. Here is the\n> list of how `IChatGptSchema` is different with the OpenAPI v3.1 JSON schema.\n> \n> - Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}\n> - Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}\n> - Tuple type is banned: {@link OpenApiV3_1.IJsonSchema.ITuple.prefixItems}\n> - Constant type is banned: {@link OpenApiV3_1.IJsonSchema.IConstant}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IOneOf} to {@link IChatGptSchema.IAnOf}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link IChatGptSchema.IObject}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link IChatGptSchema.IReference}\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> If compare with the {@link OpenApi.IJsonSchema}, the emended JSON schema specification,\n> \n> - {@link IChatGptSchema.IAnyOf} instead of the {@link OpenApi.IJsonSchema.IOneOf}\n> - {@link IChatGptSchema.IParameters.$defs} instead of the {@link OpenApi.IJsonSchema.IComponents.schemas}\n> - {@link IChatGptSchema.IString.enum} instead of the {@link OpenApi.IJsonSchema.IConstant}\n> - {@link IChatGptSchema.additionalProperties} is fixed to `false`\n> - No tuple type {@link OpenApi.IJsonSchema.ITuple} support\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> For reference, if you've composed the `IChatGptSchema` type with the\n> {@link IChatGptSchema.IConfig.reference} `false` option (default is `false`),\n> only the recursived named types would be archived into the\n> {@link IChatGptSchema.IParameters.$defs}, and the others would be ecaped from the\n> {@link IChatGptSchema.IReference} type.\n> \n> Also, OpenAI has banned below constraint properties. Instead, `IChatGptSchema`\n> fills the {@link IChatGptSchema.__IAttribute.description} property with\n> the comment text like `\"@format uuid\"`.\n> \n> - {@link OpenApi.IJsonSchema.INumber.minimum}\n> - {@link OpenApi.IJsonSchema.INumber.maximum}\n> - {@link OpenApi.IJsonSchema.INumber.multipleOf}\n> - {@link OpenApi.IJsonSchema.IString.minLength}\n> - {@link OpenApi.IJsonSchema.IString.maxLength}\n> - {@link OpenApi.IJsonSchema.IString.format}\n> - {@link OpenApi.IJsonSchema.IString.pattern}\n> - {@link OpenApi.IJsonSchema.IString.contentMediaType}\n> - {@link OpenApi.IJsonSchema.IString.default}\n> - {@link OpenApi.IJsonSchema.IArray.minItems}\n> - {@link OpenApi.IJsonSchema.IArray.maxItems}\n> - {@link OpenApi.IJsonSchema.IArray.unique}\n> \n> Additionally, OpenAI cannot define the `description` property to the\n> {@link IChatGptSchema.IReference} type, and even does not understand\n> the capsulization to the {@link IChatGptSchema.IAnyOf} type.\n> Therefore, the `description` is written to the parent object type,\n> not the reference type.\n> \n> ```json\n> {\n>   \"type\": \"object\",\n>   \"description\": \"### Description of {@link something} property.\\n\\n> Hello?\",\n>   \"properties\": {\n>     \"something\": {\n>       \"$ref\": \"#/$defs/SomeObject\"\n>     }\n>   }\n> }\n> ```"
                                        },
                                        {
                                            type: "object",
                                            properties: {
                                                type: {
                                                    title: "Discriminator value of the type",
                                                    description: "Discriminator value of the type.",
                                                    type: "string",
                                                    "enum": [
                                                        "null"
                                                    ]
                                                },
                                                title: {
                                                    title: "Title of the schema",
                                                    description: "Title of the schema.",
                                                    type: "string"
                                                },
                                                description: {
                                                    title: "Detailed description of the schema",
                                                    description: "Detailed description of the schema.",
                                                    type: "string"
                                                },
                                                deprecated: {
                                                    title: "Whether the type is deprecated or not",
                                                    description: "Whether the type is deprecated or not.",
                                                    type: "boolean"
                                                },
                                                example: {
                                                    title: "Example value",
                                                    description: "Example value."
                                                },
                                                examples: {
                                                    description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                                    type: "object",
                                                    properties: {},
                                                    required: [],
                                                    additionalProperties: {}
                                                }
                                            },
                                            required: [
                                                "type"
                                            ],
                                            description: "Description of the current {@link IChatGptSchema.INull} type:\n\n> Null type.\n\n------------------------------\n\nDescription of the parent {@link IChatGptSchema} type:\n\n> Type schema info of the ChatGPT.\n> \n> `IChatGptSchema` is a type schema info of the ChatGPT function calling.\n> \n> `IChatGptSchema` basically follows the JSON schema definition of the OpenAPI v3.1\n> speciifcation; {@link OpenApiV3_1.IJsonSchema}.\n> \n> However, the `IChatGptSchema` does not follow the entire specification of\n> the OpenAPI v3.1. It has own specific restrictions and definitions. Here is the\n> list of how `IChatGptSchema` is different with the OpenAPI v3.1 JSON schema.\n> \n> - Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}\n> - Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}\n> - Tuple type is banned: {@link OpenApiV3_1.IJsonSchema.ITuple.prefixItems}\n> - Constant type is banned: {@link OpenApiV3_1.IJsonSchema.IConstant}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IOneOf} to {@link IChatGptSchema.IAnOf}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link IChatGptSchema.IObject}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link IChatGptSchema.IReference}\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> If compare with the {@link OpenApi.IJsonSchema}, the emended JSON schema specification,\n> \n> - {@link IChatGptSchema.IAnyOf} instead of the {@link OpenApi.IJsonSchema.IOneOf}\n> - {@link IChatGptSchema.IParameters.$defs} instead of the {@link OpenApi.IJsonSchema.IComponents.schemas}\n> - {@link IChatGptSchema.IString.enum} instead of the {@link OpenApi.IJsonSchema.IConstant}\n> - {@link IChatGptSchema.additionalProperties} is fixed to `false`\n> - No tuple type {@link OpenApi.IJsonSchema.ITuple} support\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> For reference, if you've composed the `IChatGptSchema` type with the\n> {@link IChatGptSchema.IConfig.reference} `false` option (default is `false`),\n> only the recursived named types would be archived into the\n> {@link IChatGptSchema.IParameters.$defs}, and the others would be ecaped from the\n> {@link IChatGptSchema.IReference} type.\n> \n> Also, OpenAI has banned below constraint properties. Instead, `IChatGptSchema`\n> fills the {@link IChatGptSchema.__IAttribute.description} property with\n> the comment text like `\"@format uuid\"`.\n> \n> - {@link OpenApi.IJsonSchema.INumber.minimum}\n> - {@link OpenApi.IJsonSchema.INumber.maximum}\n> - {@link OpenApi.IJsonSchema.INumber.multipleOf}\n> - {@link OpenApi.IJsonSchema.IString.minLength}\n> - {@link OpenApi.IJsonSchema.IString.maxLength}\n> - {@link OpenApi.IJsonSchema.IString.format}\n> - {@link OpenApi.IJsonSchema.IString.pattern}\n> - {@link OpenApi.IJsonSchema.IString.contentMediaType}\n> - {@link OpenApi.IJsonSchema.IString.default}\n> - {@link OpenApi.IJsonSchema.IArray.minItems}\n> - {@link OpenApi.IJsonSchema.IArray.maxItems}\n> - {@link OpenApi.IJsonSchema.IArray.unique}\n> \n> Additionally, OpenAI cannot define the `description` property to the\n> {@link IChatGptSchema.IReference} type, and even does not understand\n> the capsulization to the {@link IChatGptSchema.IAnyOf} type.\n> Therefore, the `description` is written to the parent object type,\n> not the reference type.\n> \n> ```json\n> {\n>   \"type\": \"object\",\n>   \"description\": \"### Description of {@link something} property.\\n\\n> Hello?\",\n>   \"properties\": {\n>     \"something\": {\n>       \"$ref\": \"#/$defs/SomeObject\"\n>     }\n>   }\n> }\n> ```"
                                        }
                                    ]
                                }
                            },
                            title: {
                                title: "Title of the schema",
                                description: "Title of the schema.",
                                type: "string"
                            },
                            description: {
                                title: "Detailed description of the schema",
                                description: "Detailed description of the schema.",
                                type: "string"
                            },
                            deprecated: {
                                title: "Whether the type is deprecated or not",
                                description: "Whether the type is deprecated or not.",
                                type: "boolean"
                            },
                            example: {
                                title: "Example value",
                                description: "Example value."
                            },
                            examples: {
                                description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                type: "object",
                                properties: {},
                                required: [],
                                additionalProperties: {}
                            }
                        },
                        required: [
                            "anyOf"
                        ]
                    }
                }
            },
            output: {
                type: "array",
                items: {
                    description: "Description of the current {@link IHttpLlmFunctionchatgpt} type:\n\n> LLM function calling schema from HTTP (OpenAPI) operation.\n> \n> `IHttpLlmFunction` is a data structure representing a function converted\n> from the {@link OpenApi.IOperation OpenAPI operation}, used for the LLM\n> (Large Language Model) function calling. It's a typical RPC (Remote Procedure Call)\n> structure containing the function {@link name}, {@link parameters}, and\n> {@link output return type}.\n> \n> If you provide this `IHttpLlmFunction` data to the LLM provider like \"OpenAI\",\n> the \"OpenAI\" will compose a function arguments by analyzing conversations with\n> the user. With the LLM composed arguments, you can execute the function through\n> {@link LlmFetcher.execute} and get the result.\n> \n> For reference, different between `IHttpLlmFunction` and its origin source\n> {@link OpenApi.IOperation} is, `IHttpLlmFunction` has converted every type schema\n> information from {@link OpenApi.IJsonSchema} to {@link ILlmSchemaV3} to escape\n> {@link OpenApi.IJsonSchema.IReference reference types}, and downgrade the version\n> of the JSON schema to OpenAPI 3.0. It's because LLM function call feature cannot\n> understand both reference types and OpenAPI 3.1 specification.\n> \n> Additionally, the properties' rule is:\n> \n> - `pathParameters`: Path parameters of {@link OpenApi.IOperation.parameters}\n> - `query`: Query parameter of {@link IHttpMigrateRoute.query}\n> - `body`: Body parameter of {@link IHttpMigrateRoute.body}\n> \n> ```typescript\n> {\n>   ...pathParameters,\n>   query,\n>   body,\n> }\n> ```",
                    type: "object",
                    properties: {
                        method: {
                            title: "HTTP method of the endpoint",
                            description: "HTTP method of the endpoint.",
                            type: "string",
                            "enum": [
                                "get",
                                "post",
                                "patch",
                                "put",
                                "delete"
                            ]
                        },
                        path: {
                            title: "Path of the endpoint",
                            description: "Path of the endpoint.",
                            type: "string"
                        },
                        name: {
                            title: "Representative name of the function",
                            description: "Representative name of the function.\n\nThe `name` is a repsentative name identifying the function in the\n{@link IHttpLlmApplication}. The `name` value is just composed by joining the\n{@link IHttpMigrateRoute.accessor} by underscore `_` character.\n\nHere is the composition rule of the  {@link IHttpMigrateRoute.accessor}:\n\n> The `accessor` is composed with the following rules. At first,\n> namespaces are composed by static directory names in the {@link path}.\n> Parametric symbols represented by `:param` or `{param}` cannot be\n> a part of the namespace.\n>\n> Instead, they would be a part of the function name. The function\n> name is composed with the {@link method HTTP method} and parametric\n> symbols like `getByParam` or `postByParam`. If there are multiple\n> path parameters, they would be concatenated by `And` like\n> `getByParam1AndParam2`.\n>\n> For refefence, if the {@link operation}'s {@link method} is `delete`,\n> the function name would be replaced to `erase` instead of `delete`.\n> It is the reason why the `delete` is a reserved keyword in many\n> programming languages.\n>\n> - Example 1\n>   - path: `POST /shopping/sellers/sales`\n>   - accessor: `shopping.sellers.sales.post`\n> - Example 2\n>   - endpoint: `GET /shoppings/sellers/sales/:saleId/reviews/:reviewId/comments/:id\n>   - accessor: `shoppings.sellers.sales.reviews.getBySaleIdAndReviewIdAndCommentId`\n\n\n@maxLength 64",
                            type: "string"
                        },
                        parameters: {
                            description: "List of parameter types.\n\nIf you've configured {@link IHttpLlmApplication.IOptions.keyword} as `true`,\nnumber of {@link IHttpLlmFunction.parameters} are always 1 and the first\nparameter's type is always {@link ILlmSchemaV3.IObject}. The\nproperties' rule is:\n\n- `pathParameters`: Path parameters of {@link IHttpMigrateRoute.parameters}\n- `query`: Query parameter of {@link IHttpMigrateRoute.query}\n- `body`: Body parameter of {@link IHttpMigrateRoute.body}\n\n```typescript\n{\n  ...pathParameters,\n  query,\n  body,\n}\n```\n\nOtherwise, the parameters would be multiple, and the sequence of the\nparameters are following below rules:\n\n```typescript\n[\n  ...pathParameters,\n  ...(query ? [query] : []),\n  ...(body ? [body] : []),\n]\n```\n\n------------------------------\n\nDescription of the current {@link IChatGptSchema.IParameters} type:\n\n> Type of the function parameters.\n> \n> `IChatGptSchema.IParameters` is a type defining a function's parameters\n> as a keyworded object type.\n> \n> It also can be utilized for the structured output metadata.\n\n------------------------------\n\nDescription of the parent {@link IChatGptSchema} type:\n\n> Type schema info of the ChatGPT.\n> \n> `IChatGptSchema` is a type schema info of the ChatGPT function calling.\n> \n> `IChatGptSchema` basically follows the JSON schema definition of the OpenAPI v3.1\n> speciifcation; {@link OpenApiV3_1.IJsonSchema}.\n> \n> However, the `IChatGptSchema` does not follow the entire specification of\n> the OpenAPI v3.1. It has own specific restrictions and definitions. Here is the\n> list of how `IChatGptSchema` is different with the OpenAPI v3.1 JSON schema.\n> \n> - Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}\n> - Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}\n> - Tuple type is banned: {@link OpenApiV3_1.IJsonSchema.ITuple.prefixItems}\n> - Constant type is banned: {@link OpenApiV3_1.IJsonSchema.IConstant}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IOneOf} to {@link IChatGptSchema.IAnOf}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link IChatGptSchema.IObject}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link IChatGptSchema.IReference}\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> If compare with the {@link OpenApi.IJsonSchema}, the emended JSON schema specification,\n> \n> - {@link IChatGptSchema.IAnyOf} instead of the {@link OpenApi.IJsonSchema.IOneOf}\n> - {@link IChatGptSchema.IParameters.$defs} instead of the {@link OpenApi.IJsonSchema.IComponents.schemas}\n> - {@link IChatGptSchema.IString.enum} instead of the {@link OpenApi.IJsonSchema.IConstant}\n> - {@link IChatGptSchema.additionalProperties} is fixed to `false`\n> - No tuple type {@link OpenApi.IJsonSchema.ITuple} support\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> For reference, if you've composed the `IChatGptSchema` type with the\n> {@link IChatGptSchema.IConfig.reference} `false` option (default is `false`),\n> only the recursived named types would be archived into the\n> {@link IChatGptSchema.IParameters.$defs}, and the others would be ecaped from the\n> {@link IChatGptSchema.IReference} type.\n> \n> Also, OpenAI has banned below constraint properties. Instead, `IChatGptSchema`\n> fills the {@link IChatGptSchema.__IAttribute.description} property with\n> the comment text like `\"@format uuid\"`.\n> \n> - {@link OpenApi.IJsonSchema.INumber.minimum}\n> - {@link OpenApi.IJsonSchema.INumber.maximum}\n> - {@link OpenApi.IJsonSchema.INumber.multipleOf}\n> - {@link OpenApi.IJsonSchema.IString.minLength}\n> - {@link OpenApi.IJsonSchema.IString.maxLength}\n> - {@link OpenApi.IJsonSchema.IString.format}\n> - {@link OpenApi.IJsonSchema.IString.pattern}\n> - {@link OpenApi.IJsonSchema.IString.contentMediaType}\n> - {@link OpenApi.IJsonSchema.IString.default}\n> - {@link OpenApi.IJsonSchema.IArray.minItems}\n> - {@link OpenApi.IJsonSchema.IArray.maxItems}\n> - {@link OpenApi.IJsonSchema.IArray.unique}\n> \n> Additionally, OpenAI cannot define the `description` property to the\n> {@link IChatGptSchema.IReference} type, and even does not understand\n> the capsulization to the {@link IChatGptSchema.IAnyOf} type.\n> Therefore, the `description` is written to the parent object type,\n> not the reference type.\n> \n> ```json\n> {\n>   \"type\": \"object\",\n>   \"description\": \"### Description of {@link something} property.\\n\\n> Hello?\",\n>   \"properties\": {\n>     \"something\": {\n>       \"$ref\": \"#/$defs/SomeObject\"\n>     }\n>   }\n> }\n> ```\n\n### Description of {@link $defs} property:\n\n> Collection of the named types.\n\n### Description of {@link properties} property:\n\n> Properties of the object.\n> \n> The `properties` means a list of key-value pairs of the object's\n> regular properties. The key is the name of the regular property,\n> and the value is the type schema info.",
                            type: "object",
                            properties: {
                                $defs: {
                                    title: "Collection of the named types",
                                    $ref: "#/$defs/RecordstringIChatGptSchema"
                                },
                                additionalProperties: {
                                    title: "Additional properties' info",
                                    description: "Additional properties' info.\n\nThe `additionalProperties` means the type schema info of the additional\nproperties that are not listed in the {@link properties}.\n\nBy the way, it is not allowed in the parameters level.",
                                    type: "boolean",
                                    "enum": [
                                        false
                                    ]
                                },
                                type: {
                                    title: "Discriminator value of the type",
                                    description: "Discriminator value of the type.",
                                    type: "string",
                                    "enum": [
                                        "object"
                                    ]
                                },
                                properties: {
                                    title: "Properties of the object",
                                    $ref: "#/$defs/RecordstringIChatGptSchema"
                                },
                                required: {
                                    title: "List of key values of the required properties",
                                    description: "List of key values of the required properties.\n\nThe `required` means a list of the key values of the required\n{@link properties}. If some property key is not listed in the `required`\nlist, it means that property is optional. Otherwise some property key\nexists in the `required` list, it means that the property must be filled.\n\nBelow is an example of the {@link properties} and `required`.\n\n```typescript\ninterface SomeObject {\n  id: string;\n  email: string;\n  name?: string;\n}\n```\n\nAs you can see, `id` and `email` {@link properties} are {@link required},\nso that they are listed in the `required` list.\n\n```json\n{\n  \"type\": \"object\",\n  \"properties\": {\n    \"id\": { \"type\": \"string\" },\n    \"email\": { \"type\": \"string\" },\n    \"name\": { \"type\": \"string\" }\n  },\n  \"required\": [\"id\", \"email\"]\n}\n```",
                                    type: "array",
                                    items: {
                                        type: "string"
                                    }
                                },
                                title: {
                                    title: "Title of the schema",
                                    description: "Title of the schema.",
                                    type: "string"
                                },
                                description: {
                                    title: "Detailed description of the schema",
                                    description: "Detailed description of the schema.",
                                    type: "string"
                                },
                                deprecated: {
                                    title: "Whether the type is deprecated or not",
                                    description: "Whether the type is deprecated or not.",
                                    type: "boolean"
                                },
                                example: {
                                    title: "Example value",
                                    description: "Example value."
                                },
                                examples: {
                                    description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                    type: "object",
                                    properties: {},
                                    required: [],
                                    additionalProperties: {}
                                }
                            },
                            required: [
                                "$defs",
                                "additionalProperties",
                                "type",
                                "properties",
                                "required"
                            ]
                        },
                        separated: {
                            description: "Collection of separated parameters.\n\nFilled only when {@link IHttpLlmApplication.IOptions.separate} is configured.\n\n------------------------------\n\nDescription of the current {@link IHttpLlmFunction.ISeparatedchatgpt} type:\n\n> Collection of separated parameters.",
                            type: "object",
                            properties: {
                                llm: {
                                    description: "Parameters that would be composed by the LLM.\n\nEven though no property exists in the LLM side, the `llm` property\nwould have at least empty object type.\n\n------------------------------\n\nDescription of the current {@link IChatGptSchema.IParameters} type:\n\n> Type of the function parameters.\n> \n> `IChatGptSchema.IParameters` is a type defining a function's parameters\n> as a keyworded object type.\n> \n> It also can be utilized for the structured output metadata.\n\n------------------------------\n\nDescription of the parent {@link IChatGptSchema} type:\n\n> Type schema info of the ChatGPT.\n> \n> `IChatGptSchema` is a type schema info of the ChatGPT function calling.\n> \n> `IChatGptSchema` basically follows the JSON schema definition of the OpenAPI v3.1\n> speciifcation; {@link OpenApiV3_1.IJsonSchema}.\n> \n> However, the `IChatGptSchema` does not follow the entire specification of\n> the OpenAPI v3.1. It has own specific restrictions and definitions. Here is the\n> list of how `IChatGptSchema` is different with the OpenAPI v3.1 JSON schema.\n> \n> - Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}\n> - Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}\n> - Tuple type is banned: {@link OpenApiV3_1.IJsonSchema.ITuple.prefixItems}\n> - Constant type is banned: {@link OpenApiV3_1.IJsonSchema.IConstant}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IOneOf} to {@link IChatGptSchema.IAnOf}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link IChatGptSchema.IObject}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link IChatGptSchema.IReference}\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> If compare with the {@link OpenApi.IJsonSchema}, the emended JSON schema specification,\n> \n> - {@link IChatGptSchema.IAnyOf} instead of the {@link OpenApi.IJsonSchema.IOneOf}\n> - {@link IChatGptSchema.IParameters.$defs} instead of the {@link OpenApi.IJsonSchema.IComponents.schemas}\n> - {@link IChatGptSchema.IString.enum} instead of the {@link OpenApi.IJsonSchema.IConstant}\n> - {@link IChatGptSchema.additionalProperties} is fixed to `false`\n> - No tuple type {@link OpenApi.IJsonSchema.ITuple} support\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> For reference, if you've composed the `IChatGptSchema` type with the\n> {@link IChatGptSchema.IConfig.reference} `false` option (default is `false`),\n> only the recursived named types would be archived into the\n> {@link IChatGptSchema.IParameters.$defs}, and the others would be ecaped from the\n> {@link IChatGptSchema.IReference} type.\n> \n> Also, OpenAI has banned below constraint properties. Instead, `IChatGptSchema`\n> fills the {@link IChatGptSchema.__IAttribute.description} property with\n> the comment text like `\"@format uuid\"`.\n> \n> - {@link OpenApi.IJsonSchema.INumber.minimum}\n> - {@link OpenApi.IJsonSchema.INumber.maximum}\n> - {@link OpenApi.IJsonSchema.INumber.multipleOf}\n> - {@link OpenApi.IJsonSchema.IString.minLength}\n> - {@link OpenApi.IJsonSchema.IString.maxLength}\n> - {@link OpenApi.IJsonSchema.IString.format}\n> - {@link OpenApi.IJsonSchema.IString.pattern}\n> - {@link OpenApi.IJsonSchema.IString.contentMediaType}\n> - {@link OpenApi.IJsonSchema.IString.default}\n> - {@link OpenApi.IJsonSchema.IArray.minItems}\n> - {@link OpenApi.IJsonSchema.IArray.maxItems}\n> - {@link OpenApi.IJsonSchema.IArray.unique}\n> \n> Additionally, OpenAI cannot define the `description` property to the\n> {@link IChatGptSchema.IReference} type, and even does not understand\n> the capsulization to the {@link IChatGptSchema.IAnyOf} type.\n> Therefore, the `description` is written to the parent object type,\n> not the reference type.\n> \n> ```json\n> {\n>   \"type\": \"object\",\n>   \"description\": \"### Description of {@link something} property.\\n\\n> Hello?\",\n>   \"properties\": {\n>     \"something\": {\n>       \"$ref\": \"#/$defs/SomeObject\"\n>     }\n>   }\n> }\n> ```\n\n### Description of {@link $defs} property:\n\n> Collection of the named types.\n\n### Description of {@link properties} property:\n\n> Properties of the object.\n> \n> The `properties` means a list of key-value pairs of the object's\n> regular properties. The key is the name of the regular property,\n> and the value is the type schema info.",
                                    type: "object",
                                    properties: {
                                        $defs: {
                                            title: "Collection of the named types",
                                            $ref: "#/$defs/RecordstringIChatGptSchema"
                                        },
                                        additionalProperties: {
                                            title: "Additional properties' info",
                                            description: "Additional properties' info.\n\nThe `additionalProperties` means the type schema info of the additional\nproperties that are not listed in the {@link properties}.\n\nBy the way, it is not allowed in the parameters level.",
                                            type: "boolean",
                                            "enum": [
                                                false
                                            ]
                                        },
                                        type: {
                                            title: "Discriminator value of the type",
                                            description: "Discriminator value of the type.",
                                            type: "string",
                                            "enum": [
                                                "object"
                                            ]
                                        },
                                        properties: {
                                            title: "Properties of the object",
                                            $ref: "#/$defs/RecordstringIChatGptSchema"
                                        },
                                        required: {
                                            title: "List of key values of the required properties",
                                            description: "List of key values of the required properties.\n\nThe `required` means a list of the key values of the required\n{@link properties}. If some property key is not listed in the `required`\nlist, it means that property is optional. Otherwise some property key\nexists in the `required` list, it means that the property must be filled.\n\nBelow is an example of the {@link properties} and `required`.\n\n```typescript\ninterface SomeObject {\n  id: string;\n  email: string;\n  name?: string;\n}\n```\n\nAs you can see, `id` and `email` {@link properties} are {@link required},\nso that they are listed in the `required` list.\n\n```json\n{\n  \"type\": \"object\",\n  \"properties\": {\n    \"id\": { \"type\": \"string\" },\n    \"email\": { \"type\": \"string\" },\n    \"name\": { \"type\": \"string\" }\n  },\n  \"required\": [\"id\", \"email\"]\n}\n```",
                                            type: "array",
                                            items: {
                                                type: "string"
                                            }
                                        },
                                        title: {
                                            title: "Title of the schema",
                                            description: "Title of the schema.",
                                            type: "string"
                                        },
                                        description: {
                                            title: "Detailed description of the schema",
                                            description: "Detailed description of the schema.",
                                            type: "string"
                                        },
                                        deprecated: {
                                            title: "Whether the type is deprecated or not",
                                            description: "Whether the type is deprecated or not.",
                                            type: "boolean"
                                        },
                                        example: {
                                            title: "Example value",
                                            description: "Example value."
                                        },
                                        examples: {
                                            description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                            type: "object",
                                            properties: {},
                                            required: [],
                                            additionalProperties: {}
                                        }
                                    },
                                    required: [
                                        "$defs",
                                        "additionalProperties",
                                        "type",
                                        "properties",
                                        "required"
                                    ]
                                },
                                human: {
                                    title: "Parameters that would be composed by the human",
                                    description: "Parameters that would be composed by the human.",
                                    anyOf: [
                                        {
                                            type: "null"
                                        },
                                        {
                                            type: "object",
                                            properties: {
                                                $defs: {
                                                    title: "Collection of the named types",
                                                    $ref: "#/$defs/RecordstringIChatGptSchema"
                                                },
                                                additionalProperties: {
                                                    title: "Additional properties' info",
                                                    description: "Additional properties' info.\n\nThe `additionalProperties` means the type schema info of the additional\nproperties that are not listed in the {@link properties}.\n\nBy the way, it is not allowed in the parameters level.",
                                                    type: "boolean",
                                                    "enum": [
                                                        false
                                                    ]
                                                },
                                                type: {
                                                    title: "Discriminator value of the type",
                                                    description: "Discriminator value of the type.",
                                                    type: "string",
                                                    "enum": [
                                                        "object"
                                                    ]
                                                },
                                                properties: {
                                                    title: "Properties of the object",
                                                    $ref: "#/$defs/RecordstringIChatGptSchema"
                                                },
                                                required: {
                                                    title: "List of key values of the required properties",
                                                    description: "List of key values of the required properties.\n\nThe `required` means a list of the key values of the required\n{@link properties}. If some property key is not listed in the `required`\nlist, it means that property is optional. Otherwise some property key\nexists in the `required` list, it means that the property must be filled.\n\nBelow is an example of the {@link properties} and `required`.\n\n```typescript\ninterface SomeObject {\n  id: string;\n  email: string;\n  name?: string;\n}\n```\n\nAs you can see, `id` and `email` {@link properties} are {@link required},\nso that they are listed in the `required` list.\n\n```json\n{\n  \"type\": \"object\",\n  \"properties\": {\n    \"id\": { \"type\": \"string\" },\n    \"email\": { \"type\": \"string\" },\n    \"name\": { \"type\": \"string\" }\n  },\n  \"required\": [\"id\", \"email\"]\n}\n```",
                                                    type: "array",
                                                    items: {
                                                        type: "string"
                                                    }
                                                },
                                                title: {
                                                    title: "Title of the schema",
                                                    description: "Title of the schema.",
                                                    type: "string"
                                                },
                                                description: {
                                                    title: "Detailed description of the schema",
                                                    description: "Detailed description of the schema.",
                                                    type: "string"
                                                },
                                                deprecated: {
                                                    title: "Whether the type is deprecated or not",
                                                    description: "Whether the type is deprecated or not.",
                                                    type: "boolean"
                                                },
                                                example: {
                                                    title: "Example value",
                                                    description: "Example value."
                                                },
                                                examples: {
                                                    description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                                    type: "object",
                                                    properties: {},
                                                    required: [],
                                                    additionalProperties: {}
                                                }
                                            },
                                            required: [
                                                "$defs",
                                                "additionalProperties",
                                                "type",
                                                "properties",
                                                "required"
                                            ],
                                            description: "Description of the current {@link IChatGptSchema.IParameters} type:\n\n> Type of the function parameters.\n> \n> `IChatGptSchema.IParameters` is a type defining a function's parameters\n> as a keyworded object type.\n> \n> It also can be utilized for the structured output metadata.\n\n------------------------------\n\nDescription of the parent {@link IChatGptSchema} type:\n\n> Type schema info of the ChatGPT.\n> \n> `IChatGptSchema` is a type schema info of the ChatGPT function calling.\n> \n> `IChatGptSchema` basically follows the JSON schema definition of the OpenAPI v3.1\n> speciifcation; {@link OpenApiV3_1.IJsonSchema}.\n> \n> However, the `IChatGptSchema` does not follow the entire specification of\n> the OpenAPI v3.1. It has own specific restrictions and definitions. Here is the\n> list of how `IChatGptSchema` is different with the OpenAPI v3.1 JSON schema.\n> \n> - Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}\n> - Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}\n> - Tuple type is banned: {@link OpenApiV3_1.IJsonSchema.ITuple.prefixItems}\n> - Constant type is banned: {@link OpenApiV3_1.IJsonSchema.IConstant}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IOneOf} to {@link IChatGptSchema.IAnOf}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link IChatGptSchema.IObject}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link IChatGptSchema.IReference}\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> If compare with the {@link OpenApi.IJsonSchema}, the emended JSON schema specification,\n> \n> - {@link IChatGptSchema.IAnyOf} instead of the {@link OpenApi.IJsonSchema.IOneOf}\n> - {@link IChatGptSchema.IParameters.$defs} instead of the {@link OpenApi.IJsonSchema.IComponents.schemas}\n> - {@link IChatGptSchema.IString.enum} instead of the {@link OpenApi.IJsonSchema.IConstant}\n> - {@link IChatGptSchema.additionalProperties} is fixed to `false`\n> - No tuple type {@link OpenApi.IJsonSchema.ITuple} support\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> For reference, if you've composed the `IChatGptSchema` type with the\n> {@link IChatGptSchema.IConfig.reference} `false` option (default is `false`),\n> only the recursived named types would be archived into the\n> {@link IChatGptSchema.IParameters.$defs}, and the others would be ecaped from the\n> {@link IChatGptSchema.IReference} type.\n> \n> Also, OpenAI has banned below constraint properties. Instead, `IChatGptSchema`\n> fills the {@link IChatGptSchema.__IAttribute.description} property with\n> the comment text like `\"@format uuid\"`.\n> \n> - {@link OpenApi.IJsonSchema.INumber.minimum}\n> - {@link OpenApi.IJsonSchema.INumber.maximum}\n> - {@link OpenApi.IJsonSchema.INumber.multipleOf}\n> - {@link OpenApi.IJsonSchema.IString.minLength}\n> - {@link OpenApi.IJsonSchema.IString.maxLength}\n> - {@link OpenApi.IJsonSchema.IString.format}\n> - {@link OpenApi.IJsonSchema.IString.pattern}\n> - {@link OpenApi.IJsonSchema.IString.contentMediaType}\n> - {@link OpenApi.IJsonSchema.IString.default}\n> - {@link OpenApi.IJsonSchema.IArray.minItems}\n> - {@link OpenApi.IJsonSchema.IArray.maxItems}\n> - {@link OpenApi.IJsonSchema.IArray.unique}\n> \n> Additionally, OpenAI cannot define the `description` property to the\n> {@link IChatGptSchema.IReference} type, and even does not understand\n> the capsulization to the {@link IChatGptSchema.IAnyOf} type.\n> Therefore, the `description` is written to the parent object type,\n> not the reference type.\n> \n> ```json\n> {\n>   \"type\": \"object\",\n>   \"description\": \"### Description of {@link something} property.\\n\\n> Hello?\",\n>   \"properties\": {\n>     \"something\": {\n>       \"$ref\": \"#/$defs/SomeObject\"\n>     }\n>   }\n> }\n> ```\n\n### Description of {@link $defs} property:\n\n> Collection of the named types.\n\n### Description of {@link properties} property:\n\n> Properties of the object.\n> \n> The `properties` means a list of key-value pairs of the object's\n> regular properties. The key is the name of the regular property,\n> and the value is the type schema info."
                                        }
                                    ]
                                }
                            },
                            required: [
                                "llm",
                                "human"
                            ]
                        },
                        output: {
                            title: "Expected return type",
                            description: "Expected return type.\n\nIf the target operation returns nothing (`void`), the `output`\nwould be `undefined`.",
                            anyOf: [
                                {
                                    type: "object",
                                    properties: {
                                        "enum": {
                                            title: "Enumeration values",
                                            description: "Enumeration values.",
                                            type: "array",
                                            items: {
                                                type: "string"
                                            }
                                        },
                                        type: {
                                            title: "Discriminator value of the type",
                                            description: "Discriminator value of the type.",
                                            type: "string",
                                            "enum": [
                                                "string"
                                            ]
                                        },
                                        title: {
                                            title: "Title of the schema",
                                            description: "Title of the schema.",
                                            type: "string"
                                        },
                                        description: {
                                            title: "Detailed description of the schema",
                                            description: "Detailed description of the schema.",
                                            type: "string"
                                        },
                                        deprecated: {
                                            title: "Whether the type is deprecated or not",
                                            description: "Whether the type is deprecated or not.",
                                            type: "boolean"
                                        },
                                        example: {
                                            title: "Example value",
                                            description: "Example value."
                                        },
                                        examples: {
                                            description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                            type: "object",
                                            properties: {},
                                            required: [],
                                            additionalProperties: {}
                                        }
                                    },
                                    required: [
                                        "type"
                                    ],
                                    description: "Description of the current {@link IChatGptSchema.IString} type:\n\n> String type info.\n\n------------------------------\n\nDescription of the parent {@link IChatGptSchema} type:\n\n> Type schema info of the ChatGPT.\n> \n> `IChatGptSchema` is a type schema info of the ChatGPT function calling.\n> \n> `IChatGptSchema` basically follows the JSON schema definition of the OpenAPI v3.1\n> speciifcation; {@link OpenApiV3_1.IJsonSchema}.\n> \n> However, the `IChatGptSchema` does not follow the entire specification of\n> the OpenAPI v3.1. It has own specific restrictions and definitions. Here is the\n> list of how `IChatGptSchema` is different with the OpenAPI v3.1 JSON schema.\n> \n> - Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}\n> - Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}\n> - Tuple type is banned: {@link OpenApiV3_1.IJsonSchema.ITuple.prefixItems}\n> - Constant type is banned: {@link OpenApiV3_1.IJsonSchema.IConstant}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IOneOf} to {@link IChatGptSchema.IAnOf}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link IChatGptSchema.IObject}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link IChatGptSchema.IReference}\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> If compare with the {@link OpenApi.IJsonSchema}, the emended JSON schema specification,\n> \n> - {@link IChatGptSchema.IAnyOf} instead of the {@link OpenApi.IJsonSchema.IOneOf}\n> - {@link IChatGptSchema.IParameters.$defs} instead of the {@link OpenApi.IJsonSchema.IComponents.schemas}\n> - {@link IChatGptSchema.IString.enum} instead of the {@link OpenApi.IJsonSchema.IConstant}\n> - {@link IChatGptSchema.additionalProperties} is fixed to `false`\n> - No tuple type {@link OpenApi.IJsonSchema.ITuple} support\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> For reference, if you've composed the `IChatGptSchema` type with the\n> {@link IChatGptSchema.IConfig.reference} `false` option (default is `false`),\n> only the recursived named types would be archived into the\n> {@link IChatGptSchema.IParameters.$defs}, and the others would be ecaped from the\n> {@link IChatGptSchema.IReference} type.\n> \n> Also, OpenAI has banned below constraint properties. Instead, `IChatGptSchema`\n> fills the {@link IChatGptSchema.__IAttribute.description} property with\n> the comment text like `\"@format uuid\"`.\n> \n> - {@link OpenApi.IJsonSchema.INumber.minimum}\n> - {@link OpenApi.IJsonSchema.INumber.maximum}\n> - {@link OpenApi.IJsonSchema.INumber.multipleOf}\n> - {@link OpenApi.IJsonSchema.IString.minLength}\n> - {@link OpenApi.IJsonSchema.IString.maxLength}\n> - {@link OpenApi.IJsonSchema.IString.format}\n> - {@link OpenApi.IJsonSchema.IString.pattern}\n> - {@link OpenApi.IJsonSchema.IString.contentMediaType}\n> - {@link OpenApi.IJsonSchema.IString.default}\n> - {@link OpenApi.IJsonSchema.IArray.minItems}\n> - {@link OpenApi.IJsonSchema.IArray.maxItems}\n> - {@link OpenApi.IJsonSchema.IArray.unique}\n> \n> Additionally, OpenAI cannot define the `description` property to the\n> {@link IChatGptSchema.IReference} type, and even does not understand\n> the capsulization to the {@link IChatGptSchema.IAnyOf} type.\n> Therefore, the `description` is written to the parent object type,\n> not the reference type.\n> \n> ```json\n> {\n>   \"type\": \"object\",\n>   \"description\": \"### Description of {@link something} property.\\n\\n> Hello?\",\n>   \"properties\": {\n>     \"something\": {\n>       \"$ref\": \"#/$defs/SomeObject\"\n>     }\n>   }\n> }\n> ```"
                                },
                                {
                                    type: "object",
                                    properties: {
                                        "enum": {
                                            title: "Enumeration values",
                                            description: "Enumeration values.",
                                            type: "array",
                                            items: {
                                                type: "number"
                                            }
                                        },
                                        type: {
                                            title: "Discriminator value of the type",
                                            description: "Discriminator value of the type.",
                                            type: "string",
                                            "enum": [
                                                "number"
                                            ]
                                        },
                                        title: {
                                            title: "Title of the schema",
                                            description: "Title of the schema.",
                                            type: "string"
                                        },
                                        description: {
                                            title: "Detailed description of the schema",
                                            description: "Detailed description of the schema.",
                                            type: "string"
                                        },
                                        deprecated: {
                                            title: "Whether the type is deprecated or not",
                                            description: "Whether the type is deprecated or not.",
                                            type: "boolean"
                                        },
                                        example: {
                                            title: "Example value",
                                            description: "Example value."
                                        },
                                        examples: {
                                            description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                            type: "object",
                                            properties: {},
                                            required: [],
                                            additionalProperties: {}
                                        }
                                    },
                                    required: [
                                        "type"
                                    ],
                                    description: "Description of the current {@link IChatGptSchema.INumber} type:\n\n> Number (double) type info.\n\n------------------------------\n\nDescription of the parent {@link IChatGptSchema} type:\n\n> Type schema info of the ChatGPT.\n> \n> `IChatGptSchema` is a type schema info of the ChatGPT function calling.\n> \n> `IChatGptSchema` basically follows the JSON schema definition of the OpenAPI v3.1\n> speciifcation; {@link OpenApiV3_1.IJsonSchema}.\n> \n> However, the `IChatGptSchema` does not follow the entire specification of\n> the OpenAPI v3.1. It has own specific restrictions and definitions. Here is the\n> list of how `IChatGptSchema` is different with the OpenAPI v3.1 JSON schema.\n> \n> - Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}\n> - Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}\n> - Tuple type is banned: {@link OpenApiV3_1.IJsonSchema.ITuple.prefixItems}\n> - Constant type is banned: {@link OpenApiV3_1.IJsonSchema.IConstant}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IOneOf} to {@link IChatGptSchema.IAnOf}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link IChatGptSchema.IObject}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link IChatGptSchema.IReference}\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> If compare with the {@link OpenApi.IJsonSchema}, the emended JSON schema specification,\n> \n> - {@link IChatGptSchema.IAnyOf} instead of the {@link OpenApi.IJsonSchema.IOneOf}\n> - {@link IChatGptSchema.IParameters.$defs} instead of the {@link OpenApi.IJsonSchema.IComponents.schemas}\n> - {@link IChatGptSchema.IString.enum} instead of the {@link OpenApi.IJsonSchema.IConstant}\n> - {@link IChatGptSchema.additionalProperties} is fixed to `false`\n> - No tuple type {@link OpenApi.IJsonSchema.ITuple} support\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> For reference, if you've composed the `IChatGptSchema` type with the\n> {@link IChatGptSchema.IConfig.reference} `false` option (default is `false`),\n> only the recursived named types would be archived into the\n> {@link IChatGptSchema.IParameters.$defs}, and the others would be ecaped from the\n> {@link IChatGptSchema.IReference} type.\n> \n> Also, OpenAI has banned below constraint properties. Instead, `IChatGptSchema`\n> fills the {@link IChatGptSchema.__IAttribute.description} property with\n> the comment text like `\"@format uuid\"`.\n> \n> - {@link OpenApi.IJsonSchema.INumber.minimum}\n> - {@link OpenApi.IJsonSchema.INumber.maximum}\n> - {@link OpenApi.IJsonSchema.INumber.multipleOf}\n> - {@link OpenApi.IJsonSchema.IString.minLength}\n> - {@link OpenApi.IJsonSchema.IString.maxLength}\n> - {@link OpenApi.IJsonSchema.IString.format}\n> - {@link OpenApi.IJsonSchema.IString.pattern}\n> - {@link OpenApi.IJsonSchema.IString.contentMediaType}\n> - {@link OpenApi.IJsonSchema.IString.default}\n> - {@link OpenApi.IJsonSchema.IArray.minItems}\n> - {@link OpenApi.IJsonSchema.IArray.maxItems}\n> - {@link OpenApi.IJsonSchema.IArray.unique}\n> \n> Additionally, OpenAI cannot define the `description` property to the\n> {@link IChatGptSchema.IReference} type, and even does not understand\n> the capsulization to the {@link IChatGptSchema.IAnyOf} type.\n> Therefore, the `description` is written to the parent object type,\n> not the reference type.\n> \n> ```json\n> {\n>   \"type\": \"object\",\n>   \"description\": \"### Description of {@link something} property.\\n\\n> Hello?\",\n>   \"properties\": {\n>     \"something\": {\n>       \"$ref\": \"#/$defs/SomeObject\"\n>     }\n>   }\n> }\n> ```"
                                },
                                {
                                    type: "object",
                                    properties: {
                                        "enum": {
                                            title: "Enumeration values",
                                            description: "Enumeration values.",
                                            type: "array",
                                            items: {
                                                type: "number"
                                            }
                                        },
                                        type: {
                                            title: "Discriminator value of the type",
                                            description: "Discriminator value of the type.",
                                            type: "string",
                                            "enum": [
                                                "integer"
                                            ]
                                        },
                                        title: {
                                            title: "Title of the schema",
                                            description: "Title of the schema.",
                                            type: "string"
                                        },
                                        description: {
                                            title: "Detailed description of the schema",
                                            description: "Detailed description of the schema.",
                                            type: "string"
                                        },
                                        deprecated: {
                                            title: "Whether the type is deprecated or not",
                                            description: "Whether the type is deprecated or not.",
                                            type: "boolean"
                                        },
                                        example: {
                                            title: "Example value",
                                            description: "Example value."
                                        },
                                        examples: {
                                            description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                            type: "object",
                                            properties: {},
                                            required: [],
                                            additionalProperties: {}
                                        }
                                    },
                                    required: [
                                        "type"
                                    ],
                                    description: "Description of the current {@link IChatGptSchema.IInteger} type:\n\n> Integer type info.\n\n------------------------------\n\nDescription of the parent {@link IChatGptSchema} type:\n\n> Type schema info of the ChatGPT.\n> \n> `IChatGptSchema` is a type schema info of the ChatGPT function calling.\n> \n> `IChatGptSchema` basically follows the JSON schema definition of the OpenAPI v3.1\n> speciifcation; {@link OpenApiV3_1.IJsonSchema}.\n> \n> However, the `IChatGptSchema` does not follow the entire specification of\n> the OpenAPI v3.1. It has own specific restrictions and definitions. Here is the\n> list of how `IChatGptSchema` is different with the OpenAPI v3.1 JSON schema.\n> \n> - Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}\n> - Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}\n> - Tuple type is banned: {@link OpenApiV3_1.IJsonSchema.ITuple.prefixItems}\n> - Constant type is banned: {@link OpenApiV3_1.IJsonSchema.IConstant}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IOneOf} to {@link IChatGptSchema.IAnOf}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link IChatGptSchema.IObject}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link IChatGptSchema.IReference}\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> If compare with the {@link OpenApi.IJsonSchema}, the emended JSON schema specification,\n> \n> - {@link IChatGptSchema.IAnyOf} instead of the {@link OpenApi.IJsonSchema.IOneOf}\n> - {@link IChatGptSchema.IParameters.$defs} instead of the {@link OpenApi.IJsonSchema.IComponents.schemas}\n> - {@link IChatGptSchema.IString.enum} instead of the {@link OpenApi.IJsonSchema.IConstant}\n> - {@link IChatGptSchema.additionalProperties} is fixed to `false`\n> - No tuple type {@link OpenApi.IJsonSchema.ITuple} support\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> For reference, if you've composed the `IChatGptSchema` type with the\n> {@link IChatGptSchema.IConfig.reference} `false` option (default is `false`),\n> only the recursived named types would be archived into the\n> {@link IChatGptSchema.IParameters.$defs}, and the others would be ecaped from the\n> {@link IChatGptSchema.IReference} type.\n> \n> Also, OpenAI has banned below constraint properties. Instead, `IChatGptSchema`\n> fills the {@link IChatGptSchema.__IAttribute.description} property with\n> the comment text like `\"@format uuid\"`.\n> \n> - {@link OpenApi.IJsonSchema.INumber.minimum}\n> - {@link OpenApi.IJsonSchema.INumber.maximum}\n> - {@link OpenApi.IJsonSchema.INumber.multipleOf}\n> - {@link OpenApi.IJsonSchema.IString.minLength}\n> - {@link OpenApi.IJsonSchema.IString.maxLength}\n> - {@link OpenApi.IJsonSchema.IString.format}\n> - {@link OpenApi.IJsonSchema.IString.pattern}\n> - {@link OpenApi.IJsonSchema.IString.contentMediaType}\n> - {@link OpenApi.IJsonSchema.IString.default}\n> - {@link OpenApi.IJsonSchema.IArray.minItems}\n> - {@link OpenApi.IJsonSchema.IArray.maxItems}\n> - {@link OpenApi.IJsonSchema.IArray.unique}\n> \n> Additionally, OpenAI cannot define the `description` property to the\n> {@link IChatGptSchema.IReference} type, and even does not understand\n> the capsulization to the {@link IChatGptSchema.IAnyOf} type.\n> Therefore, the `description` is written to the parent object type,\n> not the reference type.\n> \n> ```json\n> {\n>   \"type\": \"object\",\n>   \"description\": \"### Description of {@link something} property.\\n\\n> Hello?\",\n>   \"properties\": {\n>     \"something\": {\n>       \"$ref\": \"#/$defs/SomeObject\"\n>     }\n>   }\n> }\n> ```"
                                },
                                {
                                    type: "object",
                                    properties: {
                                        "enum": {
                                            title: "Enumeration values",
                                            description: "Enumeration values.",
                                            type: "array",
                                            items: {
                                                type: "boolean"
                                            }
                                        },
                                        type: {
                                            title: "Discriminator value of the type",
                                            description: "Discriminator value of the type.",
                                            type: "string",
                                            "enum": [
                                                "boolean"
                                            ]
                                        },
                                        title: {
                                            title: "Title of the schema",
                                            description: "Title of the schema.",
                                            type: "string"
                                        },
                                        description: {
                                            title: "Detailed description of the schema",
                                            description: "Detailed description of the schema.",
                                            type: "string"
                                        },
                                        deprecated: {
                                            title: "Whether the type is deprecated or not",
                                            description: "Whether the type is deprecated or not.",
                                            type: "boolean"
                                        },
                                        example: {
                                            title: "Example value",
                                            description: "Example value."
                                        },
                                        examples: {
                                            description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                            type: "object",
                                            properties: {},
                                            required: [],
                                            additionalProperties: {}
                                        }
                                    },
                                    required: [
                                        "type"
                                    ],
                                    description: "Description of the current {@link IChatGptSchema.IBoolean} type:\n\n> Boolean type info.\n\n------------------------------\n\nDescription of the parent {@link IChatGptSchema} type:\n\n> Type schema info of the ChatGPT.\n> \n> `IChatGptSchema` is a type schema info of the ChatGPT function calling.\n> \n> `IChatGptSchema` basically follows the JSON schema definition of the OpenAPI v3.1\n> speciifcation; {@link OpenApiV3_1.IJsonSchema}.\n> \n> However, the `IChatGptSchema` does not follow the entire specification of\n> the OpenAPI v3.1. It has own specific restrictions and definitions. Here is the\n> list of how `IChatGptSchema` is different with the OpenAPI v3.1 JSON schema.\n> \n> - Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}\n> - Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}\n> - Tuple type is banned: {@link OpenApiV3_1.IJsonSchema.ITuple.prefixItems}\n> - Constant type is banned: {@link OpenApiV3_1.IJsonSchema.IConstant}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IOneOf} to {@link IChatGptSchema.IAnOf}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link IChatGptSchema.IObject}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link IChatGptSchema.IReference}\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> If compare with the {@link OpenApi.IJsonSchema}, the emended JSON schema specification,\n> \n> - {@link IChatGptSchema.IAnyOf} instead of the {@link OpenApi.IJsonSchema.IOneOf}\n> - {@link IChatGptSchema.IParameters.$defs} instead of the {@link OpenApi.IJsonSchema.IComponents.schemas}\n> - {@link IChatGptSchema.IString.enum} instead of the {@link OpenApi.IJsonSchema.IConstant}\n> - {@link IChatGptSchema.additionalProperties} is fixed to `false`\n> - No tuple type {@link OpenApi.IJsonSchema.ITuple} support\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> For reference, if you've composed the `IChatGptSchema` type with the\n> {@link IChatGptSchema.IConfig.reference} `false` option (default is `false`),\n> only the recursived named types would be archived into the\n> {@link IChatGptSchema.IParameters.$defs}, and the others would be ecaped from the\n> {@link IChatGptSchema.IReference} type.\n> \n> Also, OpenAI has banned below constraint properties. Instead, `IChatGptSchema`\n> fills the {@link IChatGptSchema.__IAttribute.description} property with\n> the comment text like `\"@format uuid\"`.\n> \n> - {@link OpenApi.IJsonSchema.INumber.minimum}\n> - {@link OpenApi.IJsonSchema.INumber.maximum}\n> - {@link OpenApi.IJsonSchema.INumber.multipleOf}\n> - {@link OpenApi.IJsonSchema.IString.minLength}\n> - {@link OpenApi.IJsonSchema.IString.maxLength}\n> - {@link OpenApi.IJsonSchema.IString.format}\n> - {@link OpenApi.IJsonSchema.IString.pattern}\n> - {@link OpenApi.IJsonSchema.IString.contentMediaType}\n> - {@link OpenApi.IJsonSchema.IString.default}\n> - {@link OpenApi.IJsonSchema.IArray.minItems}\n> - {@link OpenApi.IJsonSchema.IArray.maxItems}\n> - {@link OpenApi.IJsonSchema.IArray.unique}\n> \n> Additionally, OpenAI cannot define the `description` property to the\n> {@link IChatGptSchema.IReference} type, and even does not understand\n> the capsulization to the {@link IChatGptSchema.IAnyOf} type.\n> Therefore, the `description` is written to the parent object type,\n> not the reference type.\n> \n> ```json\n> {\n>   \"type\": \"object\",\n>   \"description\": \"### Description of {@link something} property.\\n\\n> Hello?\",\n>   \"properties\": {\n>     \"something\": {\n>       \"$ref\": \"#/$defs/SomeObject\"\n>     }\n>   }\n> }\n> ```"
                                },
                                {
                                    $ref: "#/$defs/IChatGptSchema.IArray"
                                },
                                {
                                    $ref: "#/$defs/IChatGptSchema.IObject"
                                },
                                {
                                    type: "object",
                                    properties: {
                                        $ref: {
                                            title: "Reference to the named schema",
                                            description: "Reference to the named schema.\n\nThe `ref` is a reference to the named schema. Format of the `$ref` is\nfollowing the JSON Pointer specification. In the OpenAPI, the `$ref`\nstarts with `#/$defs/` which means the type is stored in\nthe {@link IChatGptSchema.IParameters.$defs} object.\n\n- `#/$defs/SomeObject`\n- `#/$defs/AnotherObject`",
                                            type: "string"
                                        },
                                        title: {
                                            title: "Title of the schema",
                                            description: "Title of the schema.",
                                            type: "string"
                                        },
                                        description: {
                                            title: "Detailed description of the schema",
                                            description: "Detailed description of the schema.",
                                            type: "string"
                                        },
                                        deprecated: {
                                            title: "Whether the type is deprecated or not",
                                            description: "Whether the type is deprecated or not.",
                                            type: "boolean"
                                        },
                                        example: {
                                            title: "Example value",
                                            description: "Example value."
                                        },
                                        examples: {
                                            description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                            type: "object",
                                            properties: {},
                                            required: [],
                                            additionalProperties: {}
                                        }
                                    },
                                    required: [
                                        "$ref"
                                    ],
                                    description: "Description of the current {@link IChatGptSchema.IReference} type:\n\n> Reference type directing named schema.\n\n------------------------------\n\nDescription of the parent {@link IChatGptSchema} type:\n\n> Type schema info of the ChatGPT.\n> \n> `IChatGptSchema` is a type schema info of the ChatGPT function calling.\n> \n> `IChatGptSchema` basically follows the JSON schema definition of the OpenAPI v3.1\n> speciifcation; {@link OpenApiV3_1.IJsonSchema}.\n> \n> However, the `IChatGptSchema` does not follow the entire specification of\n> the OpenAPI v3.1. It has own specific restrictions and definitions. Here is the\n> list of how `IChatGptSchema` is different with the OpenAPI v3.1 JSON schema.\n> \n> - Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}\n> - Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}\n> - Tuple type is banned: {@link OpenApiV3_1.IJsonSchema.ITuple.prefixItems}\n> - Constant type is banned: {@link OpenApiV3_1.IJsonSchema.IConstant}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IOneOf} to {@link IChatGptSchema.IAnOf}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link IChatGptSchema.IObject}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link IChatGptSchema.IReference}\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> If compare with the {@link OpenApi.IJsonSchema}, the emended JSON schema specification,\n> \n> - {@link IChatGptSchema.IAnyOf} instead of the {@link OpenApi.IJsonSchema.IOneOf}\n> - {@link IChatGptSchema.IParameters.$defs} instead of the {@link OpenApi.IJsonSchema.IComponents.schemas}\n> - {@link IChatGptSchema.IString.enum} instead of the {@link OpenApi.IJsonSchema.IConstant}\n> - {@link IChatGptSchema.additionalProperties} is fixed to `false`\n> - No tuple type {@link OpenApi.IJsonSchema.ITuple} support\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> For reference, if you've composed the `IChatGptSchema` type with the\n> {@link IChatGptSchema.IConfig.reference} `false` option (default is `false`),\n> only the recursived named types would be archived into the\n> {@link IChatGptSchema.IParameters.$defs}, and the others would be ecaped from the\n> {@link IChatGptSchema.IReference} type.\n> \n> Also, OpenAI has banned below constraint properties. Instead, `IChatGptSchema`\n> fills the {@link IChatGptSchema.__IAttribute.description} property with\n> the comment text like `\"@format uuid\"`.\n> \n> - {@link OpenApi.IJsonSchema.INumber.minimum}\n> - {@link OpenApi.IJsonSchema.INumber.maximum}\n> - {@link OpenApi.IJsonSchema.INumber.multipleOf}\n> - {@link OpenApi.IJsonSchema.IString.minLength}\n> - {@link OpenApi.IJsonSchema.IString.maxLength}\n> - {@link OpenApi.IJsonSchema.IString.format}\n> - {@link OpenApi.IJsonSchema.IString.pattern}\n> - {@link OpenApi.IJsonSchema.IString.contentMediaType}\n> - {@link OpenApi.IJsonSchema.IString.default}\n> - {@link OpenApi.IJsonSchema.IArray.minItems}\n> - {@link OpenApi.IJsonSchema.IArray.maxItems}\n> - {@link OpenApi.IJsonSchema.IArray.unique}\n> \n> Additionally, OpenAI cannot define the `description` property to the\n> {@link IChatGptSchema.IReference} type, and even does not understand\n> the capsulization to the {@link IChatGptSchema.IAnyOf} type.\n> Therefore, the `description` is written to the parent object type,\n> not the reference type.\n> \n> ```json\n> {\n>   \"type\": \"object\",\n>   \"description\": \"### Description of {@link something} property.\\n\\n> Hello?\",\n>   \"properties\": {\n>     \"something\": {\n>       \"$ref\": \"#/$defs/SomeObject\"\n>     }\n>   }\n> }\n> ```"
                                },
                                {
                                    $ref: "#/$defs/IChatGptSchema.IAnyOf"
                                },
                                {
                                    type: "object",
                                    properties: {
                                        title: {
                                            title: "Title of the schema",
                                            description: "Title of the schema.",
                                            type: "string"
                                        },
                                        description: {
                                            title: "Detailed description of the schema",
                                            description: "Detailed description of the schema.",
                                            type: "string"
                                        },
                                        deprecated: {
                                            title: "Whether the type is deprecated or not",
                                            description: "Whether the type is deprecated or not.",
                                            type: "boolean"
                                        },
                                        example: {
                                            title: "Example value",
                                            description: "Example value."
                                        },
                                        examples: {
                                            description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                            type: "object",
                                            properties: {},
                                            required: [],
                                            additionalProperties: {}
                                        }
                                    },
                                    required: [],
                                    description: "Description of the current {@link IChatGptSchema.IUnknown} type:\n\n> Unknown, the `any` type.\n\n------------------------------\n\nDescription of the parent {@link IChatGptSchema} type:\n\n> Type schema info of the ChatGPT.\n> \n> `IChatGptSchema` is a type schema info of the ChatGPT function calling.\n> \n> `IChatGptSchema` basically follows the JSON schema definition of the OpenAPI v3.1\n> speciifcation; {@link OpenApiV3_1.IJsonSchema}.\n> \n> However, the `IChatGptSchema` does not follow the entire specification of\n> the OpenAPI v3.1. It has own specific restrictions and definitions. Here is the\n> list of how `IChatGptSchema` is different with the OpenAPI v3.1 JSON schema.\n> \n> - Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}\n> - Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}\n> - Tuple type is banned: {@link OpenApiV3_1.IJsonSchema.ITuple.prefixItems}\n> - Constant type is banned: {@link OpenApiV3_1.IJsonSchema.IConstant}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IOneOf} to {@link IChatGptSchema.IAnOf}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link IChatGptSchema.IObject}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link IChatGptSchema.IReference}\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> If compare with the {@link OpenApi.IJsonSchema}, the emended JSON schema specification,\n> \n> - {@link IChatGptSchema.IAnyOf} instead of the {@link OpenApi.IJsonSchema.IOneOf}\n> - {@link IChatGptSchema.IParameters.$defs} instead of the {@link OpenApi.IJsonSchema.IComponents.schemas}\n> - {@link IChatGptSchema.IString.enum} instead of the {@link OpenApi.IJsonSchema.IConstant}\n> - {@link IChatGptSchema.additionalProperties} is fixed to `false`\n> - No tuple type {@link OpenApi.IJsonSchema.ITuple} support\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> For reference, if you've composed the `IChatGptSchema` type with the\n> {@link IChatGptSchema.IConfig.reference} `false` option (default is `false`),\n> only the recursived named types would be archived into the\n> {@link IChatGptSchema.IParameters.$defs}, and the others would be ecaped from the\n> {@link IChatGptSchema.IReference} type.\n> \n> Also, OpenAI has banned below constraint properties. Instead, `IChatGptSchema`\n> fills the {@link IChatGptSchema.__IAttribute.description} property with\n> the comment text like `\"@format uuid\"`.\n> \n> - {@link OpenApi.IJsonSchema.INumber.minimum}\n> - {@link OpenApi.IJsonSchema.INumber.maximum}\n> - {@link OpenApi.IJsonSchema.INumber.multipleOf}\n> - {@link OpenApi.IJsonSchema.IString.minLength}\n> - {@link OpenApi.IJsonSchema.IString.maxLength}\n> - {@link OpenApi.IJsonSchema.IString.format}\n> - {@link OpenApi.IJsonSchema.IString.pattern}\n> - {@link OpenApi.IJsonSchema.IString.contentMediaType}\n> - {@link OpenApi.IJsonSchema.IString.default}\n> - {@link OpenApi.IJsonSchema.IArray.minItems}\n> - {@link OpenApi.IJsonSchema.IArray.maxItems}\n> - {@link OpenApi.IJsonSchema.IArray.unique}\n> \n> Additionally, OpenAI cannot define the `description` property to the\n> {@link IChatGptSchema.IReference} type, and even does not understand\n> the capsulization to the {@link IChatGptSchema.IAnyOf} type.\n> Therefore, the `description` is written to the parent object type,\n> not the reference type.\n> \n> ```json\n> {\n>   \"type\": \"object\",\n>   \"description\": \"### Description of {@link something} property.\\n\\n> Hello?\",\n>   \"properties\": {\n>     \"something\": {\n>       \"$ref\": \"#/$defs/SomeObject\"\n>     }\n>   }\n> }\n> ```"
                                },
                                {
                                    type: "object",
                                    properties: {
                                        type: {
                                            title: "Discriminator value of the type",
                                            description: "Discriminator value of the type.",
                                            type: "string",
                                            "enum": [
                                                "null"
                                            ]
                                        },
                                        title: {
                                            title: "Title of the schema",
                                            description: "Title of the schema.",
                                            type: "string"
                                        },
                                        description: {
                                            title: "Detailed description of the schema",
                                            description: "Detailed description of the schema.",
                                            type: "string"
                                        },
                                        deprecated: {
                                            title: "Whether the type is deprecated or not",
                                            description: "Whether the type is deprecated or not.",
                                            type: "boolean"
                                        },
                                        example: {
                                            title: "Example value",
                                            description: "Example value."
                                        },
                                        examples: {
                                            description: "List of example values as key-value pairs.\n\n------------------------------\n\nDescription of the current {@link Recordstringany} type:\n\n> Construct a type with a set of properties K of type T",
                                            type: "object",
                                            properties: {},
                                            required: [],
                                            additionalProperties: {}
                                        }
                                    },
                                    required: [
                                        "type"
                                    ],
                                    description: "Description of the current {@link IChatGptSchema.INull} type:\n\n> Null type.\n\n------------------------------\n\nDescription of the parent {@link IChatGptSchema} type:\n\n> Type schema info of the ChatGPT.\n> \n> `IChatGptSchema` is a type schema info of the ChatGPT function calling.\n> \n> `IChatGptSchema` basically follows the JSON schema definition of the OpenAPI v3.1\n> speciifcation; {@link OpenApiV3_1.IJsonSchema}.\n> \n> However, the `IChatGptSchema` does not follow the entire specification of\n> the OpenAPI v3.1. It has own specific restrictions and definitions. Here is the\n> list of how `IChatGptSchema` is different with the OpenAPI v3.1 JSON schema.\n> \n> - Decompose mixed type: {@link OpenApiV3_1.IJsonSchema.IMixed}\n> - Resolve nullable property: {@link OpenApiV3_1.IJsonSchema.__ISignificant.nullable}\n> - Tuple type is banned: {@link OpenApiV3_1.IJsonSchema.ITuple.prefixItems}\n> - Constant type is banned: {@link OpenApiV3_1.IJsonSchema.IConstant}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IOneOf} to {@link IChatGptSchema.IAnOf}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IAllOf} to {@link IChatGptSchema.IObject}\n> - Merge {@link OpenApiV3_1.IJsonSchema.IRecursiveReference} to {@link IChatGptSchema.IReference}\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> If compare with the {@link OpenApi.IJsonSchema}, the emended JSON schema specification,\n> \n> - {@link IChatGptSchema.IAnyOf} instead of the {@link OpenApi.IJsonSchema.IOneOf}\n> - {@link IChatGptSchema.IParameters.$defs} instead of the {@link OpenApi.IJsonSchema.IComponents.schemas}\n> - {@link IChatGptSchema.IString.enum} instead of the {@link OpenApi.IJsonSchema.IConstant}\n> - {@link IChatGptSchema.additionalProperties} is fixed to `false`\n> - No tuple type {@link OpenApi.IJsonSchema.ITuple} support\n> - When {@link IChatGptSchema.IConfig.strict} mode\n>   - Every object properties must be required\n>   - Do not allow {@link IChatGptSchema.IObject.additionalProperties}\n> \n> For reference, if you've composed the `IChatGptSchema` type with the\n> {@link IChatGptSchema.IConfig.reference} `false` option (default is `false`),\n> only the recursived named types would be archived into the\n> {@link IChatGptSchema.IParameters.$defs}, and the others would be ecaped from the\n> {@link IChatGptSchema.IReference} type.\n> \n> Also, OpenAI has banned below constraint properties. Instead, `IChatGptSchema`\n> fills the {@link IChatGptSchema.__IAttribute.description} property with\n> the comment text like `\"@format uuid\"`.\n> \n> - {@link OpenApi.IJsonSchema.INumber.minimum}\n> - {@link OpenApi.IJsonSchema.INumber.maximum}\n> - {@link OpenApi.IJsonSchema.INumber.multipleOf}\n> - {@link OpenApi.IJsonSchema.IString.minLength}\n> - {@link OpenApi.IJsonSchema.IString.maxLength}\n> - {@link OpenApi.IJsonSchema.IString.format}\n> - {@link OpenApi.IJsonSchema.IString.pattern}\n> - {@link OpenApi.IJsonSchema.IString.contentMediaType}\n> - {@link OpenApi.IJsonSchema.IString.default}\n> - {@link OpenApi.IJsonSchema.IArray.minItems}\n> - {@link OpenApi.IJsonSchema.IArray.maxItems}\n> - {@link OpenApi.IJsonSchema.IArray.unique}\n> \n> Additionally, OpenAI cannot define the `description` property to the\n> {@link IChatGptSchema.IReference} type, and even does not understand\n> the capsulization to the {@link IChatGptSchema.IAnyOf} type.\n> Therefore, the `description` is written to the parent object type,\n> not the reference type.\n> \n> ```json\n> {\n>   \"type\": \"object\",\n>   \"description\": \"### Description of {@link something} property.\\n\\n> Hello?\",\n>   \"properties\": {\n>     \"something\": {\n>       \"$ref\": \"#/$defs/SomeObject\"\n>     }\n>   }\n> }\n> ```"
                                }
                            ]
                        },
                        description: {
                            title: "Description of the function",
                            description: "Description of the function.\n\n`IHttpLlmFunction.description` is composed by below rule:\n\n1. Starts from the {@link OpenApi.IOperation.summary} paragraph.\n2. The next paragraphs are filled with the\n   {@link OpenApi.IOperation.description}. By the way, if the first\n   paragraph of {@link OpenApi.IOperation.description} is same with the\n   {@link OpenApi.IOperation.summary}, it would not be duplicated.\n3. Parameters' descriptions are added with `@param` tag.\n4. {@link OpenApi.IOperation.security Security requirements} are added\n   with `@security` tag.\n5. Tag names are added with `@tag` tag.\n6. If {@link OpenApi.IOperation.deprecated}, `@deprecated` tag is added.\n\nFor reference, the `description` is very important property to teach\nthe purpose of the function to the LLM (Language Large Model), and\nLLM actually determines which function to call by the description.\n\nAlso, when the LLM conversates with the user, the `description` is\nused to explain the function to the user. Therefore, the `description`\nproperty has the highest priority, and you have to consider it.",
                            type: "string"
                        },
                        deprecated: {
                            title: "Whether the function is deprecated or not",
                            description: "Whether the function is deprecated or not.\n\nIf the `deprecated` is `true`, the function is not recommended to use.\n\nLLM (Large Language Model) may not use the deprecated function.",
                            type: "boolean"
                        },
                        tags: {
                            title: "Category tags for the function",
                            description: "Category tags for the function.\n\nSame with {@link OpenApi.IOperation.tags} indicating the category of the function.",
                            type: "array",
                            items: {
                                type: "string"
                            }
                        }
                    },
                    required: [
                        "method",
                        "path",
                        "name",
                        "parameters"
                    ]
                }
            },
            description: "Get list of API functions.\n\nIf user seems like to request some function calling except this one,\ncall this `getApiFunctions()` to get the list of candidate API functions\nprovided from this application.\n\nAlso, user just wants to list up every remote API functions that can be\ncalled from the backend server, utilize this function too.",
            validate: (() => { const _io0 = input => true; const _vo0 = (input, _path, _exceptionable = true) => true; const __is = input => "object" === typeof input && null !== input && false === Array.isArray(input) && _io0(input); let errors; let _report; return input => {
                if (false === __is(input)) {
                    errors = [];
                    _report = __typia_transform__validateReport._validateReport(errors);
                    ((input, _path, _exceptionable = true) => ("object" === typeof input && null !== input && false === Array.isArray(input) || _report(true, {
                        path: _path + "",
                        expected: "object",
                        value: input
                    })) && _vo0(input, _path + "", true) || _report(true, {
                        path: _path + "",
                        expected: "object",
                        value: input
                    }))(input, "$input", true);
                    const success = 0 === errors.length;
                    return success ? {
                        success,
                        data: input
                    } : {
                        success,
                        errors,
                        data: input
                    };
                }
                return {
                    success: true,
                    data: input
                };
            }; })()
        }
    ]
}.functions[0];
function initialize(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        // ----
        // EXECUTE CHATGPT API
        // ----
        const completionStream = yield ctx.request("initialize", {
            messages: [
                // COMMON SYSTEM PROMPT
                {
                    role: "system",
                    content: AgenticaDefaultPrompt_1.AgenticaDefaultPrompt.write(ctx.config),
                },
                // PREVIOUS HISTORIES
                ...ctx.histories.map(histories_1.decodeHistory).flat(),
                // USER INPUT
                {
                    role: "user",
                    content: ctx.prompt.contents.map(histories_1.decodeUserMessageContent),
                },
                {
                    // SYSTEM PROMPT
                    role: "system",
                    content: (_d = (_c = (_b = (_a = ctx.config) === null || _a === void 0 ? void 0 : _a.systemPrompt) === null || _b === void 0 ? void 0 : _b.initialize) === null || _c === void 0 ? void 0 : _c.call(_b, ctx.histories)) !== null && _d !== void 0 ? _d : AgenticaSystemPrompt_1.AgenticaSystemPrompt.INITIALIZE,
                },
            ],
            // GETTER FUNCTION
            tools: [
                {
                    type: "function",
                    function: {
                        name: FUNCTION.name,
                        description: FUNCTION.description,
                        /**
                         * @TODO fix it
                         * The property and value have a type mismatch, but it works.
                         */
                        parameters: FUNCTION.parameters,
                    },
                },
            ],
            tool_choice: "auto",
            parallel_tool_calls: false,
        });
        const textContext = [];
        const completion = yield StreamUtil_1.StreamUtil.reduce(completionStream, (accPromise, chunk) => __awaiter(this, void 0, void 0, function* () {
            const acc = yield accPromise;
            const registerContext = (choices) => {
                var _a;
                for (const choice of choices) {
                    /**
                     * @TODO fix it
                     * Sometimes, the complete message arrives along with a finish reason.
                     */
                    if (choice.finish_reason != null) {
                        (_a = textContext[choice.index]) === null || _a === void 0 ? void 0 : _a.mpsc.close();
                        continue;
                    }
                    if (choice.delta.content == null || choice.delta.content.length === 0) {
                        continue;
                    }
                    if (textContext[choice.index] != null) {
                        textContext[choice.index].content += choice.delta.content;
                        textContext[choice.index].mpsc.produce(choice.delta.content);
                        continue;
                    }
                    const mpsc = new MPSC_1.MPSC();
                    textContext[choice.index] = {
                        content: choice.delta.content,
                        mpsc,
                    };
                    mpsc.produce(choice.delta.content);
                    const event = (0, events_1.creatAssistantMessageEvent)({
                        stream: (0, StreamUtil_1.streamDefaultReaderToAsyncGenerator)(mpsc.consumer.getReader()),
                        done: () => mpsc.done(),
                        get: () => textContext[choice.index].content,
                        join: () => __awaiter(this, void 0, void 0, function* () {
                            yield mpsc.waitClosed();
                            return textContext[choice.index].content;
                        }),
                    });
                    ctx.dispatch(event);
                }
            };
            if (acc.object === "chat.completion.chunk") {
                registerContext([acc, chunk].flatMap(v => v.choices));
                return ChatGptCompletionMessageUtil_1.ChatGptCompletionMessageUtil.merge([acc, chunk]);
            }
            registerContext(chunk.choices);
            return ChatGptCompletionMessageUtil_1.ChatGptCompletionMessageUtil.accumulate(acc, chunk);
        }));
        if (completion === null) {
            throw new Error("No completion received");
        }
        // ----
        // PROCESS COMPLETION
        // ----
        if (completion.choices.some(c => c.message.tool_calls != null
            && c.message.tool_calls.some(tc => tc.type === "function" && tc.function.name === FUNCTION.name))) {
            yield ctx.initialize();
        }
    });
}
//# sourceMappingURL=initialize.js.map