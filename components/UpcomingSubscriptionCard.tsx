import { Text, View, Image } from "react-native";
import { UpcomingSubscription } from "@/type";
import { formatCurrency } from "@/lib/utils";

const UpcomingSubscriptionCard = ({
                                      name,
                                      price,
                                      daysLeft,
                                      icon,
                                      currency
                                  }: UpcomingSubscription) => {
    return (
        <View className="p-4 border-2 border-zinc-400 rounded-3xl w-40 gap-5">
            <View className="flex-row items-center justify-between">
                <View
                    style={{
                        backgroundColor: '#f6eecf', // Subtle cream background
                        padding: 6,                 // Space between icon and background edge
                        borderRadius: 12,           // Slightly rounded corners
                        alignItems: 'center',       // Center the icon horizontally
                        justifyContent: 'center'    // Center the icon vertically
                    }}
                >
                    <Image
                        source={icon}
                        style={{
                            width: 40, // Reduced from 45 to fit within the padded container
                            height: 40,
                            resizeMode: 'contain',
                            tintColor: '#081126',
                        }}
                    />
                </View>

                <View className="items-end">
                    <Text className="text-lg font-sans-bold text-primary">
                        {formatCurrency(price, currency)}
                    </Text>

                    <Text className="text-sm font-sans text-zinc-500" numberOfLines={1}>
                        {daysLeft > 1
                            ? `${daysLeft} days left`
                            : "Last day"}
                    </Text>
                </View>
            </View>

            <Text className="text-lg font-sans-semibold text-primary mt-1" numberOfLines={1}>
                {name}
            </Text>
        </View>
    );
};

export default UpcomingSubscriptionCard;