import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {Row, Form, Input, Modal} from 'antd';
const FormItem = Form.Item;


@inject('TreeManagerStore')
@observer
class InsertTreeModal extends Component{
    constructor(props){
        super(props);
        this.state={
        }
    }

    okModal(){
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.TreeManagerStore.insertTreeModule();
            }
        });
    }

    hideModal(){
        this.props.TreeManagerStore.hideTreeModal();
    }
    /**
     * 输入框和单选按钮产生的change事件
     * @param n
     * @param e
     */
    inputChange(n,e) {
        let obj={};
        obj[n]=e.target.value;
        this.props.TreeManagerStore.changeTableRequestData(n,e.target.value);
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const { treeModalVisible,tableRequestData,modalName} = this.props
        return (
            <Modal
                destroyOnClose
                title={modalName}
                width="900px"
                visible={treeModalVisible}
                onOk={this.okModal.bind(this)}
                onCancel={this.hideModal.bind(this)}
                okText="保存"
                cancelText="取消"
                className="model" width={500} >

                <Form  layout="inline" className="ant-advanced-search-form p-xs pb-0">
                    <Row>
                        <FormItem {...this.formItemLayout} label="模块名称" >
                            {getFieldDecorator('name', {
                                initialValue: tableRequestData.name,
                                rules: [{ required: true, message: '请填写模块名称!' }],
                            })(
                                <Input  style={{ width: 250 }} placeholder='请填写模块名称!' onChange={this.inputChange.bind(this,'name')}/>
                            )}
                        </FormItem>
                    </Row>
                </Form>
            </Modal>
        )
    }
}

export default Form.create()(InsertTreeModal)
