'use client';

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload } from "lucide-react";
import { uploadDocument } from "@/services/api";

interface PatientUploadButtonProps {
    patientId: string;
}

export default function PatientUploadButton({ patientId }: PatientUploadButtonProps) {
    const inputRef          = useRef<HTMLInputElement>(null);
    const router            = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState<string | null>(null);

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        setError(null);

        try {
            const res = await uploadDocument(patientId, file);
            if (res.success) {
                router.refresh();
            } else {
                setError('Erro ao enviar o arquivo.');
            }
        } catch {
            setError('Erro ao enviar o arquivo.');
        } finally {
            setLoading(false);
            if (inputRef.current) inputRef.current.value = '';
        }
    }

    return (
        <div className="flex flex-col items-end gap-1">
            <input
                ref={inputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
            />
            <button
                onClick={() => inputRef.current?.click()}
                disabled={loading}
                className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg bg-royalBlue text-white hover:opacity-90 transition-opacity disabled:opacity-50 font-medium"
            >
                {loading
                    ? <Loader2 size={15} className="animate-spin" />
                    : <Upload size={15} />
                }
                {loading ? 'Enviando…' : 'Upload'}
            </button>
            {error && (
                <p className="text-xs text-red-500">{error}</p>
            )}
        </div>
    );
}
