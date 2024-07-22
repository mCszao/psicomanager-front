import BaseContainerProps from "@/interface/IBaseContainerProps";

interface PatientScheduleListProps extends BaseContainerProps {}

export default function PatientScheduleList({ children} : PatientScheduleListProps) {
    return (
        <section className="mt-5 max-w-[95vw] border rounded-md flex-1 flex-col shadow-lg p-5">
            <h2 className="text-2xl mt-5 font-semibold">
                Acompanhamentos
            </h2>
            {children}
        </section>
    )
}