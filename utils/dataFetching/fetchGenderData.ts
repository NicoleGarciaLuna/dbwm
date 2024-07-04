import { fetchStandardized } from "./fetchData";

export const fetchGenderVariables = (personaId: number) =>
  fetchStandardized("variable_genero", "id_genero", personaId, [
    {
      table: "tipo_cuido",
      foreignKey: "id_genero",
      relatedKey: "id_tipo_cuido",
      targetColumn: "descripcion",
    },
    {
      table: "encargado_tareas_hogar",
      foreignKey: "id_genero",
      relatedKey: "id_encargado_tareas_hogar",
      targetColumn: "descripcion",
    },
  ]);
