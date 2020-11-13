export function coerceStringProperty(
    value: any,
    fallbackValue?: string
): string | undefined {
    const stringValue =
        // eslint-disable-next-line eqeqeq
        value == null || (typeof value == 'number' && value != +value)
            ? ''
            : value.toString();
    return typeof stringValue == 'string' && stringValue.length > 0
        ? stringValue
        : fallbackValue;
}

export function coerceNumberProperty(value: any, fallbackValue = 0): number {
    return !isNaN(parseFloat(value as any)) && !isNaN(Number(value))
        ? Number(value)
        : fallbackValue;
}
