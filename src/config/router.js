import { lazy } from 'react';

const getRouters = (routers) => {
    // 404
    const notMatch = {
        component: lazy(() => import('../common/NotMatch')),
    };
    // 500
    const forbidden = {
        component: lazy(() => import('../common/Forbidden')),
        path: '500',
    };

    // 需要保证notMatch放在最后，作为兜底页面
    return [...routers, forbidden, notMatch];
};

// 页面路由配置
const routers = [
    { path: '/api_manager', component: lazy(() => import('../container/ApiManager')), exact: true, title: '接口管理' },
    { path: '/insert_api', component: lazy(() => import('../container/ApiManager/Insert')), exact: true, title: '添加接口' },
    { path: '/testcase_manager', component: lazy(() => import('../container/TestCaseManager')), exact: true, title: '接口管理' },
    { path: '/front-static/test.html', component: lazy(() => import('../container/Test')), exact: true, title: '测试页面' },
];

export default getRouters(routers);