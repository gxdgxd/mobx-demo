import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Table, Button, Tag, Select,Icon, Row, Col, Form, Input } from 'antd';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider} from 'react-dnd';

import update from 'immutability-helper';
import InsertCaseModal from '../InsertCaseModal'
import {DragableBodyRow} from '../DragableBodyRow'
import {insertCaseColumns} from '../config';

const FormItem = Form.Item;
const Option = Select.Option;

@inject('SceneManagerStore')
@observer
class InsertIndex extends Component {
    componentDidMount() {
        this.props.setBreadcrumb([
            {name: '场景管理'},
            {name: '添加场景'}
        ]);

    }

    constructor(props){
        super(props);
        this.state= {
            data:[],
            newCaseDataSource :[]
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
        this.props.SceneManagerStore.changeTableRequestData(n,e.target.value);
    }
    optionChange(n,v,Option) {
        this.props.SceneManagerStore.changeTableRequestData(n,v.toString() || '');
    }
    handleSubmit = (e) => {
        debugger
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.SceneManagerStore.insertScene();
            }
        });
    }

    showInsertCaseModal(){
        this.props.SceneManagerStore.showInsertCaseModal()
    }
    deleteSceneCase(key){
        this.props.SceneManagerStore.deleteSceneCase(key)
    }


    formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    }

    render(){
        const {insertCaseModalVisible,caseDataSource} = this.props.SceneManagerStore
        const { getFieldDecorator } = this.props.form;

        return(
            <div style={{width:'96%',marginLeft:'25px'}}>
                <Form  className="ant-advanced-search-form p-xs pb-0"  onSubmit={this.handleSubmit}>
                    <Row gutter={48}>
                        <Col span={9}>
                            <FormItem {...this.formItemLayout} label="场景名称">
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: '请输入场景名称!' }],
                                })(
                                    <Input placeholder="请输入场景名"  allowClear={true} style={{ width: 280 }} onChange={this.inputChange.bind(this,'name')}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <FormItem {...this.formItemLayout} label="环境">
                                {getFieldDecorator('env', {
                                    rules: [{ required: true, message: '请输入执行环境!' }],
                                })(
                                    <Input placeholder="请输入执行环境"  allowClear={true} style={{ width: 200 }}  onChange={this.inputChange.bind(this,'env')}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem {...this.formItemLayout} label="执行方式">
                                <Select defaultValue="顺序执行" style={{ width: 140 }} onChange={this.optionChange.bind(this,'scheduleType')}>
                                    <Option value="0">顺序执行</Option>
                                    <Option value="1">并行执行</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={9}>
                            <FormItem {...this.formItemLayout} label="执行计划">
                                {getFieldDecorator('cron', {
                                    rules: [{ required: false, message: '请输入执行计划!' }],
                                })(
                                    <Input placeholder="cron表达式，如：1-2 * * * * ?"  style={{ width: 273 }} onChange={this.inputChange.bind(this,'cron')}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={9}>
                            <FormItem {...this.formItemLayout} label="钉钉webhook">
                                {getFieldDecorator('alarmDingUrls', {
                                    rules: [{ required: false, message: '钉钉webhook!' }],
                                })(
                                    <Input placeholder="钉钉机器人webhook，如：https://oapi.dingtalk.com/robot/send?access_token=17c1994369e0842647978a405713cb6e257fdf6c53df80bc6526afcf3866ba84"  style={{ width: 500 }} onChange={this.inputChange.bind(this,'alarmDingUrls')}/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={15}>
                                <Button type="primary" onClick={this.showInsertCaseModal.bind(this)} >追加用例</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <InsertCaseModal insertCaseModalVisible={insertCaseModalVisible}></InsertCaseModal>
                                <Button type="primary" htmlType="submit" >
                                    保存此场景数据
                                </Button> &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                            <Tag color="purple" style={{'marginBottom':'8px'}}>  <Icon type="smile" /> 上下拖拽可以移动表格中用例顺序哦～  </Tag>
                        </Col>
                    </Row>
                    <Row gutter={48}>
                        <DndProvider backend={HTML5Backend}>
                            <Table
                                bordered pagination={false}
                                columns={insertCaseColumns(this)}  scroll={{ x: 1580, y: 600 }}
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

export default Form.create()(InsertIndex)
