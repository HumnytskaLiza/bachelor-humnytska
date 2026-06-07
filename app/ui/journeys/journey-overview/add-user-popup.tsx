"use client";

import { useState, useTransition } from "react";
import Button from "../../button";
import Header from "../../header";
import Input from "../../input";
import { updateUserAction } from "@/lib/actions";
import { User } from "@/lib/definitions";

type AddUserPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  unique_id: string;
  users: User[];
};

export default function AddUserPopup({
  isOpen,
  onClose,
  unique_id,
  users,
}: AddUserPopupProps) {
  const options = users.map((user: User) => ({
    label: `${user.first_name}, ${user.email}`,
    value: user.unique_id,
  }));

  const [inputsData, setInputsData] = useState({
    user_id: users.length === 0 ? "" : options[0].value,
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
    if (!inputsData.user_id) {
      alert("Select the user");
    } else {
      startTransition(async () => {
        await updateUserAction(inputsData);
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
            <Header name={"🙎 Assign A User"} type="subheader" />
            <Input
              required={true}
              name={"user_id"}
              value={inputsData.user_id}
              onChange={handleInputChange}
              optionsWithId={options}
              disabled={users.length === 0 ? true : false}
            />
          </div>
        </div>
        <div className="bg-gray-50 py-3 flex flex-row-reverse px-6 gap-2">
          <Button
            onClick={validateData}
            disabled={users.length === 0 ? true : false}
            text={
              users.length === 0
                ? "No Users Are Available"
                : isPending
                  ? "Assigning..."
                  : "Assign"
            }
            type={users.length === 0 ? "secondary" : "main"}
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
