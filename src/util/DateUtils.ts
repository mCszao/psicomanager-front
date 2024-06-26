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
    return new Date(date);
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
  return dateObject.toLocaleDateString(lang);
}

export function getFormattedHour(date: string) {
  const dateObject = DateBuilder(date);
  let hour = dateObject.getHours();
  let minutes = dateObject.getMinutes() > 0 ? dateObject.getMinutes() : "";
  return hour +"h"+minutes
}

export function reverseDate(date: string){
  let arrayStr: string[] = date.split("-");
  let newDate = arrayStr.reverse()
  
  return newDate.join("-");
}