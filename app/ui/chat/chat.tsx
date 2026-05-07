"use client";

import { Card, CardContent } from "../card";
import { ScrollArea } from "../scroll";
import MessageComponent from "../message";
import { ChatProps } from "@/lib/definitions";
import Input from "../input";
import Button from "../button";
import { useState } from "react";
import { Message } from "@/lib/definitions";
import { addMessageAction } from "@/lib/actions";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

export default function Chat({ unique_id, data }: ChatProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: `/api/ai/chat?chatId=${unique_id}`,
    }),
    messages: data,
    onFinish: async ({ message }) => {
      await fetch(`/api/ai/assistant-response?chatId=${unique_id}`, {
        method: "POST",
        body: JSON.stringify({
          role: "assistant",
          chat_id: unique_id,
          content: message.parts
            .filter((p) => p.type === "text")
            .map((p) => p.text)
            .join(""),
        }),
      });
    },
    onError: (e) => {
      console.log("Error occured: ", e);
    },
  });

  // const saveMessage = async () => {
  //   if (!input.trim()) return;

  //   const newMessages = [...messages, { role: "user", message: input }];
  //   setMessages(newMessages);

  //   setInput("");
  //   setLoading(true);

  //   try {
  //     await addMessageAction({
  //       message: input,
  //       role: "user",
  //       chatId: unique_id,
  //     });

  //     setMessages((prev) => [
  //       ...prev,
  //       { role: "assistant", message: "test response from ai" },
  //     ]);

  //     await addMessageAction({
  //       message: "test response from ai",
  //       role: "assistant",
  //       chatId: unique_id,
  //     });
  //   } catch (e) {
  //     console.error("Error: ", e);
  //     setMessages([
  //       ...newMessages,
  //       { role: "assistant", message: "Error occurred." },
  //     ]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div
      className="flex h-[calc(100vh-190px)] w-full items-center justify-center 
    bg-gray-50 border border-gray-300"
    >
      <Card>
        <CardContent>
          <ScrollArea>
            <div className="flex flex-col gap-3">
              {messages.map((message) =>
                message.parts.map((part, i) => {
                  switch (part.type) {
                    case "text":
                      return (
                        <MessageComponent
                          key={i}
                          role={message.role === "user" ? "user" : "assistant"}
                          content={part.text}
                        />
                      );
                  }
                }),
              )}
              {loading && (
                <div className="text-sm text-gray-500">Thinking...</div>
              )}
            </div>
          </ScrollArea>

          <div className="flex gap-2">
            <Input
              style="round"
              required={true}
              name={input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button
              onClick={() => {
                sendMessage({
                  text: input,
                  metadata: {
                    chatId: unique_id,
                  },
                });
                setInput("");
              }}
              disabled={loading}
              text={"Send"}
              buttonType={"button"}
              type={"main"}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
