import { View, Text } from 'react-native';
import { Link } from "expo-router";

export default function SignUp() {
    return (
        <View className="flex-1 items-center justify-center bg-background">
            <Text>Sign Up</Text>

            <Link href="/(auth)/sign-in" asChild>
                <Text className="text-blue-500 mt-4">
                    Sign In
                </Text>
            </Link>
        </View>
    );
}