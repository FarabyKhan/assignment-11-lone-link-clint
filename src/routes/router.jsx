import React from 'react';
import { createBrowserRouter } from 'react-router';
import HomeLayout from './Layouts/HomeLayout';

export const router = createBrowserRouter([
        {
            path: "/",
            Component:HomeLayout,
            children: [
                {
                    
                }
            ]
        }

])

export default router;