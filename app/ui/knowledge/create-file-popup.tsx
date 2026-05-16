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
    <div className="relative z-10" onClick={onClose}>
      <div className="fixed inset-0 bg-gray-500/20 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in" />
      <div
        className="fixed inset-0 z-10 w-screen overflow-y-auto"
        onClick={onClose}
      >
        <div
          className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          onClick={onClose}
        >
          <form
            className=" border border-gray-300 relative transform overflow-hidden rounded-l bg-white text-left sm:my-8 sm:w-full sm:max-w-lg"
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
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
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
      </div>
    </div>
  );
}
