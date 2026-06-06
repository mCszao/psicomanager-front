'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createOrganization, joinOrganization } from '@/services/api/organization-service';
import { useToast } from '@/contexts/ToastContext';
import { BrainCircuit, Building2, Hash } from 'lucide-react';

type Mode = 'choose' | 'create' | 'join';

export default function OnboardingPage() {
    const [mode, setMode] = useState<Mode>('choose');
    const [orgName, setOrgName] = useState('');
    const [slug, setSlug] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const router = useRouter();

    async function handleCreate() {
        if (!orgName.trim()) return;
        setLoading(true);
        try {
            await createOrganization({ name: orgName.trim() });
            toast.success('Organização criada com sucesso!');
            router.push('/');
            router.refresh();
        } catch {
            toast.error('Erro ao criar organização. Tente novamente.');
        } finally {
            setLoading(false);
        }
    }

    async function handleJoin() {
        if (!slug.trim()) return;
        setLoading(true);
        try {
            await joinOrganization(slug.trim());
            toast.success('Você entrou na organização!');
            router.push('/');
            router.refresh();
        } catch {
            toast.error('Código inválido ou organização não encontrada.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-surface-default px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex flex-col items-center gap-3 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-royalBlue flex items-center justify-center shadow-lg">
                        <BrainCircuit size={28} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-content-primary">Psicomanager</h1>
                </div>

                <div className="bg-surface-raised border border-border-default rounded-2xl shadow-lg p-6">
                    {mode === 'choose' && (
                        <div className="flex flex-col gap-4">
                            <div className="text-center mb-2">
                                <h2 className="text-lg font-semibold text-content-primary">Bem-vindo!</h2>
                                <p className="text-sm text-content-secondary mt-1">
                                    Para começar, você precisa de uma organização.
                                </p>
                            </div>

                            <button
                                onClick={() => setMode('create')}
                                className="flex items-center gap-3 px-4 py-4 rounded-xl border-2 border-royalBlue/30 bg-royalBlue/5 hover:bg-royalBlue/10 transition-colors text-left"
                            >
                                <div className="w-10 h-10 rounded-lg bg-royalBlue flex items-center justify-center shrink-0">
                                    <Building2 size={18} className="text-white" />
                                </div>
                                <div>
                                    <p className="font-medium text-content-primary text-sm">Criar minha organização</p>
                                    <p className="text-xs text-content-secondary mt-0.5">
                                        Para consultórios solo ou clínicas
                                    </p>
                                </div>
                            </button>

                            <div className="flex items-center gap-3 text-xs text-content-disabled">
                                <div className="flex-1 h-px bg-border-default" />
                                ou
                                <div className="flex-1 h-px bg-border-default" />
                            </div>

                            <button
                                onClick={() => setMode('join')}
                                className="flex items-center gap-3 px-4 py-4 rounded-xl border border-border-default hover:bg-surface-hover transition-colors text-left"
                            >
                                <div className="w-10 h-10 rounded-lg bg-surface-sunken flex items-center justify-center shrink-0">
                                    <Hash size={18} className="text-content-secondary" />
                                </div>
                                <div>
                                    <p className="font-medium text-content-primary text-sm">Inserir código de convite</p>
                                    <p className="text-xs text-content-secondary mt-0.5">
                                        Fui convidado por uma clínica
                                    </p>
                                </div>
                            </button>
                        </div>
                    )}

                    {mode === 'create' && (
                        <div className="flex flex-col gap-4">
                            <div>
                                <button
                                    onClick={() => setMode('choose')}
                                    className="text-xs text-content-secondary hover:text-royalBlue transition-colors mb-3"
                                >
                                    ← Voltar
                                </button>
                                <h2 className="text-lg font-semibold text-content-primary">Criar organização</h2>
                                <p className="text-sm text-content-secondary mt-1">
                                    Pode ser o nome do seu consultório ou clínica.
                                </p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-content-secondary">
                                    Nome da organização
                                </label>
                                <input
                                    type="text"
                                    value={orgName}
                                    onChange={e => setOrgName(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleCreate()}
                                    placeholder="Ex: Consultório Dra. Ana Silva"
                                    className="w-full rounded-lg border border-border-default bg-surface-sunken px-3 py-2.5 text-sm text-content-primary placeholder:text-content-disabled focus:outline-none focus:ring-2 focus:ring-royalBlue"
                                    autoFocus
                                />
                            </div>
                            <button
                                onClick={handleCreate}
                                disabled={loading || !orgName.trim()}
                                className="w-full py-2.5 rounded-lg bg-royalBlue text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                            >
                                {loading ? 'Criando...' : 'Criar organização'}
                            </button>
                        </div>
                    )}

                    {mode === 'join' && (
                        <div className="flex flex-col gap-4">
                            <div>
                                <button
                                    onClick={() => setMode('choose')}
                                    className="text-xs text-content-secondary hover:text-royalBlue transition-colors mb-3"
                                >
                                    ← Voltar
                                </button>
                                <h2 className="text-lg font-semibold text-content-primary">Entrar em uma organização</h2>
                                <p className="text-sm text-content-secondary mt-1">
                                    Insira o código (slug) da organização que te convidou.
                                </p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-content-secondary">
                                    Código da organização
                                </label>
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={e => setSlug(e.target.value.toLowerCase().replace(/\s/g, '-'))}
                                    onKeyDown={e => e.key === 'Enter' && handleJoin()}
                                    placeholder="Ex: clinica-saude-mental"
                                    className="w-full rounded-lg border border-border-default bg-surface-sunken px-3 py-2.5 text-sm text-content-primary placeholder:text-content-disabled focus:outline-none focus:ring-2 focus:ring-royalBlue font-mono"
                                    autoFocus
                                />
                            </div>
                            <button
                                onClick={handleJoin}
                                disabled={loading || !slug.trim()}
                                className="w-full py-2.5 rounded-lg bg-royalBlue text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                            >
                                {loading ? 'Entrando...' : 'Entrar na organização'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
