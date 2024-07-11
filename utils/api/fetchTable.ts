import { supabase } from "../supabase/supabaseClient";
import { QueryData } from "@supabase/supabase-js";

const personasConDatosQuery = supabase.from("persona").select(`
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

export type PersonasConDatos = QueryData<typeof personasConDatosQuery>;

export const fetchPersonasConDatos =
  async (): Promise<PersonasConDatos | null> => {
    try {
      const { data, error } = await personasConDatosQuery;
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };
