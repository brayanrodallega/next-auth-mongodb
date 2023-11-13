"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const signinResponse = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (signinResponse?.error) return setError(signinResponse.error as string);

    if (signinResponse?.ok) return router.push("/dashboard/profile");

    console.log(signinResponse);
  };

  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex items-center">
      <form onSubmit={handleSubmit} className="bg-neutral-950 px-8 py-10 w-3/12">
        {error && (
          <div className="bg-red-500 text-white px-4 py-2">{error}</div>
        )}

        <h1 className="text-4xl font-bold mb-7">Login</h1>

        <input
          type="email"
          placeholder="somemail@gmaail.com"
          name="email"
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
        />
        <input
          type="password"
          placeholder="******"
          name="password"
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
        />

        <button className="bg-indigo-500 px-4 py-2" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
