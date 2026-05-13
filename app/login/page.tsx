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
    <div className="flex flex-col h-full justify-center px-6 py-12 lg:px-8">
      <div className="flex flex-col justify-center items-center sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex gap-6 flex-col text-3xl items-center">
          <span>📕</span>
          <Header name="Sign in to your account" type="subheader" />
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
