"use client";

import { useState, useTransition } from "react";
import Button from "../../button";
import Header from "../../header";
import Input from "../../input";
import { updateTaskAction } from "@/lib/actions";
import { Task } from "@/lib/definitions";

type EditTaskPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
};

export default function EditTaskPopup({
  isOpen,
  onClose,
  task,
}: EditTaskPopupProps) {
  const [inputsData, setInputsData] = useState({
    unique_id: task.unique_id,
    name: task.name,
    description: task.description,
    deadline: task.deadline,
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
      alert("Provide all required information before updating a task");
    } else {
      startTransition(async () => {
        await updateTaskAction(inputsData);
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
        <div className="px-4 pt-5 pb-4 sm:p-6">
          <div className="flex flex-col gap-4 m-3">
            <Header name={"📋 Edit A Task"} type="subheader" />

            <Input
              required
              name="name"
              onChange={handleInputChange}
              placeholder="Task Name"
              dateLabel="Name:"
              value={inputsData.name}
            />

            <Input
              required
              name="description"
              onChange={handleInputChange}
              dateLabel="Description:"
              placeholder="Task Description"
              value={inputsData.description}
            />

            <Input
              required
              type="date"
              name="deadline"
              value={inputsData.deadline?.toString()}
              dateLabel="Deadline:"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex flex-row-reverse gap-2 bg-gray-50 px-6 py-3">
          <Button
            onClick={validateData}
            text={isPending ? "Updating..." : "Update"}
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
