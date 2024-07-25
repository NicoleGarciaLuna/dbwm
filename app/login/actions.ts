"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/shared/utils/supabase/server";

export async function login(formData: FormData) {
	const supabase = createClient();

	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		throw new Error(error.message);
	}

	revalidatePath("/microentrepreneurs");
	redirect("/microentrepreneurs");
}

export async function signOut() {
	const supabase = createClient();

	const { error } = await supabase.auth.signOut();

	if (error) {
		throw new Error(error.message);
	}

	revalidatePath("/login");
	redirect("/login");
}
