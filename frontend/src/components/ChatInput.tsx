"use client";

import { useState } from "react";

type Props = {
  onSend: (message: string) => void;
  uploadComponent?: React.ReactNode;
};

export default function ChatInput({
  onSend,
  uploadComponent,
}: Props) {

  const [message, setMessage] =
    useState("");

  const handleSend = () => {

    if (!message.trim()) return;

    onSend(message);

    setMessage("");
  };

  return (

    <div
      className="
        border-t
        border-slate-200
        bg-white
        p-5
      "
    >

      <div
        className="
          max-w-5xl
          mx-auto
          bg-white
          border
          border-slate-200
          rounded-[28px]
          shadow-sm
          hover:shadow-md
          transition-all
          duration-200
          flex
          items-center
          gap-3
          px-4
          py-3
        "
      >

        {/* Upload Button */}
        <div
          className="
            flex
            items-center
            justify-center
            rounded-xl
            hover:bg-slate-100
            transition
          "
        >
          {uploadComponent}
        </div>

        {/* Input */}
        <input
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={(e) => {

            if (e.key === "Enter") {

              handleSend();

            }

          }}
          type="text"
          placeholder="Ask anything about your document..."
          className="
            flex-1
            bg-transparent
            outline-none
            text-slate-800
            placeholder:text-slate-400
            text-[15px]
          "
        />

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className="
            w-11
            h-11
            rounded-2xl
            bg-slate-900
            text-white
            flex
            items-center
            justify-center
            hover:bg-slate-800
            disabled:opacity-40
            disabled:cursor-not-allowed
            transition-all
          "
        >
          ➜
        </button>

      </div>

      {/* Helper Text */}
      <div
        className="
          max-w-5xl
          mx-auto
          mt-2
          px-2
        "
      >

        <p
          className="
            text-xs
            text-slate-400
          "
        >
          Press Enter to send
        </p>

      </div>

    </div>

  );

}