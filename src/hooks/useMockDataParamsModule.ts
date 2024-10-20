import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MockData } from './useMockData';

export function useMockDataParamsModule(mockData: MockData[]) {
    const [searchParams, setSearchParams] = useSearchParams();

    const findMockDataIndex = useCallback((id: string, mockData: MockData[]) => {
        return mockData.findIndex((md) => md.id == id);
    }, []);

    const insertIntoSearchParams = (mockData: MockData) => {
        console.log(searchParams.toString());
        searchParams.append('module', `${mockData.fakerModule}.${mockData.fakerMethodName}`);
        setSearchParams(searchParams);
    };

    const updateSearchParams = (updatedMockData: MockData, mockData: MockData[]) => {
        const index = findMockDataIndex(updatedMockData.id, mockData);

        if (index === -1) return;

        const modules = searchParams.getAll('module');
        modules[index] = `${updatedMockData.fakerModule}.${updatedMockData.fakerMethodName}`;
        searchParams.delete('module');
        modules.forEach((module) => searchParams.append('module', module));
        setSearchParams(searchParams);
    };

    const deleteFromSearchParams = (id: string) => {
        console.log(mockData);
        const index = findMockDataIndex(id, mockData);

        if (index === -1) return;

        const modules = searchParams.getAll('module');
        modules.splice(index, 1);
        searchParams.delete('module');
        modules.forEach((module) => searchParams.append('module', module));
        setSearchParams(searchParams);
    };

    return {
        insertIntoSearchParams,
        updateSearchParams,
        deleteFromSearchParams,
    } as const;
}
