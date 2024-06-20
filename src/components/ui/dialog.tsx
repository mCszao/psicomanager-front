type Props = {
    children: React.ReactNode;
    closeFunc: () => void;
}

export default function Dialog({ children, closeFunc }: Props)  {
    return (
        <div aria-hidden="true" className="ml-20 overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-opacity-10 bg-black/30" onClick={closeFunc}>
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow ">
                    {children}
                </div>
            </div>
        </div>
    )
}