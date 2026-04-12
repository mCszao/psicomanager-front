"use client";

import { X } from "lucide-react";
import BaseForm from "./ui/base-form";
import ButtonSubmit from "./ui/button-submit";
import DialogHeader from "./ui/dialog-header";
import LabelContainer from "./ui/label-container";
import Input from "./ui/input";
import MaskedInput from "./ui/masked-input";
import Dialog from "./ui/dialog";
import { useCreatePatient } from "@/hooks/useCreatePatient";
import { maskCpf, maskPhone, maskCep } from "@/util/masks";

type Props = {
    externalFunc: () => void;
}

export default function CreatePatientDialog({ externalFunc }: Props) {
    const { form, submit } = useCreatePatient({ onSuccess: externalFunc });
    const { register, handleSubmit, formState: { errors } } = form;

    return (
        <Dialog>
            <DialogHeader title="Novo paciente" textButton={<X />} functionButton={externalFunc} />
            <BaseForm onSubmit={handleSubmit(submit)}>

                <LabelContainer title="Nome completo *" labelFor="name">
                    <Input
                        type="text"
                        id="name"
                        placeholder="Ex: Maria da Silva"
                        autoComplete="name"
                        {...register('name')}
                    />
                    {errors.name && <span className="block text-xs text-red-500 mt-1">{errors.name.message}</span>}
                </LabelContainer>

                <LabelContainer title="E-mail" labelFor="email">
                    <Input
                        type="email"
                        id="email"
                        placeholder="Ex: maria@email.com"
                        autoComplete="email"
                        {...register('email')}
                    />
                    {errors.email && <span className="block text-xs text-red-500 mt-1">{errors.email.message}</span>}
                </LabelContainer>

                <LabelContainer title="CPF *" labelFor="cpf">
                    <MaskedInput
                        mask={maskCpf}
                        type="text"
                        id="cpf"
                        placeholder="000.000.000-00"
                        inputMode="numeric"
                        autoComplete="off"
                        {...register('cpf')}
                    />
                    {errors.cpf && <span className="block text-xs text-red-500 mt-1">{errors.cpf.message}</span>}
                </LabelContainer>

                <LabelContainer title="Telefone *" labelFor="phone">
                    <MaskedInput
                        mask={maskPhone}
                        type="tel"
                        id="phone"
                        placeholder="(00) 00000-0000"
                        autoComplete="tel"
                        {...register('phone')}
                    />
                    {errors.phone && <span className="block text-xs text-red-500 mt-1">{errors.phone.message}</span>}
                </LabelContainer>

                <LabelContainer title="Data de nascimento" labelFor="birthdayDate">
                    <Input
                        type="date"
                        id="birthdayDate"
                        {...register('birthdayDate')}
                    />
                    {errors.birthdayDate && <span className="block text-xs text-red-500 mt-1">{errors.birthdayDate.message}</span>}
                </LabelContainer>

                <LabelContainer title="CEP" labelFor="zipcode">
                    <MaskedInput
                        mask={maskCep}
                        type="text"
                        id="zipcode"
                        placeholder="00000-000"
                        inputMode="numeric"
                        autoComplete="postal-code"
                        {...register('zipcode')}
                    />
                    {errors.zipcode && <span className="block text-xs text-red-500 mt-1">{errors.zipcode.message}</span>}
                </LabelContainer>

                <ButtonSubmit title="Adicionar paciente" />
            </BaseForm>
        </Dialog>
    );
}
