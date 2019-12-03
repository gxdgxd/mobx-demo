import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import ReactJson from 'react-json-view'
import { Tag, Button,Alert, Select, Row, Form, Input } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

@inject('TestCaseManagerStore')
@observer
class InsertIndex extends Component {
    componentDidMount() {
        this.props.setBreadcrumb([
            {name: '用例管理'},
            {name: '添加用例'},
        ]);
    }
    constructor(props) {
        super(props);
        this.state = {
            json_str: { "code": 200,

                "message": "",

                "data": {

                    "itemList": [
                        {

                            "id": 49973,

                            "itemPicTagCode": null,

                            "itemPicMaskCode": 0,

                            "actualPrice": {

                                "value": "400.00",

                                "type": "num"

                            },

                            "originalPrice": {

                                "value": "412.23",

                                "type": "num"

                            }

                        }

                    ]

                },

                "pageNo": 0,

                "totalPage": 0,

                "monitorInfo": {

                    "ppTraceId": "hop-^71641611",

                    "processTime": 5

                },

                "success": true}

        }
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
    handleAdd = (add) => {
        this.setState({json_str:add.updated_src});
    }
    handleEdit = (add) => {
        debugger
        console.log(add)
        this.setState({json_str:add.updated_src});
    }
    handleDelete = (add) => {
        this.setState({json_str:add.updated_src});
    }
    render(){
        const { getFieldDecorator} = this.props.form;
        return(
            <div className="container-bg" style={{'marginLeft':'15px'}}>
                <Form  layout="inline" className="ant-advanced-search-form p-xs pb-0" onSubmit={this.handleSubmit}>
                    <Alert message="接口信息" type="info" style={{backgroundColor:'#c7e7ff',border:'0px','marginBottom':'10px'}}/>
                    <Row>
                        <FormItem {...this.formItemLayout} label="应用名">
                            {getFieldDecorator('version', {
                                rules: [{ required: false, message: '请填写应用名!' }],
                            })(
                                <Select style={{ width: 145 }}  showSearch >
                                    <Option key="1" value="1">1</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem {...this.formItemLayout} label="一级模块">
                            {getFieldDecorator('version', {
                                rules: [{ required: false, message: '请填写一级模块!' }],
                            })(
                                <Select style={{ width: 145 }}  showSearch >
                                    <Option key="1" value="1">1</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem {...this.formItemLayout} label="二级模块">
                            {getFieldDecorator('version', {
                                rules: [{ required: false, message: '请填写二级模块!' }],
                            })(
                                <Select style={{ width: 145 }}  showSearch >
                                    <Option key="1" value="1">1</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem {...this.formItemLayout} label="三级模块">
                            {getFieldDecorator('version', {
                                rules: [{ required: false, message: '请填写三级模块!' }],
                            })(
                                <Select style={{ width: 145 }}  showSearch >
                                    <Option key="1" value="1">1</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem {...this.formItemLayout} label="接口路径">
                            {getFieldDecorator('apiClassName', {
                                rules: [{ required: false, message: '请填写接口路径!' }],
                            })(
                                <Input disabled style={{ width: 823 }}/>
                            )}
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem {...this.formItemLayout} label="方法名">
                            {getFieldDecorator('apiMethodName', {
                                rules: [{ required: false, message: '请填写方法名!' }],
                            })(
                                <Input disabled style={{ width: 375 }} />
                            )}
                        </FormItem>
                        <FormItem {...this.formItemLayout} label="接口名">
                            {getFieldDecorator('name', {
                                rules: [{ required: false, message: '请填写name!' }],
                            })(
                                <Input disabled style={{ width: 389 }}/>
                            )}
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem {...this.formItemLayout} label="标签">
                        </FormItem>
                    </Row>
                    <Alert message="用例信息" type="info" style={{backgroundColor:'#c7e7ff',border:'0px','marginBottom':'10px'}}/>
                    <Row>
                        <FormItem {...this.formItemLayout} label="用例名">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请填写用例名!' }],
                            })(
                                <Input style={{ width: 365 }} />
                            )}
                        </FormItem>
                        <FormItem {...this.formItemLayout} label="优先级">
                            {getFieldDecorator('priority', {
                                rules: [{ required: true, message: '请填写用例优先级!' }],
                            })(
                                <span>
                                    <Select defaultValue="2" style={{ width: 120 }}>
                                        <Option value="1">1</Option>
                                        <Option value="2">2</Option>
                                        <Option value="3">3</Option>
                                        <Option value="4">4</Option>
                                    </Select>&nbsp;&nbsp;&nbsp;
                                    <Tag color="magenta"> 1为最高，4为最低 </Tag>
                                </span>
                            )}
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem {...this.formItemLayout} label="描述">
                            {getFieldDecorator('desc', {
                                rules: [{ required: false, message: '请填写用例描述!' }],
                            })(
                                <TextArea rows={3} style={{ width: 852 }} onChange={this.inputChange.bind(this,'desc')}/>
                            )}
                        </FormItem>
                    </Row>
                    <Alert message="请求入参" type="info" style={{backgroundColor:'#c7e7ff',border:'0px','marginBottom':'10px'}}/>
                    <Row>
                        <div style={{float:'left',width:'50%'}}>
                            <ReactJson src={this.state.json_str} onAdd={this.handleAdd} onEdit={this.handleEdit} onDelete={this.handleDelete}   theme="google" style={{border:'1px solid #ccc','maxHeight':'325px','overflow-y':'auto' }}/>
                        </div>
                        <div style={{float:'right',width:'49%'}}>
                            <TextArea value={JSON.stringify(this.state.json_str)}  rows={15} style={{'width':'1300px'}} />
                        </div>
                    </Row>
                    <Alert message="其他参数（dubbo rpc parameter）" type="info" style={{backgroundColor:'#c7e7ff',border:'0px','marginBottom':'10px'}}/>
                    <Row>
                        <div style={{float:'left',width:'50%'}}>
                            <ReactJson src={this.state.json_str} onAdd={this.handleAdd} onEdit={this.handleEdit} onDelete={this.handleDelete}   theme="google" style={{border:'1px solid #ccc','maxHeight':'261px','overflow-y':'auto' }}/>
                        </div>
                        <div style={{float:'right',width:'49%'}}>
                            <TextArea value={JSON.stringify(this.state.json_str)}  rows={12} style={{'width':'1300px'}} />
                        </div>
                    </Row>
                    <Alert message="结果校验规则" type="info" style={{backgroundColor:'#c7e7ff',border:'0px','marginBottom':'10px'}}/>
                    <Row>
                        <FormItem {...this.formItemLayout} label="">
                            {getFieldDecorator('valid_script', {
                                rules: [{ required: true, message: '请填写用例校验规则!' }],
                            })(
                                <TextArea rows={3} style={{ width: 967 }} placeholder="如：result != null  && result.data != null && result.data.size() > 0 && result.data.id == $p.result.id" onChange={this.inputChange.bind(this,'valid_script')}/>
                            )}
                        </FormItem>
                    </Row>
                </Form>

            </div>
        )
    }
}

export default Form.create()(InsertIndex)