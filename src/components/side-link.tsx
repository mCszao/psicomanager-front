import Link from "next/link";
import { ElementType } from "react";

interface SideLinkProps {
    path: string;
    icon: ElementType;
}

export default function SideLink({ path, icon:Icon }: SideLinkProps) {
    return (
        <Link href={path}
          className="rounded-lg border border-transparent transition-colors p-5 hover:border-gray-300"
        >
            <Icon color="white"/>
        </Link>
    )
}