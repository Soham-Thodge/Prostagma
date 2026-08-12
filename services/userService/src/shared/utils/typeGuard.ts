export const getString = (value: unknown): string => {
    if (typeof value !== "string") {
        throw new Error("Expected string");
    }
    return value;
}