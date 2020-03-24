import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Table, Button, Tag, Select,Icon, Row, Col, Form, Input } from 'antd';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import InsertCaseModal from '../InsertCaseModal'
import {insertCaseColumns} from '../config';
import {DragableBodyRow} from '../DragableBodyRow'

const FormItem = Form.Item;
const Option = Select.Option;


@inject('SceneManagerStore','TestCaseManagerStore')
@observer
class UpdateIndex extends Component {
    componentDidMount() {
        this.props.setBreadcrumb([
            {name: '场景管理'},
            {name: '修改场景'}
        ]);
        this.props.SceneManagerStore.getDetailData()
    }
    constructor(props){
        super(props);
        this.state= {
            data:[]
        }
    }
    components = {
        body: {
            row: DragableBodyRow,
        },
    };
    /**
     * 上下移动数据
     * @param dragIndex
     * @param hoverIndex
     */
    moveRow = (dragIndex, hoverIndex) => {
        debugger
        const data = this.props.SceneManagerStore.caseDataSource.toJS()
        const dragRow = data[dragIndex];
        const newData =  update(data,  {$splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]]});
        this.props.SceneManagerStore.orderCase(newData)
    };
    inputChange(n,e) {
        this.props.SceneManagerStore.changeDetailData(n,e.target.value);
    }
    optionChange(n,v,Option) {
        this.props.SceneManagerStore.changeDetailData(n,v.toString() || '');
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.SceneManagerStore.updateScene();
            }
        });
    }

    showInsertCaseModal(){
        this.props.SceneManagerStore.showInsertCaseModal()
    }
    deleteSceneCase(caseId){
        this.props.SceneManagerStore.deleteSceneCase(caseId)
    }
    formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    }
    exeCase = (record) => {
        this.props.TestCaseManagerStore.exeCase(record,'scene')
    }
    render(){
        const {insertCaseModalVisible,caseDataSource,detailData} = this.props.SceneManagerStore
        const { getFieldDecorator } = this.props.form;
        return(
            <div style={{width:'96%',marginLeft:'25px'}}>
                <Form  className="ant-advanced-search-form p-xs pb-0"  onSubmit={this.handleSubmit}>
                    <Row gutter={48}>
                        <Col span={9}>
                            <FormItem {...this.formItemLayout} label="场景名">
                                {getFieldDecorator('name', {
                                    initialValue: detailData.name,
                                    rules: [{ required: true, message: '请输入场景名!' }],
                                })(
                                    <Input placeholder="请输入场景名"  style={{ width: 280 }} onChange={this.inputChange.bind(this,'name')}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <FormItem {...this.formItemLayout} label="环境">
                                {getFieldDecorator('env', {
                                    initialValue: detailData.env,
                                    rules: [{ required: true, message: '请输入执行环境!' }],
                                })(
                                    <Input placeholder="请输入执行环境"  style={{ width: 200 }}  onChange={this.inputChange.bind(this,'env')}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem {...this.formItemLayout} label="执行方式">
                                {getFieldDecorator('scheduleType', {
                                    initialValue: detailData.scheduleType == "0" ? "顺序执行":"并行执行",
                                    rules: [{ required: true, message: '请选择执行方式!' }],
                                })(
                                    <Select  style={{ width: 130 }} onChange={this.optionChange.bind(this,'scheduleType')}>
                                        <Option value="0">顺序执行</Option>
                                        <Option value="1">并行执行</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={9}>
                            <FormItem {...this.formItemLayout} label="执行计划">
                                {getFieldDecorator('cron', {
                                    initialValue: detailData.cron,
                                    rules: [{ required: false, message: '请输入执行计划!' }],
                                })(
                                    <Input placeholder="请输入执行计划"  style={{ width: 273 }} onChange={this.inputChange.bind(this,'cron')}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <Form.Item>
                                <Button type="primary" onClick={this.showInsertCaseModal.bind(this)} >追加用例</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <InsertCaseModal updateCaseDataSource={detailData.testCaseSchedules} insertCaseModalVisible={insertCaseModalVisible}></InsertCaseModal>
                                <Button type="primary" htmlType="submit" >
                                    保存此场景数据
                                </Button> &nbsp; &nbsp; &nbsp;
                                <Button type="primary" onClick={this.exeCase}  onClick={() => this.exeCase(detailData)} >
                                    执行场景
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={48}>
                        <Tag color="purple" style={{'marginBottom':'8px'}}>  <Icon type="smile" /> 上下拖拽可以移动表格中用例顺序哦～  </Tag>
                        <DndProvider backend={HTML5Backend}>
                            <Table
                                bordered
                                columns={insertCaseColumns(this)} scroll={{ x: 1500, y: 600 }}
                                dataSource={caseDataSource.toJS()} components={this.components}
                                onRow={(record, index) => ({
                                    index,
                                    moveRow: this.moveRow,
                                })} />
                        </DndProvider>
                    </Row>
                </Form>
            </div>
        )
    }
}

export default Form.create()(UpdateIndex)
