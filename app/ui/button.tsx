"use client";

import styles from "@/app/ui/modules/main.module.css";
import { ButtonProps } from "@/lib/definitions";

export default function Button({
  text,
  buttonType,
  type,
  svg,
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={buttonType}
      disabled={disabled}
      onClick={onClick}
      className={
        type == "main"
          ? `${styles["btn-main"]}`
          : type == "secondary"
            ? `${styles["btn-secondary"]}`
            : `${styles["btn-delete"]}`
      }
    >
      {svg && (
        <svg height="16" viewBox="0 0 16 16" width="16">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d={svg}
            fill="currentColor"
          ></path>
        </svg>
      )}
      {text && <span>{text}</span>}
    </button>
  );
}
