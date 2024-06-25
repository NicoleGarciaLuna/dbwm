import AppLayout from "@/components/AppLayout";
import UserProfile from "@/components/UserProfile/UserProfile";

export default function Home() {
  return (
    <AppLayout>
      <UserProfile personaId={1} />
    </AppLayout>
  );
}
