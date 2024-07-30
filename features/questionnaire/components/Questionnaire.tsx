import { useState, useEffect, createRef, RefObject } from "react";
import { Tabs, Form, Row, Button, message, Space, FormInstance } from "antd";
import QuestionForm from "./QuestionForm";
import { questionnaireData, Category, Question } from "../config";
import { supabaseClient } from "@/shared/utils/supabase/client";
import dayjs from "dayjs";

type DiagnosisData = {
	[diagnosis: number]: {
		[name: string]: any;
	};
};

const fetchDiagnosisData = async (
	id_persona: number
): Promise<DiagnosisData> => {
	const { data, error } = await supabaseClient
		.from("vista_completa_diagnostico")
		.select()
		.eq("id_persona", id_persona);

	if (error) {
		console.error(error);
		return {};
	}

	const formattedData: DiagnosisData = {};

	data.forEach((entry: any) => {
		const diagnosisId = entry.id_diagnostico;
		if (!formattedData[diagnosisId]) {
			formattedData[diagnosisId] = {};
		}

		Object.keys(entry).forEach((key) => {
			if (key !== "id_diagnostico") {
				let value = entry[key];
				if (key.includes("fecha") && value) {
					value = dayjs(value);
				}
				formattedData[diagnosisId][key] = value;
			}
		});
	});

	console.log(formattedData);
	return formattedData;
};

const createDiagnosisIndexMap = (
	diagnosisIds: number[],
	minDiagnoses: number
) => {
	const map = diagnosisIds.reduce((map, id, index) => {
		map[id] = index + 1;
		return map;
	}, {} as { [key: number]: number });

	for (let i = diagnosisIds.length + 1; i <= minDiagnoses; i++) {
		map[i] = null;
	}

	return map;
};

type QuestionnaireProps = {
	id_persona: number;
};

