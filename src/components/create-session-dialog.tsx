import { X } from "lucide-react";
import BaseForm from "./ui/base-form";
import ButtonSubmit from "./ui/button-submit";
import Dialog from "./ui/dialog";
import DialogHeader from "./ui/dialog-header";
import Input from "./ui/input";
import LabelContainer from "./ui/label-container";

type Props = {
    externalFunc: () => void;
}

export default function CreateSessionDialog( { externalFunc } : Props) {
    return (
        <Dialog>
            <DialogHeader title="Nova sessão" textButton={<X/>} functionButton={externalFunc}/>
            <BaseForm>
                <LabelContainer title="Paciente" labelFor="patient">
                    <Input type="text" id="patient" />
                </LabelContainer>
                <LabelContainer title="Data de Início" labelFor="initDate">
                    <Input type="datetime-local" id="initDate"/>
                </LabelContainer>
                <LabelContainer title="Data Final" labelFor="endDate">
                    <Input type="datetime-local" id="endDate"/>
                </LabelContainer>
                <ButtonSubmit title="Adicionar sessão"/>
            </BaseForm>
        </Dialog>
    )
}