import NextSessions from "@/components/next-sessions";
import metadataFactory from "@/util/metadataFactory";
export const metadata = metadataFactory("Agendamentos");

export default function SchedulesPage() {
    return (
        <div className="flex flex-col h-screen px-8 pt-8 pb-6 overflow-hidden gap-5">
            <div className="shrink-0 rounded-2xl border border-border-default shadow-lg bg-surface-default px-5 py-4">
                <h2 className="text-3xl font-semibold text-royalBlue">Agendamentos</h2>
            </div>
            <div className="flex-1 min-h-0 rounded-2xl border border-border-default shadow-lg bg-surface-default p-5 overflow-hidden">
                <NextSessions views={['list']} />
            </div>
        </div>
    );
}
