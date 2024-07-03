import Session  from "@/interface/ISchedule";
import { getFormattedWeekDay, changeScore, getFormattedHour } from "@/util/DateUtils";
import stageObjectBuilder from "@/util/stageObjectBuilder";
import Link from "next/link";

interface ItemScheduleSessionProps{
    data: Session;
}
export default function ItemScheduleSession(props: ItemScheduleSessionProps) {
    const { ptStage } = stageObjectBuilder(props.data.stage);
    return ( 
        <Link
        href={"/schedules/"+props.data.id}
        className="group rounded-lg border border-transparent px-5 py-4 h-1/3 transition-colors bg-royalBlue hover:border-gray-300 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        rel="noopener noreferrer"
        >
        <h2 className="mb-3 text-2xl font-semibold">
            {props.data.patient?.name}
        </h2>
        <p className="m-0 max-w-[30ch] text-lg opacity-50">
            {getFormattedWeekDay(props.data.dateStart)}
        </p>
        <p className="m-0 max-w-[30ch] text-sm opacity-50">
            {/* 24/05/2024 - Sexta Feira, 19h */}
            {changeScore(props.data.dateStart)} - {getFormattedHour(props.data.dateStart)}
        </p>
        <p className="mt-5 max-w-[30ch] text-sm opacity-50">
            {ptStage}
        </p>
        </Link>
    )
}