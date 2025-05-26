import { COLORS } from "@/constants/theme";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    "EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY is not defined in your .env.local file. Please add it to use Clerk authentication."
  );
}
export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <SafeAreaProvider>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: "black" }}
          edges={["top", "left", "right"]}
        >
          <Stack screenOptions={{ headerShown: false }} />
          <StatusBar
            barStyle="light-content"
            backgroundColor={COLORS.background}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </ClerkProvider>
  );
}
