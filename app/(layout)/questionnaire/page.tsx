"use client";
import QuestionTabs from "@/features/questionnaire/components/QuestionTabs";

const data = {
	Personal: [
		{ question: "¿Cuál es tu nombre completo?", type: "fill", options: [] },
		{ question: "¿Cuál es tu edad?", type: "fill", options: [] },
		{ question: "¿Cuál es tu fecha de nacimiento?", type: "date", options: [] },
	],
	Género: [
		{
			question: "¿Con qué género te identificas?",
			type: "single",
			options: ["Masculino", "Femenino", "Otro"],
		},
	],
	Emprendimiento: [
		{
			question: "¿Tienes experiencia previa en emprendimiento?",
			type: "single",
			options: ["Sí", "No"],
		},
		{
			question: "¿Cuál es tu área de emprendimiento?",
			type: "multiple",
			options: ["Tecnología", "Salud", "Educación", "Alimentos", "Otro"],
		},
	],
	"Idea de Negocio": [
		{
			question: "Describe brevemente tu idea de negocio.",
			type: "fill",
			options: [],
		},
	],
	Innovación: [
		{
			question: "¿Tu idea de negocio es innovadora?",
			type: "single",
			options: ["Sí", "No"],
		},
	],
	Mercado: [
		{
			question: "¿A qué mercado objetivo te diriges?",
			type: "fill",
			options: [],
		},
	],
	"Contabilidad y Finanzas": [
		{
			question: "¿Tienes conocimientos en contabilidad y finanzas?",
			type: "single",
			options: ["Sí", "No"],
		},
	],
	Formalización: [
		{
			question: "¿Tu negocio está formalizado?",
			type: "single",
			options: ["Sí", "No"],
		},
	],
	Financiamiento: [
		{
			question: "¿Necesitas financiamiento para tu negocio?",
			type: "single",
			options: ["Sí", "No"],
		},
	],
};

const Questionnaire = () => {
	return (
		<div>
			<QuestionTabs data={data} />
		</div>
	);
};

export default Questionnaire;
