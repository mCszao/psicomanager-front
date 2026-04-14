import { useEffect, useState } from "react";
import { getPatients } from "@/services/api";
import { PatientResume } from "@/interface/IPatientResume";
import { useFilter } from "@/hooks/useFilter";
import BaseResponse from "@/interface/IBaseResponse";

interface UsePatientListProps {
    onSelect: (patient: PatientResume) => void;
    onClose: () => void;
}

export function usePatientList({ onSelect, onClose }: UsePatientListProps) {
    const [patients, setPatients] = useState<PatientResume[] | null>(null);
    const [search, setSearch]     = useState<string>('');

    useEffect(() => {
        async function fetchData() {
            const { object } = await getPatients() as BaseResponse<PatientResume[]>;
            setPatients(object);
        }
        fetchData();
    }, []);

    const filteredPatients = useFilter(search, patients, 'name');
    const list             = search.length === 0 ? patients : filteredPatients;

    function selectPatient(patient: PatientResume) {
        onSelect(patient);
        onClose();
    }

    return { list, search, setSearch, selectPatient };
}
