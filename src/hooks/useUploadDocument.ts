import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/ToastContext";
import { uploadDocument } from "@/services/api";

interface UseUploadDocumentProps {
    patientId: string;
}

export function useUploadDocument({ patientId }: UseUploadDocumentProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const router   = useRouter();
    const toast    = useToast();
    const [loading, setLoading] = useState(false);

    function openFilePicker() {
        inputRef.current?.click();
    }

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);

        try {
            const res = await uploadDocument(patientId, file);
            if (res.success) {
                toast.success('Documento enviado com sucesso!');
                router.refresh();
            } else {
                toast.error('Erro ao enviar o arquivo.');
            }
        } catch {
            toast.error('Erro ao enviar o arquivo.');
        } finally {
            setLoading(false);
            if (inputRef.current) inputRef.current.value = '';
        }
    }

    return { inputRef, loading, openFilePicker, handleFileChange };
}
