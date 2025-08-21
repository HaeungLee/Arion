import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { markdownComponents } from "./MarkdownComponents";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const isEmailSuccess = /📧 이메일 전송 성공/.test(message.content);
  const isDescribe = (message as any).isDescribe;

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser 
            ? "bg-white text-zinc-900" 
            : isEmailSuccess
              ? "bg-emerald-600/80 text-white border border-emerald-400/60 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
              : isDescribe
                ? "bg-blue-600/60 text-gray-100 border border-blue-400/40"
                : "bg-zinc-700/50 text-gray-100"
        }`}
      >
        {isEmailSuccess && (
          <div className="mb-1 text-emerald-100 text-xs font-semibold">✅ EMAIL SENT</div>
        )}
        {isDescribe && !isEmailSuccess && (
          <div className="mb-1 text-blue-200 text-xs font-semibold">📋 DETAILS</div>
        )}
        {isUser ? (
          <p className="text-sm whitespace-pre-wrap break-all">
            {message.content}
          </p>
        ) : (
          <div className="prose prose-sm prose-invert max-w-none [&_pre]:!p-0 [&_pre]:!m-0 [&_pre]:!bg-transparent">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={markdownComponents}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
