"use client";

import { BrainCog } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
    const { isRegistering, setIsRegistering, signInForm, signUpForm, onSignIn, onSignUp } = useAuth();

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="flex flex-col items-center mb-6 gap-2">
                    <BrainCog size={48} className="text-royalBlue" />
                    <span className="text-2xl font-semibold text-gray-900 dark:text-white">Agenda Psico</span>
                </div>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            {isRegistering ? "Criar uma conta" : "Faça o login com sua conta"}
                        </h1>

                        {!isRegistering ? (
                            <form className="space-y-4 md:space-y-6" onSubmit={signInForm.handleSubmit(onSignIn)}>
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuário</label>
                                    <input type="text" id="username" placeholder="Seu usuário" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" {...signInForm.register("username")} />
                                    {signInForm.formState.errors.username && <span className="text-sm text-red-500">{signInForm.formState.errors.username.message}</span>}
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                                    <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" {...signInForm.register("password")} />
                                    {signInForm.formState.errors.password && <span className="text-sm text-red-500">{signInForm.formState.errors.password.message}</span>}
                                </div>
                                <button type="submit" className="w-full border border-transparent hover:border-gray-200 text-black bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    Entrar
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Não tem uma conta?{" "}
                                    <button type="button" onClick={() => setIsRegistering(true)} className="font-medium text-royalBlue hover:underline">
                                        Cadastre-se
                                    </button>
                                </p>
                            </form>
                        ) : (
                            <form className="space-y-4 md:space-y-6" onSubmit={signUpForm.handleSubmit(onSignUp)}>
                                <div>
                                    <label htmlFor="username-register" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuário</label>
                                    <input type="text" id="username-register" placeholder="Seu usuário" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" {...signUpForm.register("username")} />
                                    {signUpForm.formState.errors.username && <span className="text-sm text-red-500">{signUpForm.formState.errors.username.message}</span>}
                                </div>
                                <div>
                                    <label htmlFor="email-register" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="email" id="email-register" placeholder="nome@empresa.com" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" {...signUpForm.register("email")} />
                                    {signUpForm.formState.errors.email && <span className="text-sm text-red-500">{signUpForm.formState.errors.email.message}</span>}
                                </div>
                                <div>
                                    <label htmlFor="phone-register" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefone</label>
                                    <input type="tel" id="phone-register" placeholder="11999999999" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" {...signUpForm.register("phone")} />
                                    {signUpForm.formState.errors.phone && <span className="text-sm text-red-500">{signUpForm.formState.errors.phone.message}</span>}
                                </div>
                                <div>
                                    <label htmlFor="password-register" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                                    <input type="password" id="password-register" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" {...signUpForm.register("password")} />
                                    {signUpForm.formState.errors.password && <span className="text-sm text-red-500">{signUpForm.formState.errors.password.message}</span>}
                                </div>
                                <button type="submit" className="w-full border border-transparent hover:border-gray-200 text-black bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    Criar conta
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Já tem uma conta?{" "}
                                    <button type="button" onClick={() => setIsRegistering(false)} className="font-medium text-royalBlue hover:underline">
                                        Entrar
                                    </button>
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
