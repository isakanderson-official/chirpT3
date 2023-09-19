import { SignUp } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LoadingPage } from "~/components/loading";

export default function Page() {
  const router = useRouter();
  const { content } = router.query;
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlOrigin = window.location.origin;
      setOrigin(urlOrigin);
    }
  }, []);

  return (
    <main className="flex h-screen items-center justify-center">
      {!origin ? (
        <LoadingPage />
      ) : (
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          redirectUrl={`${origin}/${content ? `?content=${content}` : `''`}`}
        />
      )}
    </main>
  );
}
