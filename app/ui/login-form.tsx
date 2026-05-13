"use client";

import { createClient } from "@/lib/supabase/client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Input from "./input";
import Button from "./button";

export default function LoginForm() {
  const supabase = createClient();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    console.log(data);

    router.push("/");
  }

  const [inputsData, setInputsData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setInputsData((data) => ({ ...data, [name]: value }));
    console.log(inputsData);
  };

  function validateData() {
    if (!inputsData.email || !inputsData.password) {
      setError("Either email or password is missing");
    } else {
      startTransition(async () => {
        await signIn(inputsData.email, inputsData.password);
      });
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        validateData();
      }}
      className="relative w-full flex flex-col gap-6 items-center"
    >
      {error && (
        <div
          className="absolute -top-65 rounded-3xl border border-red-700 
        px-4 py-2 text-red-700/80 font-semibold bg-red-700/5"
        >
          {error}
        </div>
      )}
      <div>
        <label htmlFor="email" className="block text-sm/6 font-medium mb-2">
          Email address
        </label>
        <Input
          name="email"
          placeholder="example@gmail.com"
          type="email"
          value={inputsData.email}
          required={false}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm/6 font-medium  mb-2"
          >
            Password
          </label>
        </div>
        <Input
          name="password"
          placeholder="********"
          type="password"
          value={inputsData.password}
          required={false}
          onChange={handleInputChange}
        />
      </div>
      <Button
        text={isPending ? "Loading..." : "Log In"}
        type="main"
        buttonType="submit"
        onClick={validateData}
      />
    </form>
  );
}
