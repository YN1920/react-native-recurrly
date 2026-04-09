/// <reference types="react-native" />

declare module "*.png" {
    const value: import("react-native").ImageSourcePropType;
    export default value;
}

declare module "*.jpg" {
    const value: import("react-native").ImageSourcePropType;
    export default value;
}

declare module "*.jpeg" {
    const value: import("react-native").ImageSourcePropType;
    export default value;
}

declare module "*.gif" {
    const value: import("react-native").ImageSourcePropType;
    export default value;
}

// ⚠️ SVG is different (see note below)
declare module "*.svg" {
    const value: any;
    export default value;
}

export {};