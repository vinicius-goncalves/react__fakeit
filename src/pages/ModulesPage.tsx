import { FakerModules } from '@/@types/OfflineFakerModules';
import ModulesCardSelect from '@/components/pages/modules-page/ModulesCardSelect';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { getFakerFunctionsFromModule } from '@/lib/faker-utils';
import { stringify } from '@/lib/utils';
import { useRef, useState } from 'react';

function ModulesPage(): JSX.Element {
    const [showExamplesBtn, setShowExamplesBtn] = useState<boolean>(false);
    const [openExamplesDialog, setOpenExamplesDialog] = useState<boolean>(false);

    const moduleSelected = useRef<FakerModules | null>(null);

    const updateShowExamplesBtn = (value: string) => {
        setShowExamplesBtn(true);
        setOpenExamplesDialog(true);

        moduleSelected.current = value as FakerModules;
    };

    const updateOpenExamplesDialog = () => {
        setOpenExamplesDialog(true);
    };

    return (
        <div>
            <Sheet open={openExamplesDialog} onOpenChange={setOpenExamplesDialog}>
                <SheetContent className="flex flex-col gap-6">
                    <SheetHeader className="space-y-0">
                        <SheetTitle>{moduleSelected.current} module</SheetTitle>
                        <SheetDescription>Check it out examples of this module</SheetDescription>
                    </SheetHeader>
                    <ScrollArea>
                        <div className="flex flex-col space-y-2">
                            {moduleSelected.current &&
                                Object.entries(getFakerFunctionsFromModule(moduleSelected.current!)).map(
                                    ([funcName, funcExec]) => (
                                        <div key={crypto.randomUUID()}>
                                            <header className="flex flex-row items-center space-x-2">
                                                <h4 className="text-sm font-bold">{moduleSelected.current}</h4>
                                                <code>{funcName}();</code>
                                            </header>
                                            <output className="text-neutral-400">{stringify(funcExec())}</output>
                                            <Separator className="mt-2" />
                                        </div>
                                    ),
                                )}
                        </div>
                    </ScrollArea>
                </SheetContent>
            </Sheet>

            <ModulesCardSelect
                showExamplesBtn={showExamplesBtn}
                onValueChange={updateShowExamplesBtn}
                onClickExamplesBtn={updateOpenExamplesDialog}
            />
        </div>
    );
}

export default ModulesPage;
