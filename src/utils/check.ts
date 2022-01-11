
export const IsNumeric = (value: string) => {
    return value && !isNaN(Number(value))
}