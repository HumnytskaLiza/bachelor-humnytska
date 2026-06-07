"use client";

import { useState, useTransition } from "react";
import Button from "../../button";
import Header from "../../header";
import Input from "../../input";
import { updateTaskStatusAction } from "@/lib/actions";
import { TaskAssignment } from "@/lib/definitions";

type EditTaskStatusPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  taskAssignment: TaskAssignment;
};

export default function EditTaskStatusPopup({
  isOpen,
  onClose,
  taskAssignment,
}: EditTaskStatusPopupProps) {
  const [inputsData, setInputsData] = useState({
    task_id: taskAssignment.task_id,
    status: taskAssignment.status,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setInputsData((data) => ({ ...data, [name]: value }));
    console.log(inputsData);
  };

  function validateData() {
    startTransition(async () => {
      await updateTaskStatusAction(inputsData);
      onClose();
    });
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
            <Header name={"📋 Edit A Task"} type="subheader" />
            <Input
              required={true}
              name={"status"}
              onChange={handleInputChange}
              value={inputsData.status}
              options={[
                "Not Started",
                "In Progress",
                "Done",
                "Blocked",
                "Skipped",
              ]}
            />
          </div>
        </div>
        <div className="bg-gray-50 py-3 flex flex-row-reverse px-6 gap-2">
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
