import { parseISO, addDays, subMonths, format } from "date-fns";

//2024-06-18T11:16:27.000Z
export const keepStrWithHour = (dt: string | undefined) => {
  if (dt) {
    return `${dt.slice(8, 10)}/${dt.slice(5, 7)}/${dt.slice(0, 4)} ${dt.slice(
      11,
      19
    )}`;
  } else {
    return "";
  }
};

// Função para obter o offset em horas de um fuso específico
const getTimezone = (): number => {
  const date = new Date();
  const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
  const tzDate = new Date(
    date.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
  );
  return (utcDate.getTime() - tzDate.getTime()) / 60000 / 60;
};

export const dateNow = () => {
  const date = new Date();
  date.setHours(date.getUTCHours() - getTimezone());
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // +1 porque getMonth começa em 0
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
};

const todayZonedTime = () => {
  return new Date(new Date().setHours(new Date().getHours() - getTimezone()));
};

// Função para verificar se um dia é útil (segunda a sexta-feira)
const isWeekday = (date: Date): boolean => {
  const day = date.getDay();
  return day !== 0 && day !== 6; // 0 é domingo e 6 é sábado
};

// Função para verificar se um dia é útil (segunda a sábado)
const isWeekdayIncludingSaturday = (date: Date): boolean => {
  const day = date.getDay();
  return day !== 0; // 0 é domingo
};

// Função para calcular a diferença em dias úteis entre duas datas
const differenceInBusinessDays = (startDate: Date, endDate: Date): number => {
  let count = 0;
  let currentDate = startDate;
  while (currentDate <= endDate) {
    if (isWeekday(currentDate)) {
      count++;
    }
    currentDate = addDays(currentDate, 1);
  }
  return count;
};

// Função para calcular a diferença em dias úteis (incluindo sábado)entre duas datas
const differenceInBusinessDaysIncludingSaturday = (
  startDate: Date,
  endDate: Date
): number => {
  let count = 0;
  let currentDate = startDate;
  while (currentDate <= endDate) {
    if (isWeekdayIncludingSaturday(currentDate)) {
      count++;
    }
    currentDate = addDays(currentDate, 1);
  }
  return count;
};

// Função principal para validar se a diferença em dias úteis é maior que days
export const isOld = (date: string, days: number): boolean => {
  try {
    const today = todayZonedTime();
    const convertedDate = parseISO(date);
    if (convertedDate > today) {
      throw new Error("A data não pode ser futura.");
    }
    const daysDifference = differenceInBusinessDays(convertedDate, today);
    return daysDifference > days;
  } catch (error: any) {
    throw new Error(`Erro ao usar a data, verifique... ${error.message}`);
  }
};

export const isPending = (date: string, days: number): boolean => {
  try {
    const today = todayZonedTime();
    const dateReceived = parseISO(date);
    const daysDifference = differenceInBusinessDaysIncludingSaturday(
      dateReceived,
      today
    );
    return daysDifference > days;
  } catch (error: any) {
    throw new Error(`Erro ao usar a data, verifique... ${error.message}`);
  }
};

export const getDateMonthAgo = (month: number): string => {
  const currentDate = new Date();
  const monthAgo = subMonths(currentDate, month);
  return format(monthAgo, "yyyy-MM-dd HH:mm:ssxxx");
};
