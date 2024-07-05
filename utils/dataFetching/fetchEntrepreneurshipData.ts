import { fetchStandardized } from "./fetchData";

export const fetchEntrepreneurshipData = (personaId: number) =>
  fetchStandardized("emprendimiento", "id_persona", personaId, [
    {
      table: "persona",
      foreignKey: "id_persona",
      relatedKey: "id_persona",
      targetColumn: "nombre",
    },
  ]);
