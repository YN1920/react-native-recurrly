import { View, Text, Image, Pressable, LayoutAnimation, Platform, UIManager } from "react-native";
import React from "react";
import { SubscriptionCardProps } from "@/type";
import { formatCurrency, formatStatusLabel, formatSubscriptionDateTime } from "@/lib/utils";
import clsx from "clsx";

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
                    <Text className="text-sm">
                        <Text className="font-sans-semibold">Payment: </Text>
                        {paymentMethod}
                    </Text>

                    <Text className="text-sm">
                        <Text className="font-sans-semibold">Category: </Text>
                        {category}
                    </Text>

                    <Text className="text-sm">
                        <Text className="font-sans-semibold">Started: </Text>
                        {formatSubscriptionDateTime(startDate)}
                    </Text>

                    <Text className="text-sm">
                        <Text className="font-sans-semibold">Renewal: </Text>
                        {formatSubscriptionDateTime(renewalDate)}
                    </Text>

                    <Text className="text-sm">
                        <Text className="font-sans-semibold">Status: </Text>
                        {formatStatusLabel(status)}
                    </Text>
                </View>
            )}
        </Pressable>
    );
};

export default SubscriptionCard;