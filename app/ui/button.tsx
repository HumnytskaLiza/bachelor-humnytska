import styles from "@/app/ui/modules/main.module.css";

type ButtonProps = {
  text?: string;
  type: "main" | "secondary" | "delete";
  buttonType: "button" | "submit";
  disabled?: boolean;
  svg?: string;
  url?: string;
  onClick?: () => void;
};

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
      className={`
        text-xs md:text-sm
        ${
          type == "main"
            ? `${styles["btn-main"]}`
            : type == "secondary"
              ? `${styles["btn-secondary"]}`
              : `${styles["btn-delete"]}`
        }`}
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
