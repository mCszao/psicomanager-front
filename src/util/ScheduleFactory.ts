import { AttendanceTypeEnum } from "@/types/schedule.dto";
import { normalizeDates } from "./DateUtils";

type ScheduleRegisterPayload = {
  patientId: string;
  dateStart: string;
  dateEnd?: string;
  type?: AttendanceTypeEnum;
};

type ScheduleFormData = {
  patientId?: string;
  dateStart: string;
  dateEnd?: string | null;
  type?: AttendanceTypeEnum;
};

/**
 * Monta o payload tipado para cadastro de agendamento.
 *
 * Recebe os dados brutos do formulário (datas no formato datetime-local)
 * e um patientId resolvido externamente. Não muta nenhum dos argumentos.
 *
 * @param formData  - Dados do formulário de agendamento
 * @param patientId - Id do paciente, tem precedência sobre formData.patientId
 * @returns Payload pronto para envio à API
 */
export default function ScheduleFactory(
  formData: ScheduleFormData,
  patientId: string
): ScheduleRegisterPayload {
  const { dateStart, dateEnd } = normalizeDates(formData.dateStart, formData.dateEnd);

  const payload: ScheduleRegisterPayload = {
    patientId,
    dateStart,
    type: formData.type,
  };

  if (dateEnd != null) payload.dateEnd = dateEnd;

  return payload;
}
