import { PostView } from "~/components/postview";
import { LoadingPage } from "~/components/loading";
import { api } from "~/utils/api";

export const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading) return <LoadingPage />;

  if (!data) return <div>Something went wrong</div>;

  return (
    <div className="feed flex shrink flex-col overflow-y-auto">
      {[...data]?.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};
