"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Card, CardContent } from "../card";
import { ScrollArea } from "../scroll";
import Input from "../input";
import Button from "../button";
import MessageComponent from "../message";
import NoDataComponent from "../no-data-component";
import { UIMessage } from "ai";

type ChatProps = {
  unique_id: string;
  data: UIMessage[];
};

export default function Chat({ unique_id, data }: ChatProps) {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
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

  return (
    <div
      className="flex h-[calc(100vh-190px)] w-full items-center justify-center 
    bg-gray-50 border border-gray-300"
    >
      <Card>
        <CardContent>
          <ScrollArea>
            <div
              className={
                messages.length === 0
                  ? "flex justify-center items-center h-full"
                  : "flex flex-col gap-3"
              }
            >
              {messages.length === 0 && (
                <NoDataComponent firstLine="What can I assist you with?" />
              )}

              {messages.length !== 0 &&
                messages.map((message) =>
                  message.parts.map((part, i) => {
                    if (part.type === "text") {
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
              {status === "submitted" ? (
                <MessageComponent role="assistant" content="Thinking..." />
              ) : null}
            </div>
          </ScrollArea>

          <div className="flex gap-2 mx-auto">
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
              disabled={
                status === "submitted" || status === "streaming" ? true : false
              }
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
