import { forwardRef, useCallback } from "react";
import { InputHTMLAttributes } from "react";
import Input from "./input";

type MaskFn = (value: string) => string;

interface MaskedInputProps extends InputHTMLAttributes<HTMLInputElement> {
    mask: MaskFn;
}

/**
 * Componente de input com máscara por inversão de dependência.
 * Recebe qualquer função de máscara via prop — não conhece CPF, telefone
 * nem CEP. Compatível com React Hook Form via forwardRef.
 */
const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
    function MaskedInput({ mask, onChange, ...props }, ref) {
        const handleChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                e.target.value = mask(e.target.value);
                onChange?.(e);
            },
            [mask, onChange]
        );

        return <Input {...props} ref={ref} onChange={handleChange} />;
    }
);

export default MaskedInput;
