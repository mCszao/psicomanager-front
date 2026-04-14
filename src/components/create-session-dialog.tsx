"use client";

import { X, UserPlus, Building2, Monitor } from "lucide-react";
import { useEffect } from "react";
import BaseForm from "./ui/base-form";
import ButtonSubmit from "./ui/button-submit";
import Dialog from "./ui/dialog";
import DialogHeader from "./ui/dialog-header";
import Input from "./ui/input";
import LabelContainer from "./ui/label-container";
import DialogPatientList from "./dialog-patients-list";
import { useCreateSession } from "@/hooks/useCreateSession";
import { AttendanceTypeEnum } from "@/types/schedule.dto";

type Props = {
    externalFunc: () => void;
}

const ATTENDANCE_OPTIONS: { value: AttendanceTypeEnum; label: string; icon: React.ReactNode }[] = [
    { value: 'PRESENTIAL', label: 'Presencial', icon: <Building2 size={15} /> },
    { value: 'REMOTE',     label: 'Remoto',     icon: <Monitor size={15} /> },
];

export default function CreateSessionDialog({ externalFunc }: Props) {
    const { form, submit, selectedPatient, isPatientListOpen, togglePatientList } = useCreateSession({ onSuccess: externalFunc });
    const { register, handleSubmit, watch, setValue, formState: { errors } } = form;

    const selectedType = watch('type');
    const dateStart    = watch('dateStart');
    const dateEnd      = watch('dateEnd');

    useEffect(() => {
        if (!dateStart) return;
        if (dateEnd) return; // não sobrescreve se o usuário já preencheu

        const start = new Date(dateStart);
        if (isNaN(start.getTime())) return;

        const end = new Date(start.getTime() + 60 * 60 * 1000);
        // formata para "yyyy-MM-ddTHH:mm" usando horário local (sem conversão UTC)
        const pad = (n: number) => String(n).padStart(2, '0');
        const formatted = `${end.getFullYear()}-${pad(end.getMonth() + 1)}-${pad(end.getDate())}T${pad(end.getHours())}:${pad(end.getMinutes())}`;
        setValue('dateEnd', formatted, { shouldValidate: true });
    }, [dateStart]);

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

                <LabelContainer title="Modalidade *" labelFor="type">
                    <div className="flex rounded-lg border border-border-default overflow-hidden text-sm">
                        {ATTENDANCE_OPTIONS.map(({ value, label, icon }) => (
                            <button
                                key={value}
                                type="button"
                                onClick={() => setValue('type', value, { shouldValidate: true })}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 font-medium transition-colors border-r last:border-r-0 border-border-default
                                    ${selectedType === value
                                        ? 'bg-royalBlue text-white'
                                        : 'text-content-secondary hover:bg-surface-raised'}`}
                            >
                                {icon}
                                {label}
                            </button>
                        ))}
                    </div>
                    {errors.type && <span className="block text-xs text-red-500 mt-1">{errors.type.message}</span>}
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
