"use client";

import { useState } from "react";
import Button from "../button";
import CreateChatPopup from "./create-new-chat";

export default function UtilityBar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  return (
    <div className="flex flex-row w-fit gap-2">
      <Button
        onClick={handleOpen}
        text="Create Chat"
        buttonType="button"
        type="secondary"
        svg="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"
      />
      <Button
        text="Sort By"
        buttonType="button"
        type="secondary"
        svg="M8.74999 1.75V1H7.24999V1.75V12.4393L3.28032 8.46967L2.74999 7.93934L1.68933 9L2.21966 9.53033L7.29288 14.6036C7.68341 14.9941 8.31657 14.9941 8.7071 14.6036L13.7803 9.53033L14.3107 9L13.25 7.93934L12.7197 8.46967L8.74999 12.4393V1.75Z"
      />

      <CreateChatPopup isOpen={isOpen} onClose={handleClose} />
    </div>
  );
}
