import { FolderOpen } from "lucide-react";
import PatientUploadButton from "./patient-upload-button";

interface PatientDocumentListProps {
    patientId: string;
    children: React.ReactNode;
}

export default function PatientDocumentList({ children, patientId }: PatientDocumentListProps) {
    return (
        <section className="flex flex-col rounded-2xl border border-border-default shadow-lg bg-surface-default overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border-default bg-surface-raised shrink-0">
                <h2 className="flex items-center gap-2 text-base font-semibold text-content-primary">
                    <FolderOpen size={18} /> Documentos
                </h2>
                <PatientUploadButton patientId={patientId} />
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
                {children}
            </div>
        </section>
    );
}
