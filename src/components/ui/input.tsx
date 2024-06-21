import { useForm } from "react-hook-form";
import { InputHTMLAttributes, forwardRef  } from "react"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
}

const Input = forwardRef<HTMLInputElement, Props>(
    function CustomInput({...props}, ref) { 
        return (
            <input {...props} ref={ref} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"/>
        )
    }
)

export default Input;