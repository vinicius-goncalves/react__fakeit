import OfflineFakerModules from '@/@types/OfflineFakerModules';
import { faker } from '@faker-js/faker';
import {
    ALargeSmallIcon,
    AudioLinesIcon,
    BinaryIcon,
    BiohazardIcon,
    BrainCircuitIcon,
    BuildingIcon,
    CalendarIcon,
    CarIcon,
    CpuIcon,
    DatabaseIcon,
    DollarSign,
    FolderGit,
    GlobeIcon,
    ImageIcon,
    LetterText,
    MapPinIcon,
    Paintbrush2Icon,
    PhoneIcon,
    PlaneIcon,
    ShapesIcon,
    ShoppingCartIcon,
    SquirrelIcon,
    TextIcon,
    UserRoundIcon,
    WheatIcon,
} from 'lucide-react';

function validateModules(modules: string[]) {
    const availableModules = getFakerAvailableModules();

    const isModulesUpToDate = availableModules.every((m) => modules.includes(m));
    const missingModules = availableModules.filter((m) => !modules.includes(m));

    return {
        isModulesUpToDate,
        missingModules,
    };
}

export function getFakerAvailableModules() {
    const excludedModules = ['_', 'definitions', 'helpers', 'rawDefinitions'];

    return Object.keys(faker)
        .filter((module) => !module.startsWith('_') && !excludedModules.includes(module))
        .sort();
}

export function getFakerModulesWithIcons() {
    const modules = [
        { name: 'Airline', value: 'airline', Icon: PlaneIcon },
        { name: 'Animal', value: 'animal', Icon: SquirrelIcon },
        { name: 'Color', value: 'color', Icon: Paintbrush2Icon },
        { name: 'Commerce', value: 'commerce', Icon: ShoppingCartIcon },
        { name: 'Company', value: 'company', Icon: BuildingIcon },
        { name: 'Database', value: 'database', Icon: DatabaseIcon },
        { name: 'Datatype', value: 'datatype', Icon: ShapesIcon },
        { name: 'Date', value: 'date', Icon: CalendarIcon },
        { name: 'Finance', value: 'finance', Icon: DollarSign },
        { name: 'Food', value: 'food', Icon: WheatIcon },
        { name: 'Git', value: 'git', Icon: FolderGit },
        { name: 'Hacker', value: 'hacker', Icon: BrainCircuitIcon },
        { name: 'Image', value: 'image', Icon: ImageIcon },
        { name: 'Internet', value: 'internet', Icon: GlobeIcon },
        { name: 'Location', value: 'location', Icon: MapPinIcon },
        { name: 'Lorem', value: 'lorem', Icon: TextIcon },
        { name: 'Music', value: 'music', Icon: AudioLinesIcon },
        { name: 'Number', value: 'number', Icon: BinaryIcon },
        { name: 'Person', value: 'person', Icon: UserRoundIcon },
        { name: 'Phone', value: 'phone', Icon: PhoneIcon },
        { name: 'System', value: 'system', Icon: CpuIcon },
        { name: 'Science', value: 'science', Icon: BiohazardIcon },
        { name: 'String', value: 'string', Icon: LetterText },
        { name: 'Vehicle', value: 'vehicle', Icon: CarIcon },
        { name: 'Word', value: 'word', Icon: ALargeSmallIcon },
    ];

    const { isModulesUpToDate, missingModules } = validateModules(modules.map((m) => m.value));

    if (!isModulesUpToDate) {
        console.warn('Some modules are missing in getFakerModulesWithIcons():', missingModules);
    }

    return modules;
}

export function getFakerFunctionsFromModule<T extends keyof OfflineFakerModules>(module: T): OfflineFakerModules[T] {
    const availableFunctions = Object.entries(faker[module]).filter(([funcName]) => !funcName.includes('faker'));
    return Object.fromEntries(availableFunctions) as OfflineFakerModules[T];
}
