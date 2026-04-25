import BaseResponse from "@/interface/IBaseResponse";
import Patient from "@/interface/IPatient";
import {Plan} from "@/interface/IPlan";
import metadataFactory from "@/util/metadataFactory";
import {serverGet} from "@/services/api/http-server";
import {Bell, Calendar, Download, Mail, MapPin, Phone} from "lucide-react";
import PatientTabbedPanel from "@/components/patient-tabbed-panel";
import AlertsPanel from "@/components/alerts-panel";
import {IAlert} from "@/interface/IAlert";

export const metadata = metadataFactory("Prontuário");
export const dynamic = 'force-dynamic';

type PageProps = {
    params: { id: string }
}

export default async function Page({params}: PageProps) {
    const {object} = await serverGet<BaseResponse<Patient>>(`/patients/${params.id}`);
    const plansRes = await serverGet<BaseResponse<Plan[]>>(`/plans/patient/${params.id}`);
    const alertsRes = await serverGet<BaseResponse<IAlert[]>>(`/alerts/patient/${params.id}`);

    object?.schedules?.sort((a, b) => new Date(b.dateStart).getTime() - new Date(a.dateStart).getTime());

    const plans = plansRes.object ?? [];
    const alerts = alertsRes.object ?? [];
    const addr = object.address?.[0];

    return (
        <div className="flex flex-col h-screen px-8 pt-8 pb-6 overflow-hidden gap-5">

            {/* Header */}
            <div
                className="shrink-0 rounded-2xl border border-border-default shadow-lg bg-surface-default px-5 py-4 flex items-start justify-between gap-6">
                <div className="flex items-start gap-4 border-l-4 border-royalBlue pl-4">
                    <div>
                        <h1 className="text-3xl font-bold text-royalBlue leading-tight">{object.name}</h1>
                        <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-2 text-sm text-content-secondary">
                            {object.email && (
                                <span className="flex items-center gap-1.5">
                                    <Mail size={14} className="shrink-0"/> {object.email}
                                </span>
                            )}
                            {object.phone && (
                                <span className="flex items-center gap-1.5">
                                    <Phone size={14} className="shrink-0"/> {object.phone}
                                </span>
                            )}
                            {object.birthdayDate && (
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={14} className="shrink-0"/> {object.birthdayDate}
                                </span>
                            )}
                            {addr && (
                                <span className="flex items-center gap-1.5">
                                    <MapPin size={14} className="shrink-0"/>
                                    {[addr.street, addr.district, addr.city, addr.abbreviation]
                                        .filter(Boolean)
                                        .join(', ')}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <a
                    href={`http://localhost:8080/documents/generate-contract?patientId=${object.id}`}
                    className="flex items-center gap-2 shrink-0 text-sm px-4 py-2 rounded-lg bg-royalBlue text-white hover:opacity-90 transition-opacity font-medium"
                >
                    <Download size={16}/> Gerar contrato
                </a>
            </div>

            {/* Body — tabbed panel ocupa toda a área */}
            <div className="flex-1 min-h-0">
                <PatientTabbedPanel
                    patientId={object.id}
                    schedules={object.schedules ?? []}
                    plans={plans}
                    documents={object.documents ?? []}
                />
            </div>

            {/* Avisos do paciente */}
            <div className="px-5 pb-4 border-t border-border-default pt-3">
                <div className="flex items-center gap-2 mb-2">
                    <Bell size={13} className="text-amber-500"/>
                    <span className="text-xs font-medium text-content-secondary">Avisos</span>
                </div>
                <AlertsPanel
                    initialAlerts={alerts}
                    patientId={object.id}
                    scope="PATIENT"
                />
            </div>
        </div>
    );
}
