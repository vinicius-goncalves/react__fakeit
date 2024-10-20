import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import ConstructorPage from './pages/ConstructorPage';
import HomePage from './pages/HomePage';
import ModulesPage from './pages/ModulesPage';
import RootLayout from './pages/RootLayout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { path: '', element: <HomePage />, index: true },
            { path: 'modules', element: <ModulesPage /> },
            { path: 'constructor', element: <ConstructorPage /> },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