const Questionnaire = ({ id_persona }: QuestionnaireProps) => {
	const [selectedDiagnosis, setSelectedDiagnosis] = useState<number>(1);
	const [formData, setFormData] = useState<DiagnosisData>({});
	const [formRefs, setFormRefs] = useState<RefObject<FormInstance>[]>([]);
	const [initValuesKey, setInitValuesKey] = useState<number>(0);
	const [diagnosisIndexMap, setDiagnosisIndexMap] = useState<{
		[key: number]: number | null;
	}>({});

	useEffect(() => {
		const loadData = async () => {
			const data = await fetchDiagnosisData(id_persona);
			const diagnosisIds = Object.keys(data).map(Number);
			const indexMap = createDiagnosisIndexMap(diagnosisIds, 3);
			setDiagnosisIndexMap(indexMap);
			setFormData(data);

			const totalDiagnoses = Math.max(diagnosisIds.length, 3);
			setFormRefs(
				new Array(totalDiagnoses)
					.fill(null)
					.map(() => createRef<FormInstance>())
			);
			setInitValuesKey((key) => key + 1);
		};

		loadData();
	}, [id_persona]);

	const handleDiagnosisSelection = (diagnosisIndex: number) => {
		setSelectedDiagnosis(diagnosisIndex);
		setInitValuesKey((key) => key + 1);
	};

	const handleFinish = (diagnosisIndex: number) => async (values: any) => {
		console.log(
			`Received values of form for diagnosis ${diagnosisIndex}:`,
			values
		);

		let originalDiagnosisId = Object.keys(diagnosisIndexMap).find(
			(key) => diagnosisIndexMap[Number(key)] === diagnosisIndex
		);

		try {
			const category = Object.entries(questionnaireData).find(([_, data]) =>
				data.questions.some((q) => q.name in values)
			);

			if (category) {
				const [, categoryData] = category;
				const storedProcedure = categoryData["stored-procedure"];

				// Filtrar campos de tipo multiple
				const filteredValues = Object.keys(values).reduce((acc, key) => {
					const question = categoryData.questions.find((q) => q.name === key);
					if (question && question.type !== "multiple") {
						acc[key] = values[key];
					}
					return acc;
				}, {} as Record<string, any>);
				console.log("Datos filtrados: ", filteredValues);

				if (storedProcedure === "upsert_persona") {
					const { data, error } = await supabaseClient
						.from("persona")
						.upsert([{ id_persona, ...filteredValues }], {
							onConflict: ["id_persona"],
						});

					if (error) {
						throw error;
					}

					message.success(`Datos guardados exitosamente en la tabla persona.`);
				} else {
					if (!originalDiagnosisId) {
						const { data: newDiagnosticoData, error: newDiagnosticoError } =
							await supabaseClient
								.from("diagnostico")
								.insert([{ id_persona, fecha_diagnostico: new Date() }])
								.select("id_diagnostico");

						if (newDiagnosticoError) {
							throw newDiagnosticoError;
						}

						originalDiagnosisId = newDiagnosticoData[0].id_diagnostico;

						// Refetch data and update state
						const updatedData = await fetchDiagnosisData(id_persona);
						setFormData(updatedData);
						const updatedDiagnosisIds = Object.keys(updatedData).map(Number);
						const updatedIndexMap = createDiagnosisIndexMap(
							updatedDiagnosisIds,
							3
						);
						setDiagnosisIndexMap(updatedIndexMap);
						setInitValuesKey((key) => key + 1);
					}

					console.log("Id_diagnostico enviado", originalDiagnosisId);
					const tableName = storedProcedure.replace("upsert_", "");
					const { data: personalData, error: personalError } =
						await supabaseClient
							.from(tableName)
							.upsert(
								[{ id_diagnostico: originalDiagnosisId, ...filteredValues }],
								{
									onConflict: "id_diagnostico",
								}
							);

					if (personalError) {
						throw personalError;
					}

					// Manejo de preguntas de tipo múltiple
					for (const [key, value] of Object.entries(values)) {
						const question = categoryData.questions.find((q) => q.name === key);
						if (question && question.type === "multiple") {
							const intermediateTable = question.intermediate_table;
							const idTable = `id_${tableName}`;

							// Obtener el id_table del formData
							const id_table_value =
								formData[Number(originalDiagnosisId)][idTable];

							// Borrar relaciones existentes
							const { error: deleteError } = await supabaseClient
								.from(intermediateTable)
								.delete()
								.eq(idTable, id_table_value);

							if (deleteError) {
								throw deleteError;
							}

							// Crear nuevo upsertData
							const upsertData = value.map((id_value: number) => ({
								[idTable]: id_table_value,
								[`id_${key}`]: id_value,
							}));

							// Hacer el upsert en la tabla intermedia
							const { data: upsertResponse, error: upsertError } =
								await supabaseClient
									.from(intermediateTable)
									.upsert(upsertData, {
										onConflict: [idTable, `id_${key}`],
									});

							if (upsertError) {
								throw upsertError;
							}
							console.log("Upsert result:", upsertResponse);
						}
					}

					message.success(
						`Datos del diagnóstico ${diagnosisIndex} guardados exitosamente.`
					);
				}
			}
		} catch (error) {
			console.error("Error al guardar los datos:", error);
			message.error("Hubo un error al guardar los datos.");
		}
	};

	const handleFinishFailed = (errorInfo: any) => {
		message.error("Por favor, complete todas las preguntas obligatorias.");
	};

	const renderCategoryForm = (
		category: string,
		categoryData: Category,
		diagnosisIndex: number
	) => {
		const originalDiagnosisId = Object.keys(diagnosisIndexMap).find(
			(key) => diagnosisIndexMap[Number(key)] === diagnosisIndex
		);

		return (
			<Form
				layout="vertical"
				onFinish={handleFinish(diagnosisIndex)}
				onFinishFailed={handleFinishFailed}
				className="category-form"
				ref={formRefs[diagnosisIndex - 1]}
				initialValues={
					originalDiagnosisId ? formData[Number(originalDiagnosisId)] : {}
				}
				key={`${category}-${diagnosisIndex}-${initValuesKey}`}
			>
				<Row gutter={[16, 16]}>
					{categoryData.questions.map((question) => (
						<QuestionForm
							key={question.id}
							questionData={question}
							diagnosis={diagnosisIndex}
						/>
					))}
				</Row>
				<Form.Item style={{ textAlign: "center" }}>
					<Button type="primary" htmlType="submit" className="submit-button">
						Guardar
					</Button>
				</Form.Item>
			</Form>
		);
	};

	const items = Object.entries(questionnaireData).map(
		([category, categoryData]) => ({
			label: category,
			key: category,
			children: renderCategoryForm(category, categoryData, selectedDiagnosis),
		})
	);

	return (
		<div>
			<div style={{ textAlign: "center", marginBottom: "20px" }}>
				<Space>
					{[1, 2, 3].map((diagnosisIndex) => (
						<Button
							key={diagnosisIndex}
							type={
								selectedDiagnosis === diagnosisIndex ? "primary" : "default"
							}
							onClick={() => handleDiagnosisSelection(diagnosisIndex)}
						>
							Diagnóstico {diagnosisIndex}
						</Button>
					))}
				</Space>
			</div>
			<Tabs defaultActiveKey="1" centered items={items} />
		</div>
	);
};

export default Questionnaire;
