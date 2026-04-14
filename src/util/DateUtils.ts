import Schedule from "@/interface/ISchedule";
import ScheduleDTO from "@/types/schedule.dto";

const optionsWeekDay: Intl.DateTimeFormatOptions  = {
    weekday: 'long',
  };

const optionsBase: Intl.DateTimeFormatOptions  = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const lang: string = 'pt-BR';

function DateBuilder(date: string){
    let convert = convertDate(date);
    return new Date(convert);
}
export function getFormatedDateToSchedule(date:string) {
  const dateObject = DateBuilder(date);
  let extendDate = dateObject.toLocaleDateString(lang, optionsBase);
  return `${extendDate} às ${date.split(" ")[1]}`
}

export function getFormatedWeekDay(date: string) {
  const dateObject = DateBuilder(date);
  return dateObject.toLocaleDateString(lang, optionsWeekDay);
}

export function changeScore(date: string) {
  const dateObject = DateBuilder(date);
  return dateObject.toLocaleDateString(lang,);
}

function convertDate(date: string) {
  let splited = reverseDate(date.split(' ')[0]);
  let convert = splited.split("-").join("/");
  return convert;
}

export function getFormatedHour(date: string) {
  let converted = convertDate(date);
  const dateObject = new Date(converted.concat(' ',date.split(' ')[1]));
  let hour = dateObject.getHours();
  let minutes = dateObject.getMinutes() > 0 ? dateObject.getMinutes() : "";
  return hour +"h"+minutes
}

export function reverseDate(date: string){
  let arrayStr: string[] = date.split("-");
  let newDate = arrayStr.reverse()
  
  return newDate.join("-");
}

/**
 * Normaliza as datas brutas de um ScheduleDTO sem mutar o objeto original.
 *
 * Inputs datetime-local retornam "HH:mm" — esta função adiciona ":00" para
 * satisfazer o formato "dd-MM-yyyy HH:mm:ss" exigido pela API.
 *
 * @param dateStart - Data de início no formato datetime-local (yyyy-MM-ddTHH:mm)
 * @param dateEnd   - Data de fim no mesmo formato, ou string vazia / null / undefined
 * @returns Objeto com dateStart e dateEnd já formatados para envio à API
 */
export function normalizeDates(
  dateStart: string,
  dateEnd: string | null | undefined
): { dateStart: string; dateEnd: string | null } {
  const normalizedStart = formatDate(dateStart.concat(":00"))!;
  const normalizedEnd =
    dateEnd == null || dateEnd === ""
      ? null
      : formatDate(dateEnd.concat(":00")) ?? null;

  return { dateStart: normalizedStart, dateEnd: normalizedEnd };
}

/** @deprecated Use normalizeDates — esta função muta o objeto recebido */
export function addDoubleOrNullOnSchedule(data: ScheduleDTO){
  data.dateStart = data.dateStart.concat(":00");
  data.dateEnd = (data.dateEnd == "") ? null : data.dateEnd?.concat(":00");
}

/** @deprecated Use normalizeDates — esta função muta o objeto recebido via addDoubleOrNullOnSchedule */
export function getFormatDates(data: ScheduleDTO){
  addDoubleOrNullOnSchedule(data);
  let dateStart = formatDate(data.dateStart);
  let dateEnd = formatDate(data.dateEnd);
  return { dateStart, dateEnd };  
}

export function formatDate(date: string | null | undefined){
  if(date == null) return;
  let splitted = date.split("T");
  let formatDate = reverseDate(splitted[0]);
  return formatDate.concat(" ", splitted[1]);
}

export function compareDate(a: Schedule , b: Schedule){
  const newA = DateTimeBuilder(a?.dateEnd).getTime();
  const newB = DateTimeBuilder(b?.dateEnd).getTime();

  if(newA < newB) return 1;
  if(newA > newB) return -1;
  return 0;
}

function DateTimeBuilder(date: string ){
  const dateAndTimeArr = date.split(" ");
  const dateArr = dateAndTimeArr[0].split("-");
  const timeArr = dateAndTimeArr[1].split(":")

  return new Date(dateArr[2],dateArr[1], dateArr[0], timeArr[0], timeArr[1], timeArr[2]);
}
