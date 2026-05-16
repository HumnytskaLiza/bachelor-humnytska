"use client";

import { useState, useTransition } from "react";
import Button from "../button";
import Header from "../header";
import Input from "../input";
import { createStandardUserAction } from "@/lib/actions";
import { Level, JobPosition } from "@/lib/types";

type CreateUserPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

type InputsDataUser = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  job_position: JobPosition;
  level: Level;
};

export default function CreateUserPopup({
  isOpen,
  onClose,
}: CreateUserPopupProps) {
  const [inputsData, setInputsData] = useState<InputsDataUser>({
    first_name: "",
    last_name: "",
    email: "",
    password: "12345",
    job_position: "Developer",
    level: "Trainee",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setInputsData((data) => ({ ...data, [name]: value }));
    console.log(inputsData);
  };

  function validateData() {
    if (!inputsData.first_name || !inputsData.last_name || !inputsData.email) {
      alert(
        "Provide all required information about the employee before saving",
      );
    } else if (
      !inputsData.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    ) {
      alert("Email is invalid!");
    } else {
      startTransition(async () => {
        await createStandardUserAction(inputsData);
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
                <Header name={"🙋 Add A New User"} type="subheader" />
                <div className="flex flex-row gap-4">
                  <Input
                    required={true}
                    name={"first_name"}
                    onChange={handleInputChange}
                    placeholder={"John"}
                  />
                  <Input
                    required={true}
                    name={"last_name"}
                    onChange={handleInputChange}
                    placeholder={"Doe"}
                  />
                </div>
                <Input
                  required={true}
                  name={"email"}
                  type={"email"}
                  onChange={handleInputChange}
                  placeholder={"noreply@gmail.com"}
                />
                <Input
                  required={true}
                  name={"job_position"}
                  value={inputsData.job_position}
                  onChange={handleInputChange}
                  options={[
                    "Developer",
                    "Designer",
                    "HR",
                    "QA",
                    "Project Manager",
                  ]}
                />
                <Input
                  required={true}
                  name={"level"}
                  value={inputsData.level}
                  onChange={handleInputChange}
                  options={["Trainee", "Junior", "Middle", "Senior"]}
                />
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
