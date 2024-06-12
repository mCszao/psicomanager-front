import { ReactElement, ReactNode } from "react";

export default function SectionShadowFlex(children: ReactElement){
    return (
        <section className="mt-5 max-w-[95vw] border rounded-md flex-1 flex-col shadow-lg ">
            {children}
        </section>
    )
}