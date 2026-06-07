"use client";

import { useState, useTransition } from "react";
import Button from "../button";
import Header from "../header";
import Input from "../input";
import { createJourneyAction } from "@/lib/actions";
import { Levels, JobPositions } from "@/lib/types";

type CreateJourneyPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

const dateToday = new Date(Date.now());

export default function CreateJourneyPopup({
  isOpen,
  onClose,
}: CreateJourneyPopupProps) {
  const colors = ["#eae4da", "#4b607f", "#808bc5", "#ed773c"];

  const [inputsData, setInputsData] = useState({
    name: "",
    level: Levels[0],
    start_date: dateToday,
    job_position: JobPositions[0],
    color_hex: colors[1],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setInputsData((data) => ({ ...data, [name]: value }));
    console.log(inputsData);
  };

  function validateData() {
    if (!inputsData.name || !inputsData.color_hex) {
      alert("Provide all required information before creating the folder");
    } else {
      startTransition(async () => {
        await createJourneyAction(inputsData);
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
            <Header name={"📜 Create A New Journey"} type="subheader" />
            <Input
              required={true}
              name={"name"}
              onChange={handleInputChange}
              placeholder={"Journey Name"}
            />
            <Input
              required={true}
              type="date"
              name={"start_date"}
              onChange={handleInputChange}
            />
            <Input
              required={true}
              name={"job_position"}
              value={inputsData.job_position}
              onChange={handleInputChange}
              options={["Developer", "Designer", "HR", "QA", "Project Manager"]}
            />
            <Input
              required={true}
              name={"level"}
              value={inputsData.level}
              onChange={handleInputChange}
              options={["Trainee", "Junior", "Middle", "Senior"]}
            />
            <Input
              required={true}
              name={"color_hex"}
              type={"hidden"}
              onChange={handleInputChange}
              value={inputsData.color_hex}
            />
            <div className="flex flex-row gap-2 mt-2">
              {colors.map((color, id) => {
                return (
                  <button
                    type="button"
                    key={id}
                    name={color}
                    style={{ backgroundColor: color }}
                    onClick={() =>
                      setInputsData((data) => ({
                        ...data,
                        color_hex: color,
                      }))
                    }
                    className={`w-9 h-9 rounded-4xl cursor-pointer ${
                      inputsData.color_hex === color
                        ? "border border-gray-400 ring-2 ring-gray-300"
                        : "border border-gray-400"
                    }`}
                  ></button>
                );
              })}
            </div>
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
