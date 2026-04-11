import NextSessions from "@/components/next-sessions";
import metadataFactory from "@/util/metadataFactory";
export const metadata = metadataFactory("Agendamentos");

export default function SchedulesPage() {
    return (
        <div className="flex flex-col h-screen px-8 pt-8 pb-6 overflow-hidden">
            <div className="shrink-0 mb-5">
                <h2 className="text-3xl font-semibold text-royalBlue">Agendamentos</h2>
            </div>
            <div className="flex-1 min-h-0">
                <NextSessions views={['list']} />
            </div>
        </div>
    );
}
