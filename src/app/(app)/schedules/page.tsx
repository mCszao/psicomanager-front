import NextSessions from "@/components/next-sessions";
import metadataFactory from "@/util/metadataFactory";
export const metadata = metadataFactory("Agendamentos");

export default function SchedulesPage() {
    return (
        <main className="w-full pt-10 pl-10">
            <h2 className="text-3xl font-semibold text-royalBlue px-14">Agendamentos</h2>
            <NextSessions />
        </main>
    );
}
