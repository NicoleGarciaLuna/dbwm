import AppLayout from "@/components/AppLayout";
import UserProfile from "@/components/UserProfile/UserProfile";

export default function PersonaPage({
  params,
}: {
  params: { id: string };
}) {
  const personaId = parseInt(params.id[0], 10);

  return (
    <AppLayout>
      <UserProfile personaId={personaId} />
    </AppLayout>
  );
}
