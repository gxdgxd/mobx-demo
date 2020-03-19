import { lazy } from 'react';

const NotMatch = lazy(() => import('../common/NotMatch'));

const Forbidden = lazy(() => import('../common/Forbidden'));

const Test = lazy(() => import('../container/Test'));

const ApiManager = lazy(() => import('../container/ApiManager'));

const ApiManagerInsert = lazy(() => import('../container/ApiManager/Insert'));

const ApiManagerUpdate = lazy(() => import('../container/ApiManager/Update'));

const TestCaseManager = lazy(() => import('../container/TestCaseManager'));
const TestCaseManagerInsert = lazy(() =>
    import('../container/TestCaseManager/Insert')
);

const SceneManager = lazy(() => import('../container/SceneManager'));

const SceneManagerInsert = lazy(() =>
    import('../container/SceneManager/Insert')
);

const SceneManagerUpdate = lazy(() =>
    import('../container/SceneManager/Update')
);

const GlobalManager = lazy(() => import('../container/GlobalManager'));

const ExeRecord = lazy(() => import('../container/ExeRecord'));

const getRouters = routers => {
    // 404
    const notMatch = {
        component: NotMatch,
    };

    // 500
    const forbidden = {
        component: Forbidden,
        path: '500',
    };

    // 需要保证notMatch放在最后，作为兜底页面
    return [...routers, forbidden, notMatch];
};

// 页面路由配置
const routers = [
    {
        path: '/api_manager',
        component: ApiManager,
        exact: true,
        title: '接口管理',
    },
    {
        path: '/insert_api',
        component: ApiManagerInsert,
        exact: true,
        title: '添加接口',
    },
    {
        path: '/update_api',
        component: ApiManagerUpdate,
        exact: true,
        title: '修改接口',
    },
    {
        path: '/testcase_manager',
        component: TestCaseManager,
        exact: true,
        title: '用例管理',
    },
    {
        path: '/edit_testcase',
        component: TestCaseManagerInsert,
        exact: true,
        title: '编辑用例',
    },
    {
        path: '/scene_manager',
        component: SceneManager,
        exact: true,
        title: '场景管理',
    },
    {
        path: '/insert_scene',
        component: SceneManagerInsert,
        exact: true,
        title: '添加场景',
    },
    {
        path: '/update_scene',
        component: SceneManagerUpdate,
        exact: true,
        title: '修改场景',
    },
    {
        path: '/global_manager',
        component: GlobalManager,
        exact: true,
        title: '变量管理',
    },
    {
        path: '/exe_record',
        component: ExeRecord,
        exact: true,
        title: '执行记录',
    },
    { path: '/', component: Test, exact: true, title: '接口管理' },

    {
        path: '/front-static/test.html',
        component: lazy(() => import('../container/Test')),
        exact: true,
        title: '测试页面',
    },
];

export default getRouters(routers);
