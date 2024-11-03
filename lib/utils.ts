import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function uniqBy<T>(arr: T[], key: keyof T): T[] {
  return [...new Map(arr.map(item => [item[key], item])).values()];
}