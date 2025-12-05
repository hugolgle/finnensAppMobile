export function totalByMonth(
  data: { date: Date | string; type: string; [key: string]: any }[],
  type: string,
  monthDate: Date | string,
  field?: string
): number;

export function totalByYear(
  data: {
    date: Date | string;
    type: string;
    category?: string;
    title?: string;
    amount: number;
  }[],
  type: string,
  year: number,
  filterCategory?: string[],
  filterTitle?: string[]
): number;

export function calculTotalAmount(data: { amount: number }[]): number;
