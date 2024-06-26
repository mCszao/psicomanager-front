import { X } from "lucide-react";
import BaseForm from "./ui/base-form";
import ButtonSubmit from "./ui/button-submit";
import Dialog from "./ui/dialog";
import DialogHeader from "./ui/dialog-header";
import Input from "./ui/input";
import LabelContainer from "./ui/label-container";
import { useForm, SubmitHandler } from "react-hook-form";
import { getFormattSchedule } from "@/util/DateUtils";
import { registerSchedule } from "@/services/api";

type Props = {
    externalFunc: () => void;
}

export default function CreateSessionDialog( { externalFunc } : Props) {
    const {register, handleSubmit } = useForm();
    function submit<SubmitHandler>(data: any) {
        const schedule = getFormattSchedule(data);
        console.log(schedule);
        registerSchedule(schedule);
    }
    return (
        <Dialog>
            <DialogHeader title="Nova sessão" textButton={<X/>} functionButton={externalFunc}/>
            <BaseForm onSubmit={handleSubmit(submit)}>
                <LabelContainer title="Paciente" labelFor="patient">
                    <Input type="text" id="patient" {...register('patientId')}/>
                </LabelContainer>
                <LabelContainer title="Data de Início" labelFor="dateStart" >
                    <Input type="datetime-local" id="dateStart" {...register('dateStart')}/>
                </LabelContainer>
                <LabelContainer title="Data Final" labelFor="dateEnd">
                    <Input type="datetime-local" id="dateEnd"  {...register('dateEnd')}/>
                </LabelContainer>
                <ButtonSubmit title="Adicionar sessão"/>
            </BaseForm>
        </Dialog>
    )
}