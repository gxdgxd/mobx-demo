import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import ReactJson from 'react-json-view'
import { Tag, Button,Alert, Select, Row,Icon, Form, Input,Tooltip,message } from 'antd';
import {getUrlParam} from '../../../utils/common'
import SingleTag from "../../TagManager/SingleTag";

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

@inject('TestCaseManagerStore','ApiManagerStore')
@observer
class InsertIndex extends Component {
    componentDidMount() {
        this.props.setBreadcrumb([
            {name: '用例管理'},
            {name: '编辑用例'},
        ]);
        this.props.ApiManagerStore.getApiDetailData()
        if(getUrlParam('caseId',window.location.search) != ""){
            this.props.TestCaseManagerStore.getDetailData()
        }
        // this.setState({
        //     json_str:this.props.TestCaseManagerStore.caseDetailData.paramScript
        // })

    }
    constructor(props) {
        super(props);
        this.state = {
            json_str:"",
            dubboGroup:''
        }
    }
    /**
     * 获取子组件SingleTag中用户输入的tag标签
     */
    getTags = (tags) => {
        debugger
        this.props.ApiManagerStore.insertTags(tags)
    };
    /**
     * 输入框和单选按钮产生的change事件
     * @param n
     * @param e
     */
    inputChange(n,e) {
        let obj={};
        obj[n]=e.target.value;
        this.props.TestCaseManagerStore.changeDetailData(n,e.target.value);
    }
    optionChange(n,v,Option) {
        this.props.TestCaseManagerStore.changeDetailData(n,v.toString() || '');
    }

