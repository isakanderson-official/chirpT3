import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import Image from "next/image";
import LoadingSpinner from "~/components/loading";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

export const CreatePostWizard = () => {
  const { user } = useUser();

  const [input, setInput] = useState("");
  const router = useRouter();
  const prefilledContent = router.query.content;

  useEffect(() => {
    if (prefilledContent) {
      setInput(prefilledContent as string);
    }
  }, []);

  const clearQueryContent = async () => {
    // Get the current query parameters
    const { query } = router;

    // Remove the 'paramToClear' query parameter
    delete query.content;

    // Use router.push to navigate to the same page with the modified query parameters
    await router.push({ pathname: router.pathname, query });
  };

  const ctx = api.useContext();
  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: async () => {
      setInput("");
      await clearQueryContent();
      void ctx.posts.getAll.invalidate();
    },
    onError: async (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (e.data?.httpStatus === 401) {
        await router.push({
          pathname: "/sign-up",
          query: { content: input },
        });
        return;
      }

      if (errorMessage?.[0]) {
        toast.error(errorMessage[0]);
      } else if (e.message) {
        toast.error(e.message);
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  // if (!user) return null;

  return (
    <div className="flex w-full gap-3 ">
      {!!user && (
        <Image
          src={user.imageUrl}
          alt="Profile image"
          className="h-12 w-12 rounded-full"
          width={56}
          height={56}
        />
      )}
      <input
        placeholder="Type some emojis!"
        className="grow bg-transparent outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isPosting}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input !== "") {
              mutate({ content: input });
            }
          }
        }}
      />
      {!isPosting && (
        <button onClick={() => mutate({ content: input })}>Post</button>
      )}
      {isPosting && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={20} />
        </div>
      )}
    </div>
  );
};
