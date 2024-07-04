import ScheduleDTO from "@/app/types/schedule.dto";

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
export function getFormattedDateToSchedule(date:string) {
  const dateObject = DateBuilder(date);
  let extendDate = dateObject.toLocaleDateString(lang, optionsBase);
  return `${extendDate} às ${date.split(" ")[1]}`
}

export function getFormattedWeekDay(date: string) {
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

export function getFormattedHour(date: string) {
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

export function addDoubleOrNullOnSchedule(data: ScheduleDTO){
  data.dateStart = data.dateStart.concat(":00");
  data.dateEnd = (data.dateEnd == "") ? null : data.dateEnd?.concat(":00");
}

export function getFormattDates(data: ScheduleDTO){
  addDoubleOrNullOnSchedule(data);
  let dateStart = formattDate(data.dateStart);
  let dateEnd = formattDate(data.dateEnd);
  return { dateStart, dateEnd };  
}

export function formattDate(date: string | null | undefined){
  if(date == null) return;
  let splitted = date.split("T");
  let formattDate = reverseDate(splitted[0]);
  return formattDate.concat(" ", splitted[1]);
}