"use client";

import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Message } from "@/types/message";
type Props = {
  messages: Message[];
  loading: boolean;
  onSuggestionClick: (
    question: string
  ) => void;
};
export default function ChatWindow({
  messages,
  loading,
  onSuggestionClick,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div
      className="
        flex-1
        overflow-y-auto
        px-8
        py-8
        bg-gradient-to-br
        from-white
        via-slate-50
        to-indigo-50
      "
    >
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <div className="max-w-4xl w-full text-center">
            {/* Logo */}

            <img
              src="/logo.png"
              alt="DocuMind AI"
              className="
                w-72
                h-auto
                mx-auto
                drop-shadow-sm
              "
            />

            {/* Tagline */}

            <p
              className="
                mt-2
                text-xl
                text-slate-500
                max-w-3xl
                mx-auto
                leading-relaxed
              "
            >
              Chat with your PDFs, extract insights,
              generate summaries, and get accurate
              answers instantly.
            </p>

            {/* Suggestion Cards */}

            <div
              className="
                grid
                grid-cols-2
                gap-4
                mt-10
              "
            >
              <div
                onClick={() =>
                  onSuggestionClick(
                 "Provide a detailed summary of the uploaded document."
                   )
                        }
                  className="
                  bg-white
                  border
                  border-blue-100
                  rounded-2xl
                  p-5
                  shadow-sm
                  hover:shadow-md
                  hover:border-blue-300
                  transition-all
                  cursor-pointer
                  text-left"
                    >
  📄 Summarize this document
</div>

              <div
  onClick={() =>
    onSuggestionClick(
      "Extract the most important insights, findings, and trends from the uploaded document."
    )
  }
  className="
    bg-white
    border
    border-indigo-100
    rounded-2xl
    p-5
    shadow-sm
    hover:shadow-md
    hover:border-indigo-300
    transition-all
    cursor-pointer
    text-left
  "
>
  📊 Extract key insights
</div>

              <div
  onClick={() =>
    onSuggestionClick(
      "List all action items, recommendations, and next steps mentioned in the uploaded document."
    )
  }
  className="
    bg-white
    border
    border-purple-100
    rounded-2xl
    p-5
    shadow-sm
    hover:shadow-md
    hover:border-purple-300
    transition-all
    cursor-pointer
    text-left
  "
>
  📌 List action items
</div>

              <div
  onClick={() =>
    onSuggestionClick(
      "Explain what this document is about, including its purpose and main topics."
    )
  }
  className="
    bg-white
    border
    border-blue-100
    rounded-2xl
    p-5
    shadow-sm
    hover:shadow-md
    hover:border-blue-300
    transition-all
    cursor-pointer
    text-left
  "
>
  ❓ What is this document about?
</div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="
            max-w-5xl
            mx-auto
          "
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.role === "user"
                  ? "flex justify-end mb-6"
                  : "flex justify-start mb-6"
              }
            >
              <div className="max-w-3xl">
                <div
                  className={
                    msg.role === "user"
                      ? `
                        text-xs
                        text-right
                        font-semibold
                        text-slate-500
                        mb-2
                      `
                      : `
                        text-xs
                        font-semibold
                        text-slate-500
                        mb-2
                      `
                  }
                >
                  {msg.role === "user"
                    ? "You"
                    : "DocuMind AI"}
                </div>

                <div
                  className={
                    msg.role === "user"
                      ? `
                        bg-gradient-to-r
                        from-blue-600
                        to-purple-600
                        text-white
                        p-4
                        rounded-3xl
                        shadow-md
                      `
                      : `
                        bg-white
                        border
                        border-slate-200
                        text-slate-800
                        p-4
                        rounded-3xl
                        shadow-sm
                      `
                  }
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start mb-6">
              <div
                className="
                  bg-white
                  border
                  border-slate-200
                  rounded-3xl
                  px-5
                  py-4
                  shadow-sm
                "
              >
                <div className="flex items-center gap-2">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>

                  <span
                    className="
                      ml-2
                      text-sm
                      text-slate-500
                    "
                  >
                    Analyzing document...
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}