"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'

export default function ButtonAuth() {
  const { data: session, status } = useSession();
  const router = useRouter()

  console.log({session, status});

  const handleLogin = async (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value

    const result = await signIn('credentials', {
      redirect: false,
      username,
      password
    })

    if (result.error) {
      // handle error
    } else {
      // successful login
      router.push('/dashboard')
    }
  }

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button
          onClick={() => signOut()}
          className="btn btn-danger"
        >
          Sign out
        </button>
      </>
    );
  }
  
  return (
    <>
      Not signed in <br />
      <form onSubmit={handleLogin}>
        <label>
          Usuario
          <input name="username" type="text" placeholder="test@test.com" required />
        </label>
        <label>
          Contra
          <input name="password" type="password" required />
        </label>
        <button type="submit" className="btn btn-primary">Iniciar sesión</button>
      </form>
    </>
  );
}
