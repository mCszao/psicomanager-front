import BaseContainerProps from "@/interface/IBaseContainerProps";
import { FolderOpen } from "lucide-react";

interface PatientDocumentListProps extends BaseContainerProps {}

export default function PatientDocumentList( { children }: PatientDocumentListProps) {
    return (
        <section className="mt-5 ml-5 max-w-[95vw] flex-1 shadow-lg p-5 border rounded-md ">
            <h2 className="flex items-center gap-3 text-2xl mt-5 font-semibold">
            <FolderOpen /> Documentos
            </h2>
            {children}
        </section>
    )
}