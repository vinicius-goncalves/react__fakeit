import OfflineFakerModules from '@/@types/OfflineFakerModules';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { getFakerModulesWithIcons } from '@/lib/faker-utils';
import { cn } from '@/lib/utils';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { SelectProps } from '@radix-ui/react-select';
import { ArrowUpRightIcon, CheckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
    showExamplesBtn: boolean;
    onValueChange: SelectProps['onValueChange'];
    onClickExamplesBtn?: any;
}

function ModulesCardSelect({
    showExamplesBtn = false,
    onValueChange = () => {},
    onClickExamplesBtn,
}: Props): JSX.Element {
    const fakerModules = getFakerModulesWithIcons();

    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<keyof OfflineFakerModules | null>(null);
    const [Icon, setIcon] = useState<JSX.Element | null>(null);

    useEffect(() => {
        const IconFound = fakerModules.find((fm) => fm.value == value)?.Icon;
        if (IconFound) setIcon(<IconFound />);
    }, [value]);

    return (
        <Card className={cn('w-screen max-w-lg')}>
            <CardHeader>
                <CardTitle className={cn('text-2xl')}>Available Modules</CardTitle>
                <CardDescription>These are the same modules available in faker.js</CardDescription>
            </CardHeader>
            <CardContent className={cn('flex flex-col items-center justify-center')}>
                <div className={cn('my-3 w-full max-w-sm')}>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button className="flex h-9 w-full justify-between font-normal" variant="outline">
                                <div className="flex items-center gap-2">
                                    {Icon}
                                    {value ? fakerModules.find((fm) => fm.value == value)?.name : 'Select a module'}
                                </div>
                                <CaretSortIcon opacity={0.5} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-screen max-w-sm p-0">
                            <Command>
                                <CommandInput placeholder="Search for a module" />
                                <CommandList>
                                    {fakerModules.map((fm) => (
                                        <CommandItem
                                            className="flex justify-between"
                                            key={fm.value}
                                            value={fm.value}
                                            onSelect={() => {
                                                setValue(fm.value as keyof OfflineFakerModules);
                                                setOpen(false);
                                                onValueChange(fm.value);
                                            }}
                                        >
                                            <div className="flex gap-2">
                                                <fm.Icon size={16} />
                                                <span>{fm.name}</span>
                                            </div>
                                            <CheckIcon
                                                size={12}
                                                className={cn(fm.value == value ? 'opacity-100' : 'opacity-0')}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                {showExamplesBtn && (
                    <Button onClick={onClickExamplesBtn} className="my-4">
                        <ArrowUpRightIcon />
                        Examples
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}

export default ModulesCardSelect;
