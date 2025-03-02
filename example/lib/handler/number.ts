export function isEqualNumber(a: number, b: number): boolean {
    if(Number.isSafeInteger(a) && Number.isSafeInteger(b)){
        return a === b;
    }
    return Math.abs(a - b) <= 1e-6 * Math.max(Math.abs(a), Math.abs(b));
}