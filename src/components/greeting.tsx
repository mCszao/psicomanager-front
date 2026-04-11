"use client";

import { buildGreeting } from "@/util/greeting";

function getUsername(): string {
    const match = document.cookie.match(/(?:^|;\s*)username=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : "usuário";
}

export default function Greeting() {
    const hour = new Date().getHours();
    const username = getUsername();

    return (
        <p className="text-lg text-gray-500 dark:text-gray-400">
            {buildGreeting(hour, username)}
        </p>
    );
}
