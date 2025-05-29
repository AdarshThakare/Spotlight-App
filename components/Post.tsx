import { COLORS } from "@/constants/theme";
import { Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../assets/styles/feed.styles";
// import CommentsModal from "./CommentsModal";
import { useUser } from "@clerk/clerk-expo";
import { formatDistanceToNow } from "date-fns";

type PostProps = {
  post: {
    _id: Id<"posts">;
    imageUrl: string;
    caption?: string;
    likes: number;
    comments: number;
    _creationTime: number;
    isLiked: boolean;
    isBookmarked: boolean;
    author: {
      _id: string;
      username: string;
      image: string;
    };
  };
};

export default function Post({ post }: PostProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);
  const [showComments, setShowComments] = useState(false);

  const { user } = useUser();

  return (
    <View style={styles.post}>
      {/* POST HEADER */}

      <View style={styles.postHeader}>
        <Link href={"/(tabs)/profile"} asChild>
          <TouchableOpacity style={styles.postHeaderLeft}>
            <Image
              source={post.author.image}
              style={styles.postAvatar}
              contentFit="cover"
              transition={200}
              cachePolicy={"memory-disk"}
            />
            <Text style={styles.postUsername}>{post.author.username}</Text>
          </TouchableOpacity>
        </Link>

        {/* 
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="trash-outline" size={20} color={COLORS.primary} />
          </TouchableOpacity> */}

        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* IMAGE */}
      <Image
        source={post.imageUrl}
        style={styles.postImage}
        contentFit="cover"
        transition={200}
        cachePolicy={"memory-disk"}
      />

      {/* POST ACTIONS */}
      <View style={styles.postActions}>
        <View style={styles.postActionsLeft}>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={24}
              color={isLiked ? COLORS.primary : COLORS.white}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowComments(true)}>
            <Ionicons
              name={"chatbubble-outline"}
              size={22}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons
            name={isBookmarked ? "bookmark" : "bookmark-outline"}
            size={22}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>

      {/* POST INFO */}
      <View style={styles.postInfo}>
        <Text style={styles.likesText}>
          {post.likes > 0
            ? `${post.likes.toLocaleString()} likes`
            : "Be the first to like"}
        </Text>
        {post.caption && (
          <View style={styles.captionContainer}>
            <Text style={styles.captionUsername}>{post.author.username}</Text>
            <Text style={styles.captionText}>{post.caption}</Text>
          </View>
        )}

        {post.comments > 0 && (
          <TouchableOpacity onPress={() => setShowComments(true)}>
            <Text style={styles.commentsText}>
              View all {post.comments} comments
            </Text>
          </TouchableOpacity>
        )}

        <Text style={styles.timeAgo}>
          {formatDistanceToNow(post._creationTime, { addSuffix: true })}
        </Text>
      </View>
      {/* 
      <CommentsModal
        postId={post._id}
        visible={showComments}
        onClose={() => setShowComments(false)}
      /> */}
    </View>
  );
}
