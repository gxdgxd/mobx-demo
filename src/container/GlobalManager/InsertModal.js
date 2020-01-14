import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Radio,Form, Input, Modal } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

@inject('GlobalManagerStore')
@observer
class InsertModal extends Component{
    constructor(props){
        super(props);
        this.state={
        }
    }

    okModal(){
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.GlobalManagerStore.insert();
            }
        });
    }

    hideModal(){
        this.props.GlobalManagerStore.hideModal('insert');
    }

    /**
     * 输入框和单选按钮产生的change事件
     * @param n
     * @param e
     */
    inputChange(n,e) {
        let obj={};
        obj[n]=e.target.value;
        this.props.GlobalManagerStore.changeTableRequestData(n,e.target.value);
    }


    formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const { modalVisible} = this.props

        return (
            <Modal
                destroyOnClose
                title="添加参数"
                width="900px"
                visible={modalVisible}
                onOk={this.okModal.bind(this)}
                onCancel={this.hideModal.bind(this)}
                okText="保存"
                cancelText="取消"
                className="model">
                <Form  className="ant-advanced-search-form p-xs pb-0" >
                    <FormItem {...this.formItemLayout} label="参数名">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请填写参数名!' }],
                        })(
                            <Input type="text"  style={{ width: 550 }}  placeholder="请填写参数名" onChange={this.inputChange.bind(this,'name')}/>
                        )}
                    </FormItem>
                    <FormItem {...this.formItemLayout} label="参数值">
                        {getFieldDecorator('value', {
                            rules: [{ required: true, message: '请填写参数值!' }],
                        })(
                            <TextArea rows={8} style={{ width: 550 }} placeholder="请填写参数值" onChange={this.inputChange.bind(this,'value')}/>
                        )}
                    </FormItem>
                    <FormItem {...this.formItemLayout} label="参数类型">
                        {getFieldDecorator('varType', {
                            initialValue: 0,
                            rules: [{ required: true, message: '请选择参数类型!' }],
                        })(
                            <Radio.Group onChange={this.inputChange.bind(this,'varType')}>
                                <Radio value={0}>常量</Radio>
                                <Radio value={1}>闭包</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

export default Form.create()(InsertModal)
