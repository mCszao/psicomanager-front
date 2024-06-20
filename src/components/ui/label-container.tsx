type Props = {
    title: string;
    children: React.ReactNode;
}

export default function LabelContainer({ title, children }: Props) {
    return (
        <div className="col-span-2 mb-5">
            <label htmlFor="patient" className="block mb-2 text-sm font-medium text-gray-900">{title}</label>
            {children}
        </div>
    )
}