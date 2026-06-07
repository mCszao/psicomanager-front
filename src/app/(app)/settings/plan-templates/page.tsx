import metadataFactory from "@/util/metadataFactory";
import { serverGet } from "@/services/api/http-server";
import BaseResponse from "@/interface/IBaseResponse";
import { PlanTemplate } from "@/interface/IPlan";
import PlanTemplateList from "@/components/plan-template-list";

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
        </div>
    );
}
