import { useUser } from "@clerk/expo";
import { Text, View, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/assets/constants/images";
import {
    HOME_BALANCE,
    HOME_SUBSCRIPTIONS,
    UPCOMING_SUBSCRIPTIONS,
} from "@/assets/constants/data";
import { icons } from "@/assets/constants/icons";
import { formatCurrency } from "@/lib/utils";
import dayjs from "dayjs";
import UpcomingSubscriptionCard from "@/components/UpcomingSubscriptionCard";
import ListHeading from "@/components/List-Heading";
import SubscriptionCard from "@/components/SubscriptionCard";
import { useState } from "react";

export default function App() {
    const { user } = useUser();
    const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<string | null>(null);
    const displayName =
        user?.fullName ||
        user?.firstName ||
        user?.primaryEmailAddress?.emailAddress ||
        "Welcome";
    const avatarSource = user?.imageUrl
        ? { uri: user.imageUrl }
        : images.avatar;

    return (
        <SafeAreaView className="flex-1 bg-background">
            <FlatList
                data={HOME_SUBSCRIPTIONS}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <>
                        <View className="px-5 pt-5">
                            <View className="mb-8 flex-row items-center justify-between">
                                <View className="flex-1 flex-row items-center">
                                    <Image
                                        source={avatarSource}
                                        className="h-12 w-12 rounded-full"
                                    />
                                    <Text className="ml-4 text-2xl font-sans-bold text-primary">
                                        {displayName}
                                    </Text>
                                </View>

                                <Image
                                    source={icons.add}
                                    style={{
                                        width: 24,
                                        height: 24,
                                        tintColor: "#081126",
                                    }}
                                />
                            </View>

                            <View
                                className="my-3 min-h-40 justify-between gap-5 bg-accent p-6"
                                style={{
                                    borderBottomLeftRadius: 40,
                                    borderTopRightRadius: 40,
                                }}
                            >
                                <Text className="text-xl font-sans-semibold text-white/80">
                                    Total Balance
                                </Text>

                                <View className="flex-row items-end justify-between">
                                    <Text className="text-4xl font-sans-extrabold text-white">
                                        {formatCurrency(HOME_BALANCE.amount)}
                                    </Text>

                                    <Text className="mb-1 text-lg font-sans-medium text-white">
                                        {dayjs(HOME_BALANCE.nextRenewalDate).format("MM/DD")}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View className="mb-6">
                            <ListHeading
                                title="Upcoming"
                                onPress={() => console.log("View all upcoming")}
                            />

                            <FlatList
                                data={UPCOMING_SUBSCRIPTIONS}
                                keyExtractor={(item) => item.id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                nestedScrollEnabled
                                directionalLockEnabled
                                renderItem={({ item }) => (
                                    <UpcomingSubscriptionCard {...item} />
                                )}
                                contentContainerStyle={{
                                    paddingHorizontal: 20,
                                    gap: 12,
                                }}
                            />
                        </View>

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
                    <Text className="mt-10 text-center text-gray-500">
                        No subscriptions yet.
                    </Text>
                }
                contentContainerStyle={{
                    paddingBottom: 120,
                }}
                extraData={expandedSubscriptionId}
            />
        </SafeAreaView>
    );
}
