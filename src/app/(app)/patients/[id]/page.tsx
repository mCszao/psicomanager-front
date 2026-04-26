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
        <div className="flex flex-col h-screen px-4 pt-4 pb-2 md:px-8 md:pt-8 md:pb-6 overflow-hidden gap-3 md:gap-5">

            {/* Header */}
            <div className="shrink-0 rounded-2xl border border-border-default shadow-lg bg-surface-default px-4 py-3 md:px-5 md:py-4 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 md:gap-4 border-l-4 border-royalBlue pl-3 md:pl-4 min-w-0">
                    <div className="min-w-0">
                        <h1 className="text-xl md:text-3xl font-bold text-royalBlue leading-tight truncate">{object.name}</h1>
                        <div className="flex flex-wrap gap-x-3 md:gap-x-5 gap-y-1 mt-1 md:mt-2 text-xs md:text-sm text-content-secondary">
                            {object.email && (
                                <span className="hidden sm:flex items-center gap-1.5">
                                    <Mail size={13} className="shrink-0"/> {object.email}
                                </span>
                            )}
                            {object.phone && (
                                <span className="flex items-center gap-1.5">
                                    <Phone size={13} className="shrink-0"/> {object.phone}
                                </span>
                            )}
                            {object.birthdayDate && (
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={13} className="shrink-0"/> {object.birthdayDate}
                                </span>
                            )}
                            {addr && (
                                <span className="hidden md:flex items-center gap-1.5">
                                    <MapPin size={13} className="shrink-0"/>
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
                    className="flex items-center gap-1.5 shrink-0 text-xs md:text-sm px-3 md:px-4 py-2 rounded-lg bg-royalBlue text-white hover:opacity-90 transition-opacity font-medium"
                >
                    <Download size={14}/> <span className="hidden sm:inline">Gerar contrato</span>
                </a>
            </div>

            {/* Tabbed panel */}
            <div className="flex-1 min-h-0">
                <PatientTabbedPanel
                    patientId={object.id}
                    schedules={object.schedules ?? []}
                    plans={plans}
                    documents={object.documents ?? []}
                />
            </div>

            {/* Avisos */}
            <div className="shrink-0 px-4 py-3 md:px-5 border border-border-default rounded-2xl bg-surface-default shadow-lg">
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
