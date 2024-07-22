import MicroentrepreneursList from "@/features/microentrepreneurs/components/List";
import { redirect } from "next/navigation";
import { createClient } from "@/shared/utils/supabase/server";

export default async function Home() {
	const supabase = createClient();

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		console.error(error);
		redirect("/login");
	}
	return <MicroentrepreneursList />;
}
