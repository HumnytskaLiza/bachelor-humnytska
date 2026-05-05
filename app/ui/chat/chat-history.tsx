"use client";

import useSWR from "swr";
import { useState } from "react";
import { Chat } from "@/lib/definitions";
import Button from "../button";
import Link from "next/link";
import DeleteChatPopup from "./delete-chat";
import { ChatTableSkeleton } from "../skeletons";
import NoDataComponent from "../no-data-component";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ChatHistory() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  const { data, isLoading } = useSWR<Chat[]>("/api/chat", fetcher, {
    refreshInterval: 2000,
  });

  const isNoData = !isLoading && data?.length === 0;

  return (
    <div className="h-full">
      {!isLoading && !isNoData && (
        <ul role="list" className="divide-y divide-gray-100">
          {data?.map((chat) => (
            <li
              key={chat.unique_id}
              className="flex justify-between gap-6 items-center"
            >
              <div className="flex justify-between gap-6 w-full px-5 py-3">
                <div className="flex gap-x-4">
                  <div className="flex-auto">
                    <p className="text-sm/6 font-semibold text-gray-900">
                      {chat.name}
                    </p>
                    <p className="mt-1 text-xs/5 text-gray-500">
                      Created{" "}
                      <span>
                        {new Date(chat.created_date).toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-end gap-2">
                <Link href={`${chat.unique_id}`}>
                  <Button text="Open Chat" type="main" buttonType="button" />
                </Link>
                <Button
                  type="secondary"
                  buttonType="button"
                  onClick={() => setIsOpen(true)}
                  svg="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
                />
              </div>
              <DeleteChatPopup
                name={chat.name}
                uniqueId={chat.unique_id}
                isOpen={isOpen}
                onClose={handleClose}
              />
            </li>
          ))}
        </ul>
      )}
      {isNoData && (
        <NoDataComponent firstLine="No chats have been created yet..." />
      )}
      {isLoading && <ChatTableSkeleton />}
    </div>
  );
}
