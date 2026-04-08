import { icons } from "./icons";
import type { ImageSourcePropType } from "react-native";

export type TabItem = {
    name: string;
    title: string;
    icon: ImageSourcePropType;
};

export const tabs = [
    { name: "index", title: "Home", icon: icons.home },
    { name: "subscriptions", title: "Subscriptions", icon: icons.wallet },
    { name: "insights", title: "Insights", icon: icons.activity },
    { name: "settings", title: "Settings", icon: icons.setting },
];