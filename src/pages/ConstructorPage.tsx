import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useMockData } from '@/hooks/useMockData';
import { getFakerFunctionsFromModule, getFakerModulesWithIcons } from '@/lib/faker-utils';
import { stringify } from '@/lib/utils';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { ArrowUpRightIcon } from 'lucide-react';
import { useState } from 'react';

function Select({
    popoverTriggerTitle,
    fieldSelected = false,

}: {
    popoverTriggerTitle: string;
    fieldSelected?: boolean;
    onFieldSelect?: () => void;
}): JSX.Element {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const fakerModules = getFakerModulesWithIcons();

    return (
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={fieldSelected ? 'default' : 'outline'}
                    className="flex w-full max-w-sm justify-between"
                >
                    {popoverTriggerTitle}
                    <CaretSortIcon opacity={0.5} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command>
                    <CommandEmpty>No field was found</CommandEmpty>
                    <CommandInput placeholder="Search for a field module" />
                    <CommandList className="[&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:text-neutral-800">
                        {fakerModules.map((fakerModule) => (
                            <CommandGroup
                                heading={
                                    <div className="flex gap-2">
                                        <fakerModule.Icon size={16} />
                                        <span>{fakerModule.name}</span>
                                    </div>
                                }
                                value={fakerModule.value}
                                key={fakerModule.value}
                                className="w-full"
                            >
                                {Object.entries(getFakerFunctionsFromModule(fakerModule.value)).map((f) => (
                                    <CommandItem value={`${fakerModule.value}${f[0]}`} key={f[0]}>
                                        <div
                                            className="flex w-[--radix-popover-content-available-width] items-center justify-between"
                                            key={f[0]}
                                        >
                                            <code className="text-[13px]">{f[0]}();</code>
                                            <div>
                                                {stringify(f[1]()).startsWith('{') ||
                                                stringify(f[1]()).startsWith('http') ? (
                                                    <HoverCard openDelay={300}>
                                                        <HoverCardTrigger className="flex items-center gap-2 text-blue-500 hover:cursor-pointer hover:underline">
                                                            <p>Object Example</p>
                                                            <ArrowUpRightIcon size={16} />
                                                        </HoverCardTrigger>
                                                        <HoverCardContent>
                                                            <output>{stringify(f[1]())}</output>
                                                        </HoverCardContent>
                                                    </HoverCard>
                                                ) : (
                                                    stringify(f[1]()).slice(0, 16)
                                                )}
                                            </div>
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        ))}
                        {/* <CommandGroup heading="Finance"> */}
                        {/* <CommandItem
                                onSelect={() => {
                                    setPopoverOpen(false);
                                    if (onFieldSelect) onFieldSelect();
                                }}
                            ></CommandItem> */}
                        {/* <CommandItem
                                value={'btc'}
                                onSelect={() => {
                                    setPopoverOpen(false);
                                    insertMockData({
                                        id: crypto.randomUUID(),
                                        fakerModule: 'finance',
                                        fakerMethodName: 'bitcoinAddress',
                                    });
                                }}
                            >
                                Bitcoin Address
                            </CommandItem> */}
                        {/* </CommandGroup> */}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

function ConstructorPage(): JSX.Element {
    const { mockData, insertMockData, updateMockData, deleteMockData } = useMockData();

    return (
        <div className="w-svw max-w-2xl justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>Constructor</CardTitle>
                    <CardDescription>Build your mock data</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col space-y-3">
                    <Select popoverTriggerTitle="Select a field" />
                </CardContent>
            </Card>
        </div>
    );
}

export default ConstructorPage;
