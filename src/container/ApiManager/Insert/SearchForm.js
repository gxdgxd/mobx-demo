import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { Table,Divider, Button, Alert, Select,Icon, Row, Col, Form, DatePicker, Input, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import common from "../../../style/common.css";

const FormItem = Form.Item;


@inject('ApiManagerStore')
@observer
class SearchForm extends Component{
    constructor(props){
        super(props);
        this.state={
            groupId:'',
            artifactId:'',
            version:''
        }
    }

    inputChange(n,e) {
        this.props.ApiManagerStore.changeTableRequestData(n,e.target.value);
    }

    handleSearch = (e) => {

        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.ApiManagerStore.fetchApiByGAV(1);
            }
        });
    }
    formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 13 },
    }
    render(){
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Alert message="api包信息" type="info" style={{backgroundColor:'#c7e7ff',border:'0px','marginBottom':'5px'}}/>
                <Form layout="inline"  className="ant-advanced-search-form p-xs pb-0" onSubmit={this.handleSearch}>
                    <FormItem {...this.formItemLayout} label="groupId">
                        {getFieldDecorator('groupId', {
                            rules: [{ required: true, message: '请填写groupId!' }],
                        })(
                            <Input placeholder="请输入groupId"  onChange={this.inputChange.bind(this,'groupId')}/>
                        )}
                    </FormItem>
                    <FormItem {...this.formItemLayout} label="artifactId">
                        {getFieldDecorator('artifactId', {
                            rules: [{ required: true, message: '请填写artifactId!' }],
                        })(
                            <Input placeholder="请输入artifactId"  onChange={this.inputChange.bind(this,'artifactId')}/>
                        )}
                    </FormItem>
                    <FormItem {...this.formItemLayout} label="version">
                        {getFieldDecorator('version', {
                            rules: [{ required: true, message: '请选择version' }],
                        })(
                            <Input placeholder="请输入version" onChange={this.inputChange.bind(this,'version')}/>
                        )}
                    </FormItem>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" >
                            <Icon type="search" /> 搜索
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Form.create()(SearchForm)

