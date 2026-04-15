import AuthInput from "@/components/auth/AuthInput";
import AuthScreen from "@/components/auth/AuthScreen";
import {
    AuthFieldErrors,
    getAuthErrors,
    validateEmail,
    validatePassword,
    validateVerificationCode,
} from "@/lib/auth";
import { useSignUp } from "@clerk/expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

export default function SignUp() {
    const { fetchStatus, signUp } = useSignUp();
    const router = useRouter();
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [errors, setErrors] = useState<AuthFieldErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const requiresVerification =
        signUp?.status === "missing_requirements" &&
        signUp.unverifiedFields.includes("email_address") &&
        signUp.missingFields.length === 0;

    const setFieldError = (field: keyof AuthFieldErrors, value?: string) => {
        setErrors((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const finalizeSignUp = async () => {
        await signUp.finalize({
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
            password: validatePassword(password, { signUp: true }),
        };

        setErrors(nextErrors);

        if (nextErrors.email || nextErrors.password) {
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await signUp.password({
                emailAddress: emailAddress.trim(),
                password,
            });

            if (result.error) {
                setErrors(getAuthErrors(result.error));
                return;
            }

            await signUp.verifications.sendEmailCode();
            setErrors({});
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
            await signUp.verifications.verifyEmailCode({ code: code.trim() });

            if (signUp.status === "complete") {
                await finalizeSignUp();
                return;
            }

            setErrors({
                form: "We couldn't finish creating your account. Request a new code and try again.",
            });
        } catch (error) {
            setErrors(getAuthErrors(error));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthScreen
            mode="sign-up"
            eyebrow={requiresVerification ? "Verify your email" : undefined}
            title={requiresVerification ? "Finish your sign up" : ""}
            subtitle={
                requiresVerification
                    ? "Confirm your email to activate your account and keep your billing data protected."
                    : ""
            }
        >
            <View className="gap-5">
                {requiresVerification ? (
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
                        ) : (
                            <Text className="text-center font-sans-medium text-[13px] leading-5 text-primary/55">
                                We sent a verification email to {emailAddress.trim()}.
                            </Text>
                        )}

                        <Pressable
                            className="mt-1 min-h-12 items-center justify-center rounded-[18px] bg-accent"
                            onPress={handleVerify}
                            disabled={isSubmitting || fetchStatus === "fetching"}
                        >
                            {isSubmitting ? (
                                <ActivityIndicator color="#ffffff" />
                            ) : (
                                <Text className="font-sans-bold text-[15px] text-white">
                                    Verify account
                                </Text>
                            )}
                        </Pressable>

                        <Pressable
                            className="items-center justify-center py-2"
                            onPress={() => signUp.verifications.sendEmailCode()}
                            disabled={isSubmitting || fetchStatus === "fetching"}
                        >
                            <Text className="font-sans-semibold text-[14px] text-accent">
                                Send a new code
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
                            placeholder="Create a password"
                            secureTextEntry
                            autoCapitalize="none"
                            autoComplete="new-password"
                            textContentType="newPassword"
                            error={errors.password}
                        />

                        {errors.form ? (
                            <Text className="font-sans-medium text-[13px] leading-5 text-destructive">
                                {errors.form}
                            </Text>
                        ) : (
                            <Text className="font-sans-medium text-[13px] leading-5 text-primary/55">
                                Use at least 8 characters. Email verification is required before access.
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
                                    Create account
                                </Text>
                            )}
                        </Pressable>
                    </>
                )}

                <View nativeID="clerk-captcha" />
            </View>
        </AuthScreen>
    );
}
