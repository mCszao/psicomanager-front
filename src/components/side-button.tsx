"use client";
import { ButtonHTMLAttributes, ElementType, useState } from "react";

interface SideButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: ElementType;
    label: string;
    implemented?: boolean;
}

export default function SideButton({ icon: Icon, label, implemented = true, ...props }: SideButtonProps) {
    const [hovered, setHovered] = useState(false);

    if (!implemented) {
        return (
            <div
                className="relative flex justify-center"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <button
                    disabled
                    className="rounded-xl p-3 w-full flex justify-center items-center opacity-40 cursor-not-allowed transition-all duration-200"
                >
                    <Icon size={20} className="text-blue-200" />
                </button>
                {hovered && (
                    <div className="fixed left-20 z-[9999] pointer-events-none"
                        style={{ marginTop: "-1.5rem", transform: "translateY(-50%)" }}
                    >
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
            className="relative flex justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <button
                {...props}
                className="rounded-xl p-3 w-full flex justify-center items-center hover:bg-white/10 active:bg-white/20 transition-all duration-200"
            >
                <Icon size={20} className="text-blue-100" />
            </button>
            {hovered && (
                <div className="fixed left-20 z-[9999] pointer-events-none"
                    style={{ marginTop: "-1.5rem", transform: "translateY(-50%)" }}
                >
                    <div className="bg-gray-900 text-white text-xs font-semibold rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
                        {label}
                    </div>
                </div>
            )}
        </div>
    );
}
