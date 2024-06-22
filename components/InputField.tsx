import { ChangeEvent } from 'react';

type InputFieldProps = {
  id: string;
  label: string;
  defaultValue: string;
  type?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({ id, label, defaultValue, type = 'text', onChange }: InputFieldProps) => (
  <div className="space-y-2">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <input
      id={id}
      defaultValue={defaultValue}
      type={type}
      onChange={onChange}
      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  </div>
);

export default InputField;
