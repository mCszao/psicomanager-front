"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, signUp } from "@/services/api";
import { signInSchema, signUpSchema } from "@/services/validation/auth.schema";
import { SignInDTO, SignUpDTO } from "@/types/auth.dto";
import BaseResponse from "@/interface/IBaseResponse";
import { useToast } from "@/contexts/ToastContext";
import { extractApiError } from "@/util/feedback";

export function useAuth() {
    const router = useRouter();
    const toast  = useToast();
    const [isRegistering, setIsRegistering] = useState(false);

    const signInForm = useForm<SignInDTO>({ resolver: zodResolver(signInSchema) });
    const signUpForm = useForm<SignUpDTO>({ resolver: zodResolver(signUpSchema) });

    function saveSession(token: string, username: string) {
        document.cookie = `authToken=${token}; path=/`;
        document.cookie = `username=${username}; path=/`;
        router.push("/");
    }

    async function onSignIn(data: SignInDTO) {
        const response = await signIn(data) as BaseResponse<{ token: string }>;
        if (!response.success) {
            toast.error(extractApiError(response as BaseResponse<unknown>));
            return;
        }
        saveSession(response.object.token, data.username);
    }

    async function onSignUp(data: SignUpDTO) {
        const response = await signUp(data) as BaseResponse<{ token: string }>;
        if (!response.success) {
            toast.error(extractApiError(response as BaseResponse<unknown>));
            return;
        }
        toast.success('Conta criada com sucesso!');
        saveSession(response.object.token, data.username);
    }

    return { isRegistering, setIsRegistering, signInForm, signUpForm, onSignIn, onSignUp };
}
