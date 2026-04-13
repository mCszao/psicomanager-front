'use client';

import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Dialog from "./ui/dialog";
import DialogHeader from "./ui/dialog-header";
import BaseForm from "./ui/base-form";
import LabelContainer from "./ui/label-container";
import Input from "./ui/input";
import ButtonSubmit from "./ui/button-submit";

const rescheduleSchema = z.object({
    dateStart: z.string().min(1, 'A nova data de início é obrigatória').refine(
        (val) => new Date(val) > new Date(),
        { message: 'A data deve ser futura' }
    ),
    dateEnd: z.string().nullable().optional(),
}).refine(
    (data) => {
        if (!data.dateEnd || data.dateEnd === '') return true;
        return new Date(data.dateStart) < new Date(data.dateEnd);
    },
    { message: 'A data de término deve ser posterior à data de início', path: ['dateEnd'] }
);

type RescheduleFormData = z.infer<typeof rescheduleSchema>;

type Props = {
    onConfirm: (dateStart: string, dateEnd?: string) => void;
    onCancel: () => void;
};

export default function RescheduleDialog({ onConfirm, onCancel }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<RescheduleFormData>({
        resolver: zodResolver(rescheduleSchema),
    });

    function submit(data: RescheduleFormData) {
        onConfirm(data.dateStart, data.dateEnd ?? undefined);
    }

    return (
        <Dialog>
            <DialogHeader title="Reagendar sessão" textButton={<X />} functionButton={onCancel} />
            <BaseForm onSubmit={handleSubmit(submit)}>
                <LabelContainer title="Nova data de início *" labelFor="dateStart">
                    <Input
                        type="datetime-local"
                        id="dateStart"
                        {...register('dateStart')}
                    />
                    {errors.dateStart && (
                        <span className="block text-xs text-red-500 mt-1">{errors.dateStart.message}</span>
                    )}
                </LabelContainer>
                <LabelContainer title="Nova data de término" labelFor="dateEnd">
                    <Input
                        type="datetime-local"
                        id="dateEnd"
                        {...register('dateEnd')}
                    />
                    {errors.dateEnd && (
                        <span className="block text-xs text-red-500 mt-1">{errors.dateEnd.message}</span>
                    )}
                </LabelContainer>
                <ButtonSubmit title="Confirmar reagendamento" />
            </BaseForm>
        </Dialog>
    );
}
