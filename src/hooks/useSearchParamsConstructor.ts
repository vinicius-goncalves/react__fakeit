import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MockData } from './useMockData';
import { useSearchParamsUtils } from './useSearchParamsUtils';

export function useSearchParamsConstructor(mockData: MockData[]) {
    const [searchParams, setSearchParams] = useSearchParams();
    const spu = useSearchParamsUtils(searchParams);

    const findMockDataIndex = useCallback(
        (id: string, mockData: MockData[]) => {
            return mockData.findIndex((md) => md.id == id);
        },
        [mockData],
    );

    const manipulateSearchParamsModules = (callback: (modules: string[]) => string[]) => {
        const allModules = searchParams.getAll('module');
        const newModules = callback(allModules);
        setSearchParams(spu.update(newModules));
        return newModules;
    };

    const insertMockDataInSearchParams = (mockData: MockData) => {
        searchParams.append('module', `${mockData.fakerModule}.${mockData.fakerMethodName}`);
        setSearchParams(searchParams);
    };

    const updateMockDataIntoSearchParams = (updatedMockData: MockData, mockData: MockData[]) => {
        const index = findMockDataIndex(updatedMockData.id, mockData);
        if (index === -1) return;

        const newModules = manipulateSearchParamsModules((modules) => {
            modules[index] = `${updatedMockData.fakerModule}.${updatedMockData.fakerMethodName}`;
            return modules;
        });

        setSearchParams(spu.update(newModules));
    };

    const deleteMockDataFromSearchParams = (id: string) => {
        const index = findMockDataIndex(id, mockData);
        if (index === -1) return;

        const newModules = manipulateSearchParamsModules((modules) => {
            modules.splice(index, 1);
            return modules;
        });

        setSearchParams(spu.update(newModules));
    };

    return {
        insertMockDataInSearchParams,
        updateMockDataIntoSearchParams,
        deleteMockDataFromSearchParams,
    } as const;
}
