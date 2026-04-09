import { Text, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-background p-5">
            <Text className="text-5xl font-bold text-primary"> Home Page </Text>

            <Pressable
                onPress={() => router.push('/onboarding')}
                className="mt-4 rounded bg-primary p-4"
            >
                <Text className="text-white font-sans-bold">Go to Onboarding</Text>
            </Pressable>

            <Pressable
                onPress={() => router.push('/(auth)/sign-in')}
                className="mt-4 rounded bg-primary p-4"
            >
                <Text className="text-white font-sans-bold">Go to Sign In</Text>
            </Pressable>

            <Pressable
                onPress={() => router.push('/(auth)/sign-up')}
                className="mt-4 rounded bg-primary p-4"
            >
                <Text className="text-white font-sans-bold">Go to Sign Up</Text>
            </Pressable>

        </SafeAreaView>
    );
}