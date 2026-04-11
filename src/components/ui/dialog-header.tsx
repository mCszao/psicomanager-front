type Props = {
    title: string;
    textButton: React.ReactNode | string;
    functionButton: () => void;
}

export default function DialogHeader(props: Props) {
    return (
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-border-default rounded-t">
            <h3 className="text-lg font-semibold text-content-primary">
                {props.title}
            </h3>
            <button
                type="button"
                className="text-content-secondary bg-transparent hover:bg-surface-hover hover:text-content-primary rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors"
                onClick={props.functionButton}
            >
                {props.textButton}
                <span className="sr-only">Fechar</span>
            </button>
        </div>
    )
}
