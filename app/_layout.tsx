import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { SplashScreen, Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import "@/global.css";

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
    throw new Error("Add your Clerk Publishable Key to the .env file");
}

const clerkPublishableKey: string = publishableKey;

export default function RootLayout() {
    const [fontsLoaded, fontError] = useFonts({
        "sans-bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
        "sans-regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
        "sans-medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
        "sans-extrabold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
        "sans-light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
        "sans-semibold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    });

    useEffect(() => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync();
        }
    }, [fontError, fontsLoaded]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <ClerkProvider
                publishableKey={clerkPublishableKey}
                tokenCache={tokenCache}
            >
                <Stack screenOptions={{ headerShown: false }} />
            </ClerkProvider>
        </SafeAreaProvider>
    );
}
