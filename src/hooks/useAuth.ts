"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, signUp } from "@/services/api";
import { signInSchema, signUpSchema } from "@/services/validation/auth.schema";
import { SignInDTO, SignUpDTO } from "@/types/auth.dto";
import BaseResponse from "@/interface/IBaseResponse";

export function useAuth() {
    const router = useRouter();
    const [isRegistering, setIsRegistering] = useState(false);

    const signInForm = useForm<SignInDTO>({ resolver: zodResolver(signInSchema) });
    const signUpForm = useForm<SignUpDTO>({ resolver: zodResolver(signUpSchema) });

    function saveSession(token: string) {
        document.cookie = `authToken=${token}; path=/`;
        router.push("/");
    }

    async function onSignIn(data: SignInDTO) {
        const response = await signIn(data) as BaseResponse<{ token: string }>;
        if (!response.success) {
            alert(typeof response.object === "string" ? response.object : "Credenciais inválidas");
            return;
        }
        saveSession(response.object.token);
    }

    async function onSignUp(data: SignUpDTO) {
        const response = await signUp(data) as BaseResponse<{ token: string }>;
        if (!response.success) {
            alert(typeof response.object === "string" ? response.object : "Erro ao criar conta");
            return;
        }
        saveSession(response.object.token);
    }

    return { isRegistering, setIsRegistering, signInForm, signUpForm, onSignIn, onSignUp };
}
