'use client'
import { X } from "lucide-react";
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

type Props = {
    externalFunc: () => void;
}

export default function CreatePatientDialog( { externalFunc } : Props) {
    const {register, handleSubmit} = useForm<PatientDTO>();
    function submit<SubmitHandler>(data: PatientDTO){
        data.birthdayDate = reverseDate(data.birthdayDate);
        registerPatient(data);
    }

    return (
        <Dialog>
            <DialogHeader title="Novo paciente" textButton={<X/>} functionButton={externalFunc}/>
            <BaseForm onSubmit={handleSubmit(submit)}>
                <LabelContainer title="Nome" labelFor="name">
                    <Input type="text"  {...register('name')} />
                </LabelContainer>
                <LabelContainer title="E-mail" labelFor="email">
                    <Input type="email" id="email"  {...register('email')}/>
                </LabelContainer>
                <LabelContainer title="CPF" labelFor="cpf">
                    <Input type="number" id="cpf"  {...register('cpf')}/>
                </LabelContainer>
                <LabelContainer title="Telefone" labelFor="phone">
                    <Input type="text" id="phone"  {...register('phone')}/>
                </LabelContainer>
                <LabelContainer title="Data de Nascimento" labelFor="birthdayDate" >
                    <Input type="date" id="birthdayDate"  {...register('birthdayDate')}/>
                </LabelContainer>
                <LabelContainer title="CEP" labelFor="zipcode"  >
                    <Input type="number" id="zipcode" {...register('zipcode')}/>
                </LabelContainer>
                <ButtonSubmit title="Adicionar paciente"/>
            </BaseForm>
        </Dialog>
    )
}