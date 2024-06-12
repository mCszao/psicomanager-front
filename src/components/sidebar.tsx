'use client'
import { UsersRound, Home, BookOpenCheck, CalendarPlus, SmilePlus } from "lucide-react";
import Link from "next/link";

export default function SideLinks() {
    function handleAddSession(){
      alert("Clicou para adicionar uma nova sessão")
    }

    function handleAddPatient(){
      alert("Clicou para adicionar novo paciente")
    }
    return (
        <section className="bg-royalBlue p-2 flex flex-col fixed m-r-5 w-20 h-full">
          <button onClick={handleAddSession}
          className="rounded-lg border border-transparent transition-colors p-5 hover:border-gray-300"
          >
            <CalendarPlus color="white"/>
          </button>
          <button onClick={handleAddPatient}
          className="rounded-lg border border-transparent transition-colors p-5 hover:border-gray-300"
          >
            <SmilePlus color="white"/>
          </button>
          <Link href={"/"}
          className="rounded-lg border border-transparent transition-colors p-5 hover:border-gray-300"
          >
            <Home color="white"/>
          </Link>
          <Link href={"/patients"}
          className="rounded-lg border border-transparent transition-colors p-5 hover:border-gray-300"
          >
            <UsersRound color="white"/>
          </Link>
          <Link href={"/reports"}
          className="rounded-lg border border-transparent transition-colors p-5 hover:border-gray-300"
          >
            <BookOpenCheck color="white"/>
          </Link>
      </section>
    )
}