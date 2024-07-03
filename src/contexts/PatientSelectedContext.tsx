import BaseContainerProps from "@/interface/IBaseContainerProps";
import { PatientResume } from "@/interface/IPatientResume"
import { createContext, useState } from "react";

type PatientSelectedContextType = {
    patient: PatientResume | null;
    setPatient: (patient: PatientResume) => void;
}

export const PatientSelectedContext = createContext<PatientSelectedContextType | null>(null);

export function PatientSelectedProvider({ children }: BaseContainerProps) {
    const [patient, setPatient] = useState(null);
    return (
        <PatientSelectedContext.Provider value={{patient, setPatient}} >
            {children}
        </PatientSelectedContext.Provider>
    )
}