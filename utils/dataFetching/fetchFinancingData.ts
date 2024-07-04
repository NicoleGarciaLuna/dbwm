import { fetchNestedData } from "./fetchData";

export const fetchFinancingData = (emprendimientoIds: number[]) =>
  fetchNestedData(emprendimientoIds, [
    { name: "financiamiento", foreignKey: "id_emprendimiento" },
    {
      name: "financiamiento_fondo_programa_estado",
      foreignKey: "id_financiamiento",
      relatedTable: "fondo_programa_estado",
      relatedKey: "id_fondo_programa_estado",
      targetColumn: "descripcion",
    },
    {
      name: "financiamiento_necesidad_financiamiento",
      foreignKey: "id_financiamiento",
      relatedTable: "necesidad_financiamiento",
      relatedKey: "id_necesidad_financiamiento",
      targetColumn: "descripcion",
    },
    {
      name: "financiamiento_razon_no_credito",
      foreignKey: "id_financiamiento",
      relatedTable: "razon_no_credito",
      relatedKey: "id_razon_no_credito",
      targetColumn: "descripcion",
    },
    {
      name: "financiamiento_recurso_disponible",
      foreignKey: "id_financiamiento",
      relatedTable: "recurso_disponible",
      relatedKey: "id_recurso_disponible",
      targetColumn: "descripcion",
    },
    {
      name: "financiamiento_origen_inversion_inicial",
      foreignKey: "id_financiamiento",
      relatedTable: "origen_inversion_inicial",
      relatedKey: "id_origen_inversion_inicial",
      targetColumn: "descripcion",
    },
  ]);
