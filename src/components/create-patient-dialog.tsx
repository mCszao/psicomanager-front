import { X } from "lucide-react";
import BaseForm from "./ui/base-form";
import ButtonSubmit from "./ui/button-submit";
import Dialog from "./ui/dialog";
import DialogHeader from "./ui/dialog-header";
import LabelContainer from "./ui/label-container";
import Input from "./ui/input";

type Props = {
    externalFunc: () => void;
}

export default function CreatePatientDialog( { externalFunc } : Props) {
    return (
        <Dialog>
            <DialogHeader title="Novo paciente" textButton={<X/>} functionButton={externalFunc}/>
            <BaseForm>
                <LabelContainer title="Nome" labelFor="name">
                    <Input type="text" id="name"/>
                </LabelContainer>
                <LabelContainer title="E-mail" labelFor="email">
                    <Input type="email" id="email"/>
                </LabelContainer>
                <LabelContainer title="CPF" labelFor="cpf">
                    <Input type="text" id="cpf"/>
                </LabelContainer>
                <LabelContainer title="Telefone" labelFor="phone">
                    <Input type="text" id="phone"/>
                </LabelContainer>
                <LabelContainer title="Data de Nascimento" labelFor="birthdayDate">
                    <Input type="date" id="birthdayDate"/>
                </LabelContainer>
                <ButtonSubmit title="Adicionar paciente"/>
            </BaseForm>
        </Dialog>
    )
}