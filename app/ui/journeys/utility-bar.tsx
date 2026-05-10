"use client";

import { useState } from "react";
import CreateJourneyPopup from "./create-journey-popup";
import Button from "../button";

export default function UtilityBar() {
  const [isOpen, setIsOpen] = useState(false);

  const handlerOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="flex flex-row w-fit gap-2">
      <Button
        onClick={handlerOpen}
        buttonType="button"
        text="Create Journey"
        type="secondary"
        svg="M14.5 12.5V4H8.83333C8.29241 4 7.76607 3.82456 7.33333 3.5L6 2.5H1.5V12.5C1.5 13.0523 1.94772 13.5 2.5 13.5H13.5C14.0523 13.5 14.5 13.0523 14.5 12.5ZM1.5 1H0V2.5V12.5C0 13.8807 1.11929 15 2.5 15H13.5C14.8807 15 16 13.8807 16 12.5V4V2.5H14.5H8.83333C8.61696 2.5 8.40643 2.42982 8.23333 2.3L6.76667 1.2C6.59357 1.07018 6.38304 1 6.16667 1H1.5ZM5.25 8H6H7.25V6.75V6H8.75V6.75V8H10H10.75V9.5H10H8.75V10.75V11.5H7.25V10.75V9.5H6H5.25V8Z"
      />
      <Button
        text="Sort By"
        buttonType="button"
        type="secondary"
        svg="M8.74999 1.75V1H7.24999V1.75V12.4393L3.28032 8.46967L2.74999 7.93934L1.68933 9L2.21966 9.53033L7.29288 14.6036C7.68341 14.9941 8.31657 14.9941 8.7071 14.6036L13.7803 9.53033L14.3107 9L13.25 7.93934L12.7197 8.46967L8.74999 12.4393V1.75Z"
      />
      <CreateJourneyPopup isOpen={isOpen} onClose={handleClose} />
    </div>
  );
}
