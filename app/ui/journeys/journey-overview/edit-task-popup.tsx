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
                <Header name={"📋 Edit A Task"} type="subheader" />
                <Input
                  required={true}
                  name={"name"}
                  onChange={handleInputChange}
                  placeholder="Task Name"
                  dateLabel="Name:"
                  value={inputsData.name}
                />
                <Input
                  required={true}
                  name={"description"}
                  onChange={handleInputChange}
                  dateLabel="Description:"
                  placeholder="Task Description"
                  value={inputsData.description}
                />
                <Input
                  required={true}
                  type="date"
                  name={"deadline"}
                  value={inputsData.deadline?.toString()}
                  dateLabel="Deadline:"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
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
      </div>
    </div>
  );
}
