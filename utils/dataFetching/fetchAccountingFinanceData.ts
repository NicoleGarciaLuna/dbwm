import { fetchNestedDataWithNames } from "@/utils/api/fetchData";

export const fetchAccountingFinanceData = (emprendimientoIds: number[]) =>
  fetchNestedDataWithNames(emprendimientoIds, [
    { name: "contabilidad_finanzas", foreignKey: "id_emprendimiento" },
  ]);
