import { fetchNestedDataWithNames } from "@/utils/api/fetchData";

export const fetchBusinessIdeas = (emprendimientoIds: number[]) =>
  fetchNestedDataWithNames(emprendimientoIds, [
    { name: "idea_negocio", foreignKey: "id_emprendimiento" },
  ]);
