import { Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
    return (
        <SafeAreaView className="flex-1 bg-background p-5">
            <Text>Setting</Text>
        </SafeAreaView>
    );
}