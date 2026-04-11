const greetings = [
    { from: 5,  to: 12, message: (name: string) => `Tenha uma manhã produtiva, ${name}!` },
    { from: 12, to: 18, message: (name: string) => `Espero que sua tarde esteja sendo incrível, ${name}!` },
    { from: 18, to: 24, message: (name: string) => `Boa noite, ${name}! Espero que seu dia tenha sido ótimo.` },
    { from: 0,  to: 5,  message: (name: string) => `Ainda acordado, ${name}? Cuide-se!` },
];

export function buildGreeting(hour: number, username: string): string {
    const period = greetings.find(({ from, to }) => hour >= from && hour < to);
    return period ? period.message(username) : `Olá, ${username}!`;
}
