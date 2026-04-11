"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ElementType, useState } from "react";

interface SideLinkProps {
    path: string;
    icon: ElementType;
    label: string;
    implemented?: boolean;
}

export default function SideLink({ path, icon: Icon, label, implemented = true }: SideLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === path || (path !== "/" && pathname.startsWith(path));
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
            <Link
                href={path}
                className={`rounded-xl p-3 w-full flex justify-center items-center transition-all duration-200
                    ${isActive ? "bg-white/20 shadow-inner" : "hover:bg-white/10"}`}
            >
                <Icon size={20} className={isActive ? "text-white" : "text-blue-100"} />
            </Link>
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
