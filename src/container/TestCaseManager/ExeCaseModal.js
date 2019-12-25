import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Select,Form, Input, Modal } from 'antd';
import {message} from "antd/lib/index";

const FormItem = Form.Item;

@inject('TestCaseManagerStore','ExeRecordStore')
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
        this.props.form.validateFieldsAndScroll( async (err, values) => {
            if (!err) {
                let params =  {"id":null,"caseIds":this.props.caseIds,"scheduleType":1,"env":this.state.env}
                let result = await this.props.TestCaseManagerStore.exeCase(params,'case');
                if(result.code == 200){
                    this.hideExeCaseModal()
                    this.timerExe(result)
                    await this.props.TestCaseManagerStore.showCaseDrawer()
                }else{
                    message.warn("执行出现错误")
                }

            }
        });
    }
    timerExe = async(result) => {
        let data = await this.props.ExeRecordStore.getDetailData(result.data)
        this.timerDate = setInterval(()=> this.tick(data.status),1000);
    }
    handleClearTimeout(){
        this.timerDate && clearInterval(this.timerDate);
    }
    componentWillUnmount(){
        this.handleClearTimeout()
    }
    tick(status){
        if(status == 2){
            this.handleClearTimeout()
        }
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
                        <span>并行执行</span>
                    </FormItem>
                </Form>

            </Modal>
        )
    }
}

export default Form.create()(ExeCaseModal)
