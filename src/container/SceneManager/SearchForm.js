import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Table, Button, Radio, Select,Icon, Row, Col, Form, DatePicker, Input, Modal } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;


@inject('SceneManagerStore')
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
        this.props.SceneManagerStore.changeTableRequestData(n,e.target.value);
    }
    optionChange(n,v) {
        this.props.SceneManagerStore.changeTableRequestData(n,v || '');
    }

    handleSubmit = (e) => {
        debugger
        e.preventDefault();
        this.props.SceneManagerStore.initData(1);
    }
    formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    }
    render(){
        return (
            <Form  className="ant-advanced-search-form p-xs pb-0"  onSubmit={this.handleSubmit}>
                <Row gutter={48}>
                    <Col span={7}>
                        <FormItem {...this.formItemLayout} label="场景ID">
                            <Input placeholder="请输入场景ID" onChange={this.inputChange.bind(this,'id')}/>
                        </FormItem>
                    </Col>
                    <Col span={7}>
                        <FormItem {...this.formItemLayout} label="用例ID">
                            <Input placeholder="请输入用例ID" onChange={this.inputChange.bind(this,'name')}/>
                        </FormItem>
                    </Col>
                    <Col span={7}>
                        <FormItem {...this.formItemLayout} label="用例名">
                            <Input placeholder="请输入用例名称" onChange={this.inputChange.bind(this,'name')}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={48}>
                    <Col span={7}>
                        <FormItem {...this.formItemLayout} label="接口ID">
                            <Input placeholder="请输入接口ID" onChange={this.inputChange.bind(this,'name')}/>
                        </FormItem>
                    </Col>
                    <Col span={7}>
                        <FormItem {...this.formItemLayout} label="接口名">
                            <Input placeholder="请输入接口名称" onChange={this.inputChange.bind(this,'name')}/>
                        </FormItem>
                    </Col>
                    <Col span={7}>
                        <FormItem {...this.formItemLayout} label="创建人">
                            <Input placeholder="请输入接口名称" onChange={this.inputChange.bind(this,'name')}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={48}>
                    <Col span={3} style={{'marginLeft':'10px'}}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" >
                                <Icon type="search" /> 搜索
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col span={3} >
                        <Form.Item>
                            <Button type="primary"  onClick={()=>{window.location.href="/insert_scene"}}><Icon type="plus" /> 添加场景</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default Form.create()(SearchForm)

