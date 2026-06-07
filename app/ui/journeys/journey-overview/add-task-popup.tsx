"use client";

import { useState, useTransition } from "react";
import Button from "../../button";
import Header from "../../header";
import Input from "../../input";
import { createTaskAction } from "@/lib/actions";

type CreateTaskPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  unique_id: string;
};

const dateToday = new Date(Date.now());

export default function AddTaskPopup({
  isOpen,
  onClose,
  unique_id,
}: CreateTaskPopupProps) {
  const [inputsData, setInputsData] = useState({
    name: "",
    deadline: dateToday,
    description: "",
    journey_id: unique_id,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setInputsData((data) => ({ ...data, [name]: value }));
    console.log(inputsData);
  };

  function validateData() {
    if (!inputsData.name || !inputsData.deadline || !inputsData.description) {
      alert("Provide all required information before adding a task");
    } else {
      startTransition(async () => {
        await createTaskAction(inputsData);
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
            <Header name={"📋 Add New Task"} type="subheader" />
            <Input
              required={true}
              name={"journey_id"}
              type={"hidden"}
              onChange={handleInputChange}
              value={inputsData.journey_id}
            />
            <Input
              required={true}
              name={"name"}
              onChange={handleInputChange}
              placeholder="Task Name"
            />
            <Input
              required={true}
              name={"description"}
              onChange={handleInputChange}
              placeholder="Task Description"
            />
            <Input
              required={true}
              type="date"
              name={"deadline"}
              dateLabel="Deadline:"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="bg-gray-50 py-3 flex flex-row-reverse px-6 gap-2">
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
  );
}
