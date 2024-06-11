import { Schedule } from "@/interface/ISchedule";
import Link from "next/link";

interface ItemScheduleSessionProps{
    data: Schedule;
}
export default function ItemScheduleSession(props: ItemScheduleSessionProps) {
    return (
        <section className="mb-32 grid text-center gap-5 lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
                    <Link
                    href={props.data.id}
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors bg-royalBlue hover:border-gray-300 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    <h2 className="mb-3 text-2xl font-semibold">
                        {props.data.patient.name}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                        -&gt;
                        </span>
                    </h2>
                    <p className="m-0 max-w-[30ch] text-sm opacity-50">
                        {/* 24/05/2024 - Sexta Feira, 19h */}
                        {props.data.dateStart}
                    </p>
                    <p className="m-0 max-w-[30ch] text-sm opacity-50">
                        {props.data.stage}
                    </p>
                    </Link>
                 </section>
    )
}