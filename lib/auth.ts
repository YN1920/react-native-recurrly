import { isClerkAPIResponseError } from "@clerk/expo";

export type AuthFieldName = "email" | "password" | "code" | "form";

export type AuthFieldErrors = Partial<Record<AuthFieldName, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (value: string): string | undefined => {
    const email = value.trim();

    if (!email) {
        return "Email is required.";
    }

    if (!EMAIL_PATTERN.test(email)) {
        return "Enter a valid email address.";
    }
};

export const validatePassword = (
    value: string,
    options?: { signUp?: boolean }
): string | undefined => {
    if (!value) {
        return "Password is required.";
    }

    if (options?.signUp && value.length < 8) {
        return "Use at least 8 characters.";
    }
};

export const validateVerificationCode = (
    value: string
): string | undefined => {
    if (!value.trim()) {
        return "Verification code is required.";
    }

    if (!/^\d{6}$/.test(value.trim())) {
        return "Enter the 6-digit code from your email.";
    }
};

export const getAuthErrors = (error: unknown): AuthFieldErrors => {
    if (isClerkAPIResponseError(error)) {
        return error.errors.reduce<AuthFieldErrors>((accumulator, item) => {
            const message =
                item.longMessage ||
                item.message ||
                "Something went wrong. Please try again.";
            const param = String(
                item.meta?.paramName || item.meta?.name || ""
            ).toLowerCase();

            if (
                !accumulator.email &&
                (param.includes("email") || param === "identifier")
            ) {
                accumulator.email = message;
                return accumulator;
            }

            if (!accumulator.password && param.includes("password")) {
                accumulator.password = message;
                return accumulator;
            }

            if (!accumulator.code && param.includes("code")) {
                accumulator.code = message;
                return accumulator;
            }

            if (!accumulator.form) {
                accumulator.form = message;
            }

            return accumulator;
        }, {});
    }

    if (error instanceof Error) {
        return { form: error.message };
    }

    return { form: "Something went wrong. Please try again." };
};