    /**
     * 保存用例
     */
    insert = (e) => {

        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.TestCaseManagerStore.insert(this.props.ApiManagerStore.tags,this.props.ApiManagerStore.detailData,true)
            }
        });
    }
    /**
     * 只测试不保存
     */
    testCaseExe = () => {
        debugger
        let caseId = getUrlParam('caseId',window.location.search);

        if(caseId == ""){
            message.warn("请先保存用例再执行！")
            return
        }
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.TestCaseManagerStore.insert(this.props.ApiManagerStore.tags,this.props.ApiManagerStore.detailData,false)
            }
        });
        let params =  {"id":null,"caseIds":[caseId],"scheduleType":1,"env":this.state.dubboGroup}
        this.props.TestCaseManagerStore.exeCase(params,'case');
    }

    /**
     * json tree 添加、修改、删除
     * @param add
     */
    handleAdd = (add) => {
        this.props.TestCaseManagerStore.changeDetailData("paramScript",JSON.stringify(add.updated_src));
    }
    handleEdit = (add) => {
        debugger
        this.props.TestCaseManagerStore.changeDetailData("paramScript",JSON.stringify(add.updated_src));
    }
    handleDelete = (add) => {
        this.props.TestCaseManagerStore.changeDetailData("paramScript",JSON.stringify(add.updated_src));
    }
    render(){
        const { getFieldDecorator} = this.props.form;
        const {detailData,tags} = this.props.ApiManagerStore
        const {insertButtonStatus,updateButtonStatus,caseDetailData} = this.props.TestCaseManagerStore

        return(
            <div className="container-bg" style={{'marginLeft':'15px'}}>
                <Form  layout="inline" className="ant-advanced-search-form p-xs pb-0" onSubmit={this.insert}>
                    <Alert message="接口信息" type="info" style={{backgroundColor:'#c7e7ff',border:'0px','marginBottom':'10px'}}/>
                    <Row>
                        <FormItem {...this.formItemLayout} label="">
                            <Tag color="geekblue">接口归属应用：{detailData.appName}</Tag>
                        </FormItem>
                        <FormItem {...this.formItemLayout} label="">
                            <Tag color="geekblue">接口归属模块：{detailData.moduleName}</Tag>
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem {...this.formItemLayout} label="接口路径">
                            {getFieldDecorator('apiClassName', {
                                initialValue: detailData.apiClassName,
                                rules: [{ required: false, message: '请填写接口路径!' }],
                            })(
                                <Input disabled style={{ width: 823 }} />
                            )}
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem {...this.formItemLayout} label="方法名">
                            {getFieldDecorator('apiMethodName', {
                                initialValue: detailData.apiMethodName,
                                rules: [{ required: false, message: '请填写方法名!' }],
                            })(
                                <Input disabled style={{ width: 375 }}/>
                            )}
                        </FormItem>
                        <FormItem {...this.formItemLayout} label="接口名">
                            <Input disabled style={{ width: 389 }} value={detailData.name}/>
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem {...this.formItemLayout} label="接口标签">
                            {tags.map((tag, index) => {
                                const isLongTag = tag.length > 20;
                                const tagElem = (
                                    <Tag key={tag.id} >
                                        {isLongTag ? `${tag.value.slice(0, 20)}...` : tag.value}
                                    </Tag>
                                );
                                return isLongTag ? (
                                    <Tooltip title={tag.value} key={tag.id}>
                                        {tagElem}
                                    </Tooltip>
                                ) : (
                                    tagElem
                                );
                            })}
                        </FormItem>
                    </Row>
                    <Alert message="用例信息" type="info" style={{backgroundColor:'#c7e7ff',border:'0px','marginBottom':'10px'}}/>
                    <Row>
                        <FormItem {...this.formItemLayout} label="用例名">
                            {getFieldDecorator('name', {
                                initialValue: caseDetailData.name,
                                rules: [{ required: true, message: '请填写用例名!' }],
                            })(
                                <Input style={{ width: 365 }} pllaceholder="请填写用例名" onChange={this.inputChange.bind(this,'name')}/>
                            )}
                        </FormItem>
                        <FormItem {...this.formItemLayout} label="优先级">
                            <span>
                                 {getFieldDecorator('priority', {
                                     initialValue: caseDetailData.priority,
                                     rules: [{ required: true, message: '请选择优先级!' }],
                                 })(
                                     <Select style={{ width: 120 }} onChange={this.optionChange.bind(this,'priority')}>
                                         <Option value="1">1</Option>
                                         <Option value="2">2</Option>
                                         <Option value="3">3</Option>
                                         <Option value="4">4</Option>
                                     </Select>
                                 )}
                                &nbsp;&nbsp;&nbsp;
                                <Tag color="magenta"> 1为最高，4为最低 </Tag>
                            </span>
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem {...this.formItemLayout} label="描述">
                            {getFieldDecorator('desc', {
                                initialValue: caseDetailData.desc,
                                rules: [{ required: false, message: '请填写用例描述!' }],
                            })(
                                <TextArea rows={3} style={{ width: 852 }} onChange={this.inputChange.bind(this,'desc')}/>
                            )}
                        </FormItem>
                    </Row>
                    <Alert message="请求入参" type="info" style={{backgroundColor:'#c7e7ff',border:'0px','marginBottom':'10px'}}/>
                    <Row>
                        <div style={{float:'left',width:'50%'}}>
                            <ReactJson src={eval(detailData.argsJsonFormat)} onAdd={this.handleAdd} onEdit={this.handleEdit} onDelete={this.handleDelete}   theme="google" style={{border:'1px solid #ccc','maxHeight':'325px','overflow-y':'auto' }}/>
                        </div>
                        <div style={{float:'right',width:'49%'}}>

                            <TextArea value={caseDetailData.paramScript}  rows={15} style={{'width':'1300px'}} onChange={this.inputChange.bind(this,'paramScript')}/>

                        </div>
                    </Row>
                    <Alert message="其他参数（dubbo rpc parameter）" type="info" style={{backgroundColor:'#c7e7ff',border:'0px','marginBottom':'10px'}}/>
                    <Row>
                        <FormItem {...this.formItemLayout} label="">
                            {getFieldDecorator('contextParamScript', {
                                initialValue: caseDetailData.contextParamScript,
                                rules: [{ required: false, message: '请填写其他参数!' }],
                            })(
                                <TextArea rows={3} style={{ width: 1210 }} onChange={this.inputChange.bind(this,'contextParamScript')}/>
                            )}
                        </FormItem>
                    </Row>
                    <Alert message="结果校验规则（如：assert self.result.data != null:'结果data不能为空'）" type="info" style={{backgroundColor:'#c7e7ff',border:'0px','marginBottom':'10px'}}/>
                    <Row>
                        <FormItem {...this.formItemLayout} label="">
                            {getFieldDecorator('validScript', {
                                initialValue: caseDetailData.validScript,
                                rules: [{ required: true, message: '请填写用例校验规则!' }],
                            })(
                                <TextArea rows={4} style={{ width: 1210 }} placeholder="如：assert self.result.data != null:'结果data不能为空'" onChange={this.inputChange.bind(this,'validScript')}/>
                            )}
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem {...this.formItemLayout} label="" style={{display:insertButtonStatus}}>
                            <Button type="primary" htmlType="submit" style={{marginBottom:'8px'}}>添加用例</Button>
                        </FormItem>
                        <FormItem {...this.formItemLayout} label="" style={{display:updateButtonStatus}}>
                            <Button type="primary" htmlType="submit" style={{marginBottom:'8px'}}>修改用例</Button>
                        </FormItem>
                        <FormItem {...this.formItemLayout} label="" style={{display:updateButtonStatus}}>
                            <Button type="primary" htmlType="submit" style={{marginBottom:'8px'}} onClick={()=>{window.open("/edit_testcase?type=copy&apiId=" + getUrlParam('apiId',window.location.search) + "&caseId=" + getUrlParam('caseId',window.location.search))}}>复制用例</Button>
                        </FormItem>
                        <FormItem {...this.formItemLayout} label="" style={{display:updateButtonStatus}}>
                            <Button type="primary" style={{marginBottom:'8px'}} onClick={this.testCaseExe}>保存并执行</Button>
                        </FormItem>
                        <FormItem {...this.formItemLayout} label="" style={{display:updateButtonStatus}}>
                            <Input style={{ width: 280 }} placeholder="请输入测试用的dubbo分组" allowClear={true}  onChange={e => this.setState({ dubboGroup: e.target.value })}/>
                        </FormItem>
                    </Row>
                </Form>
            </div>
        )
    }
}

export default Form.create()(InsertIndex)