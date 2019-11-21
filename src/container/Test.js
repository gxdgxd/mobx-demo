/*
 * 这是一个测试页面
 * @Author: 宁莆 jun.ma@hipac.cn 
 * @Date: 2019-01-07 22:54:00 
 * @Last Modified by: 宁莆 jun.ma@hipac.cn
 * @Last Modified time: 2019-10-29 14:00:11
 */

import React, { Component } from 'react';
class Test extends Component {

    componentDidMount() {
        this.props.setBreadcrumb([
            { name: 'test', },
        ]);
    }
    
    render() {
        return (
            <div>Hello world22</div>
        );
    }
}
export default Test;