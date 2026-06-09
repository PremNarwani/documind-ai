"use client";

import { useEffect, useState } from "react";

import { MoreHorizontal } from "lucide-react";

import { api } from "@/services/api";
import { Chat } from "@/types/chat";

import DeleteModal from "./DeleteModal";


type Props = {
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  activeChatId: string;
  refreshTrigger: number;
};

export default function Sidebar({
  onSelectChat,
  onNewChat,
  activeChatId,
  refreshTrigger,
}: Props) {

  const [chats, setChats] =
    useState<Chat[]>([]);

  const [openMenu, setOpenMenu] =
    useState<string | null>(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [chatToDelete, setChatToDelete] =
    useState<string | null>(null);

  const loadChats = async () => {

    try {

      const response =
        await api.get("/chats");

      setChats(response.data);

    } catch (error) {

      console.error(
        "Failed to load chats:",
        error
      );

    }

  };

  useEffect(() => {

    loadChats();

  }, [refreshTrigger]);

  const confirmDelete = async () => {

    if (!chatToDelete) return;

    try {

      await api.delete(
        `/chat/${chatToDelete}`
      );

      setChats((prev) =>
        prev.filter(
          (chat) =>
            chat.id !== chatToDelete
        )
      );

      if (
        activeChatId ===
        chatToDelete
      ) {

        onNewChat();

      }

    } catch (error) {

      console.error(error);

    } finally {

      setShowDeleteModal(false);

      setChatToDelete(null);

      setOpenMenu(null);

    }

  };

  return (

    <div
      className="
        w-72
        h-screen
        bg-slate-50
        border-r
        border-slate-200
        flex
        flex-col
      "
    >

      {/* Header */}
{/* Header */}
<div
  className="
    px-6
    py-6
    border-b
    border-slate-200
    bg-white
  "
>

  <h1
    className="
      text-2xl
      font-bold
      tracking-tight
      bg-gradient-to-r
      from-blue-600
      to-violet-600
      bg-clip-text
      text-transparent
    "
  >
    DocuMind AI
  </h1>

  <p
    className="
      mt-1
      text-sm
      text-slate-500
    "
  >
    AI-powered document assistant
  </p>

</div>
      {/* New Chat */}
      <div className="p-4 py-3">

        <button
          onClick={onNewChat}
          className="
            w-full
            bg-slate-900
            text-white
            py-3
            rounded-xl
            font-medium
            hover:bg-slate-800
            transition
          "
        >
          + New Chat
        </button>

      </div>

      {/* Chat List */}
      <div
        className="
          flex-1
          overflow-y-auto
          px-3
        "
      >

        <h3
          className="
            px-2
            mb-3
            text-xs
            uppercase
            tracking-wider
            font-semibold
            text-slate-500
          "
        >
          Previous Chats
        </h3>

        <div className="space-y-2">

          {chats.length === 0 && (

            <div
              className="
                text-sm
                text-slate-500
                px-2
              "
            >
              No chats found
            </div>

          )}

          {chats.map((chat) => (

            <div
              key={chat.id}
              className={`
                relative
                group
                rounded-xl
                transition-all

                ${
                  activeChatId === chat.id
                    ? "bg-slate-900 text-white shadow-sm"
                    : "hover:bg-white hover:shadow-sm"
                }
              `}
            >

              {/* Chat Title */}
              <div
                onClick={() =>
                  onSelectChat(chat.id)
                }
                className="
                  px-4
                  py-3
                  pr-10
                  text-sm
                  truncate
                  cursor-pointer
                "
              >
                {chat.title}
              </div>

              {/* Three Dots */}
              <button
                onClick={(e) => {

                  e.stopPropagation();

                  setOpenMenu(
                    openMenu === chat.id
                      ? null
                      : chat.id
                  );

                }}
                className={`
                  absolute
                  right-2
                  top-1/2
                  -translate-y-1/2
                  transition-opacity

                  ${
                    activeChatId === chat.id
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }
                `}
              >

                <MoreHorizontal
                  size={18}
                  className={
                    activeChatId === chat.id
                      ? "text-white"
                      : "text-slate-500"
                  }
                />

              </button>

              {/* Dropdown */}
              {openMenu === chat.id && (

                <div
                  className="
                    absolute
                    right-2
                    top-11
                    bg-white
                    border
                    border-slate-200
                    rounded-xl
                    shadow-lg
                    z-50
                    w-40
                  "
                >

                  <button
                    onClick={() => {

                      setChatToDelete(
                        chat.id
                      );

                      setShowDeleteModal(
                        true
                      );

                    }}
                    className="
                      w-full
                      text-left
                      px-4
                      py-3
                      text-red-600
                      font-medium
                      rounded-xl
                      hover:bg-red-50
                      transition
                    "
                  >
                    Delete Chat
                  </button>

                </div>

              )}

            </div>

          ))}

        </div>

      </div>

      {/* Footer */}
    {/* Footer */}
<div
  className="
    p-4
    border-t
    border-slate-200
  "
>
  <div
    className="
      text-xs
      text-slate-400
      text-center
    "
  >
    DocuMind AI v1.0
  </div>
</div>

      {/* Delete Modal */}
      <DeleteModal
        open={showDeleteModal}
        onCancel={() =>
          setShowDeleteModal(false)
        }
        onConfirm={confirmDelete}
      />

    </div>

  );

}