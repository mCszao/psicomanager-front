'use client'
import { UsersRound, Home, BookOpenCheck, CalendarPlus, SmilePlus } from "lucide-react";
import { useState } from "react";
import CreateSessionDialog from "./create-session-dialog";
import CreatePatientDialog from "./create-patient-dialog";
import SideButton from "./side-button";
import SideLink from "./side-link";

export default function SideLinks() {
    const [isOpenSession, setOpenSession] = useState(false);
    const [isOpenPatient, setOpenPatient] = useState(false);
    function handleAddSession(){
      setOpenSession(!isOpenSession);
      setOpenPatient(false);
    }

    function handleAddPatient(){
      setOpenPatient(!isOpenPatient);
      setOpenSession(false);
    }
    return (
        <section className="bg-royalBlue p-2 flex flex-col fixed m-r-5 w-20 h-full z-50">
            <SideButton icon={CalendarPlus} onClick={handleAddSession}/>
            <SideButton icon={SmilePlus} onClick={handleAddPatient}/>
            <SideLink path="/" icon={Home}/>
            <SideLink path="/patients" icon={UsersRound}/>
            <SideLink path="/reports" icon={BookOpenCheck}/>
            {isOpenSession && (
              <CreateSessionDialog externalFunc={handleAddSession}/>
            )}
            {isOpenPatient && (
              <CreatePatientDialog externalFunc={handleAddPatient}/>
            )}
        </section>
    )
}