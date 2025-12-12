export const atou = (value: string) => {
    return value.replaceAll("+", "-")
                .replaceAll("/", "_")
                .replaceAll("=", "");
}

export const utoa = (value: string) => {
    value = value.replaceAll("-", "+").replaceAll("_", "/");
    value += "=".repeat((4 - (value.length % 4)) % 4); // Padding.
    return value;
}