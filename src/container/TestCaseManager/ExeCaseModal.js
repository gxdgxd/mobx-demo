import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Select,Form, Input, Modal } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

@inject('TestCaseManagerStore')
@observer
class ExeCaseModal extends Component{
    constructor(props){
        super(props);
        this.state={
            scheduleType:'',
            env:''
        }
    }

    okModal(){
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let params =  {"id":null,"caseIds":this.props.caseIds,"scheduleType":this.state.scheduleType,"env":this.state.env}
                this.props.TestCaseManagerStore.exeCase(params,"case");
            }
        });
    }

    hideExeCaseModal(){
        this.props.TestCaseManagerStore.hideExeCaseModal();
    }

    formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const { exeCaseModalVisible} = this.props

        return (
            <Modal
                destroyOnClose
                title="执行用例"
                width="800px"
                visible={exeCaseModalVisible}
                onOk={this.okModal.bind(this)}
                onCancel={this.hideExeCaseModal.bind(this)}
                okText="执行"
                cancelText="取消"
                className="model">
                <Form className="ant-advanced-search-form p-xs pb-0" >
                    <FormItem {...this.formItemLayout} label="执行环境">
                        {getFieldDecorator('env', {
                            rules: [{ required: true, message: '请输入执行环境!' }],
                        })(
                            <Input placeholder="请输入执行环境"  style={{ width: 220 }}  onChange={e => this.setState({ env: e.target.value })}/>
                        )}
                    </FormItem>
                    <FormItem {...this.formItemLayout} label="执行方式">
                        {getFieldDecorator('scheduleType', {
                            rules: [{ required: true, message: '请选择执行方式!' }],
                        })(
                            <Select placeholder="请选择执行方式"  style={{ width: 220 }} onChange={value => this.setState({ scheduleType:value.toString() })}>
                                <Option value="1">并行执行</Option>
                                <Option value="0">顺序执行</Option>
                            </Select>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

export default Form.create()(ExeCaseModal)
