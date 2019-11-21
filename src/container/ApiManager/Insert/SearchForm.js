import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { Table,Divider, Button, Alert, Select,Icon, Row, Col, Form, DatePicker, Input, Modal } from 'antd';
import Highlighter from 'react-highlight-words';

const FormItem = Form.Item;


@inject('ApiManagerStore')
@observer
class SearchForm extends Component{
    constructor(props){
        super(props);
        this.state={
        }
    }

    componentDidMount() {
    }

    optionChange(n,v,Option) {
        this.props.ApiManagerStore.initData(1);
    }

    formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    }

    render(){
        return (
            <Form className="ant-advanced-search-form p-xs pb-0">
                <Alert message="api包信息" type="info" style={{backgroundColor:'#c7e7ff',border:'0px'}}/>
                <Row gutter={48} style={{marginTop:'13px'}}>
                    <Col span={6}>
                        groupId：
                            <Input placeholder="请输入groupId" style={{width:"155px"}}/>
                    </Col>
                    <Col span={7}>
                        artifactId：
                            <Input placeholder="请输入artifactId" style={{width:"175px"}}/>
                    </Col>
                    <Col span={6}>
                        version：
                            <Input placeholder="请输入version" style={{width:"155px"}}/>
                    </Col>
                    <Col span={1}>
                        <Button type="primary"><Icon type="search" /> 搜索</Button>
                    </Col>
                </Row>

            </Form>
        )
    }
}

export default Form.create()(SearchForm)

