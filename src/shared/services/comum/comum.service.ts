export function formataCep(value: string): string {
    const onlyDigits = value.replace(/\D/g, '');
    if (onlyDigits.length >= 8) {
        return `${onlyDigits.slice(0, 5)}-${onlyDigits.slice(5, 8)}`;
    }
    const formattedValue = onlyDigits.replace(/(\d{5})(\d{0,3})/, '$1-$2');
    return formattedValue;
}