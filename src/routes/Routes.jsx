import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

const Routes = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<MainLayout />}>
                
            </Route>
        )
    )

    return <RouterProvider router={router} />
}

export default Routes