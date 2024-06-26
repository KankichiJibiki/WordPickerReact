import React from 'react';
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider
} from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import MainPage from '../pages/MainPage';

const Routes = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<MainLayout />}>
                <Route index element={<MainPage />}></Route>
            </Route>
        )
    );

    return <RouterProvider router={router} />;
};

export default Routes;
