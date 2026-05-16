"use client";

import { useTransition } from "react";
import Button from "../../button";
import Header from "../../header";
import { removeUserAction } from "@/lib/actions";

type RemoveUserPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  uniqueId: string;
  journeyId: string;
  name: string;
};

export default function RemoveUserPopup({
  isOpen,
  onClose,
  uniqueId,
  journeyId,
  name,
}: RemoveUserPopupProps) {
  const [isPending, startTransition] = useTransition();

  if (!isOpen) return null;

  return (
    <div className="relative z-51" onClick={onClose}>
      <div className="fixed inset-0 bg-gray-500/20 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in" />
      <div
        className="fixed inset-0 z-51 w-screen overflow-y-auto"
        onClick={onClose}
      >
        <div
          className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          onClick={onClose}
        >
          <form
            className="relative transform overflow-hidden rounded-l text-left sm:my-8 sm:w-full sm:max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex flex-col gap-4 m-3">
                <Header name={"🙎 Remove User"} type="subheader" />
                <p className="text-sm">
                  Do you really want to remove this user from the journey:{" "}
                  <b>{name}</b>?
                </p>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
              <Button
                onClick={() => {
                  startTransition(async () => {
                    await removeUserAction(uniqueId, journeyId);
                    onClose();
                  });
                }}
                text={isPending ? "Removing..." : "Remove"}
                type="delete"
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
