/*
 * 404错误定制页面
 */

import React from 'react';
import { Empty } from 'antd';
import './notMatch.less';

const NotMatch = () => {
    return (
        <div className="not-match-page">
            <div className="not-match-content">
                <Empty description="抱歉，您访问的页面不存在"/>
            </div>
        </div>
    );
};

export default NotMatch;

