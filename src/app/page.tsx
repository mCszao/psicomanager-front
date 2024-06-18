import NextSessions from "@/components/next-sessions";
import metadataFactory from "@/util/metadataFactory";
export const metadata = metadataFactory("Página Inicial");

export default function Home() {

  return (
    <main className="w-full pt-10 pl-24">
      <h2 className="text-3xl font-semibold text-royalBlue">Próximas Consultas</h2>
      <NextSessions/>
    </main>
  );
}
