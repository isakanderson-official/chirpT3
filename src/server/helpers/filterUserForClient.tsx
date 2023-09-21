import type { User } from "@clerk/nextjs/dist/types/server";

export const filterUserForClient = (user: User) => ({
  id: user.id,
  username: user.username,
  profilePicture: user.imageUrl,
});
