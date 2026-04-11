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

    const baseItem = `w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 mx-auto`;

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
                    <div className="fixed left-[84px] z-[9999] pointer-events-none -translate-y-1/2 top-auto"
                        style={{ marginTop: "0" }}
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
            className="relative flex justify-center py-0.5"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Link
                href={path}
                className={`${baseItem} ${isActive ? "bg-white/20 shadow-inner" : "hover:bg-white/10"}`}
            >
                <Icon size={20} className={isActive ? "text-white" : "text-blue-100"} />
            </Link>
            {hovered && (
                <div className="fixed left-[84px] z-[9999] pointer-events-none -translate-y-1/2 top-auto">
                    <div className="bg-gray-900 text-white text-xs font-semibold rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
                        {label}
                    </div>
                </div>
            )}
        </div>
    );
}
