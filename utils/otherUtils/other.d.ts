import moment from "moment";

export const versionApp: string;

export const months: {
  fr: { label: string; value: string }[];
  en: { label: string; value: string }[];
};

export const currentDate: () => { day: string; month: string; year: number };

export function alphaSort<T extends { name: string }>(arrayData: T[]): T[];

export function translate(word: string): string;

export function updateMonth(date: Date, delta: number): Date;

export function convertDate(
  dateObj: Date,
  i18n: { language: "fr" | "en" }
): string;

export const getMonthsOfYear: (
  year: number,
  locale?: "fr" | "en"
) => { date: Date; month: { label: string }; year: number }[];

export const getInitials: () => { name: string; lastname: string };
