'use client';

import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LabelContainer from "@/components/ui/label-container";
import Input from "@/components/ui/input";

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
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
            <div className="relative bg-surface-raised border border-border-default rounded-xl shadow-lg w-full max-w-sm mx-4 z-10">
                <div className="flex items-center justify-between px-5 py-4 border-b border-border-default">
                    <h3 className="text-base font-semibold text-content-primary">Reagendar sessão</h3>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="text-content-secondary hover:text-content-primary hover:bg-surface-hover rounded-lg w-8 h-8 flex items-center justify-center transition-colors"
                    >
                        <X size={16} />
                        <span className="sr-only">Fechar</span>
                    </button>
                </div>
                <form onSubmit={handleSubmit(submit)} className="px-5 py-4 flex flex-col gap-1">
                    <LabelContainer title="Nova data de início *" labelFor="dateStart">
                        <Input type="datetime-local" id="dateStart" {...register('dateStart')} />
                        {errors.dateStart && (
                            <span className="block text-xs text-red-500 mt-1">{errors.dateStart.message}</span>
                        )}
                    </LabelContainer>
                    <LabelContainer title="Nova data de término" labelFor="dateEnd">
                        <Input type="datetime-local" id="dateEnd" {...register('dateEnd')} />
                        {errors.dateEnd && (
                            <span className="block text-xs text-red-500 mt-1">{errors.dateEnd.message}</span>
                        )}
                    </LabelContainer>
                </form>
                <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-border-default">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="text-sm px-4 py-2 rounded-lg border border-border-default text-content-secondary hover:bg-surface-hover transition-colors font-medium"
                    >
                        Cancelar
                    </button>
                    <button
                        form="reschedule-form"
                        type="submit"
                        onClick={handleSubmit(submit)}
                        className="text-sm px-4 py-2 rounded-lg font-medium transition-colors bg-royalBlue hover:opacity-90 text-white"
                    >
                        Confirmar reagendamento
                    </button>
                </div>
            </div>
        </div>
    );
}
