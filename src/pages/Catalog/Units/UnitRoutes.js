import {lazy} from 'react';

const routeConstants = {
    list: '/dashboard/unit',
    add: '/dashboard/unit-add',
    edit: '/dashboard/unit-edit'
};

const routeList = [
    {
        path: 'unit',
        component: lazy(() => import('@iso/pages/Catalog/Units/Units')),
    },
    {
        path: 'unit-add',
        component: lazy(() => import('@iso/pages/Catalog/Units/UnitAdd')),
    },
    {
        path: 'unit-edit/:id',
        component: lazy(() => import('@iso/pages/Catalog/Units/UnitEdit')),
    }
];

export {
    routeConstants,
    routeList
};