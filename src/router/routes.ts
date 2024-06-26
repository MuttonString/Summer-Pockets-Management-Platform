import type { RouteRecordRaw } from 'vue-router';

export const constantRoute: RouteRecordRaw[] = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login',
        meta: {
            title: '登录',
            hidden: true
        }
    },
    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'layout',
        meta: {
            hidden: true
        },
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    title: '首页',
                    hidden: false,
                    icon: 'HomeFilled'
                }
            }
        ]
    },
    {
        path: '/screen',
        component: () => import('@/views/screen/index.vue'),
        name: 'screen',
        meta: {
            title: '数据大屏',
            hidden: false,
            icon: 'DataBoard'
        }
    },
    {
        path: '/acl',
        component: () => import('@/layout/index.vue'),
        name: 'acl',
        meta: {
            title: '权限管理',
            hidden: false,
            icon: 'Lock'
        },
        children: [
            {
                path: '/acl/user',
                component: () => import('@/views/acl/user/index.vue'),
                name: 'user',
                meta: {
                    title: '用户管理',
                    hidden: false,
                    icon: 'UserFilled'
                }
            },
            {
                path: '/acl/role',
                component: () => import('@/views/acl/role/index.vue'),
                name: 'role',
                meta: {
                    title: '角色管理',
                    hidden: false,
                    icon: 'Avatar'
                }
            },
            {
                path: '/acl/permission',
                component: () => import('@/views/acl/permission/index.vue'),
                name: 'permission',
                meta: {
                    title: '菜单管理',
                    hidden: false,
                    icon: 'Operation'
                }
            }
        ]
    },
    {
        path: '/product',
        component: () => import('@/layout/index.vue'),
        name: 'product',
        meta: {
            title: '商品管理',
            hidden: false,
            icon: 'Goods'
        },
        children: [
            {
                path: '/product/trademark',
                component: () => import('@/views/product/trademark/index.vue'),
                name: 'trademark',
                meta: {
                    title: '品牌管理',
                    hidden: false,
                    icon: 'CollectionTag'
                }
            },
            {
                path: '/product/attr',
                component: () => import('@/views/product/attr/index.vue'),
                name: 'attr',
                meta: {
                    title: '属性管理',
                    hidden: false,
                    icon: 'Paperclip'
                }
            },
            {
                path: '/product/spu',
                component: () => import('@/views/product/spu/index.vue'),
                name: 'spu',
                meta: {
                    title: 'SPU管理',
                    hidden: false,
                    icon: 'TakeawayBox'
                }
            },
            {
                path: '/product/sku',
                component: () => import('@/views/product/sku/index.vue'),
                name: 'sku',
                meta: {
                    title: 'SKU管理',
                    hidden: false,
                    icon: 'Briefcase'
                }
            }
        ]
    },
    {
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404',
        meta: {
            title: '404',
            hidden: true
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'any',
        meta: {
            title: 'any',
            hidden: true
        }
    }
];
