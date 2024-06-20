type Props = {
    title: string;
    textButton: React.ReactNode | string; 
    functionButton: () => void;
}

export default function DialogHeader(props: Props) {
    return (
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-lg font-semibold text-gray-900 ">
                {props.title}
            </h3>
            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={props.functionButton}>
                {props.textButton}
                <span className="sr-only">Close modal</span>
            </button>
        </div>
    )
}