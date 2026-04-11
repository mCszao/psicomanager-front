import { InputHTMLAttributes, forwardRef } from "react"

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, Props>(
    function CustomInput({ className, ...props }, ref) {
        return (
            <input
                {...props}
                ref={ref}
                className={`bg-surface-sunken border border-border-default text-content-primary placeholder:text-content-disabled text-sm rounded-lg focus:ring-royalBlue focus:border-royalBlue block w-full p-2.5 ${className ?? ''}`}
            />
        )
    }
)

export default Input;
