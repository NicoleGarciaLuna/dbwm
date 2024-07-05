import {
  fetchNestedDataWithNames,
  fetchAndAddRelatedNames,
} from "@/utils/api/fetchData";
import { NestedRelation } from "./fetchData";

export const fetchMarketData = async (emprendimientoIds: number[]) => {
  const marketRelations: NestedRelation[] = [
    { name: "mercado", foreignKey: "id_emprendimiento" },
    { name: "mercado_red_social", foreignKey: "id_mercado" },
    { name: "mercado_medio_venta", foreignKey: "id_mercado" },
    { name: "mercado_cliente_actual", foreignKey: "id_mercado" },
  ];

  const nestedData = await fetchNestedDataWithNames(
    emprendimientoIds,
    marketRelations
  );

  const relatedDataToFetch = [
    {
      key: "mercado_red_social",
      table: "red_social",
      idColumn: "id_red_social",
      descColumn: "descripcion",
    },
    {
      key: "mercado_medio_venta",
      table: "medio_venta",
      idColumn: "id_medio_venta",
      descColumn: "descripcion",
    },
    {
      key: "mercado_cliente_actual",
      table: "cliente_actual",
      idColumn: "id_cliente_actual",
      descColumn: "descripcion",
    },
  ];

  for (const { key, table, idColumn, descColumn } of relatedDataToFetch) {
    nestedData[key] = await fetchAndAddRelatedNames(
      nestedData[key],
      table,
      idColumn,
      descColumn,
      idColumn
    );
  }

  return nestedData;
};
