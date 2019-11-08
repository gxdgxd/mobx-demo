/*
 * @Author: yychang 
 * @Date: 2019-08-15 20:02:09 
 * @Last Modified by: yychang
 * @Last Modified time: 2019-11-04 16:25:43
 * 
 * 面包屑
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { systemName  } from '../config/env';

const isAbsoluteLink = (link) => {
    return /^(https?:)?\/\//.test(link);
};

const renderBreadcrumb = (breadList) => {
    if (!breadList || breadList.length === 0) {
        return null;
    }

    return (
        <Breadcrumb>
            <Breadcrumb.Item>{systemName}</Breadcrumb.Item>
            { breadList.map((item, index) => 
                <Breadcrumb.Item key={item.name}>
                    { !!item.path && index < breadList.length - 1 ? 
                        isAbsoluteLink(item.path) ? 
                            <a href={item.path}>{item.name}</a> :
                            <Link to={item.path}>{item.name}</Link> :
                        <span>{item.name}</span>
                    }
                </Breadcrumb.Item>  
            ) }
        </Breadcrumb>
    );
};

const BreadcrumbNav = ({
    breadList
}) => {
    return (
        <div className="breadcrumb-nav">
            { renderBreadcrumb(breadList) }
        </div>
    );
};

export default BreadcrumbNav;