import { supabase } from "@/utils/supabase/supabaseClient";
import { PostgrestResponse } from "@supabase/supabase-js";
import { Persona } from "@/types";

export const fetchPersonasConDatos = async (): Promise<Persona[] | null> => {
  try {
    const { data, error }: PostgrestResponse<Persona> = await supabase.from(
      "persona"
    ).select(`
        id_persona,
        nombre,
        primer_apellido,
        segundo_apellido,
        diagnostico (
          emprendimiento (
            nombre_emprendimiento,
            tiempo_operacion,
            sector_economico
          ),
          idea_negocio (
            descripcion_breve
          )
        )
      `);
    if (error) {
      throw error;
    }
    return data || null;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
