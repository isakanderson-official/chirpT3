import { useUser } from "@clerk/nextjs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { PageLayout } from "~/components/layout";
import { CreatePostWizard } from "~/components/createPostWizard";
import { Feed } from "~/components/feed";

dayjs.extend(relativeTime);

export default function Home() {
  const { isLoaded: userLoaded } = useUser();

  if (!userLoaded) return <div />;

  return (
    <PageLayout>
      <CreatePostWizard />
      <Feed />
    </PageLayout>
  );
}
