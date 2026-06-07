"use client";

import Header from "../../header";
import Button from "../../button";
import { TaskAssignment } from "@/lib/definitions";
import { useState } from "react";
import EditTaskStatusPopup from "./edit-task-status-popup";
import styles from "@/app/ui/modules/main.module.css";
import ProgressBar from "../../progress-bar";

type EmployeeTasksProps = {
  mergedTasks: {
    unique_id: string;
    name: string;
    description: string;
    deadline: Date;
    created_date: Date;
    status: "Not Started" | "In Progress" | "Done" | "Blocked" | "Skipped";
  }[];
};

export default function EmployeeTasks({ mergedTasks }: EmployeeTasksProps) {
  const dataCount = mergedTasks.length;

  const [isOpen, setIsOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<TaskAssignment | null>(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const completedTasks = mergedTasks.filter(
    (mergedTasks) => mergedTasks.status === "Done",
  ).length;

  const progress =
    mergedTasks.length > 0
      ? Math.round((completedTasks / mergedTasks.length) * 100)
      : 0;

  return (
    <div className="h-full flex flex-col gap-3 mb-6">
      <Header
        type="sectionName"
        name={`📋 Assigned Tasks: ${dataCount === undefined ? "Loading..." : dataCount}`}
      />
      <ProgressBar progress={progress} />
      <ul role="list" className="flex flex-col gap-4">
        {mergedTasks.map((task) => (
          <li
            key={task.unique_id}
            className="flex flex-col gap-4 p-4 border border-gray-300 rounded-2xl"
          >
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between">
              <p className="text-sm md:text-l font-semibold text-gray-900">
                {task.name}
              </p>
              <div className="flex flex-row gap-3 items-center">
                <div className={`${styles.label} text-xs md:text-sm`}>
                  {task.status}
                </div>
                <Button
                  buttonType="button"
                  text="Change Status"
                  onClick={() => {
                    setTaskToEdit({
                      task_id: task.unique_id,
                      status: task.status,
                    });
                    handleOpen();
                  }}
                  type="main"
                  svg="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <p className="mt-1 text-xs/5 text-gray-500">
                Deadline:{" "}
                <span>{new Date(task.deadline).toLocaleString()}</span>
              </p>
              <p className="mt-1 text-xs/5 text-gray-500">
                Added:{" "}
                <span>{new Date(task.created_date).toLocaleString()}</span>
              </p>
            </div>
            <p className="mt-1 text-sm/6 text-gray-800">{task.description}</p>
          </li>
        ))}
      </ul>
      {taskToEdit && (
        <EditTaskStatusPopup
          isOpen={isOpen}
          onClose={handleClose}
          taskAssignment={taskToEdit}
        />
      )}
    </div>
  );
}
