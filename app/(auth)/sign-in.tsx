import AuthInput from "@/components/auth/AuthInput";
import AuthScreen from "@/components/auth/AuthScreen";
import {
    AuthFieldErrors,
    getAuthErrors,
    validateEmail,
    validatePassword,
    validateVerificationCode,
} from "@/lib/auth";
import { useSignIn } from "@clerk/expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

export default function SignIn() {
    const { fetchStatus, signIn } = useSignIn();
    const router = useRouter();
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [errors, setErrors] = useState<AuthFieldErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const needsEmailCode = signIn?.status === "needs_client_trust";

    const setFieldError = (field: keyof AuthFieldErrors, value?: string) => {
        setErrors((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const finalizeSignIn = async () => {
        await signIn.finalize({
            navigate: ({ session }) => {
                if (session?.currentTask) {
                    return;
                }

                router.replace("/(tabs)");
            },
        });
    };

    const handleSubmit = async () => {
        const nextErrors: AuthFieldErrors = {
            email: validateEmail(emailAddress),
            password: validatePassword(password),
        };

        setErrors(nextErrors);

        if (nextErrors.email || nextErrors.password) {
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await signIn.password({
                emailAddress: emailAddress.trim(),
                password,
            });

            if (result.error) {
                setErrors(getAuthErrors(result.error));
                return;
            }

            if (signIn.status === "complete") {
                await finalizeSignIn();
                return;
            }

            if (signIn.status === "needs_client_trust") {
                await signIn.mfa.sendEmailCode();
                setErrors({});
                return;
            }

            setErrors({
                form: "We couldn't finish signing you in. Please try again.",
            });
        } catch (error) {
            setErrors(getAuthErrors(error));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleVerify = async () => {
        const codeError = validateVerificationCode(code);

        setErrors({ code: codeError });

        if (codeError) {
            return;
        }

        setIsSubmitting(true);

        try {
            await signIn.mfa.verifyEmailCode({ code: code.trim() });

            if (signIn.status === "complete") {
                await finalizeSignIn();
                return;
            }

            setErrors({
                form: "Verification is still pending. Request a new code and try again.",
            });
        } catch (error) {
            setErrors(getAuthErrors(error));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthScreen
            mode="sign-in"
            eyebrow={needsEmailCode ? "Verify" : undefined}
            title={needsEmailCode ? "Check your inbox" : ""}
            subtitle={
                needsEmailCode
                    ? "Enter the 6-digit code we emailed you to finish signing in securely."
                    : ""
            }
        >
            <View className="gap-5">
                {needsEmailCode ? (
                    <>
                        <AuthInput
                            label="Verification code"
                            labelClassName="text-center"
                            value={code}
                            onChangeText={(value) => {
                                setCode(value);
                                setFieldError("code");
                                setFieldError("form");
                            }}
                            placeholder="Enter your 6-digit code"
                            keyboardType="number-pad"
                            maxLength={6}
                            error={errors.code}
                        />

                        {errors.form ? (
                            <Text className="font-sans-medium text-[13px] leading-5 text-destructive">
                                {errors.form}
                            </Text>
                        ) : null}

                        <Pressable
                            className="mt-1 min-h-12 items-center justify-center rounded-[18px] bg-accent"
                            onPress={handleVerify}
                            disabled={isSubmitting || fetchStatus === "fetching"}
                        >
                            {isSubmitting ? (
                                <ActivityIndicator color="#ffffff" />
                            ) : (
                                <Text className="font-sans-bold text-[15px] text-white">
                                    Verify and continue
                                </Text>
                            )}
                        </Pressable>

                        <Pressable
                            className="items-center justify-center py-2"
                            onPress={() => signIn.mfa.sendEmailCode()}
                            disabled={isSubmitting || fetchStatus === "fetching"}
                        >
                            <Text className="font-sans-semibold text-[14px] text-accent">
                                Send a fresh code
                            </Text>
                        </Pressable>
                    </>
                ) : (
                    <>
                        <AuthInput
                            label="Email"
                            value={emailAddress}
                            onChangeText={(value) => {
                                setEmailAddress(value);
                                setFieldError("email");
                                setFieldError("form");
                            }}
                            placeholder="Enter your email"
                            autoCapitalize="none"
                            autoComplete="email"
                            keyboardType="email-address"
                            textContentType="emailAddress"
                            error={errors.email}
                        />

                        <AuthInput
                            label="Password"
                            value={password}
                            onChangeText={(value) => {
                                setPassword(value);
                                setFieldError("password");
                                setFieldError("form");
                            }}
                            placeholder="Enter your password"
                            secureTextEntry
                            autoCapitalize="none"
                            autoComplete="password"
                            textContentType="password"
                            error={errors.password}
                        />

                        {errors.form ? (
                            <Text className="font-sans-medium text-[13px] leading-5 text-destructive">
                                {errors.form}
                            </Text>
                        ) : (
                            <Text className="font-sans-medium text-[13px] leading-5 text-primary/55">
                                Your session is stored securely on this device.
                            </Text>
                        )}

                        <Pressable
                            className="mt-1 min-h-12 items-center justify-center rounded-[18px] bg-accent"
                            onPress={handleSubmit}
                            disabled={isSubmitting || fetchStatus === "fetching"}
                        >
                            {isSubmitting ? (
                                <ActivityIndicator color="#ffffff" />
                            ) : (
                                <Text className="font-sans-bold text-[15px] text-white">
                                    Sign in
                                </Text>
                            )}
                        </Pressable>
                    </>
                )}
            </View>
        </AuthScreen>
    );
}