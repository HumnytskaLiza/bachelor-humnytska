import "server-only";
import { createClient } from "@/lib/supabase/server";
import { JobPosition, Level } from "../types";

export async function fetchStandardUsers() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("role", "standard");

  if (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch users.");
  }

  return data;
}

export async function createStandardUser(
  unique_id: string,
  first_name: string,
  last_name: string,
  email: string,
  job_position: JobPosition,
  level: Level,
) {
  const supabase = await createClient();

  const { error } = await supabase.from("users").insert([
    {
      unique_id,
      first_name,
      last_name,
      email,
      role: "standard",
      job_position,
      level,
    },
  ]);

  if (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create a user.");
  }
}

export async function fetchUserById(unique_id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("unique_id", unique_id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch user.");
  }

  return data;
}

export async function fetchAdminUsers() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("role", "admin");

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch users.");
  }

  return data;
}

export async function getUserRole() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return data?.role ?? null;
}
