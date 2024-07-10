import { getPatients } from "@/services/api";
import Dialog from "./ui/dialog";
import DialogHeader from "./ui/dialog-header";
import Input from "./ui/input";
import BaseResponse from "@/interface/IBaseResponse";
import { X } from "lucide-react";
import { PatientResume } from "@/interface/IPatientResume";
import { useEffect, useState, useContext } from "react";
import { PatientSelectedContext } from "@/contexts/PatientSelectedContext";
import { useFilter } from "@/hooks/useFilter";

type Props = {
    externalFunc: () => void;
}

export default function DialogPatientList({ externalFunc }: Props) {
    const [patients, setPatients]= useState<PatientResume[] | null>(null);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        async function fetchData() {
            const { success, object } = await getPatients() as BaseResponse<PatientResume[]>;
            setPatients(object);
        }
        fetchData();
      }, [])
      const patientSelectedContext = useContext(PatientSelectedContext);
      const filteredPatients = useFilter(search, patients, 'name');
      function selectPatient(patient: PatientResume) {
        patientSelectedContext?.setPatient(patient);
      }

    return (
        <Dialog>
            <DialogHeader title="Pesquisar paciente" textButton={<X/>} functionButton={externalFunc}/>
            <Input placeholder="Digite o nome do paciente" onChange={(e) => setSearch(e.target.value) }/>
            <nav className="p-4">
                {search.length === 0 ? 
                    patients?.map((patient) : any => (
                    <abbr onClick={() => selectPatient(patient)} key={patient.id} title={patient.email} className="p-5 block leading-tight transition-all outline-none  text-xl text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-900 focus:bg-blue-gray-500 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 group bg-white hover:bg-royalBlue shadow-md  rounded-xl bg-clip-border cursor-pointer">
                    {patient.name}
                    </abbr>
                ))
                :
                    filteredPatients?.map((patient) : any => (
                    <abbr onClick={() => selectPatient(patient)} key={patient.id} title={patient.email} className="p-5 block leading-tight transition-all outline-none  text-xl text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-900 focus:bg-blue-gray-500 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 group bg-white hover:bg-royalBlue shadow-md  rounded-xl bg-clip-border cursor-pointer">
                    {patient.name}
                    </abbr>
                ))
            }
                
            </nav>
        </Dialog>
    )
}