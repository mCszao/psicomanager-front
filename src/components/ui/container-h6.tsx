import BaseContainerProps from "@/interface/IBaseContainerProps";

export default function ContainerH6({ children }: BaseContainerProps) {
    return (
        <div className="hidden sm:block">
            <h6
            className="font-sans text-xl antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900 group-hover:text-white flex gap-5 items-center">
            { children }
            </h6>
        </div>
    )
}