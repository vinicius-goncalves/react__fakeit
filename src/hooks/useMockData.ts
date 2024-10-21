import { useCallback, useState } from 'react';
import { useSearchParamsConstructor } from './useSearchParamsConstructor';

export interface MockData {
    id: string;
    fakerModule: string;
    fakerMethodName: string;
}

type NewMockData = Omit<MockData, 'id'>;

export function useMockData() {
    const [mockData, setMockDataList] = useState<MockData[]>([]);
    const { insertMockDataInSearchParams, updateMockDataIntoSearchParams, deleteMockDataFromSearchParams } =
        useSearchParamsConstructor(mockData);

    const findMockData = useCallback(
        (id: string) => {
            return mockData.find((data) => data.id === id);
        },
        [mockData],
    );

    const insertMockData = useCallback(
        (value: MockData) => {
            setMockDataList((prevList) => [...prevList, value]);
            insertMockDataInSearchParams(value);
        },
        [mockData],
    );

    const deleteMockData = useCallback(
        (id: string) => {
            setMockDataList((prevMockData) => prevMockData.filter((mockData) => mockData.id !== id));
            deleteMockDataFromSearchParams(id);
        },
        [mockData],
    );

    const updateMockData = useCallback(
        (id: string, newValue: NewMockData) => {
            const mockDataFound = findMockData(id);

            if (!mockDataFound) return;

            setMockDataList((prevMockData) =>
                prevMockData.map((mockData) =>
                    mockData.id === mockDataFound.id ? { ...mockData, ...newValue } : mockData,
                ),
            );

            updateMockDataIntoSearchParams({ ...mockDataFound, ...newValue }, mockData);
        },
        [mockData],
    );

    return { mockData, insertMockData, updateMockData, deleteMockData } as const;
}
