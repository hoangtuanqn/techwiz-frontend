// Check độ mạnh mật khẩu
import zxcvbn from "zxcvbn";

export function getPasswordStrength(password: string) {
    const result = zxcvbn(password);
    const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];

    return {
        score: result.score,
        strengthPercent: result.score * 25,
        label: labels[result.score],
        suggestions: result.feedback.suggestions,
    };
}
