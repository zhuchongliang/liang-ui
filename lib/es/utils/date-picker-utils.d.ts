export interface columnItem {
    value: number;
}
interface wheel {
    type: Precision;
    column: columnItem[];
}
declare type columns = wheel[];
declare type WeeKPrecision = "year" | "week" | "week-day";
declare type DatePrecision = "year" | "month" | "day" | "hour" | "minute" | "second";
export declare type Precision = DatePrecision | WeeKPrecision;
export declare function defaultRenderLabel(type: Precision, data: number): string;
export declare function generateDatePickerColumns(selected: number[], precision: Precision): columns;
export declare function convertNumberArrayToDate(value: number[]): Date;
export declare function convertDateToNumberArray(date: Date): number[];
export declare function convertNumberArrayToWeek(value: number[]): Date;
export declare function convertWeekToNumberArray(date: Date): number[];
export {};
