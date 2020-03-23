/*
 * 这是一个测试页面
 * @Author: 宁莆 jun.ma@hipac.cn 
 * @Date: 2019-01-07 22:54:00 
 * @Last Modified by: 宁莆 jun.ma@hipac.cn
 * @Last Modified time: 2019-10-29 14:00:11
 */

import React, { Component } from 'react';
import { Result,Icon,Button } from 'antd';
class Test extends Component {

    componentDidMount() {
        this.props.setBreadcrumb([
            { name: 'home', },
        ]);
    }
    
    render() {
        return (
            <Result
                icon={<Icon type="smile" theme="twoTone" />}
                title="欢迎访问接口自动化平台，开始你的第一个用例编写吧！"
                extra={<Button type="primary"  onClick={()=>{window.location.href = '/insert_api'}}>Next</Button>}
            />
        );
    }
}
export default Test;