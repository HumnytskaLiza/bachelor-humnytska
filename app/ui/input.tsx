import styles from "@/app/ui/modules/main.module.css";

type InputProps = {
  name: string;
  required: boolean;
  placeholder?: string;
  type?: "hidden" | "email" | "file";
  style?: "round" | "square";
  options?: string[];
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onKeyDown?: (e: { key: string }) => void;
};

export default function Input({
  name,
  required,
  placeholder,
  type,
  value,
  options,
  style,
  onChange,
}: InputProps) {
  return !options ? (
    <input
      required={required}
      id={name}
      name={name}
      type={type}
      aria-label={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className={
        style == "round"
          ? `${styles.input} rounded-4xl`
          : `${styles.input} rounded-md`
      }
    />
  ) : (
    <div className="relative">
      <select
        required={required}
        id={name}
        aria-label={name}
        name={name}
        className={styles.input}
        value={value}
        onChange={onChange}
      >
        {options.map((option, ind) => {
          return (
            <option key={ind} value={option}>
              {option}
            </option>
          );
        })}
      </select>
      <svg
        height="12"
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        width="12"
        className="absolute top-3 right-3 fill-gray-400"
      >
        <path d="M8.74999 1.75V1H7.24999V1.75V12.4393L3.28032 8.46967L2.74999 7.93934L1.68933 9L2.21966 9.53033L7.29288 14.6036C7.68341 14.9941 8.31657 14.9941 8.7071 14.6036L13.7803 9.53033L14.3107 9L13.25 7.93934L12.7197 8.46967L8.74999 12.4393V1.75Z"></path>
      </svg>
    </div>
  );
}
