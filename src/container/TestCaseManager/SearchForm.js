import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {  Button, Select,Icon, Row, Col, Form, Input } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

@inject('TestCaseManagerStore','CommonStore')
@observer
class SearchForm extends Component{
    constructor(props){
        super(props);
        this.state={
            data: [],
            value: undefined,
        }
    }
    componentDidMount() {
        this.props.CommonStore.getAllTags();
    }

    inputChange(n,e) {
        this.props.TestCaseManagerStore.changeTableRequestData(n,e.target.value);
    }
    optionChange(n,v) {
        this.props.TestCaseManagerStore.changeTableRequestData(n,v || '');
    }
    handleSearch = () => {
        this.props.TestCaseManagerStore.initData(1);
    }
    handleCreatorSearch = value => {
        if (value) {
            this.props.CommonStore.getAllCreators(value)
        } else {
            this.setState({ data: [] });
        }
    };

    handleCreatorChange = value => {
        this.setState({ value });
        this.props.TestCaseManagerStore.changeTableRequestData('creatorId',value);
    };
    formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    }

    render(){
        const {allTags,allCreators} = this.props.CommonStore

        return (
            <Form className="ant-advanced-search-form p-xs pb-0" >
                <Row gutter={48}>

                    <Col span={7}>
                        <FormItem {...this.formItemLayout} label="用例名">
                            <Input placeholder="请输入用例名"  allowClear={true} onChange={this.inputChange.bind(this,'name')}/>
                        </FormItem>
                    </Col>
                    <Col span={7}>
                        <FormItem {...this.formItemLayout} label="标签">
                            <Select name="tagId" allowClear={true} placeholder="请选择标签搜索"
                                    onChange={this.optionChange.bind(this,'tagId')}>
                                {allTags.map(item => <Option key={item.id} value={item.id}>{item.value}</Option>)}
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={7}>
                        <FormItem {...this.formItemLayout} label="创建人">
                            <Select
                                showSearch  allowClear={true}
                                value={this.state.value}
                                placeholder="请输入真名搜索(非花名)"
                                style={this.props.style}
                                defaultActiveFirstOption={false}
                                showArrow={false}
                                filterOption={false}
                                onSearch={this.handleCreatorSearch}
                                onChange={this.handleCreatorChange}
                                notFoundContent={null}
                            >
                                {allCreators.map(d => <Option key={d.userId}>{d.realName}</Option>)}
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={48}>
                    <Col span={7}>
                        <FormItem {...this.formItemLayout} label="接口ID">
                            <Input placeholder="请输入接口ID" allowClear={true} onChange={this.inputChange.bind(this,'apiId')}/>
                        </FormItem>
                    </Col>

                    <Col span={7}>
                        <FormItem {...this.formItemLayout} label="优先级">
                            <Select  placeholder="请选择优先级搜索"  allowClear={true} onChange={this.optionChange.bind(this,'priority')}>
                                <Option value="0">0</Option>
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={3} style={{'marginTop':'3px'}}>
                        <Button type="primary"  onClick={this.handleSearch}>
                            <Icon type="search" /> 搜索
                        </Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default Form.create()(SearchForm)

