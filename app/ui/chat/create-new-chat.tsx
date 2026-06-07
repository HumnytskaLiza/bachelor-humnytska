"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Button from "../button";
import Header from "../header";
import Input from "../input";
import { createChatAction } from "@/lib/actions";

type CreateChatPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

type InputsDataChat = {
  name: string;
};

export default function CreateChatPopup({
  isOpen,
  onClose,
}: CreateChatPopupProps) {
  const [inputsData, setInputsData] = useState<InputsDataChat>({
    name: "",
  });

  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setInputsData((data) => ({ ...data, [name]: value }));
    console.log(inputsData);
  };

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
            <Header name={"✍️ Start New Conversation"} type="subheader" />

            <Input
              required={true}
              placeholder={"Provide a name..."}
              name={"name"}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="bg-gray-50 py-3 flex flex-row-reverse px-6 gap-2">
          <Button
            onClick={() => {
              startTransition(async () => {
                const unique_id = await createChatAction(inputsData);
                router.push(`/assistant/${unique_id}`);
                onClose();
              });
            }}
            text={isPending ? "Creating..." : "Create"}
            type="main"
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
