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
        <div className="flex flex-col h-screen px-8 pt-8 pb-6 overflow-hidden gap-5">
            <div className="shrink-0 rounded-2xl border border-border-default shadow-lg bg-surface-default px-5 py-4 flex items-center justify-between">
                <h2 className="text-3xl font-semibold text-royalBlue">Templates de plano</h2>
            </div>
            <div className="flex-1 min-h-0 overflow-auto rounded-2xl border border-border-default shadow-lg bg-surface-default">
                <PlanTemplateList initialTemplates={templates} />
            </div>
        </div>
    );
}
