import { useCallback } from 'react';

export function useSearchParamsUtils(searchParams: URLSearchParams) {
    const update = useCallback(
        (modules: string[]): string => {
            searchParams.delete('module');
            modules.forEach((module) => searchParams.append('module', module));
            return searchParams.toString();
        },
        [searchParams],
    );

    return { update };
}
