import { parseDate, formatTime, MONTHS } from "@/util/calendarUtils";

export function formatClosedDate(dateStr: string): string {
    const d = parseDate(dateStr);
    return `${d.getDate()} de ${MONTHS[d.getMonth()]} de ${d.getFullYear()} às ${formatTime(d)}`;
}
