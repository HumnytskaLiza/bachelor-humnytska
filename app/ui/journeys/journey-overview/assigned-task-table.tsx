"use client";

import Header from "../../header";
import Button from "../../button";
import useSWR from "swr";
import { TasksTableSkeleton } from "../../skeletons";
import NoDataComponent from "../../no-data-component";
import { Task } from "@/lib/definitions";
import EditTaskPopup from "./edit-task-popup";
import { useState } from "react";

type AssignedTasksTableProps = {
  unique_id: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AssignedTasksTable({
  unique_id,
}: AssignedTasksTableProps) {
  const { data, isLoading } = useSWR<Task[]>(
    `/api/journey/${unique_id}/tasks`,
    fetcher,
    {
      refreshInterval: 4000,
    },
  );

  const isNoData = !isLoading && data?.length === 0;
  const dataCount = data?.length;

  const [isOpen, setIsOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="h-full flex flex-col gap-3 mb-6">
      <Header
        type="sectionName"
        name={`📋 Tasks In The Journey: ${dataCount === undefined ? "Loading..." : dataCount}`}
      />
      {!isLoading && !isNoData && (
        <ul role="list" className="flex flex-col gap-4">
          {data?.map((task) => (
            <li
              key={task.unique_id}
              className="flex flex-col gap-4 p-4 border border-gray-300 rounded-2xl"
            >
              <div className="flex flex-row items-center justify-between">
                <p className="text-l font-semibold text-gray-900">
                  {task.name}
                </p>
                <div className="flex flex-row gap-3 items-center">
                  <Button
                    buttonType="button"
                    text="Edit Task"
                    onClick={() => {
                      setTaskToEdit(task);
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
      )}
      {isNoData && (
        <div className="h-50">
          <NoDataComponent firstLine="No tasks have been assigned to this journey yet..." />
        </div>
      )}
      {isLoading && <TasksTableSkeleton />}
      {taskToEdit && (
        <EditTaskPopup
          isOpen={isOpen}
          onClose={handleClose}
          task={taskToEdit}
        />
      )}
    </div>
  );
}
