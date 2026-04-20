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
    mode: "sign-in" | "sign-up";
    eyebrow?: string;
    title: string;
    subtitle: string;
    children: React.ReactNode;
};

export default function AuthScreen({
    mode,
    eyebrow,
    title,
    subtitle,
    children,
}: AuthScreenProps) {
    const hasHeaderContent = Boolean(eyebrow || title || subtitle);

    return (
        <SafeAreaView className="flex-1 bg-accent">
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    className="bg-background"
                    bounces={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <View className="flex-1 pb-6">
                        <View
                            className="overflow-hidden bg-accent px-6 pb-7 pt-5"
                            style={{
                                borderBottomLeftRadius: 28,
                                borderBottomRightRadius: 28,
                            }}
                        >
                            <View className="flex-row items-center gap-4">
                                <Image
                                    source={images.icon}
                                    className="h-14 w-14 rounded-2xl bg-card"
                                    resizeMode="contain"
                                />

                                <View className="flex-1">
                                    <Text className="font-sans-bold text-[26px] text-white">
                                        Velo
                                    </Text>
                                    <Text className="mt-1 font-sans-medium text-[14px] text-white/90">
                                        Smart Billing
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View className="items-center px-5">
                            <Text className="mt-7 text-center font-sans-extrabold text-[34px] leading-10 text-primary">
                                Get Started Now
                            </Text>
                            <Text className="mt-3 max-w-70 text-center font-sans-medium text-[15px] leading-6 text-primary/70">
                                Create an account or log in to explore about our app
                            </Text>
                        </View>

                        <View className="mx-5 mt-6 rounded-full bg-[#f3f2f8] p-1.5">
                            <View className="flex-row gap-2">
                                <Link href="/(auth)/sign-up" asChild>
                                    <Pressable
                                        className={[
                                            "min-h-12 flex-1 items-center justify-center rounded-full",
                                            mode === "sign-up" ? "bg-accent" : "bg-transparent",
                                        ].join(" ")}
                                    >
                                        <Text
                                            className={[
                                                "font-sans-semibold text-[15px]",
                                                mode === "sign-up" ? "text-white" : "text-primary",
                                            ].join(" ")}
                                        >
                                            Sign Up
                                        </Text>
                                    </Pressable>
                                </Link>

                                <Link href="/(auth)/sign-in" asChild>
                                    <Pressable
                                        className={[
                                            "min-h-12 flex-1 items-center justify-center rounded-full",
                                            mode === "sign-in" ? "bg-accent" : "bg-transparent",
                                        ].join(" ")}
                                    >
                                        <Text
                                            className={[
                                                "font-sans-semibold text-[15px]",
                                                mode === "sign-in" ? "text-white" : "text-primary",
                                            ].join(" ")}
                                        >
                                            Log In
                                        </Text>
                                    </Pressable>
                                </Link>
                            </View>
                        </View>

                        <View className="mx-5 mt-5 flex-1 rounded-4xl border border-border bg-card px-5 pb-5 pt-5">
                            {hasHeaderContent ? (
                                <View>
                                    {eyebrow ? (
                                        <Text className="text-center font-sans-semibold text-[13px] uppercase tracking-[1.8px] text-accent">
                                            {eyebrow}
                                        </Text>
                                    ) : null}
                                    {title ? (
                                        <Text className="mt-3 text-center font-sans-extrabold text-[30px] leading-9 text-primary">
                                            {title}
                                        </Text>
                                    ) : null}
                                    {subtitle ? (
                                        <Text className="mt-3 text-center font-sans-medium text-[15px] leading-6 text-primary/70">
                                            {subtitle}
                                        </Text>
                                    ) : null}
                                </View>
                            ) : null}

                            <View
                                className={[
                                    "rounded-3xl bg-background px-4 py-4",
                                    hasHeaderContent ? "mt-6" : "mt-0",
                                ].join(" ")}
                            >
                                {children}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}