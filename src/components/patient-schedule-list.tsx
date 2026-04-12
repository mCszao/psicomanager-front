import { CalendarDays } from "lucide-react";

interface PatientScheduleListProps {
    children: React.ReactNode;
}

export default function PatientScheduleList({ children }: PatientScheduleListProps) {
    return (
        <section className="flex flex-col rounded-2xl border border-border-default shadow-lg bg-surface-default overflow-hidden">
            <div className="flex items-center px-5 py-4 border-b border-border-default bg-surface-raised shrink-0">
                <h2 className="flex items-center gap-2 text-base font-semibold text-content-primary">
                    <CalendarDays size={18} /> Acompanhamentos
                </h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
                {children}
            </div>
        </section>
    );
}
