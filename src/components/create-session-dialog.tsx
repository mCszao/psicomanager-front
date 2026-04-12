"use client";

import { X, UserPlus } from "lucide-react";
import BaseForm from "./ui/base-form";
import ButtonSubmit from "./ui/button-submit";
import Dialog from "./ui/dialog";
import DialogHeader from "./ui/dialog-header";
import Input from "./ui/input";
import LabelContainer from "./ui/label-container";
import DialogPatientList from "./dialog-patients-list";
import { useCreateSession } from "@/hooks/useCreateSession";

type Props = {
    externalFunc: () => void;
}

export default function CreateSessionDialog({ externalFunc }: Props) {
    const { form, submit, selectedPatient, isPatientListOpen, togglePatientList } = useCreateSession({ onSuccess: externalFunc });
    const { register, handleSubmit, formState: { errors } } = form;

    return (
        <Dialog>
            <DialogHeader title="Nova sessão" textButton={<X />} functionButton={externalFunc} />
            <BaseForm onSubmit={handleSubmit(submit)}>

                <LabelContainer title="Paciente *" labelFor="patient">
                    <div className="flex items-center gap-2">
                        <Input
                            type="text"
                            id="patient"
                            readOnly
                            value={selectedPatient?.name ?? ''}
                            placeholder="Selecione um paciente"
                            className="cursor-default"
                            {...register('patientId')}
                        />
                        <button
                            type="button"
                            onClick={togglePatientList}
                            className="shrink-0 p-2.5 rounded-lg border border-border-default bg-surface-sunken hover:bg-surface-hover text-content-secondary transition-colors"
                            title="Buscar paciente"
                        >
                            <UserPlus size={16} />
                        </button>
                    </div>
                    {errors.patientId && <span className="block text-xs text-red-500 mt-1">{errors.patientId.message}</span>}
                </LabelContainer>

                <LabelContainer title="Data de início *" labelFor="dateStart">
                    <Input
                        type="datetime-local"
                        id="dateStart"
                        {...register('dateStart')}
                    />
                    {errors.dateStart && <span className="block text-xs text-red-500 mt-1">{errors.dateStart.message}</span>}
                </LabelContainer>

                <LabelContainer title="Data de término" labelFor="dateEnd">
                    <Input
                        type="datetime-local"
                        id="dateEnd"
                        {...register('dateEnd')}
                    />
                    {errors.dateEnd && <span className="block text-xs text-red-500 mt-1">{errors.dateEnd.message}</span>}
                </LabelContainer>

                <ButtonSubmit title="Adicionar sessão" />
            </BaseForm>

            {isPatientListOpen && <DialogPatientList externalFunc={togglePatientList} />}
        </Dialog>
    );
}
