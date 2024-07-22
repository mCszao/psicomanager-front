import Schedule from "@/interface/ISchedule"

interface PatientScheduleItemProps {
    schedule: Schedule;
}

export default function PatientScheduleItem( { schedule }: PatientScheduleItemProps) {
    return (
        <div className="border border-royalBlue bg hover:bg-royalBlue hover:text-white rounded-md mt-2 p-2 cursor-pointer">
            <p className="m-1 max-w-[30ch] text-sm opacity-50">
                Data: {schedule.dateStart}
            </p>
            <p className="m-1 max-w-[30ch] text-sm opacity-50">
                Status: {schedule.stage}
            </p>
        </div>
    )
}