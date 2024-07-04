import { fetchStandardized } from "./fetchData";

export const fetchPersonalInfo = (personaId: number) =>
  fetchStandardized("persona", "id_persona", personaId, []);
