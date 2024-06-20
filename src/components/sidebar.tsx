'use client'
import { UsersRound, Home, BookOpenCheck, CalendarPlus, SmilePlus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Dialog from "./ui/dialog";
import DialogHeader from "./ui/dialog-header";
import CreateSessionDialog from "./create-session-dialog";

export default function SideLinks() {
    const [isOpen, setOpen] = useState(true);
    function handleAddSession(){
      setOpen(!isOpen);
    }

    function handleAddPatient(){
      alert("Clicou para adicionar novo paciente")
    }
    return (
        <section className="bg-royalBlue p-2 flex flex-col fixed m-r-5 w-20 h-full z-50">
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
          {isOpen && (
            <CreateSessionDialog/>
          )}
      </section>
    )
}