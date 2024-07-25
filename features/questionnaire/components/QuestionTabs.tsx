import { Tabs, Form } from "antd";
import QuestionForm from "./QuestionForm";

const { TabPane } = Tabs;

type Question = {
	question: string;
	type: "fill" | "single" | "multiple" | "date";
	options: string[];
};

type QuestionsData = {
	[category: string]: Question[];
};

type QuestionTabsProps = {
	data: QuestionsData;
};

const QuestionTabs = ({ data }: QuestionTabsProps) => {
	return (
		<Tabs defaultActiveKey="1">
			{Object.entries(data).map(([category, questions]) => (
				<TabPane tab={category} key={category}>
					<Form layout="vertical">
						{questions.map((question, index) => (
							<QuestionForm key={index} questionData={question} />
						))}
					</Form>
				</TabPane>
			))}
		</Tabs>
	);
};

export default QuestionTabs;
