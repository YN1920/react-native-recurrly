import { Text, TextInput, TextInputProps, View } from "react-native";

type AuthInputProps = TextInputProps & {
    label: string;
    error?: string;
    labelClassName?: string;
};

export default function AuthInput({
    label,
    error,
    className,
    labelClassName,
    placeholderTextColor = "rgba(8, 17, 38, 0.42)",
    ...props
}: AuthInputProps) {
    return (
        <View className="gap-2">
            <Text
                className={[
                    "font-sans-semibold text-[15px] text-primary",
                    labelClassName ?? "",
                ].join(" ")}
            >
                {label}
            </Text>

            <TextInput
                className={[
                    "rounded-[18px] border border-border bg-card px-4 py-3.5 font-sans-medium text-[15px] text-primary",
                    error ? "border-destructive" : "",
                    className ?? "",
                ].join(" ")}
                placeholderTextColor={placeholderTextColor}
                {...props}
            />

            {error ? (
                <Text className="font-sans-medium text-[12px] text-destructive">
                    {error}
                </Text>
            ) : null}
        </View>
    );
}
