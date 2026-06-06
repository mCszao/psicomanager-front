import BaseContainerProps from "@/interface/IBaseContainerProps";
import { FormHTMLAttributes } from "react";

interface BaseFormProps extends FormHTMLAttributes<HTMLFormElement>, BaseContainerProps {}

export default function BaseForm({ children, ...props }: BaseFormProps) {
    return (
        <form
            {...props}
            className="flex flex-col gap-4 px-5 py-4 overflow-y-auto flex-1"
        >
            {children}
        </form>
    );
}
