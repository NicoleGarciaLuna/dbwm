import { fetchDataWithRelatedTables } from "@/utils/api/fetchData";

export const fetchTrainingData = (personaId: number) =>
  fetchDataWithRelatedTables("capacitacion", "id_capacitacion", personaId, []);
