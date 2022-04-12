import {lazy} from 'react';

const routeConstants = {
    list: '/dashboard/categories',
    add: '/dashboard/categories-add',
    edit: '/dashboard/categories-edit'
};

const routeList = [
    {
        path: 'categories',
        component: lazy(() => import('@iso/pages/Categories/Categories')),
    },
    {
        path: 'categories-add',
        component: lazy(() => import('@iso/pages/Categories/CategoryAdd')),
    },
    {
        path: 'categories-edit',
        component: lazy(() => import('@iso/pages/Categories/CategoryEdit')),
    }
];

export {
    routeConstants,
    routeList
};