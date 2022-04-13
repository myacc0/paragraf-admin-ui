import {lazy} from 'react';

const routeConstants = {
    list: '/dashboard/tags',
    add: '/dashboard/tags-add',
    edit: '/dashboard/tags-edit'
};

const routeList = [
    {
        path: 'tags',
        component: lazy(() => import('@iso/pages/Catalog/Tags/Tags')),
    },
    {
        path: 'tags-add',
        component: lazy(() => import('@iso/pages/Catalog/Tags/TagAdd')),
    },
    {
        path: 'tags-edit/:id',
        component: lazy(() => import('@iso/pages/Catalog/Tags/TagEdit')),
    }
];

export {
    routeConstants,
    routeList
};