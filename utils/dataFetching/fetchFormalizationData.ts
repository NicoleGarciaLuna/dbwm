import { fetchNestedData } from "./fetchData";

export const fetchFormalizationData = (emprendimientoIds: number[]) =>
  fetchNestedData(emprendimientoIds, [
    { name: "formalizacion", foreignKey: "id_emprendimiento" },
    {
      name: "formalizacion_aspecto_formalizacion",
      foreignKey: "id_formalizacion",
      relatedTable: "aspecto_formalizacion",
      relatedKey: "id_aspecto_formalizacion",
      targetColumn: "descripcion",
    },
  ]);
