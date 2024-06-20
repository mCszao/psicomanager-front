type Props = {
    children: React.ReactNode;
}

export default function BaseForm({ children }: Props) {
    return (
        <form className="p-4 md:p-5">
            {children}
        </form>
    )
}