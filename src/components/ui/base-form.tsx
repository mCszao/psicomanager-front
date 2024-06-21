import { FormHTMLAttributes } from "react";

interface BaseFormProps extends FormHTMLAttributes<HTMLFormElement>{
    children: React.ReactNode;
}

export default function BaseForm({ children, ...props }: BaseFormProps) {
    return (
        <form {...props} className="p-4 md:p-5">
            {children}
        </form>
    )
}