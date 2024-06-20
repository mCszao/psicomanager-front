import { InputHTMLAttributes } from "react"

type Props = {
    props?: InputHTMLAttributes<HTMLInputElement>;
}

export default function Input({ props }: Props) { 
    return (
        <input type="text" {...props} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"/>
    )
}