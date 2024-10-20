import { Button } from '@/components/ui/button';
import { ChevronRight, RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import getFakerAvailableModules from './lib/faker-utils';

function App(): JSX.Element {
    const [isLoading, setIsLoading] = useState(false);

    const fakerModules = getFakerAvailableModules();

    return (
        <div className="space-x-4 p-4">
            <Button
                type="button"
                variant="default"
                onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 1000);
                }}
                disabled={isLoading}
            >
                {!isLoading ? <ChevronRight className="h-4 w-4" /> : <RefreshCcw className="h-4 w-4 animate-spin" />}
                Click me
            </Button>
        </div>
    );
}

export default App;
