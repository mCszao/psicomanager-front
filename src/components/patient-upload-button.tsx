'use client';

import { Loader2, Upload } from "lucide-react";
import { useUploadDocument } from "@/hooks/useUploadDocument";

interface PatientUploadButtonProps {
    patientId: string;
}

export default function PatientUploadButton({ patientId }: PatientUploadButtonProps) {
    const { inputRef, loading, openFilePicker, handleFileChange } = useUploadDocument({ patientId });

    return (
        <div className="flex flex-col items-end gap-1">
            <input
                ref={inputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
            />
            <button
                onClick={openFilePicker}
                disabled={loading}
                className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg bg-royalBlue text-white hover:opacity-90 transition-opacity disabled:opacity-50 font-medium"
            >
                {loading
                    ? <Loader2 size={15} className="animate-spin" />
                    : <Upload size={15} />
                }
                {loading ? 'Enviando…' : 'Upload'}
            </button>
        </div>
    );
}
