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
class TreeModal extends Component{
    constructor(props){
        super(props);
        this.state={
        }
    }

    okModal(){
        this.props.ApiManagerStore.saveTreeData(this.state);
    }

    hideModal(type){
        this.props.ApiManagerStore.hideTreeModal(type);
    }
    /**
     * 输入框和单选按钮产生的change事件
     * @param n
     * @param e
     */
    inputChange(n,e) {
        let obj={};
        obj[n]=e.target.value;
        this.setState(obj);
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const { treeModalVisible} = this.props
        return (
            <Modal
                destroyOnClose
                title="添加"
                width="900px"
                visible={treeModalVisible}
                onOk={this.okModal.bind(this)}
                onCancel={this.hideModal.bind(this,'update')}
                okText="保存"
                cancelText="取消"
                className="model" width={500} >

                <Form  layout="inline" className="ant-advanced-search-form p-xs pb-0" onSubmit={this.handleSubmit}>
                    <Row>
                        <FormItem {...this.formItemLayout} label="名称">
                            {getFieldDecorator('名称', {
                                rules: [{ required: true, message: '请填写名称!' }],
                            })(
                                <Input  style={{ width: 250 }} onChange={this.inputChange.bind(this,'name')}/>
                            )}
                        </FormItem>
                    </Row>
                </Form>
            </Modal>
        )
    }
}

export default Form.create()(TreeModal)
