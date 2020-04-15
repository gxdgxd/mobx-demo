// 导航配置
import React from 'react';
import AdminCommonMenu from '@yt/admin-common-menu';
import routerConfig from '@/config/router';
import { basename } from '@/config/env';

/**
 * 根据自己项目情况，给菜单组件添加 domain、filter、basename、oldMenuCode属性
 * 参考组件文档http://doc.yangtuojia.com/admin-doc/api/admin-common-menu/
 */
export default function Menu() {
    return <AdminCommonMenu routerConfig={routerConfig} basename={basename} menuCode="MenuCode-20552"/>;
}