import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { ListHeadingProps } from "@/type";

const ListHeading = ({ title, onPress }: ListHeadingProps) => { // 🔹 Destructure onPress here
    return (
        <View className="flex-row items-center justify-between px-5 mt-6 mb-3">

            {/* TITLE */}
            <Text className="text-xl font-sans-bold text-primary">
                {title}
            </Text>

            <TouchableOpacity
                onPress={onPress}
                className="px-4 py-2 rounded-full border border-black/20"
            >
                <Text className="text-sm font-sans-medium text-primary">
                    View all
                </Text>
            </TouchableOpacity>

        </View>
    );
};

export default ListHeading;