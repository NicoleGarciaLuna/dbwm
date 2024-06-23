import { createClient } from "@/utils/supabase/server";

export default async function Persona() {
  const supabase = createClient();

  // Consulta para obtener los datos de la persona
  const { data: persona } = await supabase
    .from("persona")
    .select("*")
    .eq("id_persona", 2);

  // Consulta para obtener los datos de emprendimiento asociados a la persona
  const { data: emprendimientos } = await supabase
    .from("emprendimiento")
    .select("*")
    .eq("id_persona", 2);

  // Inicializar arrays para almacenar los datos de las tablas relacionadas
  let innovaciones = [];
  let mercados = [];
  let contabilidadFinanzas = [];
  let financiamientos = [];
  let formalizaciones = [];
  let ideaNegocios = [];
  let productos = [];

  if (emprendimientos)
    for (let emp of emprendimientos) {
      const { data: innovacion } = await supabase
        .from("innovacion")
        .select("*")
        .eq("id_emprendimiento", emp.id_emprendimiento);
      innovaciones.push(innovacion);

      const { data: mercado } = await supabase
        .from("mercado")
        .select("*")
        .eq("id_emprendimiento", emp.id_emprendimiento);
      mercados.push(mercado);

      const { data: finanzas } = await supabase
        .from("contabilidad_finanzas")
        .select("*")
        .eq("id_emprendimiento", emp.id_emprendimiento);
      contabilidadFinanzas.push(finanzas);

      const { data: financiamiento } = await supabase
        .from("financiamiento")
        .select("*")
        .eq("id_emprendimiento", emp.id_emprendimiento);
      financiamientos.push(financiamiento);

      const { data: formalizacion } = await supabase
        .from("formalizacion")
        .select("*")
        .eq("id_emprendimiento", emp.id_emprendimiento);
      formalizaciones.push(formalizacion);

      const { data: ideaNegocio } = await supabase
        .from("idea_negocio")
        .select("*")
        .eq("id_emprendimiento", emp.id_emprendimiento);
      ideaNegocios.push(ideaNegocio);

      const { data: producto } = await supabase
        .from("producto")
        .select("*")
        .eq("id_emprendimiento", emp.id_emprendimiento);
      productos.push(producto);
    }

  // Consulta para obtener datos de variables de género
  const { data: variableGenero } = await supabase
    .from("variable_genero")
    .select("*")
    .eq("id_persona", 2);

  // Consulta para obtener datos de capacitaciones
  const { data: capacitaciones } = await supabase
    .from("capacitacion")
    .select("*")
    .eq("id_persona", 2);

  // Combina todos los datos en un objeto
  const personaCompleta = {
    persona,
    emprendimientos,
    innovaciones,
    mercados,
    contabilidadFinanzas,
    financiamientos,
    formalizaciones,
    ideaNegocios,
    productos,
    variableGenero,
    capacitaciones,
  };

  return <pre>{JSON.stringify(personaCompleta, null, 2)}</pre>;
}
