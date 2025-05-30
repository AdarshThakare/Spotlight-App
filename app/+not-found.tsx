import { COLORS } from "@/constants/theme";
import { ActivityIndicator, View } from "react-native";

const NotFoundScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
      }}
    >
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
};

export default NotFoundScreen;
