import { v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { getAuthenticatedUser } from "./userController";

export const generateUploadUrl = mutation(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Unauthorized");
  return await ctx.storage.generateUploadUrl();
});

export const createPost = mutation({
  args: {
    storageId: v.id("_storage"),
    caption: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx);
    const imageUrl = await ctx.storage.getUrl(args.storageId);
    if (!imageUrl) throw new Error("Image not found");

    const postId = await ctx.db.insert("posts", {
      userId: currentUser._id,
      imageUrl: imageUrl,
      storageId: args.storageId,
      caption: args.caption,
      likes: 0,
      comments: 0,
    });

    //increment user's post by 1
    await ctx.db.patch(currentUser._id, {
      posts: currentUser.posts + 1,
    });

    return postId;
  },
});

export const getFeedPosts = query({
  handler: async (ctx) => {
    const currentUser = await getAuthenticatedUser(ctx);

    //get all posts
    const post = await ctx.db.query("posts").order("desc").collect();

    if (post.length === 0) return [];

    const postsWithInfo = await Promise.all(
      post.map(async (post) => {
        const postAuthor = (await ctx.db.get(post.userId))!;

        const like = await ctx.db
          .query("likes")
          .withIndex("by_user_and_post", (query) =>
            query.eq("userId", currentUser._id).eq("postId", post._id)
          )
          .first();

        const bookmark = await ctx.db
          .query("bookmarks")
          .withIndex("by_user_and_post", (query) =>
            query.eq("userId", currentUser._id).eq("postId", post._id)
          )
          .first();

        return {
          ...post,
          author: {
            _id: postAuthor?._id,
            username: postAuthor?.usermame,
            image: postAuthor?.image,
          },
          isLiked: !!like,
          isBookmarked: !!bookmark,
        };
      })
    );

    return postsWithInfo;
  },
});
