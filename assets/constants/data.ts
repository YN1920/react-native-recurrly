import { icons } from "./icons";

// TABS
export const tabs = [
    { name: "index", title: "Home", icon: icons.home },
    { name: "subscriptions", title: "Subscriptions", icon: icons.wallet },
    { name: "insights", title: "Insights", icon: icons.activity },
    { name: "settings", title: "Settings", icon: icons.setting },
];

// USER
export const HOME_USER = {
    name: "Yahaya Nazir",
};

// BALANCE
export const HOME_BALANCE = {
    amount: 3570.33,
    nextRenewalDate: "2026-03-18T09:00:00.000Z",
};

// UPCOMING
export const UPCOMING_SUBSCRIPTIONS = [
    {
        id: "spotify",
        icon: icons.spotify,
        name: "Spotify",
        price: 5.99,
        currency: "USD",
        daysLeft: 6,
    },
    {
        id: "notion",
        icon: icons.notion,
        name: "Notion",
        price: 4.99,
        currency: "USD",
        daysLeft: 12,
    },
    {
        id: "figma",
        icon: icons.figma,
        name: "Figma",
        price: 12.0,
        currency: "USD",
        daysLeft: 8,
    },
];

// MAIN SUBSCRIPTIONS
export const HOME_SUBSCRIPTIONS = [
    {
        id: "adobe-creative-cloud",
        icon: icons.adobe,
        name: "Adobe Creative Cloud",
        plan: "Teams Plan",
        category: "Design",
        paymentMethod: "Visa ending in 7629",
        status: "active",
        startDate: "2026-01-20T11:00:00.000Z",
        price: 77.49,
        currency: "USD",
        billing: "Monthly",
        renewalDate: "2026-02-20T11:00:00.000Z",
        color: "#F4C542", // yellow
    },

    {
        id: "github-pro",
        icon: icons.github,
        name: "GitHub Pro",
        plan: "Individual Plan",
        category: "Developer Tools",
        paymentMethod: "Visa ending in 1234",
        status: "active",
        startDate: "2026-04-01T10:00:00.000Z",
        price: 9.99,
        currency: "USD",
        billing: "Monthly",
        renewalDate: "2026-05-01T10:00:00.000Z",
        color: "#D9CFEA", // purple
    },

    {
        id: "claude-pro",
        icon: icons.claude,
        name: "Claude Pro",
        plan: "Professional Plan",
        category: "AI Tools",
        paymentMethod: "MasterCard ending in 5678",
        status: "active",
        startDate: "2026-03-15T09:30:00.000Z",
        price: 20.0,
        currency: "USD",
        billing: "Monthly",
        renewalDate: "2026-04-15T09:30:00.000Z",
        color: "#C9DAE6", // blue
    },

    {
        id: "canva-pro",
        icon: icons.canva,
        name: "Canva Pro",
        plan: "Business Plan",
        category: "Design",
        paymentMethod: "Visa ending in 9012",
        status: "active",
        startDate: "2026-02-20T14:00:00.000Z",
        price: 119.99,
        currency: "USD",
        billing: "Yearly",
        renewalDate: "2027-02-20T14:00:00.000Z",
        color: "#CFE8D6", // green
    },
];