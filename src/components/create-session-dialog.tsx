import { X, UserPlus } from "lucide-react";
import BaseForm from "./ui/base-form";
import ButtonSubmit from "./ui/button-submit";
import Dialog from "./ui/dialog";
import DialogHeader from "./ui/dialog-header";
import Input from "./ui/input";
import LabelContainer from "./ui/label-container";
import { useForm, SubmitHandler } from "react-hook-form";
import { getFormattSchedule } from "@/util/DateUtils";
import { registerSchedule } from "@/services/api";
import ScheduleDTO from "@/app/types/schedule.dto";
import { createScheduleSchema } from "@/services/validation/schedule.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

type Props = {
    externalFunc: () => void;
}

export default function CreateSessionDialog( { externalFunc } : Props) {
    const {register, handleSubmit, formState : { errors } } = useForm<ScheduleDTO>({
        resolver: zodResolver(createScheduleSchema)
    });
    const [isOpen, setOpen] = useState(false);
    function controllModal() {
        setOpen(!isOpen);
    }
    async function submit<SubmitHandler>(data: ScheduleDTO) {
        const schedule = getFormattSchedule(data);
        console.log(schedule);
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
                    <Input type="text" id="patient" {...register('patientId')}/>
                    <UserPlus onClick={controllModal}/>
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
                <Dialog>
                    <DialogHeader title="Pesquisar paciente" textButton={<X/>} functionButton={externalFunc}/>
                </Dialog>
           )}
        </Dialog>
    )
}