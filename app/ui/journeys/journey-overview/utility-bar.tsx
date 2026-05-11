"use client";

import { useState } from "react";
import AddTaskPopup from "./add-task-popup";
import AddUserPopup from "./add-user-popup";
import Button from "../../button";
import { JourneyOverviewDataProps } from "@/lib/definitions";

export default function UtilityBar({
  unique_id,
  users,
}: JourneyOverviewDataProps) {
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
        type="main"
        svg="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"
      />
      <Button
        buttonType="button"
        text="Edit Journey"
        type="secondary"
        svg="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"
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
