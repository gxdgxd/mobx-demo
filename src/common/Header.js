/*
 * @Author: yychang 
 * @Date: 2019-08-29 14:58:45 
 * @Last Modified by: yychang
 * @Last Modified time: 2019-10-25 12:45:49
 * 
 * 页面公共头部
 */

import React from 'react';
import AdminHeader from '@yt/admin-common-header';
import { appCode, appSign, systemName } from '@/config/env';

/**
 * 头部配置
 * 参考组件文档http://doc.yangtuojia.com/admin-doc/api/admin-common-header/
 */
export default () => {
    return (
        <AdminHeader 
            systemName={systemName} 
            appCode={appCode}
            appSign={appSign}
        />
    );
};