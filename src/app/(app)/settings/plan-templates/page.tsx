import metadataFactory from "@/util/metadataFactory";
import { serverGet } from "@/services/api/http-server";
import BaseResponse from "@/interface/IBaseResponse";
import { PlanTemplate } from "@/interface/IPlan";
import PlanTemplateList from "@/components/plan-template-list";
import HelpButton from "@/components/ui/help-button";

export const metadata = metadataFactory("Templates de plano");
export const dynamic = 'force-dynamic';

export default async function PlanTemplatesPage() {
    const response = await serverGet<BaseResponse<PlanTemplate[]>>('/plans/templates');
    const templates = response.object ?? [];

    return (
        <div className="flex flex-col h-full px-4 pt-4 pb-2 md:px-8 md:pt-8 md:pb-6 overflow-hidden gap-4">
            <div className="shrink-0">
                <h1 className="text-2xl md:text-3xl font-bold text-content-primary">Templates de plano</h1>
                <p className="text-sm text-content-secondary mt-1">Gerencie os modelos de plano de atendimento</p>
            </div>
            <div className="flex-1 min-h-0">
                <PlanTemplateList initialTemplates={templates} />
            </div>
            <HelpButton title="Como usar os templates de plano">
                    <div className="flex flex-col gap-4">
                        <p>
                            <strong className="font-semibold text-content-primary">Templates de plano</strong> são
                            modelos de planos de atendimento que você cria uma vez e reaproveita ao montar o
                            plano de um paciente — evitando preencher os mesmos dados repetidamente.
                        </p>

                        <div className="flex flex-col gap-2">
                            <p className="font-medium text-content-primary">Como criar um template</p>
                            <ol className="flex flex-col gap-1.5 list-decimal list-inside">
                                <li>Clique em <strong className="font-semibold text-content-primary">Novo template</strong>.</li>
                                <li>Defina um <strong className="font-semibold text-content-primary">título</strong> (ex.: &quot;Plano Padrão&quot;).</li>
                                <li>Informe o <strong className="font-semibold text-content-primary">valor por sessão</strong> e o <strong className="font-semibold text-content-primary">número de sessões</strong>.</li>
                                <li>Escolha a <strong className="font-semibold text-content-primary">frequência</strong> e o <strong className="font-semibold text-content-primary">tipo de atendimento</strong>.</li>
                                <li>O <strong className="font-semibold text-content-primary">valor total</strong> é calculado automaticamente. Clique em <strong className="font-semibold text-content-primary">Criar template</strong>.</li>
                            </ol>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="font-medium text-content-primary">Dicas</p>
                            <ul className="flex flex-col gap-1.5 list-disc list-inside">
                                <li>Use o ícone de lixeira para remover um template que não usa mais.</li>
                                <li>Crie templates diferentes para cada modalidade (presencial/online) ou frequência.</li>
                            </ul>
                        </div>
                    </div>
                </HelpButton>
        </div>
    );
}
