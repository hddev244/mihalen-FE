
export function formatCurrency(value: number) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function formatDateTime(date: string ) {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
}