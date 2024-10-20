import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useMockData } from '@/hooks/useMockData';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';
// import getFakerAvailableModules from '@/lib/faker-utils';

function ConstructorPage(): JSX.Element {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const { mockData, insertMockData, updateMockData, deleteMockData } = useMockData();

    return (
        <div className="w-svw max-w-2xl justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>Constructor</CardTitle>
                    <CardDescription>Build your mock data</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col space-y-3">
                    {mockData.map((md) => (
                        <div className="flex items-center space-x-3" key={crypto.randomUUID()}>
                            <Popover key={crypto.randomUUID()}>
                                <PopoverTrigger asChild>
                                    <Button variant="default" className="flex w-full max-w-sm justify-between">
                                        {md.fakerModule} / {md.fakerMethodName}
                                        <CaretSortIcon opacity={0.5} />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                                    <Command>
                                        <CommandEmpty>No field was found</CommandEmpty>
                                        <CommandInput placeholder="Search for a field module" />
                                        <CommandList className="[&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:text-black/90">
                                            <CommandGroup heading="Finance">
                                                <CommandItem
                                                    value={'btc'}
                                                    onSelect={() => {
                                                        setPopoverOpen(false);
                                                        updateMockData(md.id, {
                                                            fakerModule: 'finance',
                                                            fakerMethodName: 'bitcoinAddress',
                                                        });
                                                    }}
                                                >
                                                    Bitcoin Adress
                                                </CommandItem>
                                                <CommandItem
                                                    value={'ltc'}
                                                    onSelect={() => {
                                                        setPopoverOpen(false);
                                                        updateMockData(md.id, {
                                                            fakerModule: 'finance',
                                                            fakerMethodName: 'litecoinAddress',
                                                        });
                                                    }}
                                                >
                                                    Litecoin Address
                                                </CommandItem>
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => {
                                    deleteMockData(md.id);
                                }}
                            >
                                <Trash2Icon />
                            </Button>
                        </div>
                    ))}
                    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="flex w-full max-w-sm justify-between">
                                Select a new field
                                <CaretSortIcon opacity={0.5} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                            <Command>
                                <CommandEmpty>No field was found</CommandEmpty>
                                <CommandInput placeholder="Search for a field module" />
                                <CommandList className="[&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:text-black/90">
                                    <CommandGroup heading="Finance">
                                        <CommandItem
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
                                        </CommandItem>
                                        <CommandItem
                                            value={'ltc'}
                                            onSelect={() => {
                                                setPopoverOpen(false);
                                                insertMockData({
                                                    id: crypto.randomUUID(),
                                                    fakerModule: 'finance',
                                                    fakerMethodName: 'litecoinAddress',
                                                });
                                            }}
                                        >
                                            Litecoin Address
                                        </CommandItem>
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </CardContent>
            </Card>
        </div>
    );
}

export default ConstructorPage;
