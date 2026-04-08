import { Tabs } from "expo-router";
import { View, Image } from "react-native";
import { tabs } from "@/assets/constants/data";
import { colors, components } from "@/assets/constants/theme";
import { TabIconProps } from "@/type";
import clsx from "clsx";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const tabBar = components.tabBar;

const TabIcon = ({ focused, icon }: TabIconProps) => {
    return (
        <View className="items-center justify-center">
            <View
                className={clsx(
                    "items-center justify-center rounded-full",
                    focused ? "bg-[#ea7a53] w-11 h-11" : "w-11 h-11"
                )}
            >
                <Image
                    source={icon}
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: focused ? "#fff" : "#9ca3af", // gray when inactive
                    }}
                />
            </View>
        </View>
    );
};

const TabLayout = () => {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: "absolute",
                    bottom: Math.max(insets.bottom, tabBar.horizontalInset),
                    height: tabBar.height,
                    marginHorizontal: tabBar.horizontalInset,
                    borderRadius: tabBar.radius,
                    backgroundColor: colors.primary,
                    borderTopWidth: 0,
                    elevation: 0,
                },
                tabBarItemStyle: {
                    paddingVertical:
                        tabBar.height / 2 - tabBar.iconFrame / 1.6,
                },
                tabBarIconStyle: {
                    width: tabBar.iconFrame,
                    height: tabBar.iconFrame,
                    alignItems: "center",
                },
            }}
        >
            {tabs.map((tab) => (
                <Tabs.Screen
                    key={tab.name}
                    name={tab.name}
                    options={{
                        title: tab.title,
                        tabBarIcon: ({ focused }) => (
                            <TabIcon focused={focused} icon={tab.icon} />
                        ),
                    }}
                />
            ))}
        </Tabs>
    );
};

export default TabLayout;