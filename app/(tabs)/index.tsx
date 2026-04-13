import { Text, View, Image, FlatList, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/assets/constants/images";
import {
    HOME_BALANCE,
    HOME_SUBSCRIPTIONS,
    HOME_USER,
    UPCOMING_SUBSCRIPTIONS
} from "@/assets/constants/data";
import { icons } from "@/assets/constants/icons";
import { formatCurrency } from "@/lib/utils";
import dayjs from "dayjs";
import UpcomingSubscriptionCard from "@/components/UpcomingSubscriptionCard";
import ListHeading from "@/components/List-Heading";
import SubscriptionCard from "@/components/SubscriptionCard";
import { useState } from "react";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SIDE_INSET = 20;
const SPACING = 12;

export default function App() {
    const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<string | null>(null);

    return (
        <SafeAreaView className="flex-1 bg-background">
            <FlatList
                data={HOME_SUBSCRIPTIONS}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}

                ListHeaderComponent={
                    <>
                        {/* HEADER */}
                        <View className="px-5 pt-5">
                            <View className="flex-row items-center justify-between mb-8">
                                <View className="flex-row items-center flex-1">
                                    <Image
                                        source={images.avatar}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <Text className="ml-4 text-2xl font-sans-bold text-primary">
                                        {HOME_USER.name}
                                    </Text>
                                </View>

                                <Image
                                    source={icons.add}
                                    style={{
                                        width: 24,
                                        height: 24,
                                        tintColor: "#081126"
                                    }}
                                />
                            </View>

                            {/* BALANCE CARD */}
                            <View
                                className="my-3 min-h-40 justify-between gap-5 p-6 bg-accent"
                                style={{
                                    borderBottomLeftRadius: 40,
                                    borderTopRightRadius: 40
                                }}
                            >
                                <Text className="text-xl font-sans-semibold text-white/80">
                                    Total Balance
                                </Text>

                                <View className="flex-row items-end justify-between">
                                    <Text className="text-4xl font-sans-extrabold text-white">
                                        {formatCurrency(HOME_BALANCE.amount)}
                                    </Text>

                                    <Text className="text-lg font-sans-medium text-white mb-1">
                                        {dayjs(HOME_BALANCE.nextRenewalDate).format("MM/DD")}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* UPCOMING */}
                        <View className="mb-6">
                            <ListHeading
                                title="Upcoming"
                                onPress={() => console.log("View all upcoming")}
                            />

                            {/* ✅ CLIPPING CONTAINER */}
                            <View
                                style={{
                                    width: SCREEN_WIDTH - SIDE_INSET * 2,
                                    alignSelf: "center",
                                    overflow: "hidden",
                                }}
                            >
                                <FlatList
                                    data={UPCOMING_SUBSCRIPTIONS}
                                    keyExtractor={(item) => item.id}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <UpcomingSubscriptionCard {...item} />
                                    )}
                                    contentContainerStyle={{
                                        paddingHorizontal: SIDE_INSET,
                                        gap: SPACING,
                                    }}
                                    style={{
                                        marginHorizontal: -SIDE_INSET, // ✅ pushes cards outward
                                    }}
                                />
                            </View>
                        </View>

                        {/* ALL SUBSCRIPTIONS TITLE */}
                        <ListHeading title="All Subscriptions" />
                    </>
                }

                renderItem={({ item }) => (
                    <SubscriptionCard
                        {...item}
                        expanded={expandedSubscriptionId === item.id}
                        onPress={() =>
                            setExpandedSubscriptionId((currentId) =>
                                currentId === item.id ? null : item.id
                            )
                        }
                    />
                )}

                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}

                ListEmptyComponent={
                    <Text className="text-center mt-10 text-gray-500">
                        No subscriptions yet.
                    </Text>
                }

                contentContainerStyle={{
                    paddingBottom: 120
                }}

                extraData={expandedSubscriptionId}
            />
        </SafeAreaView>
    );
}