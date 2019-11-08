/*
 * @Author: yychang 
 * @Date: 2019-08-06 18:21:08 
 * @Last Modified by: yychang
 * @Last Modified time: 2019-11-05 14:14:36
 */

import React, { useMemo, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import queryString from 'query-string';
import { systemName  } from '@/config/env';
import BreadcrumbNav from './BreadcrumbNav';

function setPageTitle(title) {
    document.title = title ? `${title}-${systemName}` : systemName;
}

const RouteRender = ({ title, point, component, ...routeProps }) => {
    const { search } = routeProps.location;
    const queryParams = useMemo(() => queryString.parse(search), [search]);
    const [breadList, setBreadcrumb] = useState([]);

    useEffect(() => {
        setPageTitle(title);
    }, [title]);

    useEffect(() => {
        point && window.ytTrack && window.ytTrack.collectPageTrack(point);
    }, [point]);
    
    return (
        <>
            <BreadcrumbNav breadList={breadList}/>
            { React.createElement(component, { ...routeProps, queryParams, setBreadcrumb }) }
        </>
    );
};

const AdminRoute = ({ path, exact = true, component, title, point }) => {
    return (
        <Route
            path={path}
            exact={exact}
            render={(props) => <RouteRender {...props} component={component} title={title} point={point} />}
        />
    );
};

export default AdminRoute;