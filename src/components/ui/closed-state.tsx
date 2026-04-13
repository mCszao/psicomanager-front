type Props = {
    icon: React.ReactNode;
    iconBg: string;
    title: string;
    children: React.ReactNode;
};

export default function ClosedState({ icon, iconBg, title, children }: Props) {
    return (
        <div className="flex flex-col items-center gap-3 py-5 px-2 text-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${iconBg}`}>
                {icon}
            </div>
            <p className="text-sm font-semibold text-content-primary">{title}</p>
            <div className="flex flex-col gap-1 w-full">
                {children}
            </div>
        </div>
    );
}
