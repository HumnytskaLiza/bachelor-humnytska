"use server";

import LoginForm from "../ui/login-form";
import Header from "../ui/header";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col justify-center px-2 py-4 md:px-6 md:py-12 lg:px-8">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-6 text-3xl">
          <span>📕</span>
          <Header name="Sign in to your account" type="subheader" />
        </div>
      </div>

      <div className="mt-10">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
