"use client";

import { useState, useRef, useCallback } from "react";

export type TranscriptionStatus =
    | "idle"
    | "recording"
    | "transcribing"
    | "done"
    | "error";

type UseTranscriptionReturn = {
    status: TranscriptionStatus;
    pendingText: string | null;
    isDragging: boolean;
    startRecording: () => void;
    stopRecording: () => void;
    handleFileInput: (file: File) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDragLeave: () => void;
    onDrop: (e: React.DragEvent) => void;
    clearPending: () => void;
    errorMessage: string | null;
};

const WHISPER_SUPPORTED_TYPES = [
    "audio/flac", "audio/m4a", "audio/mp3", "audio/mp4",
    "audio/mpeg", "audio/mpga", "audio/ogg", "audio/wav", "audio/webm",
];

/**
 * Gerencia transcrição de áudio via dois canais:
 *  - Gravação ao vivo: Web Speech API (sem custo, roda no browser)
 *  - Arquivo de áudio: OpenAI Whisper API (multipart/form-data)
 *
 * O resultado fica em `pendingText` até o usuário decidir como aplicar.
 * A chave da API Whisper é lida de NEXT_PUBLIC_OPENAI_API_KEY.
 */
export function useTranscription(): UseTranscriptionReturn {
    const [status, setStatus] = useState<TranscriptionStatus>("idle");
    const [pendingText, setPendingText] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const accumulatedRef = useRef<string>("");

    // ─── Gravação ao vivo (Web Speech API) ───────────────────────────────────

    const startRecording = useCallback(() => {
        const SpeechRecognition =
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setErrorMessage("Seu navegador não suporta reconhecimento de voz. Use o Chrome.");
            setStatus("error");
            return;
        }

        accumulatedRef.current = "";
        const recognition: SpeechRecognition = new SpeechRecognition();
        recognition.lang = "pt-BR";
        recognition.continuous = true;
        recognition.interimResults = false;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    accumulatedRef.current += event.results[i][0].transcript + " ";
                }
            }
        };

        recognition.onerror = () => {
            setErrorMessage("Erro ao acessar o microfone. Verifique as permissões.");
            setStatus("error");
        };

        recognition.onend = () => {
            const transcript = accumulatedRef.current.trim();
            if (transcript) {
                setPendingText(transcript);
                setStatus("done");
            } else {
                setStatus("idle");
            }
        };

        recognitionRef.current = recognition;
        recognition.start();
        setStatus("recording");
        setErrorMessage(null);
    }, []);

    const stopRecording = useCallback(() => {
        recognitionRef.current?.stop();
    }, []);

    // ─── Upload de arquivo (Whisper) ──────────────────────────────────────────

    const transcribeFile = useCallback(async (file: File) => {
        if (!WHISPER_SUPPORTED_TYPES.includes(file.type)) {
            setErrorMessage("Formato não suportado. Use MP3, MP4, WAV, OGG, WEBM ou FLAC.");
            setStatus("error");
            return;
        }

        const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
        if (!apiKey) {
            setErrorMessage("Chave da API OpenAI não configurada (NEXT_PUBLIC_OPENAI_API_KEY).");
            setStatus("error");
            return;
        }

        setStatus("transcribing");
        setErrorMessage(null);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("model", "whisper-1");
            formData.append("language", "pt");

            const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
                method: "POST",
                headers: { Authorization: `Bearer ${apiKey}` },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const status = response.status;

                if (status === 429) {
                    setErrorMessage("Limite de requisições atingido. Adicione créditos em platform.openai.com/settings/billing e tente novamente.");
                } else if (status === 401) {
                    setErrorMessage("Chave da API inválida. Verifique o valor em NEXT_PUBLIC_OPENAI_API_KEY no arquivo .env.local.");
                } else if (status === 413) {
                    setErrorMessage("Arquivo muito grande. O limite do Whisper é 25 MB.");
                } else {
                    const msg = errorData?.error?.message;
                    setErrorMessage(msg ?? `Erro ao transcrever (código ${status}). Tente novamente.`);
                }

                setStatus("error");
                return;
            }

            const data = await response.json();
            setPendingText(data.text?.trim() ?? "");
            setStatus("done");
        } catch (err) {
            console.error("Erro na transcrição:", err);
            setErrorMessage("Falha de conexão ao tentar transcrever. Verifique sua internet e tente novamente.");
            setStatus("error");
        }
    }, []);

    const handleFileInput = useCallback((file: File) => {
        transcribeFile(file);
    }, [transcribeFile]);

    // ─── Drag and drop ────────────────────────────────────────────────────────

    const onDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback(() => {
        setIsDragging(false);
    }, []);

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) transcribeFile(file);
    }, [transcribeFile]);

    // ─── Utils ────────────────────────────────────────────────────────────────

    const clearPending = useCallback(() => {
        setPendingText(null);
        setStatus("idle");
        setErrorMessage(null);
    }, []);

    return {
        status,
        pendingText,
        isDragging,
        startRecording,
        stopRecording,
        handleFileInput,
        onDragOver,
        onDragLeave,
        onDrop,
        clearPending,
        errorMessage,
    };
}
