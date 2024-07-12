import { supabase } from "@/utils/supabase/supabaseClient";
import { QueryData } from "@supabase/supabase-js";

type DataItem = {
  name: string;
  value: number;
};

class DataService {
  constructor() {}

  async fetchData<T>(
    table: string,
    select: string
  ): Promise<QueryData<T> | null> {
    try {
      const { data, error } = await supabase.from(table).select(select);
      if (error) throw error;
      return data as QueryData<T>;
    } catch (error) {
      console.error(`Error fetching data from '${table}' table:`, error);
      return null;
    }
  }

  async fetchStatistics(
    table: string,
    select: string
  ): Promise<DataItem[] | null> {
    const result = await this.fetchData<Record<string, any>[]>(table, select);
    if (result) {
      return result.map((item: Record<string, any>) => ({
        name:
          item.escolaridad ||
          item.estado_civil ||
          item.tiempo_tareas_hogar ||
          item.porcentaje_utilidad_hogar ||
          item.personas_a_cargo ||
          item.tipo_emprendimiento ||
          item.tiempo_operacion ||
          item.sector_economico ||
          item.estado_idea ||
          item.uso_tics ||
          item.estrategia_mercadeo_digital ||
          item.promedio_mensual_ventas ||
          item.mercado_objetivo ||
          item.salario_base_mensual ||
          item.presupuesto_anual ||
          item.interes_formalizar ||
          item.credito_activo ||
          item.operaciones_crediticias_al_dia,
        value: item.count,
      }));
    }
    return null;
  }
}

const dataServiceInstance = new DataService();

export default dataServiceInstance;
