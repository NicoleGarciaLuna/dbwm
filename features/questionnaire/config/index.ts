export type Question = {
	id: number;
	question: string;
	type: "fill" | "single" | "multiple" | "date" | "number";
	options?: Option[];
	locked: boolean;
	required: boolean;
	name: string;
};

type Option = string | { text: string; value: any };

export type Category = {
	view: string;
	"stored-procedure": string;
	questions: Question[];
};

type QuestionsData = {
	[category: string]: Category;
};

export const questionnaireData: QuestionsData = {
	"Datos Básicos": {
		view: "vista_persona",
		"stored-procedure": "upsert_persona",
		questions: [
			{
				id: 1,
				question: "Nombre",
				type: "fill",
				options: [],
				required: true,
				locked: true,
				name: "nombre",
			},
			{
				id: 2,
				question: "Primer apellido",
				type: "fill",
				options: [],
				required: true,
				locked: true,
				name: "primer_apellido",
			},
			{
				id: 3,
				question: "Segundo apellido",
				type: "fill",
				options: [],
				required: true,
				locked: true,
				name: "segundo_apellido",
			},
			{
				id: 4,
				question: "Tipo de identificación",
				type: "single",
				options: [
					"Nacional",
					"Documento de identidad migratoria para extranjeros (DIMEX)",
				],
				required: true,
				locked: true,
				name: "tipo_identificacion",
			},
			{
				id: 5,
				question: "Número de identificación",
				type: "fill",
				options: [],
				required: true,
				locked: true,
				name: "numero_identificacion",
			},
			{
				id: 6,
				question: "Sexo",
				type: "single",
				options: ["Hombre", "Mujer", "Otro"],
				required: true,
				locked: true,
				name: "sexo",
			},
			{
				id: 7,
				question: "Fecha de nacimiento",
				type: "date",
				options: [],
				required: true,
				locked: true,
				name: "fecha_nacimiento",
			},
			{
				id: 8,
				question: "Nacionalidad",
				type: "fill",
				options: [],
				required: true,
				locked: true,
				name: "nacionalidad",
			},
		],
	},
	Personal: {
		view: "vista_persona",
		"stored-procedure": "upsert_persona",
		questions: [
			{
				id: 9,
				question: "Ocupación, oficio o profesión",
				type: "fill",
				options: [],
				required: true,
				locked: false,
				name: "ocupacion",
			},
			{
				id: 10,
				question: "Estado Civil",
				type: "single",
				options: [
					"Casada",
					"Unión libre",
					"Soltera",
					"Viuda",
					"Separada",
					"Divorciada",
				],
				required: true,
				locked: false,
				name: "estado_civil",
			},
			{
				id: 11,
				question: "Provincia",
				type: "single",
				options: ["Alajuela"],
				required: true,
				locked: false,
				name: "id_provincia",
			},
			{
				id: 12,
				question: "Cantón",
				type: "single",
				options: ["San Ramón"],
				required: true,
				locked: false,
				name: "id_canton",
			},
			{
				id: 13,
				question: "Distrito",
				type: "single",
				options: [
					"San Ramón",
					"Santiago",
					"San Juan",
					"Piedades Norte",
					"Piedades Sur",
					"San Rafael",
					"San Isidro",
					"Ángeles",
					"Alfaro",
					"Volio",
					"Concepción",
					"Zapotal",
					"Peñas Blancas",
					"San Lorenzo",
				],
				required: true,
				locked: false,
				name: "id_distrito",
			},
			{
				id: 14,
				question: "Dirección exacta del emprendimiento",
				type: "fill",
				options: [],
				required: true,
				locked: false,
				name: "direccion",
			},
			{
				id: 15,
				question: "Número de teléfono fijo",
				type: "number",
				options: [],
				required: false,
				locked: false,
				name: "telefono_fijo",
			},
			{
				id: 16,
				question: "Número de teléfono móvil",
				type: "number",
				options: [],
				required: false,
				locked: false,
				name: "telefono_movil",
			},
			{
				id: 17,
				question: "Correo electrónico",
				type: "fill",
				options: [],
				required: true,
				locked: false,
				name: "correo_electronico",
			},
			{
				id: 18,
				question: "¿Cuál es su grado de escolaridad?",
				type: "single",
				options: [
					"Primaria Completa",
					"Primaria Incompleta",
					"Secundaria Completa",
					"Secundaria Incompleta",
					"Técnico- Vocacional Completo",
					"Técnico- Vocacional Incompleto",
					"Universitario Completo",
					"Universitario Incompleto",
					"Ninguno de los anteriores",
				],
				required: true,
				locked: false,
				name: "escolaridad",
			},
			{
				id: 19,
				question:
					"¿Cuántos años de experiencia tiene en el sector donde está desarrollando su emprendimiento?",
				type: "single",
				options: [
					"Menos de un año",
					"1 a 3 años",
					"Más de 3 años",
					"Sin experiencia",
				],
				required: true,
				locked: false,
				name: "annos_experiencia",
			},
			{
				id: 20,
				question: "¿Cuál es su principal fuente de ingresos?",
				type: "single",
				options: [
					"Ventas del Emprendimiento",
					"Asalariada",
					"Subsidio del Estado",
					"Pensión",
					"Aporte económico de un familiar",
					"No tiene ingresos",
					"Otro",
				],
				required: true,
				locked: false,
				name: "fuente_ingreso",
			},
			{
				id: 21,
				question: "¿Qué tipo de seguro social tiene usted?",
				type: "single",
				options: [
					"Familiar",
					"Voluntario",
					"Independiente",
					"Asalariada",
					"Pensionada",
					"Por el Estado",
					"Póliza servicios médicos",
					"No tiene",
				],
				required: true,
				locked: false,
				name: "seguro_social",
			},
		],
	},
	Género: {
		view: "vista_persona",
		"stored-procedure": "upsert_persona",
		questions: [
			{
				id: 22,
				question: "¿Es usted Jefa de Hogar?",
				type: "single",
				options: ["Sí", "No", "Comparto la jefatura"],
				required: true,
				locked: false,
				name: "jefa_hogar",
			},
			{
				id: 23,
				question: "¿Cuántas personas dependen económicamente de usted?",
				type: "single",
				options: ["Ninguna", "1 a 2 personas", "3 a 4 personas", "5 o más"],
				required: true,
				locked: false,
				name: "personas_a_cargo",
			},
			{
				id: 24,
				question: "¿Tiene usted a cargo personas que requieran de cuido?",
				type: "fill",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
				],
				required: true,
				locked: false,
				name: "personas_cuido",
			},
			{
				id: 25,
				question: "Las personas que requieren de cuido son:",
				type: "multiple",
				options: [
					"Menores de edad",
					"Adultos mayores",
					"Con discapacidad",
					"Enfermedad terminal",
					"Incapacidad temporal",
				],
				required: false,
				locked: false,
				name: "tipo_cuido",
			},
			{
				id: 26,
				question:
					"¿Cuántas horas diarias, aproximadamente, dedica usted para la realización de las tareas del hogar? (incluyendo tareas domésticas y el cuido de personas)",
				type: "single",
				options: [
					"Menos de 2 horas",
					"2-4 horas",
					"5-7 horas",
					"8-10 horas",
					"11 o más horas",
					"No dedica tiempo a tareas del hogar",
				],
				required: true,
				locked: false,
				name: "tiempo_tareas_hogar",
			},
			{
				id: 27,
				question:
					"Mientras usted se dedica al negocio, ¿Quién se encarga de las tareas del hogar?",
				type: "multiple",
				options: [
					"Nadie",
					"Pareja",
					"Hijos (as)",
					"Familiar",
					"Personal de servicio doméstico",
					"Otro",
				],
				required: true,
				locked: false,
				name: "encargado_tareas_hogar",
			},
			{
				id: 28,
				question: "En su hogar, ¿Cómo se decide la distribución de tareas?",
				type: "single",
				options: [
					"Decido yo",
					"Decide la pareja",
					"Deciden en pareja",
					"Se negocia entre los miembros del hogar",
				],
				required: true,
				locked: false,
				name: "decision_tareas_hogar",
			},
			{
				id: 29,
				question:
					"De la utilidad que genera su negocio ¿Qué porcentaje lo usa para los gastos del hogar? Marque un porcentaje aproximado.",
				type: "single",
				options: [
					"0%",
					"1% - 10%",
					"11% - 25%",
					"26% - 50%",
					"51% - 75%",
					"76% - 100%",
				],
				required: true,
				locked: false,
				name: "porcentaje_utilidad_hogar",
			},
			{
				id: 30,
				question:
					"¿Consulta a un tercero sobre las decisiones de su emprendimiento?",
				type: "single",
				options: [
					{
						text: "Sí. Responda la siguiente pregunta",
						value: true,
					},
					{
						text: "No. No responda la siguiente pregunta",
						value: false,
					},
				],
				required: true,
				locked: false,
				name: "consulta_decisiones_emprendimiento",
			},
			{
				id: 31,
				question: "Si la respuesta anterior es sí, ¿A quién consulta?",
				type: "fill",
				options: [],
				required: false,
				locked: false,
				name: "a_quien_consulta",
			},
			{
				id: 32,
				question:
					"En su emprendimiento ¿Cuál de las siguientes autonomías tiene usted?",
				type: "multiple",
				options: [
					"Autonomía para decidir qué producir",
					"Autonomía para decidir qué hacer con el dinero",
					"Autonomía para decidir cuánto invertir",
					"Autonomía para decidir a quién contratar",
					"Autonomía para decidir con quién negociar",
					"Autonomía para decidir a sus proveedores",
				],
				required: true,
				locked: false,
				name: "autonomia_emprendimiento",
			},
		],
	},
	Emprendimiento: {
		view: "vista_persona",
		"stored-procedure": "upsert_persona",
		questions: [
			{
				id: 33,
				question: "Nombre de su emprendimiento",
				type: "fill",
				options: [],
				required: true,
				locked: false,
				name: "nombre_emprendimiento",
			},
			{
				id: 34,
				question: "Correo electrónico",
				type: "fill",
				options: [],
				required: true,
				locked: false,
				name: "correo_emprendimiento",
			},
			{
				id: 35,
				question: "Página Web",
				type: "fill",
				options: [],
				required: true,
				locked: false,
				name: "pagina_web",
			},
			{
				id: 36,
				question:
					"¿Tiene definida la ruta o el ABC para desarrollar e implementar su emprendimiento?",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
				],
				required: true,
				locked: false,
				name: "ruta_abc_definido",
			},
			{
				id: 37,
				question:
					"Actualmente, está registrada en el Sistema de Información Empresarial Costarricense (SIEC), cómo:",
				type: "single",
				options: ["Emprendedor", "PYME", "No está registrado"],
				required: true,
				locked: false,
				name: "registro_siec",
			},
			{
				id: 38,
				question:
					"El tipo de emprendimiento que desea o está desarrollando es:",
				type: "single",
				options: [
					"Por necesidad-Subsistencia",
					"Por necesidad-Tradicional",
					"Por oportunidad-Dinámico",
					"Por oportunidad-Alto Impacto",
					"Social",
				],
				required: true,
				locked: false,
				name: "tipo_emprendimiento",
			},
			{
				id: 39,
				question: "Tiempo de operación de su emprendimiento:",
				type: "single",
				options: [
					"Menos de un año",
					"1 a 2 años",
					"2 a 3 años",
					"Más de 3 años",
					"No ha iniciado operación",
				],
				required: true,
				locked: false,
				name: "tiempo_operacion",
			},
			{
				id: 40,
				question: "¿En qué etapa de evolución se encuentra su emprendimiento?",
				type: "single",
				options: ["Gestación", "Inicio", "Desarrollo", "Madurez"],
				required: true,
				locked: false,
				name: "etapa_evolucion",
			},
			{
				id: 41,
				question: "¿Cuánto tiempo dedica a su emprendimiento?",
				type: "single",
				options: [
					"Tiempo completo",
					"Medio tiempo",
					"Un cuarto de tiempo",
					"Menos de un cuarto de tiempo",
				],
				required: true,
				locked: false,
				name: "tiempo_dedicado",
			},
			{
				id: 42,
				question:
					"Las instalaciones que utiliza para la operación de su emprendimiento son:",
				type: "single",
				options: [
					"Propias",
					"Alquiladas",
					"Prestadas",
					"No tengo instalaciones",
				],
				required: true,
				locked: false,
				name: "instalaciones",
			},
			{
				id: 43,
				question:
					"¿Cuántas mujeres trabajan en su emprendimiento? Incluida usted.",
				type: "number",
				options: [],
				required: true,
				locked: false,
				name: "numero_empleados_mujeres",
			},
			{
				id: 44,
				question: "¿Cuántos hombres trabajan en su emprendimiento?",
				type: "number",
				options: [],
				required: true,
				locked: false,
				name: "numero_empleados_hombres",
			},
			{
				id: 45,
				question:
					"Tipo de figura que utiliza para el desarrollo de su emprendimiento:",
				type: "single",
				options: ["Física", "Jurídica"],
				required: true,
				locked: false,
				name: "figura_legal",
			},
			{
				id: 46,
				question: "¿A qué sector pertenece su actividad económica?",
				type: "single",
				options: ["Industria", "Comercio", "Servicios", "Agropecuario"],
				required: true,
				locked: false,
				name: "sector_economico",
			},
		],
	},
	"Idea de Negocio": {
		view: "vista_persona",
		"stored-procedure": "upsert_persona",
		questions: [
			{
				id: 47,
				question:
					"¿La idea de negocio que está desarrollando es clara y tiene definido su mercado?",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
				],
				required: true,
				locked: false,
				name: "idea_clara_mercado_definido",
			},
			{
				id: 48,
				question: "En relación con su emprendimiento, actualmente cuenta:",
				type: "single",
				options: [
					"Solo con la idea de negocio",
					"La estructura de la idea",
					"Validando la idea de negocio",
					"Generando las primeras ventas",
					"Con más de 1 año de estar generando ventas",
				],
				required: true,
				locked: false,
				name: "estado_idea",
			},
			{
				id: 49,
				question:
					"Describa brevemente en qué consiste la idea o modelo de negocio:",
				type: "fill",
				options: [],
				required: true,
				locked: false,
				name: "descripcion_breve",
			},
			{
				id: 50,
				question:
					"¿Cuál de los siguientes instrumentos tiene desarrollado para la gestión de su emprendimiento?",
				type: "single",
				options: [
					"Modelo de Negocio",
					"Plan de Negocio",
					"Ambos",
					"Ninguno de los anteriores",
				],
				required: true,
				locked: false,
				name: "instrumentos_desarrollados",
			},
			{
				id: 51,
				question:
					"¿Ha realizado algún análisis del entorno empresarial donde va a desarrollar su emprendimiento? (clima de negocios)",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
				],
				required: true,
				locked: false,
				name: "analisis_entorno_empresarial",
			},
		],
	},
	Innovación: {
		view: "vista_persona",
		"stored-procedure": "upsert_persona",
		questions: [
			{
				id: 52,
				question: "¿Se considera una persona creativa e innovadora?",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
				],
				required: true,
				locked: false,
				name: "creatividad_innovacion",
			},
			{
				id: 53,
				question:
					"¿Cuál de los siguientes tipos de innovación ha implementado en su emprendimiento?",
				type: "multiple",
				options: [
					"De producto",
					"De proceso (s)",
					"De organización",
					"De mercadotecnia",
					"Ninguna de las anteriores",
				],
				required: true,
				locked: false,
				name: "tipo_innovacion",
			},
			{
				id: 54,
				question:
					"¿Su emprendimiento presenta elementos que lo hacen único y que no posee su competencia?",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
					"No conozco el concepto",
				],
				required: true,
				locked: false,
				name: "elementos_unicos",
			},
			{
				id: 55,
				question:
					"¿Utiliza las diferentes tecnologías de la información y la comunicación para el desarrollo de su emprendimiento? (TICs)",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
					"No conozco el concepto",
				],
				required: true,
				locked: false,
				name: "uso_tics",
			},
			{
				id: 56,
				question:
					"¿Ha desarrollado y aplicado en su emprendimiento alguna de las siguientes herramientas o metodologías?",
				type: "multiple",
				options: [
					"Design Thinking",
					"Lean Startup",
					"Estrategia del Océano Azul",
					"SCAMPER",
					"Lean CANVAS",
					"Business Model CANVAS",
					"Ninguna",
				],
				required: true,
				locked: false,
				name: "herramienta_metodologia",
			},
			{
				id: 57,
				question:
					"¿Ha realizado algún registro de propiedad Intelectual en el Registro Nacional relacionado con su emprendimiento? (propiedad industrial o derecho de autor)",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
				],
				required: true,
				locked: false,
				name: "registro_propiedad_intelectual",
			},
			{
				id: 58,
				question:
					"¿Dedica tiempo y recursos a la investigación, el desarrollo y la innovación (I+D+i) para su emprendimiento?",
				type: "multiple",
				options: [
					"Sí, realizamos investigaciones",
					"Sí, desarrollamos nuevos productos",
					"Sí, generamos nuevas innovaciones (productos)",
					"Sí dedicamos tiempo y recursos al I+D+i",
					"No dedicamos tiempo ni recursos al I+D+i",
					"No conozco el concepto",
				],
				required: true,
				locked: false,
				name: "inversion_idi",
			},
		],
	},
	Mercado: {
		view: "vista_persona",
		"stored-procedure": "upsert_persona",
		questions: [
			{
				id: 59,
				question:
					"¿Tiene identificado el problema o la necesidad que su emprendimiento resuelve en el mercado?",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
				],
				required: true,
				locked: false,
				name: "problema_necesidad_resuelve",
			},
			{
				id: 60,
				question: "¿Ha logrado desarrollar un prototipo de bajo costo?",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
					"No conozco el concepto",
				],
				required: true,
				locked: false,
				name: "prototipo_bajo_costo",
			},
			{
				id: 61,
				question:
					"¿Ha validado su idea o modelo de negocio con el mercado? (clientes)",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
				],
				required: true,
				locked: false,
				name: "validacion_idea",
			},
			{
				id: 62,
				question: "¿Cuenta con un producto mínimo viable? (MVP)",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
					"No conozco el concepto",
				],
				required: true,
				locked: false,
				name: "producto_minimo_viable",
			},
			{
				id: 63,
				question:
					"¿Ha elaborado algún tipo de investigación o estudio de mercado?",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
					"No conozco el concepto",
				],
				required: true,
				locked: false,
				name: "investigacion_estudio_mercado",
			},
			{
				id: 64,
				question: "¿Tiene identificados a sus principales competidores?",
				type: "single",
				options: [
					"Sí, hacen lo mismo que yo y están en la misma zona o región.",
					"Sí, hacen lo mismo que yo, pero están en otra zona o región del país.",
					"Sí, hacen lo mismo pero no tienen la calidad de mis productos (bienes o servicios).",
					"No los tengo identificados.",
				],
				required: true,
				locked: false,
				name: "competidores_identificados",
			},
			{
				id: 65,
				question:
					"¿Tiene identificados sus principales proveedores de materia prima?",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
				],
				required: true,
				locked: false,
				name: "proveedores_materia_prima",
			},
			{
				id: 66,
				question:
					"¿Tiene segmentado el mercado al cual está dirigido su emprendimiento?",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
					"No conozco el concepto",
				],
				required: true,
				locked: false,
				name: "mercado_segmentado",
			},
			{
				id: 67,
				question: "¿A qué mercado está dirigido su producto? (bien o servicio)",
				type: "single",
				options: [
					"Interno (local)",
					"Interno (nacional)",
					"Externo (internacional)",
				],
				required: true,
				locked: false,
				name: "mercado_objetivo",
			},
			{
				id: 68,
				question: "¿A quién vende su producto actualmente?",
				type: "multiple",
				options: [
					"Público en general",
					"Distribuidores",
					"Comercializadores",
					"Exportadores",
					"Entidades públicas",
				],
				required: true,
				locked: false,
				name: "cliente_actual",
			},
			{
				id: 69,
				question: "¿Cuál es el principal medio que utiliza para vender?",
				type: "multiple",
				options: [
					"De puerta en puerta",
					"Local comercial",
					"Ferias",
					"Catálogos",
					"Redes Sociales",
					"WhatsApp",
					"Página Web",
					"Marketplace",
					"Teléfono",
					"Concesiones",
					"Intermediarios",
					"Otro",
				],
				required: true,
				locked: false,
				name: "medio_venta",
			},
			{
				id: 70,
				question:
					"Redes sociales que utiliza para dar a conocer su emprendimiento:",
				type: "multiple",
				options: [
					"Facebook",
					"Twitter",
					"Instagram",
					"Snapchat",
					"WhatsApp",
					"YouTube",
					"Otra",
					"No tengo perfil en redes sociales",
				],
				required: true,
				locked: false,
				name: "red_social",
			},
			{
				id: 71,
				question:
					"¿Realiza una planificación periódica de las publicaciones para medios digitales?",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
				],
				required: true,
				locked: false,
				name: "planificacion_publicaciones",
			},
			{
				id: 72,
				question:
					"¿Cuenta con una marca e imagen gráfica para su emprendimiento?",
				type: "single",
				options: [
					"No cuento con logotipo ni otros elementos gráficos relacionados a mi marca.",
					"No, sin embargo tengo mi propio logotipo realizado por mí o una persona de mi equipo empresarial.",
					"No, pero estoy trabajando en el proceso de unificar mi marca; sin embargo sí tengo un logotipo para mi marca.",
					"Sí, tengo un logotipo y línea gráfica que representan mi marca en todos los aspectos relacionados a mi emprendimiento.",
				],
				required: true,
				locked: false,
				name: "marca_imagen_grafica",
			},
			{
				id: 73,
				question:
					"¿Cuenta con una estrategia de promoción y mercadeo digital para su producto? (bien o servicio)",
				type: "single",
				options: [
					"No tengo presencia digital",
					"Cuento con páginas empresariales, pero aún no tengo una estrategia clara.",
					"No, cuento con actividad constante en páginas empresariales, ya sea web o redes sociales, pero mi estrategia no está completamente definida.",
					"Sí, cuento con una estrategia de promoción y mercadeo digital definida para mi empresa (calendario de publicaciones, desarrollo estratégico y objetivos claros).",
				],
				required: true,
				locked: false,
				name: "estrategia_mercadeo_digital",
			},
			{
				id: 74,
				question:
					"¿Promueve activamente la venta en línea de sus productos? (bienes o servicios)",
				type: "single",
				options: [
					"No, vendo de manera personal.",
					"No, no cuento con página web propia.",
					"Sí, vendo a través de plataformas de Marketplace o e-Commerce.",
					"Sí, cuento con una página web propia.",
				],
				required: true,
				locked: false,
				name: "venta_en_linea",
			},
			{
				id: 75,
				question:
					"¿Ha establecido algún tipo de alianza estratégica con proveedores, clientes u otros emprendimientos? (encadenamientos)",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
					"No conozco el concepto",
				],
				required: true,
				locked: false,
				name: "alianzas_estrategicas",
			},
			{
				id: 76,
				question:
					"¿Actualmente su emprendimiento está generando ventas? (Operando)",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
				],
				required: true,
				locked: false,
				name: "generando_ventas",
			},
			{
				id: 77,
				question:
					"Indique el promedio mensual de ventas de su emprendimiento de los últimos 12 meses: (en colones)",
				type: "single",
				options: [
					"1 – 200.000",
					"201.000 – 400.000",
					"401.000 – 600.000",
					"601.000 – 1.000.000",
					"Mayor a 1.000.000",
					"Cero ventas",
				],
				required: true,
				locked: false,
				name: "promedio_mensual_ventas",
			},
			{
				id: 78,
				question:
					"¿Tiene desarrollada una estrategia de promoción y comercialización?",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
					"No conozco el concepto",
				],
				required: true,
				locked: false,
				name: "estrategia_promocion_comercializacion",
			},
		],
	},
	"Contabilidad y Finanzas": {
		view: "vista_persona",
		"stored-procedure": "upsert_persona",
		questions: [
			{
				id: 79,
				question:
					"¿Conoce cuál es el margen de utilidad que obtiene por la venta de sus productos? (bienes o servicios)",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
					"No conozco el concepto",
				],
				required: true,
				locked: false,
				name: "margen_utilidad",
			},
			{
				id: 80,
				question:
					"¿Tiene claro el costo unitario de su producto? (bien o servicio)",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
					"No conozco el concepto",
				],
				required: true,
				locked: false,
				name: "costo_unitario_producto",
			},
			{
				id: 81,
				question:
					"¿Tiene desarrollada la estructura de costos de su emprendimiento?",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
					"No conozco el concepto",
				],
				required: true,
				locked: false,
				name: "estructura_costos",
			},
			{
				id: 82,
				question:
					"¿Tiene desarrollada la estructura de precios de su producto (bien o servicio)",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
					"No conozco el concepto",
				],
				required: true,
				locked: false,
				name: "estructura_precios",
			},
			{
				id: 83,
				question:
					"¿En su emprendimiento, cuál es su salario base mensual en colones?",
				type: "single",
				options: [
					"1 – 100.000",
					"100.001 – 300.000",
					"300.001 – 500.000",
					"500.001 – 700.000",
					"Mayor a 700.000",
					"No tengo un salario base establecido",
				],
				required: true,
				locked: false,
				name: "salario_base_mensual",
			},
			{
				id: 84,
				question:
					"¿Realiza una adecuada separación de sus finanzas personales o familiares y las del emprendimiento?",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
				],
				required: true,
				locked: false,
				name: "separacion_finanzas",
			},
			{
				id: 85,
				question:
					"¿Lleva algún tipo de registro contable en relación con las ventas de su emprendimiento?",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
					"No conozco el concepto",
				],
				required: true,
				locked: false,
				name: "registro_contable",
			},
			{
				id: 86,
				question: "¿Cuenta actualmente con un presupuesto para el año?",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
				],
				required: true,
				locked: false,
				name: "presupuesto_anual",
			},
			{
				id: 87,
				question:
					"¿Tiene claro cuánto debe vender para cubrir los costos de operación de su emprendimiento?",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
					"No conozco el concepto",
				],
				required: true,
				locked: false,
				name: "punto_equilibrio",
			},
			{
				id: 88,
				question:
					"¿Actualmente su emprendimiento alcanza o sobrepasa el punto de equilibrio?",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
					"No conozco el concepto",
				],
				required: true,
				locked: false,
				name: "punto_equilibrio_actual",
			},
			{
				id: 89,
				question:
					"¿Tiene desarrollado un plan de inversión para su emprendimiento?",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
					"No conozco el concepto",
				],
				required: true,
				locked: false,
				name: "plan_inversion",
			},
			{
				id: 90,
				question:
					"¿Ha desarrollado un plan financiero que demuestre la viabilidad del emprendimiento?",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
					"No conozco el concepto",
				],
				required: true,
				locked: false,
				name: "plan_financiero",
			},
			{
				id: 91,
				question:
					"¿Ha elaborado proyecciones de ventas para su emprendimiento? (para los próximos 12 meses)",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
					"No conozco el concepto",
				],
				required: true,
				locked: false,
				name: "proyecciones_ventas",
			},
			{
				id: 92,
				question:
					"¿En su emprendimiento, lleva algún tipo de control de inventario para los productos y/o la materia prima?",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
				],
				required: true,
				locked: false,
				name: "control_inventario",
			},
		],
	},
	Formalización: {
		view: "vista_persona",
		"stored-procedure": "upsert_persona",
		questions: [
			{
				id: 93,
				question: "¿Está interesada en formalizar su emprendimiento?",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
				],
				required: true,
				locked: false,
				name: "interes_formalizar",
			},
			{
				id: 94,
				question: "¿Conoce los pasos a seguir para formalizarse?",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
				],
				required: true,
				locked: false,
				name: "conocimiento_pasos",
			},
			{
				id: 95,
				question:
					"¿Su emprendimiento cuenta con alguno de los siguientes aspectos de formalización?",
				type: "multiple",
				options: [
					"Inscrito como contribuyente ante el Ministerio de Hacienda",
					"Inscrito ante la CCSS como patrono o trabajador independiente",
					"Póliza de Riesgos de Trabajo (INS)",
					"Permiso de uso de suelo",
					"Patente Municipal",
					"Permisos sanitarios de funcionamiento",
					"Registro sanitario",
					"Certificado Veterinario de Operación (CVO)",
					"Registro de marca",
					"Ninguno de los anteriores",
				],
				required: true,
				locked: false,
				name: "aspecto_formalizacion",
			},
		],
	},
	Financiamiento: {
		view: "vista_persona",
		"stored-procedure": "upsert_persona",
		questions: [
			{
				id: 96,
				question:
					"¿Cuál es el origen de la inversión inicial de su emprendimiento? (recursos económicos)",
				type: "single",
				options: [
					"Ahorros propios",
					"Capital familiar",
					"Capital semilla",
					"Donación (herencia)",
					"Préstamo",
					"Inversionista o socio",
					"Otro",
					"Ninguno",
				],
				required: true,
				locked: false,
				name: "origen_inversion_inicial",
			},
			{
				id: 97,
				question:
					"¿Con qué recursos cuenta para desarrollar su emprendimiento?",
				type: "multiple",
				options: [
					"Financieros",
					"Humanos",
					"Infraestructura",
					"Maquinaria",
					"Equipamiento",
					"Conocimiento técnico",
				],
				required: true,
				locked: false,
				name: "recurso_disponible",
			},
			{
				id: 98,
				question:
					"¿Cuenta en este momento con algún crédito activo relacionado con su emprendimiento?",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
				],
				required: true,
				locked: false,
				name: "credito_activo",
			},
			{
				id: 99,
				question:
					"Si su respuesta a la pregunta anterior es “No”, favor indicar las razones. Puede marcar varias opciones.",
				type: "multiple",
				options: [
					"Excesiva tramitología",
					"Cuotas mensuales elevadas",
					"Solicitud de personas fiadoras",
					"El tipo de proyecto no es financiable",
					"Cuestiones relacionadas con género",
					"Solicitud de garantías bancarias",
					"Tasas elevadas de intereses",
					"Le da miedo endeudarse",
					"Otra",
				],
				required: true,
				locked: false,
				name: "razon_no_credito",
			},
			{
				id: 100,
				question: "¿Está al día con sus operaciones crediticias? (préstamo)",
				type: "single",
				options: [
					{
						text: "Sí",
						value: true,
					},
					{
						text: "No",
						value: false,
					},
				],
				required: true,
				locked: false,
				name: "operaciones_crediticias_al_dia",
			},
			{
				id: 101,
				question:
					"Actualmente, requiere de financiamiento específicamente para:",
				type: "multiple",
				options: [
					"Capital de trabajo",
					"Infraestructura",
					"Equipo y mobiliario",
					"Maquinaria",
					"Refundir deudas",
					"No requiere de financiamiento",
					"No está interesada en financiamiento",
					"No califica para financiamiento",
				],
				required: true,
				locked: false,
				name: "necesidad_financiamiento",
			},
			{
				id: 102,
				question:
					"¿Ha recibido fondos o recursos de alguno de los siguientes programas del Estado?",
				type: "multiple",
				options: [
					"FODEMIPYME",
					"PRONAMYPE",
					"PROPYME",
					"PINN",
					"FOMUJERES",
					"IMAS",
					"FIDEIMAS",
					"INDER",
					"SBD",
					"Ninguna de las anteriores",
				],
				required: true,
				locked: false,
				name: "fondo_programa_estado",
			},
		],
	},
};
