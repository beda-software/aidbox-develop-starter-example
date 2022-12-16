import { format, parseISO } from 'date-fns';

const US_DATE_TIME_FORMAT = 'MM-dd-yyyy HH:mm';

const formatFHIRDate = (date: string, formatType: string) => {
    try {
        return format(parseISO(date), formatType);
    } catch {
        console.error(`Invalid date format: ${date}`);
        return String(date);
    }
};

export const formatHumanDateTime = (date: string) => {
    return formatFHIRDate(date, US_DATE_TIME_FORMAT);
};

export const formatHumanDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd');
};
