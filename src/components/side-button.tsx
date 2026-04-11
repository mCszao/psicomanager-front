"use client";
import { ButtonHTMLAttributes, ElementType, useState } from "react";

interface SideButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: ElementType;
    label: string;
    implemented?: boolean;
    variant?: "default" | "danger";
}

export default function SideButton({ icon: Icon, label, implemented = true, variant = "default", ...props }: SideButtonProps) {
    const [hovered, setHovered] = useState(false);

    const isDanger = variant === "danger";

    const baseItem = `w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 mx-auto`;
    const hoverClass = isDanger ? "hover:bg-red-500/20 active:bg-red-500/30" : "hover:bg-white/10 active:bg-white/20";
    const iconClass = isDanger ? "text-red-300" : "text-blue-100";

    if (!implemented) {
        return (
            <div
                className="relative flex justify-center py-0.5"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div className={`${baseItem} opacity-40 cursor-not-allowed`}>
                    <Icon size={20} className="text-blue-200" />
                </div>
                {hovered && (
                    <div className="fixed left-[84px] z-[9999] pointer-events-none -translate-y-1/2">
                        <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
                            <p className="font-semibold">{label}</p>
                            <p className="text-yellow-400 font-normal mt-0.5">⚠ Funcionalidade não implementada</p>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div
            className="relative flex justify-center py-0.5"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <button
                {...props}
                className={`${baseItem} ${hoverClass}`}
            >
                <Icon size={20} className={iconClass} />
            </button>
            {hovered && (
                <div className="fixed left-[84px] z-[9999] pointer-events-none -translate-y-1/2">
                    <div className={`text-white text-xs font-semibold rounded-lg px-3 py-2 whitespace-nowrap shadow-xl ${isDanger ? "bg-red-700" : "bg-gray-900"}`}>
                        {label}
                    </div>
                </div>
            )}
        </div>
    );
}
