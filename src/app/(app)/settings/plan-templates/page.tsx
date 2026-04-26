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
        <div className="flex flex-col h-screen px-4 pt-4 pb-2 md:px-8 md:pt-8 md:pb-6 overflow-hidden gap-3 md:gap-5">
            <div className="shrink-0 rounded-2xl border border-border-default shadow-lg bg-surface-default px-4 py-3 md:px-5 md:py-4">
                <h2 className="text-xl md:text-3xl font-semibold text-royalBlue">Templates de plano</h2>
            </div>
            <div className="flex-1 min-h-0 overflow-auto rounded-2xl border border-border-default shadow-lg bg-surface-default">
                <PlanTemplateList initialTemplates={templates} />
            </div>
        </div>
    );
}
