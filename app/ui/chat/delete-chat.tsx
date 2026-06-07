"use client";

import { useTransition } from "react";
import Button from "../button";
import Header from "../header";
import { deleteChatAction } from "@/lib/actions";

type DeleteChatPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  uniqueId: string;
  name: string;
};

export default function DeleteChatPopup({
  isOpen,
  onClose,
  uniqueId,
  name,
}: DeleteChatPopupProps) {
  const [isPending, startTransition] = useTransition();

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/20 p-4"
    >
      <form
        className="w-full max-w-lg rounded-lg border border-gray-300 bg-white text-left shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="flex flex-col gap-4 m-3">
            <Header name={"🗨️ Delete Chat"} type="subheader" />
            <p className="text-sm">
              Do you really want to delete this conversation: <b>{name}</b>?
            </p>
          </div>
        </div>
        <div className="bg-gray-50 py-3 flex flex-row-reverse px-6 gap-2">
          <Button
            onClick={() => {
              startTransition(async () => {
                await deleteChatAction(uniqueId);
                onClose();
              });
            }}
            text={isPending ? "Deleting..." : "Delete"}
            type="delete"
            buttonType="button"
          />
          <Button
            onClick={onClose}
            text="Cancel"
            type="secondary"
            buttonType="button"
          />
        </div>
      </form>
    </div>
  );
}
