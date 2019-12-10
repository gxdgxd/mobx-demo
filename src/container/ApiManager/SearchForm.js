import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Select,Icon, Row, Col, Form, Input } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

@inject('ApiManagerStore','CommonStore')
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
        this.props.ApiManagerStore.changeTableRequestData(n,e.target.value);
    }
    optionChange(n,v) {
        this.props.ApiManagerStore.changeTableRequestData(n,v || '');
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
        this.props.ApiManagerStore.changeTableRequestData('creatorId',value);
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.ApiManagerStore.initData(1);
    }
    formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    }
    render(){
        const {allCreators} = this.props.CommonStore
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
                            <Select
                                showSearch
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
                    <Col span={7}>
                        <FormItem {...this.formItemLayout} label="标签">
                            <Select name="tagId" allowClear={true} placeholder="请选择标签搜索"
                                    onChange={this.optionChange.bind(this,'tagId')}>
                                {this.props.allTags.map(item => <Option key={item.id} value={item.id}>{item.value}</Option>)}
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
                            <Button type="primary"  onClick={()=>{window.open("/insert_api")}}><Icon type="plus" /> 添加接口</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default Form.create()(SearchForm)

