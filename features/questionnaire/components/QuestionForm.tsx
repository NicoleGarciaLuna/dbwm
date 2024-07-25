import { Input, Select, Checkbox, DatePicker, Form } from "antd";

const { Option } = Select;

type Question = {
	question: string;
	type: "fill" | "single" | "multiple" | "date";
	options: string[];
};

type QuestionFormProps = {
	questionData: Question;
};

const QuestionForm = ({ questionData }: QuestionFormProps) => {
	const { question, type, options } = questionData;

	return (
		<Form.Item label={question} style={{ marginBottom: "24px" }}>
			{type === "fill" && <Input style={{ width: "100%" }} />}
			{type === "single" && (
				<Select style={{ width: "100%" }}>
					{options.map((option, index) => (
						<Option key={index} value={option}>
							{option}
						</Option>
					))}
				</Select>
			)}
			{type === "multiple" && (
				<Checkbox.Group options={options} style={{ width: "100%" }} />
			)}
			{type === "date" && <DatePicker style={{ width: "100%" }} />}
		</Form.Item>
	);
};

export default QuestionForm;
