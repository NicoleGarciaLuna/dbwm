import { supabaseClient } from "@/shared/utils/supabase/client";
import {
  Diagnostico,
  MicroentrepreneurTableProps,
} from "@/features/microentrepreneurs/types";

export const fetchPersonasConDatos = async (): Promise<
  MicroentrepreneurTableProps[] | null
> => {
  try {
    const { data: diagnosticosData, error: diagnosticosError } =
      await supabaseClient
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

    if (diagnosticosError) throw diagnosticosError;

    const groupedData = diagnosticosData.reduce(
      (acc: { [key: number]: Diagnostico }, diagnostico: any) => {
        const personaId = diagnostico.persona.id_persona;
        if (
          !acc[personaId] ||
          new Date(diagnostico.fecha_diagnostico) >
            new Date(acc[personaId].fecha_diagnostico)
        ) {
          acc[personaId] = { ...diagnostico };
        }
        return acc;
      },
      {}
    );

    const latestDiagnosticos = Object.values(groupedData);

    const formattedData = latestDiagnosticos
      .map((diagnostico) => {
        if (!diagnostico.persona) return null;

        const persona = diagnostico.persona;
        const emprendimiento = diagnostico.emprendimiento;
        const ideaNegocio = diagnostico.idea_negocio;

        return {
          id: persona.id_persona,
          fullName: `${persona.nombre} ${persona.primer_apellido} ${persona.segundo_apellido}`,
          company: emprendimiento?.nombre_emprendimiento ?? "",
          sector: emprendimiento?.sector_economico ?? "",
          businessIdea: ideaNegocio?.descripcion_breve ?? "",
          experienceYears: emprendimiento?.tiempo_operacion ?? "",
        };
      })
      .filter((item): item is MicroentrepreneurTableProps => item !== null);

    return formattedData || null;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
