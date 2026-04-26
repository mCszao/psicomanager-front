import { AttendanceTypeEnum, FrequencyEnum } from "@/types/plan.dto";

export interface PlanTemplate {
    id: string;
    title: string;
    pricePerSession: number;
    sessionsCount: number;
    frequency: FrequencyEnum;
    totalValue: number;
    attendanceType?: AttendanceTypeEnum | null;
}

export interface Plan {
    id: string;
    patient: { id: string; name: string; birthdayDate: string; email: string };
    planTemplate?: PlanTemplate | null;
    title?: string;
    pricePerSession: number;
    sessionsCount: number;
    frequency?: FrequencyEnum | null;
    totalValue: number;
    attendanceType?: AttendanceTypeEnum | null;
    adherenceDate: string;
    estimatedEndDate?: string | null;
    startedAt?: string | null;
    endedAt?: string | null;
    isActive: boolean;
    isContinuous: boolean;
}
