import { COLORS } from "../constants/theme";

import { StatusBar } from "react-native";

import ClerkAndConvexProvider from "../components/ClerkAndConvexProvider";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import InitialLayout from "../components/InitialLayout";

export default function RootLayout() {
  return (
    <ClerkAndConvexProvider>
      <SafeAreaProvider>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: "black" }}
          edges={["top", "left", "right"]}
        >
          <InitialLayout />
          <StatusBar
            barStyle="light-content"
            backgroundColor={COLORS.background}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </ClerkAndConvexProvider>
  );
}
