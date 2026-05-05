"use client";

import { useState, useTransition } from "react";
import Button from "../button";
import Header from "../header";
import Input from "../input";
import { createFolderAction } from "@/lib/actions";
import { CreatePopupProps } from "@/lib/definitions";

export default function CreateFolderPopup({
  isOpen,
  onClose,
  unique_id,
}: CreatePopupProps) {
  const colors = ["#eae4da", "#4b607f", "#808bc5", "#ed773c"];

  const [inputsData, setInputsData] = useState({
    name: "",
    color_hex: colors[0],
    parent_id: unique_id ? unique_id : null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setInputsData((data) => ({ ...data, [name]: value }));
    console.log(inputsData);
  };

  function validateData() {
    if (!inputsData.name || !inputsData.color_hex) {
      alert("Provide all required information before creating the folder");
    } else {
      startTransition(async () => {
        await createFolderAction(inputsData);
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
                <Header name={"📂 Add A New Folder"} type="subheader" />
                <Input
                  required={true}
                  name={"name"}
                  onChange={handleInputChange}
                  placeholder={"Folder Name"}
                />
                <Input
                  required={true}
                  name={"color_id"}
                  type={"hidden"}
                  onChange={handleInputChange}
                  value={inputsData.color_hex}
                  placeholder={"Folder Name"}
                />
                <Input
                  required={true}
                  name={"parent_id"}
                  type={"hidden"}
                  onChange={handleInputChange}
                  value={inputsData.parent_id ?? ""}
                  placeholder={"Folder Name"}
                />
                <div className="flex flex-row gap-2 mt-2">
                  {colors.map((color, id) => {
                    return (
                      <button
                        type="button"
                        key={id}
                        name={color}
                        style={{ backgroundColor: color }}
                        onClick={() =>
                          setInputsData((data) => ({
                            ...data,
                            color_hex: color,
                          }))
                        }
                        className={`w-9 h-9 rounded-4xl cursor-pointer ${
                          inputsData.color_hex === color
                            ? "border border-gray-400 ring-2 ring-gray-300"
                            : "border border-gray-400"
                        }`}
                      ></button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
              <Button
                onClick={validateData}
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
      </div>
    </div>
  );
}
