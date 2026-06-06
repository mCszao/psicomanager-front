'use client';

import { buildGreeting } from '@/util/greeting';

type Props = {
    username: string;
};

export default function Greeting({ username }: Props) {
    const hour = new Date().getHours();
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
