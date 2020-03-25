import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Table, Button, Radio, Select,Icon, Row, Col, Form, DatePicker, Input, Modal } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;


@inject('SceneManagerStore','CommonStore')
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
    }

    inputChange(n,e) {
        this.props.SceneManagerStore.changeTableRequestData(n,e.target.value);
    }
    optionChange(n,v) {
        this.props.SceneManagerStore.changeTableRequestData(n,v || '');
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
        this.props.SceneManagerStore.changeTableRequestData('creatorId',value);
    };
    handleSubmit = () => {
        this.props.SceneManagerStore.initData(1);
    }
    formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    }
    render(){
        const {allCreators} = this.props.CommonStore

        return (
            <Form  className="ant-advanced-search-form p-xs pb-0" >
                <Row gutter={48}>
                    <Col span={7}>
                        <FormItem {...this.formItemLayout} label="场景ID">
                            <Input placeholder="请输入场景ID" allowClear={true} onChange={this.inputChange.bind(this,'id')}/>
                        </FormItem>
                    </Col>
                    <Col span={7}>
                        <FormItem {...this.formItemLayout} label="场景名称">
                            <Input placeholder="请输入场景名称" allowClear={true} onChange={this.inputChange.bind(this,'name')}/>
                        </FormItem>
                    </Col>
                    <Col span={7}>
                        <FormItem {...this.formItemLayout} label="创建人">
                            <Select
                                showSearch
                                value={this.state.value}
                                placeholder="请输入真名搜索(非花名)"
                                style={this.props.style}
                                defaultActiveFirstOption={false}
                                showArrow={false}  allowClear={true}
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
                        <FormItem {...this.formItemLayout} label="执行方式">
                            <Select   placeholder="请选择执行方式"  allowClear={true} onChange={this.optionChange.bind(this,'scheduleType')}>
                                <Option value="0">顺序执行</Option>
                                <Option value="1">并行执行</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={7}>
                        <FormItem {...this.formItemLayout} label="执行计划">
                            <Input placeholder="请输入执行计划" allowClear={true} onChange={this.inputChange.bind(this,'cron')}/>
                        </FormItem>
                    </Col>
                    <Col span={3}>
                        <Form.Item>
                            <Button type="primary"  onClick={this.handleSubmit}>
                                <Icon type="search" /> 搜索
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col span={3} >
                        <Form.Item>
                            <Button type="primary"  onClick={()=>{window.open("/insert_scene")}}><Icon type="plus" /> 添加场景</Button>
                        </Form.Item>
                    </Col>
                </Row>

            </Form>
        )
    }
}

export default Form.create()(SearchForm)

