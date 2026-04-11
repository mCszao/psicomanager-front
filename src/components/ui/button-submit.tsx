import BaseContainerProps from "@/interface/IBaseContainerProps";

type Props = BaseContainerProps & {
    title: string;
}

export default function ButtonSubmit({ title, children }: Props) {
    return (
        <button type="submit" className="text-white inline-flex items-center bg-royalBlue hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-royalBlue/30 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-opacity">
            {children}
            {title}
        </button>
    )
}
