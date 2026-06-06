'use client';

import { useState, useEffect } from 'react';
import { IOrganization, IOrganizationMember } from '@/interface/IOrganization';
import { getMyOrganizations, getOrganizationMembers, removeMember } from '@/services/api/organization-service';
import { useToast } from '@/contexts/ToastContext';
import { useRouter } from 'next/navigation';
import { Building2, Copy, Trash2, Users } from 'lucide-react';
import ConfirmDialog from '@/components/ui/confirm-dialog';

const ROLE_LABELS: Record<string, string> = {
    OWNER: 'Proprietário',
    ADMIN: 'Administrador',
    MEMBER: 'Membro',
};

const ROLE_STYLES: Record<string, string> = {
    OWNER: 'bg-royalBlue/10 text-royalBlue',
    ADMIN: 'bg-purple-100 text-purple-700',
    MEMBER: 'bg-surface-sunken text-content-secondary',
};

export default function OrganizationPage() {
    const [orgs, setOrgs] = useState<IOrganization[]>([]);
    const [activeOrg, setActiveOrg] = useState<IOrganization | null>(null);
    const [members, setMembers] = useState<IOrganizationMember[]>([]);
    const [removingId, setRemovingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const toast = useToast();
    const router = useRouter();

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const orgsRes = await getMyOrganizations();
            const list = orgsRes?.object ?? [];
            setOrgs(list);
            if (list.length > 0) {
                const org = list[0];
                setActiveOrg(org);
                const membersRes = await getOrganizationMembers(org.id);
                setMembers(membersRes?.object ?? []);
            }
        } catch {
            toast.error('Erro ao carregar dados da organização.');
        } finally {
            setLoading(false);
        }
    }

    async function handleRemove() {
        if (!removingId || !activeOrg) return;
        try {
            await removeMember(activeOrg.id, removingId);
            setMembers(prev => prev.filter(m => m.userId !== removingId));
            toast.success('Membro removido com sucesso!');
        } catch {
            toast.error('Erro ao remover membro.');
        } finally {
            setRemovingId(null);
        }
    }

    function copySlug() {
        if (!activeOrg) return;
        navigator.clipboard.writeText(activeOrg.slug);
        toast.success('Código copiado!');
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-sm text-content-secondary">Carregando...</p>
            </div>
        );
    }

    if (!activeOrg) {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-3">
                <p className="text-sm text-content-secondary">Nenhuma organização encontrada.</p>
                <button onClick={() => router.push('/onboarding')} className="text-sm text-royalBlue hover:underline">
                    Criar organização
                </button>
            </div>
        );
    }

    const canManage = activeOrg.myRole === 'OWNER' || activeOrg.myRole === 'ADMIN';

    return (
        <div className="flex flex-col h-full px-4 pt-4 pb-2 md:px-8 md:pt-8 md:pb-6 gap-6 overflow-auto">
            <div className="shrink-0">
                <h1 className="text-2xl font-bold text-content-primary">Organização</h1>
                <p className="text-sm text-content-secondary mt-1">Gerencie sua organização e membros</p>
            </div>

            <div className="rounded-xl border border-border-default bg-surface-raised p-5 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-royalBlue flex items-center justify-center shrink-0">
                        <Building2 size={20} className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-base font-semibold text-content-primary">{activeOrg.name}</h2>
                        <p className="text-xs text-content-secondary">
                            Seu papel: <span className="font-medium">{ROLE_LABELS[activeOrg.myRole]}</span>
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <p className="text-xs text-content-secondary font-medium">Código de convite</p>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-sunken border border-border-default">
                        <code className="text-sm font-mono text-content-primary flex-1">{activeOrg.slug}</code>
                        <button
                            onClick={copySlug}
                            className="flex items-center gap-1 text-xs text-royalBlue hover:opacity-70 transition-opacity"
                        >
                            <Copy size={13} /> Copiar
                        </button>
                    </div>
                    <p className="text-xs text-content-disabled">
                        Compartilhe este código com psicólogos que deseja convidar.
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                    <Users size={15} className="text-content-secondary" />
                    <h3 className="text-sm font-semibold text-content-primary">
                        Membros ({members.length})
                    </h3>
                </div>
                {members.map(member => (
                    <div
                        key={member.userId}
                        className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-border-default bg-surface-raised"
                    >
                        <div className="flex flex-col gap-0.5 min-w-0">
                            <span className="text-sm font-medium text-content-primary truncate">{member.username}</span>
                            {member.email && (
                                <span className="text-xs text-content-secondary truncate">{member.email}</span>
                            )}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ROLE_STYLES[member.role]}`}>
                                {ROLE_LABELS[member.role]}
                            </span>
                            {canManage && member.role !== 'OWNER' && (
                                <button
                                    onClick={() => setRemovingId(member.userId)}
                                    className="p-1.5 rounded-lg text-content-disabled hover:text-red-500 hover:bg-red-50 transition-colors"
                                >
                                    <Trash2 size={14} />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {removingId && (
                <ConfirmDialog
                    title="Remover membro"
                    description="Tem certeza que deseja remover este membro da organização?"
                    confirmLabel="Remover"
                    confirmClassName="bg-red-500 hover:bg-red-600 text-white"
                    onConfirm={handleRemove}
                    onCancel={() => setRemovingId(null)}
                />
            )}
        </div>
    );
}
