import BaseContainerProps from "@/interface/IBaseContainerProps";

type Props = BaseContainerProps & {
    title: string;
    labelFor?: string;
}

export default function LabelContainer({ title, labelFor, children }: Props) {
    return (
        <div className="col-span-2 mb-5">
            <label htmlFor={labelFor} className="block mb-2 text-sm font-medium text-gray-900">{title}</label>
            {children}
        </div>
    )
}