import { useClerk, useUser } from "@clerk/expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
    const { signOut } = useClerk();
    const { user } = useUser();
    const router = useRouter();
    const [isSigningOut, setIsSigningOut] = useState(false);

    const primaryEmail = user?.primaryEmailAddress?.emailAddress;

    const handleSignOut = async () => {
        setIsSigningOut(true);

        try {
            await signOut();
            router.replace("/(auth)/sign-in");
        } finally {
            setIsSigningOut(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-background p-5">
            <View className="gap-5">
                <View
                    className="rounded-[28px] bg-card p-6"
                    style={{ borderWidth: 1, borderColor: "rgba(0, 0, 0, 0.1)" }}
                >
                    <Text className="font-sans-extrabold text-[28px] text-primary">
                        Settings
                    </Text>
                    <Text className="mt-2 font-sans-medium text-[15px] leading-6 text-primary/70">
                        Signed in as {primaryEmail || user?.username || "your account"}.
                    </Text>
                </View>

                <View
                    className="rounded-[28px] bg-card p-6"
                    style={{ borderWidth: 1, borderColor: "rgba(0, 0, 0, 0.1)" }}
                >
                    <Text className="font-sans-bold text-[18px] text-primary">
                        Account security
                    </Text>
                    <Text className="mt-2 font-sans-medium text-[14px] leading-6 text-primary/65">
                        Your Clerk session is stored securely on device and can be revoked at any time.
                    </Text>

                    <Pressable
                        className="mt-6 min-h-14 items-center justify-center rounded-[18px] bg-primary"
                        onPress={handleSignOut}
                        disabled={isSigningOut}
                    >
                        {isSigningOut ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            <Text className="font-sans-bold text-[15px] text-white">
                                Sign out
                            </Text>
                        )}
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}
