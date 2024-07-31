import UserProfile from "@/features/userProfile/components/UserProfile";

export default function PersonaPage({ params }: { params: { id: string } }) {
  const personaId = parseInt(params.id[0], 10);

  return (
    <UserProfile personaId={personaId} avatarSrc="/logo-orange-blue.png" />
  );
}
