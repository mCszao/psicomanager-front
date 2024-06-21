import { ButtonHTMLAttributes, ElementType } from "react";

interface SideButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    icon: ElementType;
}

export default function SideButton({ icon: Icon, ...props }: SideButtonProps) {
    return (
        <button
          {...props}
          className="rounded-lg border border-transparent transition-colors p-5 hover:border-gray-300"
          >
            <Icon color="white"/>
          </button>
    )
}