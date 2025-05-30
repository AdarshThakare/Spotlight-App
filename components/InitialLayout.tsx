import { useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { Loader } from "./Loader";

// handle authentication and navigation

export default function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthPage = segments[0] === "(auth)";

    if (isSignedIn && inAuthPage) {
      router.replace("/(tabs)");
    }
    if (!isSignedIn && !inAuthPage) {
      router.replace("/(auth)/sign-in");
    }
  }, [isLoaded, isSignedIn, segments]);

  if (!isLoaded) return <Loader />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
