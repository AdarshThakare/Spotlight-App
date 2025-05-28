import { useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

// handle authentication and navigation

export default function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthPage = segments[0] === "(auth)";

    if (!isSignedIn && !inAuthPage) {
      router.replace("/(auth)/sign-in");
    }
    if (isSignedIn && inAuthPage) {
      router.replace("/(tabs)");
    }
  }, [isLoaded, isSignedIn, segments]);

  if (!isLoaded) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
