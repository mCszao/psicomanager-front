"use client";

import { X, UserPlus, Building2, Monitor, Repeat } from "lucide-react";
import BaseForm from "./ui/base-form";
import ButtonSubmit from "./ui/button-submit";
import Dialog from "./ui/dialog";
import DialogHeader from "./ui/dialog-header";
import Input from "./ui/input";
import LabelContainer from "./ui/label-container";
import DialogPatientList from "./dialog-patients-list";
import { useCreateSession } from "@/hooks/useCreateSession";
import { AttendanceTypeEnum } from "@/types/schedule.dto";
import { FrequencyEnum, FREQUENCY_LABEL } from "@/types/plan.dto";

type Props = {
    externalFunc: () => void;
};

const ATTENDANCE_OPTIONS: { value: AttendanceTypeEnum; label: string; icon: React.ReactNode }[] = [
    { value: 'PRESENTIAL', label: 'Presencial', icon: <Building2 size={15} /> },
    { value: 'REMOTE',     label: 'Remoto',     icon: <Monitor size={15} /> },
];

const FREQUENCIES: { value: FrequencyEnum; label: string }[] = [
    { value: 'DAILY',    label: FREQUENCY_LABEL['DAILY']    },
    { value: 'WEEKLY',   label: FREQUENCY_LABEL['WEEKLY']   },
    { value: 'BIWEEKLY', label: FREQUENCY_LABEL['BIWEEKLY'] },
    { value: 'MONTHLY',  label: FREQUENCY_LABEL['MONTHLY']  },
];

export default function CreateSessionDialog({ externalFunc }: Props) {
    const {
        form,
        submit,
        selectedPatient,
        setSelectedPatient,
        isPatientListOpen,
        togglePatientList,
    } = useCreateSession({ onSuccess: externalFunc });

    const { register, handleSubmit, watch, setValue, formState: { errors } } = form;

    const selectedType = watch('type');
    const selectedFrequency = watch('frequency' as any);
    const sessionsCount = watch('sessionsCount' as any);
    const isBatch = !!selectedFrequency && Number(sessionsCount) > 1;

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
                    <Input type="datetime-local" id="dateStart" {...register('dateStart')} />
                    {errors.dateStart && <span className="block text-xs text-red-500 mt-1">{errors.dateStart.message}</span>}
                </LabelContainer>

                {!isBatch && (
                    <LabelContainer title="Data de término" labelFor="dateEnd">
                        <Input type="datetime-local" id="dateEnd" {...register('dateEnd')} />
                        {errors.dateEnd && <span className="block text-xs text-red-500 mt-1">{errors.dateEnd.message}</span>}
                    </LabelContainer>
                )}

                {/* Agendamento em lote */}
                <div className="col-span-2 mb-5">
                    <p className="flex items-center gap-1.5 text-sm font-medium text-content-primary mb-2">
                        <Repeat size={14} /> Repetição (opcional)
                    </p>
                    <div className="flex rounded-lg border border-border-default overflow-hidden text-sm mb-3">
                        <button
                            type="button"
                            onClick={() => setValue('frequency' as any, '', { shouldValidate: false })}
                            className={`flex-1 py-2 font-medium transition-colors border-r border-border-default
                                ${!selectedFrequency ? 'bg-royalBlue text-white' : 'text-content-secondary hover:bg-surface-raised'}`}
                        >
                            Sem repetição
                        </button>
                        {FREQUENCIES.map(({ value, label }) => (
                            <button
                                key={value}
                                type="button"
                                onClick={() => setValue('frequency' as any, value, { shouldValidate: false })}
                                className={`flex-1 py-2 font-medium transition-colors border-r last:border-r-0 border-border-default
                                    ${selectedFrequency === value ? 'bg-royalBlue text-white' : 'text-content-secondary hover:bg-surface-raised'}`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                    {selectedFrequency && (
                        <div>
                            <label className="block mb-2 text-sm font-medium text-content-primary">Quantidade de sessões</label>
                            <Input
                                type="number"
                                min="2"
                                placeholder="Ex: 4"
                                {...register('sessionsCount' as any, { valueAsNumber: true })}
                            />
                            {isBatch && (
                                <p className="text-xs text-content-secondary mt-1.5">
                                    Serão criadas {sessionsCount} sessões com frequência {FREQUENCY_LABEL[selectedFrequency as FrequencyEnum]} a partir da data de início.
                                </p>
                            )}
                        </div>
                    )}
                </div>

                <ButtonSubmit title={isBatch ? `Agendar ${sessionsCount} sessões` : 'Adicionar sessão'} />
            </BaseForm>

            {isPatientListOpen && (
                <DialogPatientList
                    onSelect={setSelectedPatient}
                    externalFunc={togglePatientList}
                />
            )}
        </Dialog>
    );
}
