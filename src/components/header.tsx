/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react";
import Button from "./button";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

const Header = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const username = user?.username;
  const router = useRouter();
  return (
    <header className="flex w-full cursor-default items-center justify-between bg-gradient-to-t from-gray-900 to-slate-900 p-4">
      <h1
        className="cursor-pointer text-lg font-semibold"
        onClick={() => router.push("/")}
      >{`Isak's T3 Emoji App`}</h1>
      <div>
        <div className="flex items-center gap-4">
          {!!user ? (
            <>
              <span className="hidden md:block">{`Welcome, ${username}!`}</span>
              <Button onClick={() => signOut()}>Signout</Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => router.push("/sign-up")}
                className="p-2 font-medium"
              >
                Sign In
              </Button>
              <Button onClick={() => router.push("/sign-up")}>Signup</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
