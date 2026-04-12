import { useCallback, useRef } from "react";

type MaskFn = (value: string) => string;

/**
 * Hook genérico de máscara por inversão de dependência.
 * Recebe qualquer função de máscara e devolve um ref + handler prontos
 * para serem aplicados em qualquer input — sem acoplar com RHF ou com
 * a lógica específica de cada campo.
 */
export function useMask(maskFn: MaskFn) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const masked = maskFn(e.target.value);
            e.target.value = masked;
        },
        [maskFn]
    );

    return { inputRef, handleChange };
}
