import {formatDistance, parseISO} from 'date-fns';
import {differenceInDays} from 'date-fns';

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1: string, dateStr2: string) =>
    differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr: Date | string) =>
    formatDistance(parseISO(dateStr as string), new Date(), {
        addSuffix: true,
    })
        .replace('about ', '')
        .replace('in', 'In');

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options: { end?: boolean }) {
    const today = new Date();

    // This is necessary to compare with created_at from Supabase, because it is not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
    if (options?.end)
        // Set to the last second of the day
        today.setUTCHours(23, 59, 59, 999);
    else today.setUTCHours(0, 0, 0, 0);
    return today.toISOString();
};

export const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en', {style: 'currency', currency: 'USD'}).format(
        value
    );

export const isFn = (f: unknown) => (f && {}.toString.call(f) === '[object Function]') || false;

export const strictEqual = (a: unknown, b: unknown) => a === b;

export const isLessThan = (a: number, b: number) => (a < b);

export const isLessThanZero = (a: number) => (a < 0);

export const isEqualZero = (a: number) => (a === 0);

export const isGreaterThan = (a: number, b: number) => (a > b);

export const notEqual = (a: unknown, b: unknown) => a !== b;

export const OR = (a: unknown, b: unknown): boolean => Boolean(a) || Boolean(b);

export const andAnd = (a: unknown, b: unknown): boolean => Boolean(a) && Boolean(b);

export const withTernary = <A, B>(condition: boolean, a: A, b: B): A | B => (condition ? a : b);

export const isObject = (obj: object): boolean => (obj && typeof obj === 'object' && Object.keys(obj).length > 0) || false
