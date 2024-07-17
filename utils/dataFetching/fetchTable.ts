import { supabaseClient } from "@/utils/supabase/client";
import { PostgrestResponse } from "@supabase/supabase-js";
import { PersonaProps } from "@/components/MicroentrepreneursList";

export const fetchPersonasConDatos = async (): Promise<
  PersonaProps[] | null
> => {
  try {
    const { data, error }: PostgrestResponse<PersonaProps> =
      await supabaseClient.from("persona").select(`
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
