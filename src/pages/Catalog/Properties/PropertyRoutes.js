import {lazy} from 'react';

const routeConstants = {
    list: '/dashboard/properties',
    add: '/dashboard/properties-add',
    edit: '/dashboard/properties-edit'
};

const routeList = [
    {
        path: 'properties',
        component: lazy(() => import('@iso/pages/Catalog/Properties/Properties')),
    },
    {
        path: 'properties-add',
        component: lazy(() => import('@iso/pages/Catalog/Properties/PropertyAdd')),
    },
    {
        path: 'properties-edit/:id',
        component: lazy(() => import('@iso/pages/Catalog/Properties/PropertyEdit')),
    }
];

export {
    routeConstants,
    routeList
};