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
    { path: '/update_api', component: lazy(() => import('../container/ApiManager/Update')), exact: true, title: '修改接口' },

    { path: '/testcase_manager', component: lazy(() => import('../container/TestCaseManager')), exact: true, title: '用例管理' },
    { path: '/edit_testcase', component: lazy(() => import('../container/TestCaseManager/Insert')), exact: true, title: '添加用例' },

    { path: '/scene_manager', component: lazy(() => import('../container/SceneManager')), exact: true, title: '场景管理' },
    { path: '/insert_scene', component: lazy(() => import('../container/SceneManager/Insert')), exact: true, title: '添加场景' },

    { path: '/global_manager', component: lazy(() => import('../container/GlobalManager')), exact: true, title: '变量管理' },

    { path: '/exe_record', component: lazy(() => import('../container/ExeRecord')), exact: true, title: '执行记录' },
    { path: '/front-static/test.html', component: lazy(() => import('../container/Test')), exact: true, title: '测试页面' },
];

export default getRouters(routers);