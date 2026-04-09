import { View, Text } from 'react-native';
import { Link, useLocalSearchParams } from "expo-router";

export default function SubscriptionsDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <View className="flex-1 items-center justify-center bg-background">
            <Text>Subscriptions Details: {id}</Text>

            <Link href="/" asChild>
                <Text className="text-blue-500 mt-4">
                    Go Back
                </Text>
            </Link>
        </View>
    );
}