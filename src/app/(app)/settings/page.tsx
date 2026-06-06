import { redirect } from 'next/navigation';

// Configurações agora vivem no modal SettingsDialog aberto pela sidebar.
// Se alguém acessar /settings diretamente, volta para o início.
export default function SettingsPage() {
    redirect('/');
}
