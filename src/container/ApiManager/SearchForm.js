import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Table, Button, Radio, Select,Icon, Row, Col, Form, DatePicker, Input, Modal } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;


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

    inputChange(n,e) {
        this.props.ApiManagerStore.changeTableRequestData(n,e.target.value);
    }
    optionChange(n,v) {
        this.props.ApiManagerStore.changeTableRequestData(n,v || '');
    }

    handleSubmit = (e) => {
        debugger
        e.preventDefault();
        this.props.ApiManagerStore.initData(1);
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
                        <FormItem {...this.formItemLayout} label="接口ID">
                            <Input placeholder="请输入接口ID" onChange={this.inputChange.bind(this,'id')}/>
                        </FormItem>
                    </Col>
                    <Col span={7}>
                        <FormItem {...this.formItemLayout} label="接口名">
                            <Input placeholder="请输入接口名" onChange={this.inputChange.bind(this,'name')}/>
                        </FormItem>
                    </Col>
                    <Col span={7}>
                        <FormItem {...this.formItemLayout} label="方法名">
                            <Input placeholder="请输入方法名" onChange={this.inputChange.bind(this,'apiMethodName')}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={48}>
                    <Col span={7}>
                        <FormItem {...this.formItemLayout} label="创建人">
                            <Select name="creator" allowClear={true}  showSearch
                                    onChange={this.optionChange.bind(this,'creator')}>
                                {this.props.creatorList.map(item => <Option key={item} value={item}>{item}</Option>)}
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={7}>
                        <FormItem {...this.formItemLayout} label="标签">
                            <Select name="tag" allowClear={true}  showSearch
                                    onChange={this.optionChange.bind(this,'tag')}>
                                {this.props.tagsSearch.map(item => <Option key={item.id} value={item.id}>{item.value}</Option>)}
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={3}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" >
                                <Icon type="search" /> 搜索
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col span={3} >
                        <Form.Item>
                            <Button type="primary"  onClick={()=>{window.location.href="/insert_api"}}><Icon type="plus" /> 添加接口</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default Form.create()(SearchForm)

