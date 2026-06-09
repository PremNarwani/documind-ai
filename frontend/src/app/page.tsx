"use client";

import { useState } from "react";

import Sidebar from "@/components/Sidebar";
import UploadButton from "@/components/UploadButton";
import ChatWindow from "@/components/ChatWindow";
import ChatInput from "@/components/ChatInput";

import { api } from "@/services/api";
import { Message } from "@/types/message";

export default function Home() {

  const [chatId, setChatId] =
    useState("");

  const [messages, setMessages] =
    useState<Message[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [refreshChats, setRefreshChats] =
    useState(0);

  const handleQuestion = async (
    question: string
  ) => {

    if (!chatId) {

      alert(
        "Please upload a PDF first"
      );

      return;
    }

    const userMessage: Message = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    try {

      setLoading(true);

      const response =
        await api.post("/chat", {
          chat_id: chatId,
          question,
        });

      const botMessage: Message = {
        role: "assistant",
        content:
          response.data.answer,
      };

      setMessages((prev) => [
        ...prev,
        botMessage,
      ]);

    } catch (error) {

      console.error(error);

      alert(
        "Failed to get answer"
      );

    } finally {

      setLoading(false);

    }
  };

  const handleSelectChat = async (
    selectedChatId: string
  ) => {

    try {

      const response =
        await api.get(
          `/chat/${selectedChatId}`
        );

      setChatId(
        selectedChatId
      );

      setMessages(
        response.data
      );

    } catch (error) {

      console.error(error);

    }
  };

  const handleNewChat = () => {

    setChatId("");

    setMessages([]);

  };

  return (

    <div className="flex h-screen">

      <Sidebar
        onSelectChat={
          handleSelectChat
        }
        onNewChat={
          handleNewChat
        }
        activeChatId={
          chatId
        }
        refreshTrigger={
          refreshChats
        }
      />

      <div className="flex-1 flex flex-col">

        <ChatWindow
       messages={messages}
       loading={loading}
       onSuggestionClick={handleQuestion}
/>

        <ChatInput
          onSend={
            handleQuestion
          }
          uploadComponent={
            <UploadButton
              onUploadSuccess={(id) => {

                setChatId(id);

                setMessages([]);

                setRefreshChats(
                  (prev) => prev + 1
                );

              }}
            />
          }
        />

      </div>

    </div>

  );
}