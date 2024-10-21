export function searchParamsUtils(searchParams: URLSearchParams) {
    return {
        update(modules: string[]) {
            searchParams.delete('module');
            modules.forEach((module) => searchParams.append('module', module));
            return searchParams.toString();
        },
    };
}
