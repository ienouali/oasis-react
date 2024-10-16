import {QueryClient} from "@tanstack/react-query";

export type imgTypeObj = { name: string; lastModified: number; lastModifiedDate: Date; size: number; type:string; webkitRelativePath: string }
export type imageType = imgTypeObj[]
export type typeErrorsForm = {[index: string]: { message: string }}
export type TStringAsIndex = {[index: string]: () => void}
export interface Cabin {
    [key: string]: number | string | imageType | undefined
    id?: number,
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description: string;
    image: imageType | string;
}

export interface IQueryClient {
    queryClient: QueryClient;
}

export interface ISettings {
    id? : number;
    minBookingLength?: number;
    maxBookingLength?: number;
    maxGuestsPerBooking?: number;
    breakfastPrice?: number;
}

export interface IGuest {
    fullName?: string;
    email?: string;
}
export interface IBooking {
    id?: number;
    created_at: Date;
    startDate: Date;
    endDate: Date;
    numNights: number;
    numGuests: number;
    status: string;
    totalPrice: number;
    cabins: { name?: string; };
    guests: IGuest;
    count?: number
    isPaid?: boolean;
}

export interface IBookingWithExtrasPrice {
    id?: number;
    created_at: Date;
    startDate: Date;
    endDate: Date;
    numNights: number;
    numGuests: number;
    status: string;
    totalPrice: number;
    cabins: { name?: string; };
    guests: IGuest;
    count?: number
    isPaid?: boolean;
    extrasPrice: number;
}

// ------
export type IOption = {
    value: string;
    label: string;
}

export type TStatus<S extends string | number | symbol> = {
    [key in S]: string;
};

export type TFilterOptions = {
    value: string;
    method: 'eq' | 'gte' | 'lte';
    field: string;
}

export type TSortOptions = {
    field: string;
    direction: string;
}

export enum STATUS {
    unconfirmed = 'unconfirmed',
    'checked-in' = 'checked-in',
    'checked-out' = 'checked-out',
}

export type TLogininfo = {
    id: string;
    aud: string;
    role: string;
    email: string;
    email_confirmed_at: string;
    phone: string;
    confirmed_at: string;
    last_sign_in_at: string;
    app_metadata: {
        provider: string;
        providers: string[];
    };
    user_metadata: {
        avatar: string;
        fullName: string;
    };
    identities: {
        identity_id: string;
        id: string;
        user_id: string;
        identity_data: {
            email: string;
            email_verified: boolean;
            phone_verified: boolean;
            sub: string;
        };
        provider: string;
        last_sign_in_at: string;
        created_at: string;
        updated_at: string;
        email: string;
    }[];
    created_at: string;
    updated_at: string;
}