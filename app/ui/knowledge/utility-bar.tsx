"use client";

import { useState } from "react";
import CreateFolderPopup from "./create-folder-popup";
import CreateFilePopup from "./create-file-popup";
import Button from "../button";
import { UtilityBarProps } from "@/lib/definitions";

export default function UtilityBar({ unique_id, role }: UtilityBarProps) {
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [isFileOpen, setIsFileOpen] = useState(false);

  const handleFolderClose = () => setIsFolderOpen(false);
  const handleFolderOpen = () => setIsFolderOpen(true);

  const handleFileClose = () => setIsFileOpen(false);
  const handleFileOpen = () => setIsFileOpen(true);

  return (
    <div className="flex flex-row w-fit gap-2">
      {role === "admin" && (
        <Button
          onClick={handleFolderOpen}
          buttonType="button"
          text="Create Folder"
          type="secondary"
          svg="M14.5 12.5V4H8.83333C8.29241 4 7.76607 3.82456 7.33333 3.5L6 2.5H1.5V12.5C1.5 13.0523 1.94772 13.5 2.5 13.5H13.5C14.0523 13.5 14.5 13.0523 14.5 12.5ZM1.5 1H0V2.5V12.5C0 13.8807 1.11929 15 2.5 15H13.5C14.8807 15 16 13.8807 16 12.5V4V2.5H14.5H8.83333C8.61696 2.5 8.40643 2.42982 8.23333 2.3L6.76667 1.2C6.59357 1.07018 6.38304 1 6.16667 1H1.5ZM5.25 8H6H7.25V6.75V6H8.75V6.75V8H10H10.75V9.5H10H8.75V10.75V11.5H7.25V10.75V9.5H6H5.25V8Z"
        />
      )}
      {role === "admin" && (
        <Button
          onClick={handleFileOpen}
          text="Add File"
          buttonType="button"
          type="secondary"
          svg="M14.5 13.5V6.5V5.41421C14.5 5.149 14.3946 4.89464 14.2071 4.70711L9.79289 0.292893C9.60536 0.105357 9.351 0 9.08579 0H8H3H1.5V1.5V13.5C1.5 14.8807 2.61929 16 4 16H12C13.3807 16 14.5 14.8807 14.5 13.5ZM13 13.5V6.5H9.5H8V5V1.5H3V13.5C3 14.0523 3.44772 14.5 4 14.5H12C12.5523 14.5 13 14.0523 13 13.5ZM9.5 5V2.12132L12.3787 5H9.5ZM5.13 5.00062H4.505V6.25062H5.13H6H6.625V5.00062H6H5.13ZM4.505 8H5.13H11H11.625V9.25H11H5.13H4.505V8ZM5.13 11H4.505V12.25H5.13H11H11.625V11H11H5.13Z"
        />
      )}
      <Button
        text="Sort By"
        buttonType="button"
        type="secondary"
        svg="M8.74999 1.75V1H7.24999V1.75V12.4393L3.28032 8.46967L2.74999 7.93934L1.68933 9L2.21966 9.53033L7.29288 14.6036C7.68341 14.9941 8.31657 14.9941 8.7071 14.6036L13.7803 9.53033L14.3107 9L13.25 7.93934L12.7197 8.46967L8.74999 12.4393V1.75Z"
      />

      <CreateFolderPopup
        isOpen={isFolderOpen}
        onClose={handleFolderClose}
        unique_id={unique_id}
      />

      <CreateFilePopup
        isOpen={isFileOpen}
        onClose={handleFileClose}
        unique_id={unique_id}
      />
    </div>
  );
}
