import { format, parseISO } from 'date-fns';

const US_DATE_FORMAT = 'MM-dd-yyyy HH:mm';
const US_TIME_FORMAT = 'hh:mm';

const formatFHIRDate = (date: string, formatType: string) => {
    try {
        return format(parseISO(date), formatType);
    } catch {
        console.error(`Invalid date format: ${date}`);
        return String(date);
    }
};

export const formatHumanDateTime = (date: string) => {
    return formatFHIRDate(date, US_DATE_FORMAT);
};

export const formatHumanTime = (date: string) => {
    return formatFHIRDate(date, US_TIME_FORMAT);
};
