import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Radio,Form, Input, Modal } from 'antd';
const FormItem = Form.Item;

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
                this.props.GlobalManagerStore.update();
            }
        });
    }

    hideModal(){
        this.props.GlobalManagerStore.hideModal('update');
    }

    /**
     * 输入框和单选按钮产生的change事件
     * @param n
     * @param e
     */
    inputChange(n,e) {
        let obj={};
        obj[n]=e.target.value;
        this.props.GlobalManagerStore.changeDetailData(n,e.target.value);
    }


    formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const { updateModalVisible,detailData} = this.props

        return (
            <Modal
                destroyOnClose
                title="修改参数"
                width="800px"
                visible={updateModalVisible}
                onOk={this.okModal.bind(this)}
                onCancel={this.hideModal.bind(this)}
                okText="保存"
                cancelText="取消"
                className="model">
                <Form className="ant-advanced-search-form p-xs pb-0" >
                    <FormItem {...this.formItemLayout} label="参数名">
                        {getFieldDecorator('name', {
                            initialValue: detailData.name,
                            rules: [{ required: true, message: '请填写参数名!' }],
                        })(
                            <Input type="text"  style={{ width: 300 }}  placeholder="请填写参数名" onChange={this.inputChange.bind(this,'name')}/>
                        )}
                    </FormItem>
                    <FormItem {...this.formItemLayout} label="参数值">
                        {getFieldDecorator('value', {
                            initialValue: detailData.value,
                            rules: [{ required: true, message: '请填写参数值!' }],
                        })(
                            <Input type="text"  style={{ width: 300 }}  placeholder="请填写参数值" onChange={this.inputChange.bind(this,'value')}/>
                        )}
                    </FormItem>
                    <FormItem {...this.formItemLayout} label="参数类型">
                        {getFieldDecorator('varType', {
                            initialValue: detailData.varType,
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
