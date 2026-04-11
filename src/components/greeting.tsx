"use client";

import { buildGreeting } from "@/util/greeting";

function getUsername(): string {
    const match = document.cookie.match(/(?:^|;\s*)username=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : "usuário";
}

export default function Greeting() {
    const hour = new Date().getHours();
    const username = getUsername();
    const segments = buildGreeting(hour, username);

    return (
        <p className="text-3xl font-light text-gray-600 dark:text-gray-300">
            {segments.map((segment, i) =>
                segment.highlight
                    ? <span key={i} className="font-semibold text-royalBlue">{segment.text}</span>
                    : <span key={i}>{segment.text}</span>
            )}
        </p>
    );
}
