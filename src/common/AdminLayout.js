/*
 * @Author: yychang 
 * @Date: 2019-08-07 09:33:36 
 * @Last Modified by: yychang
 * @Last Modified time: 2019-11-04 16:25:01
 */

import React, { useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import find from 'lodash/find';
import { Layout } from 'antd';
import Header from './Header';
import Menu from './Menu';
import routerConfig from '../config/router';
import './adminLayout.less';

const useCurRouter = (pathname) => {
    return useMemo(() => {
        return find(routerConfig, item => item.path === pathname);
    }, [pathname]);
};

const AdminLayout = (props) => {
    const { pathname } = props.location;
    const curRouter = useCurRouter(pathname);
    const hideMenu = curRouter && curRouter.showMenu === false;
    const hideHeader = curRouter && curRouter.showHeader === false;

    return (
        <Layout hasSider={!hideMenu}>
            { !hideMenu && <Menu/>}
            <Layout className="main-layout">
                { !hideHeader && <Header />}
                <Layout.Content className="main-content">
                    { props.children }
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default withRouter(AdminLayout);