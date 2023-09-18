import { SignIn } from "@clerk/nextjs";

export default function Page() {
  // TODO: Add after signup URL to configure username
  return (
    <main className="flex h-screen items-center justify-center">
      <SignIn />
    </main>
  );
}
