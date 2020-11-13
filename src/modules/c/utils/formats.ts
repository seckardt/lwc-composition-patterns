export function formatCurrency(
    value = 0,
    currency = 'USD',
    options?: Intl.NumberFormatOptions
): string {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        ...(options || {}),
        style: 'currency',
        currency: currency,
    }).format(value);
}

export function formatDate(
    value: Date | null = null,
    options?: Intl.DateTimeFormatOptions
): string {
    return value
        ? new Intl.DateTimeFormat('en-US', options).format(value)
        : '--';
}
