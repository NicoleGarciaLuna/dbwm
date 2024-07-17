import Layout from "@/components/Layout";
import UserProfile from "@/components/UserProfile/UserProfile";

export default function PersonaPage({ params }: { params: { id: string } }) {
  const personaId = parseInt(params.id[0], 10);

  return (
    <Layout>
      <UserProfile personaId={personaId} avatarSrc="/logo-black-white.png" />
    </Layout>
  );
}
