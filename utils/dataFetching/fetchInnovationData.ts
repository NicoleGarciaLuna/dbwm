import { fetchNestedData } from "./fetchData";

export const fetchInnovationData = (emprendimientoIds: number[]) =>
  fetchNestedData(emprendimientoIds, [
    { name: "innovacion", foreignKey: "id_emprendimiento" },
    {
      name: "innovacion_inversion_idi",
      foreignKey: "id_innovacion",
      relatedTable: "inversion_idi",
      relatedKey: "id_inversion_idi",
      targetColumn: "descripcion",
    },
    {
      name: "innovacion_herramienta_metodologia",
      foreignKey: "id_innovacion",
      relatedTable: "herramienta_metodologia",
      relatedKey: "id_herramienta_metodologia",
      targetColumn: "descripcion",
    },
    {
      name: "innovacion_tipo_innovacion",
      foreignKey: "id_innovacion",
      relatedTable: "tipo_innovacion",
      relatedKey: "id_tipo_innovacion",
      targetColumn: "descripcion",
    },
  ]);
