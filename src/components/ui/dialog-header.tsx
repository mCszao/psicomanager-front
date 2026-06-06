type Props = {
    title: string;
    textButton: React.ReactNode | string;
    functionButton: () => void;
}

export default function DialogHeader({ title, textButton, functionButton }: Props) {
    return (
        <div className="flex items-center justify-between px-5 py-4 border-b border-border-default shrink-0">
            <h3 className="text-base font-semibold text-content-primary">
                {title}
            </h3>
            <button
                type="button"
                onClick={functionButton}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-content-secondary hover:text-content-primary hover:bg-surface-hover transition-colors"
            >
                {textButton}
                <span className="sr-only">Fechar</span>
            </button>
        </div>
    );
}
