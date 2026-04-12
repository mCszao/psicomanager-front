import { getPatient } from "@/services/api";
import BaseResponse from "@/interface/IBaseResponse";
import Patient from "@/interface/IPatient";
import metadataFactory from "@/util/metadataFactory";
import { Calendar, Download, FileX, CalendarX, Mail, MapPin, Phone } from "lucide-react";
import PatientScheduleList from "@/components/patient-schedule-list";
import PatientScheduleItem from "@/components/patient-schedule-item";
import PatientDocumentList from "@/components/patient-document-list";
import PatientDocumentItem from "@/components/patient-document-item";
import { compareDate } from "@/util/DateUtils";

export const metadata = metadataFactory("Prontuário");

type PageProps = {
    params: { id: string }
}

export default async function Page({ params }: PageProps) {
    const { object } = await getPatient(params.id) as BaseResponse<Patient>;
    object?.schedules?.sort((a, b) => compareDate(a, b));

    const addr = object.address?.[0];

    return (
        <div className="flex flex-col h-screen px-8 pt-8 pb-6 overflow-hidden">

            {/* Header */}
            <div className="shrink-0 mb-6 flex items-start justify-between gap-6 pb-6 border-b border-border-default">
                <div className="flex items-start gap-4 border-l-4 border-royalBlue pl-4">
                    <div>
                        <h1 className="text-3xl font-bold text-royalBlue leading-tight">{object.name}</h1>
                        <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-2 text-sm text-content-secondary">
                            {object.email && (
                                <span className="flex items-center gap-1.5">
                                    <Mail size={14} className="shrink-0" /> {object.email}
                                </span>
                            )}
                            {object.phone && (
                                <span className="flex items-center gap-1.5">
                                    <Phone size={14} className="shrink-0" /> {object.phone}
                                </span>
                            )}
                            {object.birthdayDate && (
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={14} className="shrink-0" /> {object.birthdayDate}
                                </span>
                            )}
                            {addr && (
                                <span className="flex items-center gap-1.5">
                                    <MapPin size={14} className="shrink-0" />
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
                    <Download size={16} /> Gerar contrato
                </a>
            </div>

            {/* Body */}
            <div className="flex-1 min-h-0 grid grid-cols-2 gap-6">
                <PatientScheduleList>
                    {!object.schedules?.length ? (
                        <div className="flex flex-col items-center justify-center gap-2 py-12 text-content-secondary">
                            <CalendarX size={36} strokeWidth={1.5} />
                            <p className="text-sm font-medium">Sem acompanhamentos registrados.</p>
                        </div>
                    ) : (
                        object.schedules.map((item, i) => (
                            <PatientScheduleItem key={i} schedule={item} />
                        ))
                    )}
                </PatientScheduleList>

                <PatientDocumentList patientId={object.id}>
                    {!object.documents?.length ? (
                        <div className="flex flex-col items-center justify-center gap-2 py-12 text-content-secondary">
                            <FileX size={36} strokeWidth={1.5} />
                            <p className="text-sm font-medium">Nenhum documento enviado.</p>
                        </div>
                    ) : (
                        object.documents.map((item, i) => (
                            <PatientDocumentItem key={i} document={item} />
                        ))
                    )}
                </PatientDocumentList>
            </div>
        </div>
    );
}
