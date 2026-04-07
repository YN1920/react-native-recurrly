import { View, Text } from 'react-native';
import { Link } from "expo-router";

export default function Subscriptions() {
    return (
        <View className="flex-1 items-center justify-center bg-background">
            <Text>Subscriptions</Text>

            {/*<Link href="/(auth)/sign-up" asChild>*/}
            {/*    <Text className="text-blue-500 mt-4">*/}
            {/*        Create Account*/}
            {/*    </Text>*/}
            {/*</Link>*/}
        </View>
    );
}