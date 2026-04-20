import type { ImageSourcePropType } from "react-native";

// 🔹 Tab Definitions
export interface TabItem {
    name: string;
    title: string;
    icon: ImageSourcePropType;
}

export interface TabIconProps {
    focused: boolean;
    icon: ImageSourcePropType;
}

// 🔹 Subscription Definitions
export interface Subscription {
    id: string;
    icon: ImageSourcePropType;
    name: string;
    plan?: string;
    category?: string;
    paymentMethod?: string;
    status?: string; // Fixed typo from 'staus'
    startDate: string; // Fixed typo from 'startDate'
    price: number;
    currency?: string;
    billing: string;
    renewalDate?: string; // Fixed casing for consistency
    color?: string;
}

export interface SubscriptionCardProps extends Omit<Subscription, "id"> {
    expanded: boolean;
    onPress: () => void;
    onCancelPress?: () => void;
    isCancelling?: boolean;
}

// 🔹 Upcoming Subscription Definitions
export interface UpcomingSubscription {
    id: string;
    icon: ImageSourcePropType;
    name: string;
    price: number;
    currency?: string; // Changed from number to string
    daysLeft: number;
}

export interface UpcomingSubscriptionCardProps
    extends Omit<UpcomingSubscription, "id"> {}

export type ListHeadingProps = {
    title: string;
    onPress?: () => void; // ✅ ADD THIS
};