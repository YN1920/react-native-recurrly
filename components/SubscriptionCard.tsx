import { View, Text, Image, Pressable, LayoutAnimation, Platform, UIManager } from "react-native";
import React from "react";
import { SubscriptionCardProps } from "@/type";
import { formatCurrency, formatStatusLabel, formatSubscriptionDateTime } from "@/lib/utils";

// Enable animation for Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const EXPANDED_COLOR = "#A8D5BA"; // ✅ same color for all expanded cards

const SubscriptionCard = ({
                              name,
                              price,
                              currency,
                              icon,
                              billing,
                              color,
                              category,
                              plan,
                              renewalDate,
                              expanded,
                              onPress,
                              paymentMethod,
                              startDate,
                              status,
                          }: SubscriptionCardProps) => {

    const handlePress = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        onPress();
    };

    return (
        <Pressable
            onPress={handlePress}
            style={{
                backgroundColor: expanded ? EXPANDED_COLOR : color,
                borderRadius: 20,
                padding: 16,
                marginHorizontal: 20,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.08)",
            }}
        >
            {/* HEADER */}
            <View className="flex-row justify-between items-center">
                <View className="flex-row items-center gap-3 flex-1">
                    <View className="bg-white/40 p-2 rounded-xl">
                        <Image
                            source={icon}
                            style={{
                                width: 28,
                                height: 28,
                                resizeMode: "contain",
                                tintColor: "#081126",
                            }}
                        />
                    </View>

                    <View className="flex-1">
                        <Text numberOfLines={1} className="text-lg font-sans-bold text-primary">
                            {name}
                        </Text>

                        <Text className="text-sm text-primary/70">
                            {category || plan}
                        </Text>
                    </View>
                </View>

                <View className="items-end">
                    <Text className="text-lg font-sans-bold text-primary">
                        {formatCurrency(price, currency)}
                    </Text>
                    <Text className="text-sm text-primary/70">{billing}</Text>
                </View>
            </View>

            {/* EXPANDED CONTENT */}
            {expanded && (
                <View className="mt-4 gap-3">

                    {/* PAYMENT */}
                    {!!paymentMethod?.trim() && (
                        <Text className="text-sm">
                            <Text className="font-sans-semibold">Payment: </Text>
                            {paymentMethod.trim() || "Not provided"}
                        </Text>
                    )}

                    {/* CATEGORY / PLAN */}
                    {!!(category?.trim() || plan?.trim()) && (
                        <Text className="text-sm">
                            <Text className="font-sans-semibold">Category: </Text>
                            {(category?.trim() || plan?.trim()) ?? "Not provided"}
                        </Text>
                    )}

                    {/* START DATE */}
                    {!!startDate && (
                        <Text className="text-sm">
                            <Text className="font-sans-semibold">Started: </Text>
                            {startDate
                                ? formatSubscriptionDateTime(startDate)
                                : "Not provided"}
                        </Text>
                    )}

                    {/* RENEWAL */}
                    {!!renewalDate && (
                        <Text className="text-sm">
                            <Text className="font-sans-semibold">Renewal: </Text>
                            {renewalDate
                                ? formatSubscriptionDateTime(renewalDate)
                                : "Not provided"}
                        </Text>
                    )}

                    {/* STATUS */}
                    {!!status && (
                        <Text className="text-sm">
                            <Text className="font-sans-semibold">Status: </Text>
                            {status
                                ? formatStatusLabel(status)
                                : "Not provided"}
                        </Text>
                    )}
                </View>
            )}
        </Pressable>
    );
};

export default SubscriptionCard;
