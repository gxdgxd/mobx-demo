import React, {Component} from 'react';
import { observable, action, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Table,Select,Pagination,Button,Form,Row,Icon, Input,Col} from 'antd';
import {columns} from './config';
import TreeManager from '../TreeManager/TreeManager';
import {message} from "antd/lib/index";
const Option = Select.Option;
const FormItem = Form.Item;
@inject('TestCaseManagerStore','CommonStore')
@observer
class TestCaseManagerList extends Component {
    componentDidMount() {
        this.props.setBreadcrumb([
            {name: '用例管理'},
        ]);
        this.props.TestCaseManagerStore.initData(1);
        this.props.CommonStore.getAllTags();
        this.props.CommonStore.getAllCreators();
    }
    constructor(props){
        super(props);
        this.state= {
            selectedRowKeys:[],
            selectedRows:[]
        }
    }
    inputChange(n,e) {
        this.props.TestCaseManagerStore.changeTableRequestData(n,e.target.value);
    }
    optionChange(n,v) {
        this.props.TestCaseManagerStore.changeTableRequestData(n,v || '');
    }
    handleSearch = (e) => {
        e.preventDefault();
        this.props.TestCaseManagerStore.initData(1);
    }
    /**
     * 执行用例
     */
    batchExeCase = () => {
        if(this.state.selectedRowKeys.length <= 0){
            message.warn("请先勾选需要需要执行的用例")
        }else{
            message.success("正在执行用例")
            // this.props.TestCaseManagerStore.batchExeCase(this.state.selectedRows)
        }
    }
    onChangePage = page => {
        this.props.TestCaseManagerStore.initData(page);
    };
    formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    }
    render(){
        const {dataSource,pageNo,pageSize,totalCount} = this.props.TestCaseManagerStore
        const mydataSource = dataSource.toJS()
        const {allTags,allCreators} = this.props.CommonStore
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.setState({
                    selectedRowKeys: selectedRowKeys,
                    selectedRows: selectedRows
                });
            }
        };
        return(
            <div className="container-bg">
                <Row>
                    <Col span={4}>
                        <TreeManager pageType="case" maxHeight="700px"/>
                    </Col>
                    <Col span={20}>

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
                                <Col span={7}>
                                    <FormItem {...this.formItemLayout} label="标签">
                                        <Select name="tagId" allowClear={true} placeholder="请选择标签搜索"
                                                onChange={this.optionChange.bind(this,'tagId')}>
                                            {allTags.map(item => <Option key={item.id} value={item.id}>{item.value}</Option>)}
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row gutter={48}>
                                <Col span={7}>
                                    <FormItem {...this.formItemLayout} label="创建人">
                                        <Select name="creatorId" allowClear={true}  placeholder="请选择创建人搜索"
                                                onChange={this.optionChange.bind(this,'creatorId')}>
                                            {allCreators.map(item => <Option key={item.id} value={item.value}>{item.value}</Option>)}
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span={7}>
                                    <FormItem {...this.formItemLayout} label="优先级">
                                        <Select  placeholder="请选择优先级搜索" onChange={this.optionChange.bind(this,'priority')}>
                                            <Option value="1">1</Option>
                                            <Option value="2">2</Option>
                                            <Option value="3">3</Option>
                                            <Option value="4">4</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span={3} style={{'marginTop':'3px'}}>
                                        <Button type="primary" htmlType="submit" >
                                            <Icon type="search" /> 搜索
                                        </Button>
                                </Col>
                                <Col span={3} style={{'marginTop':'3px'}}>
                                    <Button type="primary" onClick={this.batchExeCase} >
                                        执行用例
                                    </Button>
                                </Col>
                            </Row>
                        </Form>


                        <Table
                            bordered
                            columns={columns(this)} pagination={false}
                            dataSource={mydataSource}  rowSelection={rowSelection}/>
                        <Pagination onChange={this.onChangePage} pageSize={pageSize} current={pageNo}  total={totalCount} style={{'marginTop':'6px','float':'right'}}/>

                    </Col>
                </Row>
            </div>
        )
    }
}

export default TestCaseManagerList;