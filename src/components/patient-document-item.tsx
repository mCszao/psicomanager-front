import Document from "@/interface/IDocument";
import { Download, FileText } from "lucide-react";

interface PatientDocumentItemProps {
    document: Document;
}

export default function PatientDocumentItem({ document }: PatientDocumentItemProps) {
    return (
        <a
            href={`http://localhost:8080/documents/download/${document.id}`}
            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border-default hover:bg-surface-raised transition-colors group"
        >
            <FileText size={18} className="text-royalBlue shrink-0" />
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-content-primary truncate">{document.name}</p>
                <p className="text-xs text-content-secondary">{document.type}</p>
            </div>
            <Download
                size={16}
                className="text-content-secondary shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
            />
        </a>
    );
}
