import { AttendanceTypeEnum } from "@/types/schedule.dto";

type AttendanceTypeObject = {
    color: string;
    ptType: string;
    icon: string;
}

export default function attendanceTypeObjectBuilder(type: AttendanceTypeEnum | string | undefined): AttendanceTypeObject {
    switch (type) {
        case 'PRESENTIAL':
            return { color: 'indigo', ptType: 'PRESENCIAL', icon: '🏢' };
        case 'REMOTE':
            return { color: 'teal', ptType: 'REMOTO', icon: '💻' };
        default:
            return { color: 'indigo', ptType: 'PRESENCIAL', icon: '🏢' };
    }
}
