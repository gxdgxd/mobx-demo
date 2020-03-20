import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import ReactJson from 'react-json-view'
import { Tag, Button,Alert, Select, Row,Icon, Form, Input,Tooltip,message } from 'antd';
import {getUrlParam} from '../../../utils/common'
import ExeCaseDrawer from '../ExeCaseDrawer'
import SingleTag from "../../TagManager/SingleTag";

message.config({
    top: 200
});

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

@inject('TestCaseManagerStore','ApiManagerStore','ExeRecordStore','TagManagerStore','GlobalManagerStore')
@observer
class InsertIndex extends Component {
    componentDidMount() {
        this.props.setBreadcrumb([
            {name: '用例管理'},
            {name: '编辑用例'},
        ]);
        this.props.ApiManagerStore.getApiDetailData()
        this.props.GlobalManagerStore.getVarDetail("default_env");

        if(getUrlParam('caseId',window.location.search) != ""){
            this.props.TestCaseManagerStore.getDetailData()
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            isCompressDisplay:'',
            isJsonFormatDisplay:'none',
            dubboGroup:'',
            leg: {"userId":"*******","ipAddr":"10.10.10.10","appKey":"*******","openId":"******","unionId":"********","deviceId":"*******","appv":"","os":""}
        }
    }
    /**
     * 获取子组件SingleTag中用户输入的tag标签
     */
    getCaseTags = (tags) => {
        debugger
        this.props.TestCaseManagerStore.insertCaseTags(tags)
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
                this.props.TestCaseManagerStore.insert(this.props.ApiManagerStore.detailData,true)
            }
        });
    }
    /**
     * 压缩参数
     */
    compressParams = () => {
        this.setState({
            'isCompressDisplay':'',
            'isJsonFormatDisplay':'none',
        })
    }
    /**
     * json格式化
     */
    jsonFormat = () => {
        this.setState({
            'isCompressDisplay':'none',
            'isJsonFormatDisplay':'',
        })
    }
    timerExe = async(result) => {
        // let data = await this.props.ExeRecordStore.getDetailData(result.data)
        this.timerDate = setInterval(()=> this.tick(result.data));
    }
    handleClearTimeout(){
        this.timerDate && clearInterval(this.timerDate);
    }
    componentWillUnmount(){
        this.handleClearTimeout()
    }
    tick = async(data) => {
        let detailData = await this.props.ExeRecordStore.getDetailData(data)
        if(detailData.status == 2){
            this.handleClearTimeout()
        }
    }

    /**
     * 保存并执行
     */
    testCaseExe = async () => {
        let caseId = getUrlParam('caseId',window.location.search);
        console.log("caseId:" , caseId)
        if(caseId == ""){
            message.warn("请先保存用例再执行！")
            return
        }

        let abc = await this.props.TestCaseManagerStore.insert(this.props.ApiManagerStore.tags,this.props.ApiManagerStore.detailData,false)
        if(abc != 200){
            return
        }
        let params =  {"id":null,"caseIds":[caseId],"scheduleType":1,"env":this.props.GlobalManagerStore.varValue}
        let result = await this.props.TestCaseManagerStore.exeCase(params,'case');
        if(typeof result != "undefined"){
            if(result.code == 200){
                this.timerExe(result)

                this.props.TestCaseManagerStore.showCaseDrawer()
            }else{
                message.warn("执行出现错误")
            }
        }
    }
    handleCopy(copy){
        message.success("复制成功")
    }
    changeInput(e){
        this.props.GlobalManagerStore.varValue = e.target.value
    }
    render(){
        const {varValue} = this.props.GlobalManagerStore
        const { getFieldDecorator} = this.props.form;
        const {detailData,tags} = this.props.ApiManagerStore
        const {exeDetailData} = this.props.ExeRecordStore
        const {insertButtonStatus,updateButtonStatus,caseDetailData,drawerVisible,caseTags} = this.props.TestCaseManagerStore
        var mockJson = ""
        if(typeof caseDetailData.paramScript != "undefined"){
            try {
                if (typeof JSON.parse(caseDetailData.paramScript) == "object" ) {
                    mockJson = JSON.parse(caseDetailData.paramScript)
                }
            }catch(e) {
                console.log('error：'+e);
            }
        }
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
                                         <Option value="0">0</Option>
                                         <Option value="1">1</Option>
                                         <Option value="2">2</Option>
                                         <Option value="3">3</Option>
                                     </Select>
                                 )}
                                &nbsp;&nbsp;&nbsp;
                                <Tag color="magenta"> P0为最高，P3为最低 </Tag>
                            </span>
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem {...this.formItemLayout} label="用例标签">
                            <SingleTag tags={caseTags} getTags={this.getCaseTags}/>
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
                    <Alert message="接口参数信息" type="info" style={{backgroundColor:'#c7e7ff',border:'0px'}}/>
                    <Row>
                        <div style={{float:'left',width:'48%'}}>
                            <b>接口入参：</b>
                            <ReactJson src={eval("("+detailData.argsJsonFormat+")")}  enableClipboard={this.handleCopy} name={null}  theme="google" style={{border:'1px solid #ccc','height':'180px','maxHeight':'180px','overflow-y':'auto' }}/>
                            <b>接口出参：</b>
                            <ReactJson src={eval("("+detailData.resultJsonFormat+")")}  enableClipboard={this.handleCopy} name={null} theme="google" style={{border:'1px solid #ccc','height':'189px','maxHeight':'189px','overflow-y':'auto' }}/>
                        </div>
                        <div style={{float:'right',width:'51%'}}>
                            <FormItem {...this.formItemLayout} label="" >
                                {getFieldDecorator('paramScript', {
                                    initialValue: caseDetailData.paramScript,
                                    rules: [{ required: false, message: '请填写接口参数信息!' }],
                                })(
                                    <TextArea rows={16} style={{'width':'1300px','marginTop':'19px',display:this.state.isCompressDisplay }} onChange={this.inputChange.bind(this,'paramScript')}/>
                                )}
                            </FormItem>
                            <ReactJson src={mockJson}  enableClipboard={false}  name={null} style={{"border":'1px solid #ccc','height':'343px','marginBottom':'5px','maxHeight':'343px','overflow-y':'auto',"display":this.state.isJsonFormatDisplay  }}/>

                            <Button type="primary" style={{marginBottom:'5px'}} onClick={this.compressParams}>压缩</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button type="primary" style={{marginBottom:'5px'}} onClick={this.jsonFormat}>格式化</Button>
                        </div>
                    </Row>
                    <Alert message="dubbo contextParams" type="info" style={{backgroundColor:'#c7e7ff',border:'0px','marginBottom':'10px','marginTop':'6px'}}/>
                    <Row>
                        <div style={{float:'left',width:'48%'}}>
                            {/*{*/}
                                {/*getUrlParam('caseId',window.location.search) != "" ?*/}
                                    {/*<TextArea rows={6} style={{ width: 600}} value={caseDetailData.contextParamScript} placeholder='如果此dubbo接口是供hop网关使用，则可能需要填写dubbo context,如：{"userId":"5c0e5e0c881f449b9fe50923ea8f6183"}，也可以参考右侧格式' onChange={this.inputChange.bind(this,'contextParamScript')}/> : <TextArea rows={6} style={{ width: 600}}  placeholder='如果此dubbo接口是供hop网关使用，则可能需要填写dubbo context,如：{"userId":"5c0e5e0c881f449b9fe50923ea8f6183"}，也可以参考右侧格式' onChange={this.inputChange.bind(this,'contextParamScript')}/>*/}
                            {/*}*/}
                            {getFieldDecorator('contextParamScript', {
                                initialValue: caseDetailData.contextParamScript,
                                rules: [{ required: false, message: '多个assert的规则需要换行写!' }],
                            })(
                                <TextArea rows={6}  style={{ width: 600 }}  onChange={this.inputChange.bind(this,'contextParamScript')}/>
                            )}
                        </div>
                        <div style={{float:'right',width:'50%'}}>
                            如果此dubbo接口是供hop网关使用，则可能需要填写dubbo context，如：
                            <ReactJson src={this.state.leg} name={null}  enableClipboard={this.handleCopy} style={{border:'1px solid #ccc','height':'113px','marginBottom':'5px','maxHeight':'113px','overflow-y':'auto'  }}/>
                        </div>
                    </Row>
                    <Alert message="结果校验规则（如：assert self.result.data != null:'结果data不能为空'）" type="info" style={{backgroundColor:'#c7e7ff',border:'0px','marginBottom':'10px'}}/>
                    <Row>
                        <div style={{float:'left',width:'48%'}}>
                            {/*{*/}
                                {/*getUrlParam('caseId',window.location.search) != "" ?*/}
                                    {/*<TextArea rows={6} style={{ width: 600 }} value={caseDetailData.validScript} placeholder="多个assert的规则需要换行写" onChange={this.inputChange.bind(this,'validScript')}/>*/}
                                    {/*:*/}
                                    {/*<TextArea rows={6} style={{ width: 600 }} placeholder="多个assert的规则需要换行写" onChange={this.inputChange.bind(this,'validScript')}/>*/}
                            {/*}*/}
                            {getFieldDecorator('validScript', {
                                initialValue: caseDetailData.validScript,
                                rules: [{ required: false, message: '多个assert的规则需要换行写!' }],
                            })(
                                <TextArea rows={6}  style={{ width: 600 }}  onChange={this.inputChange.bind(this,'validScript')}/>
                            )}
                        </div>
                        <div style={{float:'right',width:'50%'}}>
                            示例一：校验后返回布尔值作为校验结果(不推荐)return self.result.data != null<br/>
                            示例二：使用强断言校验结果(推荐)assert self.result.data != null <br/>
                            示例三：使用断言校验结果(推荐)assert self.result.data != null:'data不能为空'<br/>
                            示例四：多个判断<br/>
                            assert self.result.data != null:'结果data不能为空' <br/>
                            assert self.result.data.itemId !=null:'结果itemId不能为空'  &nbsp;&nbsp;<a href="http://k.yangtuojia.com/pages/viewpage.action?pageId=18827049" target="_blank" ><Icon type="question-circle" /> 更多写法帮助</a><br/>
                        </div>
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
                            {getFieldDecorator('dubboGroup', {
                                initialValue: varValue,
                                rules: [{ required: true, message: '请输入执行环境!' }],
                            })(
                                <Input placeholder="请输入执行环境" style={{ width: 280 }}  allowClear={true} style={{ width: 220 }}  onChange={this.changeInput.bind(this) }/>
                            )}
                        </FormItem>

                    </Row>
                </Form>
                <ExeCaseDrawer exeDetailData={exeDetailData} drawerVisible={drawerVisible}></ExeCaseDrawer>
            </div>
        )
    }
}

export default Form.create()(InsertIndex)