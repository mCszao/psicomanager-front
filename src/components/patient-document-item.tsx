import Document from "@/interface/IDocument";
import { File } from "lucide-react";

interface PatientDocumentItemProps {
    document: Document;
}

export default function PatientDocumentItem({ document }: PatientDocumentItemProps) {
    return (
        <a href={`http://localhost:8080/documents/download/${document.id}`} className="border block p-2 cursor-pointer hover:scale-y-105">
        <File />
        <p className="m-1 max-w-[30ch] text-sm opacity-50">
E        {document.name}
        </p>
        <p className="m-1 max-w-[30ch] text-sm opacity-50">
            {document.type}
        </p>
    </a>
    )
}