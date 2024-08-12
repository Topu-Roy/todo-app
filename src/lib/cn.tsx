import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// * Utility function for conditional tailwindCSS classNames
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
