import BaseContainerProps from "@/interface/IBaseContainerProps";
import { FormHTMLAttributes } from "react";

interface BaseFormProps extends FormHTMLAttributes<HTMLFormElement>, BaseContainerProps{
}

export default function BaseForm({ children, ...props }: BaseFormProps) {
    return (
        <form {...props} className="p-4 md:p-5">
            {children}
        </form>
    )
}