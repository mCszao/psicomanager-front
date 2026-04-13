type Props = {
    label: string;
    value: React.ReactNode;
};

export default function InfoRow({ label, value }: Props) {
    return (
        <div className="flex items-center justify-between gap-2 px-1 text-xs">
            <span className="text-content-secondary shrink-0">{label}</span>
            <span className="text-content-primary font-medium text-right">{value}</span>
        </div>
    );
}
