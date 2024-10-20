import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function stringify<T>(target: T): string {
    if (typeof target === 'string') {
        return target.match(/^(\{\[)/gi) ? JSON.stringify(target) : JSON.stringify(target).slice(1, -1);
    }

    return JSON.stringify(target);
}
