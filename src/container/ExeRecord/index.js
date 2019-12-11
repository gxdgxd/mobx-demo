import React, {Component} from 'react';
import { observable, action, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Table,Input,Select,Form,Row, Col,Button,Icon,DatePicker,Pagination} from 'antd';
import moment from 'moment';
import {columns} from "./config";
import DetailModal from "./DetailModal";
const Option = Select.Option;

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

@inject('ExeRecordStore','CommonStore')
@observer
class ExeRecordIndex extends Component {
    componentDidMount() {
        this.props.setBreadcrumb([
            {name: '执行记录'},
        ]);
        this.props.ExeRecordStore.initData(1);
    }
    constructor(props){
        super(props);
        this.state= {
            json_str:{}
        }
    }
    inputChange(n,e) {
        this.props.ExeRecordStore.changeTableRequestData(n,e.target.value);
    }
    optionChange(n,v) {
        this.props.ExeRecordStore.changeTableRequestData(n,v || '');
    }
    showModal(id){
        this.props.ExeRecordStore.getDetailData(id)
    }
    onChangePage = page => {
        this.props.ExeRecordStore.initData(page);
    };
    onDateChange(dates, dateStrings) {
        this.props.ExeRecordStore.changeTableRequestData('exeTimeBefore',dateStrings[0]);
        this.props.ExeRecordStore.changeTableRequestData('finishTimeAfter',dateStrings[1]);
    }
    formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    }
    handleSearch = () => {
        this.props.ExeRecordStore.initData(1);
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
        this.props.ExeRecordStore.changeTableRequestData('operatorId',value);
    };
    render(){
        const {dataSource,modalVisible,pageNo,pageSize,totalCount,detailData} = this.props.ExeRecordStore
        const {allCreators} = this.props.CommonStore
        const mydataSource = dataSource.toJS()
        return(
            <div className="container-bg">
                <Form  className="ant-advanced-search-form p-xs pb-0">
                    <Row gutter={48}>
                        <Col span={8}>
                            <FormItem {...this.formItemLayout} label="时间">
                                <RangePicker
                                    ranges={{
                                        Today: [moment(), moment()],
                                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                                    }}
                                    onChange={this.onDateChange}
                                />
                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <FormItem {...this.formItemLayout} label="场景ID">
                                <Input placeholder="请输入场景ID"  allowClear={true}  onChange={this.inputChange.bind(this,'testSceneId')}/>
                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <FormItem {...this.formItemLayout} label="执行环境">
                                <Input placeholder="请输入执行环境"  allowClear={true} onChange={this.inputChange.bind(this,'env')}/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={48}>
                        <Col span={8}>
                            <FormItem {...this.formItemLayout} label="操作人">
                                <Select
                                    showSearch
                                    value={this.state.value}
                                    placeholder="请输入真名搜索(非花名)"
                                    style={this.props.style}
                                    defaultActiveFirstOption={false}
                                    showArrow={false}
                                    filterOption={false}  allowClear={true}
                                    onSearch={this.handleCreatorSearch}
                                    onChange={this.handleCreatorChange}
                                    notFoundContent={null}
                                >
                                    {allCreators.map(d => <Option key={d.userId}>{d.realName}</Option>)}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <FormItem {...this.formItemLayout} label="执行状态">
                                <Select placeholder="请选择执行状态"   onChange={this.optionChange.bind(this,'status')}>
                                    <Option value="0">待执行</Option>
                                    <Option value="1">执行中</Option>
                                    <Option value="2">已完成</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={3}>
                            <Button type="primary" htmlType="submit" onClick={this.handleSearch}>
                                <Icon type="search" /> 搜索
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Row style={{'marginTop':'8px'}}>
                    <Table
                        bordered
                        columns={columns(this)}
                        dataSource={mydataSource} />
                    <Pagination onChange={this.onChangePage} pageSize={pageSize} current={pageNo}  total={totalCount} style={{'marginTop':'6px','float':'right'}}/>

                    <DetailModal modalVisible={modalVisible} detailData={detailData}/>

                </Row>
            </div>
        )
    }
}

export default ExeRecordIndex;