"use client";

import { FileText, Mic, MicOff, AlertCircle } from "lucide-react";
import { useAnnotations } from "@/hooks/useAnnotations";
import { useTranscription } from "@/hooks/useTranscription";
import TranscriptionMergeDialog from "@/components/transcription-merge-dialog";

type AnnotationsPanelProps = {
    scheduleId: string;
    initialAnnotations: string | null;
};

/**
 * Painel de anotações com suporte a duas formas de entrada:
 *  1. Digitação direta no textarea
 *  2. Gravação de voz ao vivo (Web Speech API)
 *
 * Upload e drag-and-drop de arquivo (Whisper) estão implementados
 * em useTranscription mas ocultos até o billing da OpenAI ser configurado.
 *
 * Após a transcrição, um modal pergunta se o texto deve ser
 * adicionado ao existente ou substituí-lo.
 */
export default function AnnotationsPanel({ scheduleId, initialAnnotations }: AnnotationsPanelProps) {
    const { text, setText, loading: saving, handleSave, applyTranscription } = useAnnotations(scheduleId, initialAnnotations);
    const {
        status,
        pendingText,
        startRecording,
        stopRecording,
        clearPending,
        errorMessage,
    } = useTranscription();

    const isRecording = status === "recording";

    function handleMicClick() {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    }

    function handleMergeAppend() {
        if (pendingText) applyTranscription(pendingText, "append");
        clearPending();
    }

    function handleMergeReplace() {
        if (pendingText) applyTranscription(pendingText, "replace");
        clearPending();
    }

    return (
        <>
            <div className="flex-1 flex flex-col rounded-2xl border border-border-default shadow-lg bg-surface-default overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-border-default bg-surface-raised shrink-0">
                    <h2 className="flex items-center gap-2 text-base font-semibold text-content-primary">
                        <FileText size={18} /> Anotações
                    </h2>

                    {/* Botão de microfone */}
                    <button
                        type="button"
                        onClick={handleMicClick}
                        title={isRecording ? "Parar gravação" : "Gravar voz"}
                        className={`rounded-lg flex items-center gap-1.5 px-3 h-8 transition-colors ${
                            isRecording
                                ? "bg-red-500/10 text-red-500 hover:bg-red-500/20 animate-pulse"
                                : "text-content-secondary hover:text-content-primary hover:bg-surface-hover"
                        }`}
                    >
                        {isRecording ? <MicOff size={15} /> : <Mic size={15} />}
                        <span className="text-xs font-medium">{isRecording ? "Parar" : "Gravar"}</span>
                    </button>
                </div>

                {/* Textarea + feedback */}
                <div className="flex-1 flex flex-col p-4 gap-3 min-h-0">

                    {/* Recording indicator */}
                    {isRecording && (
                        <div className="flex items-center gap-2 text-xs text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 shrink-0">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            Gravando… Clique em <strong>parar</strong> quando terminar.
                        </div>
                    )}

                    {/* Error indicator */}
                    {status === "error" && errorMessage && (
                        <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2 shrink-0">
                            <AlertCircle size={13} className="shrink-0" />
                            {errorMessage}
                        </div>
                    )}

                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Registre as anotações desta sessão…"
                        className="flex-1 resize-none bg-surface-sunken text-content-primary placeholder:text-content-disabled border border-border-default rounded-lg p-4 text-sm focus:ring-royalBlue focus:border-royalBlue outline-none"
                    />

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="self-end text-sm px-4 py-2 rounded-lg bg-royalBlue text-white hover:opacity-90 transition-opacity font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? "Salvando…" : "Salvar anotação"}
                    </button>
                </div>
            </div>

            {/* Modal de merge */}
            {pendingText !== null && (
                <TranscriptionMergeDialog
                    transcribedText={pendingText}
                    hasExistingText={text.trim().length > 0}
                    onAppend={handleMergeAppend}
                    onReplace={handleMergeReplace}
                    onCancel={clearPending}
                />
            )}
        </>
    );
}
