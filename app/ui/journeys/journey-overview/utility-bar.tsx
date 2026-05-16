"use client";

import { useState } from "react";
import AddTaskPopup from "./add-task-popup";
import AddUserPopup from "./add-user-popup";
import Button from "../../button";
import { User } from "@/lib/definitions";

type UtilityBarProps = {
  unique_id: string;
  users: User[];
};

export default function UtilityBar({ unique_id, users }: UtilityBarProps) {
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const handleTaskOpen = () => setIsTaskOpen(true);
  const handleTaskClose = () => setIsTaskOpen(false);

  const handleUserOpen = () => setIsUserOpen(true);
  const handleUserClose = () => setIsUserOpen(false);

  return (
    <div className="flex flex-row w-fit gap-2">
      <Button
        onClick={handleTaskOpen}
        buttonType="button"
        text="Add Task"
        type="main"
        svg="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"
      />
      <Button
        onClick={handleUserOpen}
        buttonType="button"
        text="Add A User To Journey"
        type="secondary"
        svg="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"
      />
      <AddTaskPopup
        isOpen={isTaskOpen}
        onClose={handleTaskClose}
        unique_id={unique_id}
      />
      <AddUserPopup
        isOpen={isUserOpen}
        onClose={handleUserClose}
        unique_id={unique_id}
        users={users}
      />
    </div>
  );
}
