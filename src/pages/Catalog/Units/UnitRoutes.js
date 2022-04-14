import {lazy} from 'react';

const routeConstants = {
    list: '/dashboard/units',
    add: '/dashboard/units-add',
    edit: '/dashboard/units-edit'
};

const routeList = [
    {
        path: 'units',
        component: lazy(() => import('@iso/pages/Catalog/Units/Units')),
    },
    {
        path: 'units-add',
        component: lazy(() => import('@iso/pages/Catalog/Units/UnitAdd')),
    },
    {
        path: 'units-edit/:id',
        component: lazy(() => import('@iso/pages/Catalog/Units/UnitEdit')),
    }
];

export {
    routeConstants,
    routeList
};