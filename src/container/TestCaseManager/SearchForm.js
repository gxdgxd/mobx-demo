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

    inputChange(n,e) {
        this.props.TestCaseManagerStore.changeTableRequestData(n,e.target.value);
    }

    handleSearch = (e) => {
        debugger
        e.preventDefault();
        this.props.TestCaseManagerStore.initData(1);
    }

    formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    }

    render(){
        return (
            <Form className="ant-advanced-search-form p-xs pb-0"  onSubmit={this.handleSearch}>
                <Row gutter={48}>
                    <Col span={7}>
                        <FormItem {...this.formItemLayout} label="接口ID">
                            <Input placeholder="请输入接口ID" onChange={this.inputChange.bind(this,'apiId')}/>
                        </FormItem>
                    </Col>
                    <Col span={7}>
                        <FormItem {...this.formItemLayout} label="用例名">
                            <Input placeholder="请输入用例名" onChange={this.inputChange.bind(this,'name')}/>
                        </FormItem>
                    </Col>
                    <Col span={3} style={{'marginTop':'3px'}}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" >
                                <Icon type="search" /> 搜索
                            </Button>
                        </Form.Item>
                    </Col>

                </Row>
                <Row gutter={48}>


                </Row>
            </Form>
        )
    }
}

export default Form.create()(SearchForm)

