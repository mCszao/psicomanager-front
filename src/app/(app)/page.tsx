import NextSessions from "@/components/next-sessions";
import Greeting from "@/components/greeting";
import metadataFactory from "@/util/metadataFactory";
export const metadata = metadataFactory("Página Inicial");

export default function Home() {
  return (
    <div className="flex flex-col h-screen px-8 pt-8 pb-6 overflow-hidden">
      <div className="shrink-0 mb-5">
        <Greeting />
        <h2 className="text-3xl font-semibold text-royalBlue mt-2">Próximas Consultas</h2>
      </div>
      <div className="flex-1 min-h-0">
        <NextSessions views={['month', 'week']} />
      </div>
    </div>
  );
}
