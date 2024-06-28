import { X, UserPlus } from "lucide-react";
import BaseForm from "./ui/base-form";
import ButtonSubmit from "./ui/button-submit";
import DialogHeader from "./ui/dialog-header";
import LabelContainer from "./ui/label-container";
import Input from "./ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import Dialog from "./ui/dialog";
import PatientDTO from "@/app/types/patient.dto";
import { registerPatient } from "@/services/api";
import { reverseDate } from "@/util/DateUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPatientSchema } from "@/services/validation/patient.schema";



type Props = {
    externalFunc: () => void;
}



export default function CreatePatientDialog( { externalFunc } : Props) {
    const {register, handleSubmit, formState: { errors }} = useForm<PatientDTO>({
        resolver: zodResolver(createPatientSchema)
    });
    async function submit<SubmitHandler>(data: PatientDTO){
        data.birthdayDate = reverseDate(data.birthdayDate);
        const { object } = await registerPatient(data) as any;
        if(typeof object == 'string') {
            alert(object);
            return;
        }
        Object.values(object).forEach((value): any => alert(value))
    }

    return (
        <Dialog>
            <DialogHeader title="Novo paciente" textButton={<X/>} functionButton={externalFunc}/>
            <BaseForm onSubmit={handleSubmit(submit)}>
                <LabelContainer title="Nome" labelFor="name">
                    <Input type="text" id="name" {...register('name')} disabled={true}/>
                    {errors?.name && <span className="block">{errors.name.message}</span>}
                </LabelContainer>
                <LabelContainer title="E-mail" labelFor="email">
                    <Input type="text" id="email"  {...register('email')}/>
                    {errors?.email && <span>{errors.email.message}</span>}
                </LabelContainer>
                <LabelContainer title="CPF" labelFor="cpf">
                    <Input type="number" id="cpf"  {...register('cpf')}/>
                    {errors?.cpf && <span>{errors.cpf.message}</span>}
                </LabelContainer>
                <LabelContainer title="Telefone" labelFor="phone">
                    <Input type="text" id="phone"  {...register('phone')}/>
                    {errors?.phone && <span>{errors.phone.message}</span>}
                </LabelContainer>
                <LabelContainer title="Data de Nascimento" labelFor="birthdayDate" >
                    <Input type="date" id="birthdayDate"  {...register('birthdayDate')}/>
                </LabelContainer>
                <LabelContainer title="CEP" labelFor="zipcode"  >
                    <Input type="number" id="zipcode" {...register('zipcode')}/>
                    {errors?.zipcode && <span>{errors.zipcode.message}</span>}
                </LabelContainer>
                <ButtonSubmit title="Adicionar paciente"/>
            </BaseForm>
        </Dialog>
    )
}