export interface GreetingSegment {
    text: string;
    highlight: boolean;
}

export function buildGreeting(hour: number, username: string): GreetingSegment[] {
    if (hour >= 5 && hour < 12) return [
        { text: 'Tenha uma ', highlight: false },
        { text: 'manhã', highlight: true },
        { text: ' produtiva, ', highlight: false },
        { text: username, highlight: true },
        { text: '!', highlight: false },
    ];
    if (hour >= 12 && hour < 18) return [
        { text: 'Espero que sua ', highlight: false },
        { text: 'tarde', highlight: true },
        { text: ' esteja sendo incrível, ', highlight: false },
        { text: username, highlight: true },
        { text: '!', highlight: false },
    ];
    if (hour >= 18 && hour < 24) return [
        { text: 'Boa ', highlight: false },
        { text: 'noite', highlight: true },
        { text: ', ', highlight: false },
        { text: username, highlight: true },
        { text: '! Espero que seu dia tenha sido ótimo.', highlight: false },
    ];
    return [
        { text: 'Ainda acordado, ', highlight: false },
        { text: username, highlight: true },
        { text: '? Cuide-se!', highlight: false },
    ];
}
