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
				className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
			>
				{label}
			</label>
			<input
				type={type}
				id={id}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				required
			/>
		</div>
	);
};

export default InputField;
