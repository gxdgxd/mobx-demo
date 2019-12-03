import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Table, Button, Radio, Select,Icon, Row, Col, Form, DatePicker, Input, Modal } from 'antd';

const FormItem = Form.Item;


@inject('TestCaseManagerStore')
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
        this.props.TestCaseManagerStore.initData(1);
    }

    formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    }

    render(){
        return (
            <Form className="ant-advanced-search-form p-xs pb-0">
                <Row gutter={48}>
                    <Col span={7}>
                        <FormItem {...this.formItemLayout} label="接口ID">
                            <Input placeholder="请输入接口ID" />
                        </FormItem>
                    </Col>
                    <Col span={7}>
                        <FormItem {...this.formItemLayout} label="用例名">
                            <Input placeholder="请输入用例名" />
                        </FormItem>
                    </Col>
                    <Col span={3} style={{'marginTop':'3px'}}>
                        <Button type="primary"><Icon type="search" /> 搜索</Button>
                    </Col>

                </Row>
                <Row gutter={48}>


                </Row>
            </Form>
        )
    }
}

export default Form.create()(SearchForm)

