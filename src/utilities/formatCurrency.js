const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
    maximumFractionDigits: 0,
})

const FRACTION_FORMATTER = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
})

export function formatCurrency(price) {
    return price = price % 1 === 0
        ? CURRENCY_FORMATTER.format(price)
        : FRACTION_FORMATTER.format(price);
}