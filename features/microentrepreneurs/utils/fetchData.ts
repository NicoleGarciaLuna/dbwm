import { useState, useEffect } from "react";
import { supabaseClient } from "@/shared/utils/supabase/client";
import { MicroentrepreneurTableProps, Diagnostico } from "@/features/microentrepreneurs/types";

const usePersonas = () => {
  const [data, setData] = useState<MicroentrepreneurTableProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const formattedData = await getPersonas();
        if (formattedData) {
          setData(formattedData);
          setError(null);
        }
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, isLoading, error };
};

const getPersonas = async (): Promise<MicroentrepreneurTableProps[] | null> => {
  try {
    const { data: diagnosticos, error } = await supabaseClient
      .from("diagnostico")
      .select(
        `
        id_diagnostico,
        fecha_diagnostico,
        id_persona,
        emprendimiento (
          nombre_emprendimiento,
          tiempo_operacion,
          sector_economico
        ),
        idea_negocio (
          descripcion_breve
        ),
        persona (
          id_persona,
          nombre,
          primer_apellido,
          segundo_apellido
        )
      `
      )
      .order("fecha_diagnostico", { ascending: false });

    if (error) throw error;

    console.log("Fetched diagnosticos:", diagnosticos);

    const groupedData = diagnosticos.reduce(
      (acc: { [key: number]: Diagnostico[] }, item: any) => {
        if (!item.persona || !item.persona.id_persona) {
          console.warn("Invalid persona data:", item.persona);
          return acc;
        }

        const id = item.persona.id_persona;
        if (!acc[id]) {
          acc[id] = [];
        }
        acc[id].push(item);
        return acc;
      },
      {}
    );

    const formattedData = Object.values(groupedData).map(
      (diagnosticos: Diagnostico[]) => {
        const latestDiagnostico = diagnosticos[0];
        const persona = latestDiagnostico.persona;

        const fullName = `${persona.nombre} ${persona.primer_apellido} ${persona.segundo_apellido}`;

        let company = "";
        let sector = "";
        let businessIdea = "";
        let experienceYears: number | string = "";

        for (const diag of diagnosticos) {
          if (diag.emprendimiento?.nombre_emprendimiento) {
            company = diag.emprendimiento.nombre_emprendimiento;
          }
          if (diag.emprendimiento?.sector_economico) {
            sector = diag.emprendimiento.sector_economico;
          }
          if (diag.idea_negocio?.descripcion_breve) {
            businessIdea = diag.idea_negocio.descripcion_breve;
          }
          if (diag.emprendimiento?.tiempo_operacion) {
            experienceYears = diag.emprendimiento.tiempo_operacion;
          }
        }

        return {
          id: persona.id_persona,
          fullName,
          company,
          sector,
          businessIdea,
          experienceYears,
        };
      }
    );

    console.log("Formatted data:", formattedData);

    return formattedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export default usePersonas;
