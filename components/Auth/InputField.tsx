import { ChangeEvent } from "react";

type InputFieldProps = {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({
  id,
  type,
  label,
  placeholder,
  value,
  onChange,
}: InputFieldProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-primary-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-primary-50 border border-primary-300 text-primary-900 sm:text-sm rounded-lg focus:ring-primary-800 focus:border-primary-800 block w-full p-2.5 dark:bg-primary-700 dark:border-primary-800 dark:placeholder-primary-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />
    </div>
  );
};

export default InputField;
