import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    {
        path: '/pages/dashboard',
        title: 'common.sidebar.items.dashboard',
        icon: 'mdi mdi-view-dashboard',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        isSeparator: false,
        authorities: ['ROLE_USER'],
        submenu: []
    },
    {
        path: '/pages/dashboard/ph',
        title: 'common.sidebar.items.philippines',
        icon: 'mdi mdi-flag',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        isSeparator: false,
        authorities: ['ROLE_USER', 'ROLE_ADMIN'],
        submenu: []
    }
];
