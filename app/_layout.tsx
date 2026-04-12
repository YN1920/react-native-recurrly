import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import "@/global.css";

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        "sans-bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
        "sans-regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
        "sans-medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
        "sans-extrabold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
        "sans-light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
        "sans-semibold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    });

    if (!fontsLoaded) return null;

    return (
        <SafeAreaProvider>
            <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaProvider>
    );
}