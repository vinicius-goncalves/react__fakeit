import { Button } from '@/components/ui/button';
import { Link, Outlet } from 'react-router-dom';

function RootLayout(): JSX.Element {
    return (
        <>
            <header className="flex flex-row justify-between border border-b-neutral-200 p-4">
                <h1 className="text-4xl font-semibold">fakeit</h1>
                <nav>
                    <ul className="m-2 flex space-x-4">
                        <li>
                            <Button variant={'link'} asChild>
                                <Link to="/">Home</Link>
                            </Button>
                        </li>
                        <li>
                            <Button variant={'link'}>
                                <Link to="constructor">Constructor</Link>
                            </Button>
                        </li>
                        <li>
                            <Button variant={'link'}>
                                <Link to="modules">Modules</Link>
                            </Button>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className="relative flex min-h-screen justify-center bg-neutral-400/10 p-5">
                <Outlet />
            </main>
        </>
    );
}

export default RootLayout;
