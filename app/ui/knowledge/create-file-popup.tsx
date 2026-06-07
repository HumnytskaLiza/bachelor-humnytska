"use client";

import { useState, useTransition } from "react";
import Button from "../button";
import Header from "../header";
import Input from "../input";
import { addFileToStorageAction } from "@/lib/actions";

type CreateFilePopupProps = {
  isOpen: boolean;
  onClose: () => void;
  unique_id?: string;
};

export default function CreateFilePopup({
  isOpen,
  onClose,
  unique_id,
}: CreateFilePopupProps) {
  type InputsData = {
    name: string;
    content: File | null;
    folder_id: string | null;
  };

  const [inputsData, setInputsData] = useState<InputsData>({
    name: "",
    content: null,
    folder_id: unique_id ?? null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const target = e.target;

    if (target instanceof HTMLInputElement && target.type === "file") {
      setInputsData((data) => ({
        ...data,
        content: target.files?.[0] ?? null,
      }));
      return;
    }

    const { name, value } = target;
    setInputsData((data) => ({ ...data, [name]: value }));
  };

  function validateData() {
    if (!inputsData.name || !inputsData.content) {
      alert("Provide all required information before creating the folder");
    } else {
      startTransition(async () => {
        await addFileToStorageAction(inputsData);
        onClose();
      });
    }
  }

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
            <Header name={"📄 Add A New File"} type="subheader" />
            <Input
              required={true}
              name={"name"}
              onChange={handleInputChange}
              placeholder={"File Name"}
            />
            <Input
              required={true}
              name={"content"}
              type={"file"}
              accept=".pdf"
              onChange={handleInputChange}
            />
            {inputsData.content && (
              <div>
                Selected file:{" "}
                <span className="font-bold text-[#305c31] wrap-break-word">
                  {inputsData.content.name.toString()}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="bg-gray-50 py-3 flex flex-row-reverse px-6 gap-2">
          <Button
            onClick={validateData}
            text={isPending ? "Adding..." : "Add"}
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
