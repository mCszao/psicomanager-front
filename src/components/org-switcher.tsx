'use client';

import { useState, useEffect, useRef } from 'react';
import { Building2, Check, ChevronDown, Plus } from 'lucide-react';
import { IOrganization } from '@/interface/IOrganization';
import { getMyOrganizations, switchOrganization } from '@/services/api/organization-service';
import { useRouter } from 'next/navigation';
import { useToast } from '@/contexts/ToastContext';

type Props = {
    expanded?: boolean;
};

export default function OrgSwitcher({ expanded = false }: Props) {
    const [orgs, setOrgs] = useState<IOrganization[]>([]);
    const [activeOrg, setActiveOrg] = useState<IOrganization | null>(null);
    const [open, setOpen] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLButtonElement>(null);
    const router = useRouter();
    const toast = useToast();

    useEffect(() => {
        getMyOrganizations()
            .then(res => {
                const list = res?.object ?? [];
                setOrgs(list);
                if (list.length > 0) setActiveOrg(list[0]);
            })
            .catch(() => {});
    }, []);

    function handleOpen() {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            // Posiciona sempre à direita da sidebar, alinhado ao topo do trigger
            setDropdownPos({
                top:  rect.top,
                left: rect.right + 12,
            });
        }
        setOpen(v => !v);
    }

    async function handleSwitch(org: IOrganization) {
        if (org.id === activeOrg?.id) { setOpen(false); return; }
        try {
            await switchOrganization(org.id);
            setActiveOrg(org);
            setOpen(false);
            toast.success(`Organização alterada para "${org.name}"`);
            router.refresh();
        } catch {
            toast.error('Erro ao trocar de organização.');
        }
    }

    if (!activeOrg) return null;

    return (
        <div
            className="relative mx-2 my-1"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Trigger */}
            <button
                ref={triggerRef}
                onClick={handleOpen}
                className="flex items-center h-9 w-full rounded-xl bg-white/10 hover:bg-white/15 transition-colors"
            >
                {/* Ícone */}
                <div className="w-9 h-9 flex items-center justify-center shrink-0">
                    <div className="w-[22px] h-[22px] rounded-md bg-white/20 flex items-center justify-center">
                        <Building2 size={13} className="text-white" />
                    </div>
                </div>
                {/* Info — visível só quando expanded */}
                <div className="nav-label flex-1 min-w-0 text-left">
                    <p className="text-[12px] font-medium text-white truncate leading-tight">{activeOrg.name}</p>
                    <p className="text-[10px] text-blue-200 leading-tight">{activeOrg.myRole}</p>
                </div>
                <div className="nav-label mr-2 shrink-0">
                    <ChevronDown size={12} className={`text-blue-200 transition-transform ${open ? 'rotate-180' : ''}`} />
                </div>
            </button>

            {/* Tooltip modo colapsado */}
            {hovered && !expanded && !open && (
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-[9999] pointer-events-none">
                    <div className="bg-gray-900 text-white text-xs font-medium rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
                        <p className="font-semibold">{activeOrg.name}</p>
                        <p className="text-blue-300 mt-0.5">{activeOrg.myRole}</p>
                    </div>
                </div>
            )}

            {/* Dropdown — fixed para escapar do overflow:hidden da sidebar */}
            {open && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-[9998]"
                        onClick={() => setOpen(false)}
                    />

                    {/* Menu */}
                    <div
                        className="fixed z-[9999] w-64 bg-surface-raised border border-border-default rounded-xl shadow-xl overflow-hidden"
                        style={{ top: dropdownPos.top, left: dropdownPos.left }}
                    >
                        <div className="px-3 py-2 border-b border-border-default">
                            <p className="text-xs font-medium text-content-secondary">Suas organizações</p>
                        </div>

                        {/* Lista de orgs */}
                        <div className="py-1 max-h-52 overflow-auto">
                            {orgs.length === 0 ? (
                                <div className="px-3 py-3 text-center">
                                    <p className="text-xs text-content-secondary">Nenhuma organização encontrada</p>
                                </div>
                            ) : (
                                orgs.map(org => (
                                    <button
                                        key={org.id}
                                        onClick={() => handleSwitch(org)}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-surface-hover transition-colors text-left"
                                    >
                                        <div className="w-7 h-7 rounded-lg bg-royalBlue/10 flex items-center justify-center shrink-0">
                                            <Building2 size={13} className="text-royalBlue" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-content-primary truncate">{org.name}</p>
                                            <p className="text-xs text-content-secondary">{org.myRole}</p>
                                        </div>
                                        {org.id === activeOrg.id && (
                                            <Check size={14} className="text-royalBlue shrink-0" />
                                        )}
                                    </button>
                                ))
                            )}
                        </div>

                        {/* Criar / entrar em outra */}
                        <div className="border-t border-border-default py-1">
                            <button
                                onClick={() => { setOpen(false); router.push('/onboarding'); }}
                                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-surface-hover transition-colors text-left"
                            >
                                <div className="w-7 h-7 rounded-lg bg-surface-sunken flex items-center justify-center shrink-0">
                                    <Plus size={13} className="text-content-secondary" />
                                </div>
                                <p className="text-sm text-content-secondary">Criar ou entrar em outra</p>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
