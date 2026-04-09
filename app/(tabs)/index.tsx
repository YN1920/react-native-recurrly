import { Text, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 p-5 bg-background">
            <Text className="text-xl font-bold text-success">
                Native App!
            </Text>

            <Pressable
                onPress={() => router.push('/onboarding')}
                className="mt-4 rounded bg-primary p-4"
            >
                <Text className="text-white">Go to Onboarding</Text>
            </Pressable>

            <Pressable
                onPress={() => router.push('/(auth)/sign-in')}
                className="mt-4 rounded bg-primary p-4"
            >
                <Text className="text-white">Go to Sign In</Text>
            </Pressable>

            <Pressable
                onPress={() => router.push('/(auth)/sign-up')}
                className="mt-4 rounded bg-primary p-4"
            >
                <Text className="text-white">Go to Sign Up</Text>
            </Pressable>

            <Pressable
                onPress={() => router.push('/subscriptions/spotify')}
            >
                <Text>Spotify Subscriptions</Text>
            </Pressable>

            <Link
                href={{
                    pathname: "/subscriptions/[id]",
                    params: { id: "claude" },
                }}
                asChild
            >
                <Pressable>
                    <Text>
                        Claude Max Subscriptions
                    </Text>
                </Pressable>
            </Link>
        </SafeAreaView>
    );
}