import BaseContainerProps from "@/interface/IBaseContainerProps";

export default function Dialog(props: BaseContainerProps)  {
    return (
        <div aria-hidden="true" className="ml-20 overflow-y-auto overflow-x-hidden fixed z-40 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-opacity-10 ">
            <div className="relative p-4 w-full max-w-md max-h-full z-50">
                <div className="relative bg-white rounded-lg shadow ">
                    {props.children}
                </div>
            </div>
        </div>
    )
}