/* eslint-disable @typescript-eslint/no-misused-promises */
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import type { MouseEventHandler, PropsWithChildren, ReactNode } from "react";

export const PageLayout = (props: PropsWithChildren) => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const username = user?.username;
  const router = useRouter();

  const Button: React.FC<{
    children?: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string;
  }> = ({ children, ...props }) => {
    return (
      <button
        className="rounded-md bg-slate-800 px-4 py-2 font-semibold"
        {...props}
      >
        {children}
      </button>
    );
  };

  return (
    <>
      <header className="flex items-center justify-between bg-slate-600 p-4">
        <h1 className="text-lg font-semibold">Isaks Chrip T3 App</h1>
        <div>
          <div className="flex items-center gap-4">
            {!!user ? (
              <>
                <span>{`Welcome, ${username}!`}</span>
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
      <main className="flex h-screen justify-center">
        <div className="flex h-full w-full flex-col border-x border-slate-400 md:max-w-2xl">
          {props.children}
        </div>
      </main>
    </>
  );
};
