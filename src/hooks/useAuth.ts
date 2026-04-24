"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, signOut, signUp } from "@/services/api";
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

    /**
     * Saves only non-sensitive session info (username) in a plain cookie for
     * display purposes. The actual auth tokens are HttpOnly cookies set by the server.
     */
    function saveSession(username: string) {
        document.cookie = `username=${username}; path=/`;
        router.push("/");
    }

    function clearSession() {
        document.cookie = 'username=; Max-Age=0; path=/';
    }

    async function onSignIn(data: SignInDTO) {
        const response = await signIn(data) as BaseResponse<{ username: string }>;
        if (!response.success) {
            toast.error(extractApiError(response as BaseResponse<unknown>));
            return;
        }
        saveSession(response.object.username);
    }

    async function onSignUp(data: SignUpDTO) {
        const response = await signUp(data) as BaseResponse<{ username: string }>;
        if (!response.success) {
            toast.error(extractApiError(response as BaseResponse<unknown>));
            return;
        }
        toast.success('Conta criada com sucesso! Faça login para continuar.');
        setIsRegistering(false);
    }

    async function onSignOut() {
        try {
            await signOut();
        } finally {
            // Always clear client-side state and redirect, even if the request fails
            clearSession();
            router.push("/login");
        }
    }

    return { isRegistering, setIsRegistering, signInForm, signUpForm, onSignIn, onSignUp, onSignOut };
}
