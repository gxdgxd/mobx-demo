import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Table,Tag, Button,Alert, Radio, Select, Row, Col, Form, DatePicker, Input, Modal,Icon,Upload } from 'antd';
const { Column, ColumnGroup } = Table;


const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const { TextArea } = Input;


@inject('ApiManagerStore')
@observer
class DetailModal extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    okModal(){
        this.props.ApiManagerStore.update(this.state);
    }

    hideModal(type){
        this.props.ApiManagerStore.hideModal(type);
    }

    formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const { detailModalVisible} = this.props
        return (
            <Modal
                destroyOnClose
                title="详情"
                width="900px"
                visible={detailModalVisible}
                onOk={this.okModal.bind(this)}
                onCancel={this.hideModal.bind(this,'update')}
                okText="更新"
                cancelText="取消"
                className="model" width={1000} >
                <Form className="ant-advanced-search-form p-xs pb-0">
                    <Alert message="api包信息" type="info" style={{backgroundColor:'#c7e7ff',border:'0px','marginBottom':'10px'}}/>
                    <Row gutter={24} style={{'marginBottom':'10px'}}>
                        <Col span={8} >
                            &nbsp;groupId： <Input disabled style={{ width: 120 }} />
                        </Col>
                        <Col span={8} >
                            artifactId：
                            <Input disabled style={{ width: 120 }} />
                        </Col>
                        <Col span={8} >
                            version：
                            <Input disabled style={{ width: 120 }} />
                        </Col>
                    </Row>
                    <Alert message="接口信息" type="info" style={{backgroundColor:'#c7e7ff',border:'0px','marginBottom':'10px'}}/>
                    <Row gutter={24} style={{'marginBottom':'10px'}}>
                        <Col span={6} >
                            &nbsp;应用名：
                            <Select style={{ width: 120 }}  showSearch >
                                <Option key="1" value="1">1</Option>
                            </Select>
                        </Col>
                        <Col span={6} >
                            一级模块：
                            <Select style={{ width: 120 }}  showSearch >
                                <Option key="1" value="1">1</Option>
                            </Select>
                        </Col>
                        <Col span={6} >
                            二级模块：
                            <Select style={{ width: 120 }}  showSearch >
                                <Option key="1" value="1">1</Option>
                            </Select>
                        </Col>
                        <Col span={6} >
                            三级模块：
                            <Select style={{ width: 120 }}  showSearch >
                                <Option key="1" value="1">1</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{'marginBottom':'10px'}}>
                        <Col span={12} >
                            &nbsp;接口名：
                            <Input style={{ width: 376 }} />
                        </Col>
                        <Col span={6} >
                            接口路径：
                            <Input style={{ width: 150 }} />
                        </Col>

                        <Col span={6} >
                            方法名：
                            <Input style={{ width: 132 }} />
                        </Col>
                    </Row>
                    <Row gutter={24} style={{'marginBottom':'10px'}}>

                        <Col span={6} >
                            &nbsp;创建人：
                            <Input style={{ width: 120 }} />
                        </Col>
                        <Col span={15} >
                            标签：
                            <Input style={{ width: 144 }} />
                        </Col>
                    </Row>
                    <Row gutter={24} style={{'marginBottom':'10px'}}>
                        <Col span={25} >
                            &nbsp;描述：
                            <TextArea rows={3} style={{ width: 880 }} />
                        </Col>
                    </Row>
                </Form>
            </Modal>
        )
    }
}

export default Form.create()(DetailModal)
