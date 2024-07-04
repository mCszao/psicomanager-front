
import { X, UserPlus } from "lucide-react";
import BaseForm from "./ui/base-form";
import ButtonSubmit from "./ui/button-submit";
import Dialog from "./ui/dialog";
import DialogHeader from "./ui/dialog-header";
import Input from "./ui/input";
import LabelContainer from "./ui/label-container";
import { useForm, SubmitHandler } from "react-hook-form";
import { registerSchedule } from "@/services/api";
import ScheduleDTO from "@/app/types/schedule.dto";
import { createScheduleSchema } from "@/services/validation/schedule.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import DialogPatientList from "./dialog-patients-list";
import { PatientSelectedContext } from "@/contexts/PatientSelectedContext";
import ScheduleFactory from "@/util/ScheduleFactory";

type Props = {
    externalFunc: () => void;
}

export default function CreateSessionDialog( { externalFunc } : Props) {
    const {register, handleSubmit, formState : { errors } } = useForm<ScheduleDTO>({
        resolver: zodResolver(createScheduleSchema)
    });
    const patientSelectedContext = useContext(PatientSelectedContext);
    const [isOpen, setOpen] = useState(false);
    async function controllModal() {
        setOpen(!isOpen);
    }
    async function submit<SubmitHandler>(data: ScheduleDTO) {
        const schedule = ScheduleFactory(data, patientSelectedContext?.patient?.id);
        const { object } = await registerSchedule(schedule) as any;
        if(typeof object == 'string') {
            alert(object);
            return;
        }
        Object.values(object).forEach((value): any => alert(value))
    }

    return (
            <Dialog>
                <DialogHeader title="Nova sessão" textButton={<X/>} functionButton={externalFunc}/>
                <BaseForm onSubmit={handleSubmit(submit)}>
                    <LabelContainer title="Paciente" labelFor="patient">
                        <Input type="text" id="patient" value={patientSelectedContext?.patient?.name ?? "Sem paciente vinculado"} {...register('patientId')} />
                        <UserPlus className="cursor-pointer pl-2" onClick={controllModal}/>
                        {errors?.patientId && <span>{errors.patientId.message}</span>}
                    </LabelContainer>
                    <LabelContainer title="Data de Início" labelFor="dateStart" >
                        <Input type="datetime-local" id="dateStart" {...register('dateStart')}/>
                        {errors?.dateStart && <span>{errors.dateStart.message}</span>}
                    </LabelContainer>
                    <LabelContainer title="Data Final" labelFor="dateEnd">
                        <Input type="datetime-local" id="dateEnd"  {...register('dateEnd')}/>
                    </LabelContainer>
                    <ButtonSubmit title="Adicionar sessão"/>
                </BaseForm>
                {isOpen && (
                <DialogPatientList externalFunc={controllModal}/>
            )}
            </Dialog>    
    )
}