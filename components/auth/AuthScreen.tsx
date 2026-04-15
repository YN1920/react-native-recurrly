import images from "@/assets/constants/images";
import { Link } from "expo-router";
import React from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type AuthScreenProps = {
    eyebrow: string;
    title: string;
    subtitle: string;
    alternateLabel: string;
    alternateHref: "/(auth)/sign-in" | "/(auth)/sign-up";
    alternateCta: string;
    children: React.ReactNode;
};

export default function AuthScreen({
    eyebrow,
    title,
    subtitle,
    alternateLabel,
    alternateHref,
    alternateCta,
    children,
}: AuthScreenProps) {
    return (
        <SafeAreaView className="flex-1 bg-background">
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    bounces={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <View className="flex-1 px-5 pb-8">
                        <View
                            className="overflow-hidden bg-accent px-6 pb-8 pt-6"
                            style={{
                                borderBottomLeftRadius: 40,
                                borderBottomRightRadius: 28,
                            }}
                        >
                            <View className="flex-row items-center gap-4">
                                <Image
                                    source={images.icon}
                                    className="h-16 w-16 rounded-[20px] bg-card"
                                    resizeMode="contain"
                                />

                                <View className="flex-1">
                                    <Text className="font-sans-bold text-[24px] text-white">
                                        Velo
                                    </Text>
                                    <Text className="mt-1 font-sans-medium text-[14px] text-white/85">
                                        Stay ahead of every renewal with one secure account.
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View className="-mt-4 flex-1 rounded-4xl border border-border bg-background px-6 pb-8 pt-7">
                            <Text className="text-center font-sans-semibold text-[13px] uppercase tracking-[1.8px] text-accent">
                                {eyebrow}
                            </Text>
                            <Text className="mt-3 text-center font-sans-extrabold text-[32px] leading-9.5 text-primary">
                                {title}
                            </Text>
                            <Text className="mt-3 text-center font-sans-medium text-[15px] leading-6 text-primary/70">
                                {subtitle}
                            </Text>

                            <View className="mt-8 rounded-[28px] border border-border bg-card px-5 py-5">
                                {children}
                            </View>

                            <View className="mt-6 flex-row items-center justify-center gap-1">
                                <Text className="font-sans-medium text-[14px] text-primary/70">
                                    {alternateLabel}
                                </Text>
                                <Link href={alternateHref} asChild>
                                    <Pressable hitSlop={8}>
                                        <Text className="font-sans-bold text-[14px] text-accent">
                                            {alternateCta}
                                        </Text>
                                    </Pressable>
                                </Link>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
