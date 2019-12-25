import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Row,Col,Form, Drawer, Tag ,Alert,Input} from 'antd';
import {toJS} from "mobx/lib/mobx";
const { TextArea } = Input;

@inject('TestCaseManagerStore')
@observer
class ExeCaseDrawer extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false
        }
    }

    onClose = () => {
        this.props.TestCaseManagerStore.hideCaseDrawer()
    };

    render(){
        const {exeDetailData,drawerVisible} = this.props
        let caseData = toJS(exeDetailData.caseExeRecords)
        let statusStr = ""
        if(exeDetailData.status == 0){
            statusStr = <Tag color="#f50">待执行</Tag>
        }else if(exeDetailData.status == 1){
            statusStr = <Tag color="#2db7f5">执行中</Tag>
        }else if(exeDetailData.status == 2){
            statusStr = <Tag color="#87d068">已完成</Tag>
        }
        let resultStatus = ""
        if(typeof caseData != "undefined"){
            if(caseData[0].testCase.succeed == true){
                resultStatus = <Tag color="#87d068">执行成功</Tag>
            }else{
                resultStatus = <Tag color="#f50">执行失败</Tag>
            }
        }

        console.log(typeof caseData == 'undefined' ? "" : caseData[0].testCase)
        const style = {
            'marginBottom':'8px'
        }
        return (
            <Drawer
                title="执行结果" width={720}
                placement="right"
                onClose={this.onClose}
                visible={drawerVisible}
            >
                <Row gutter={48} style={style}>
                    <Col span={13}>
                        {typeof caseData == 'undefined' ? "" : caseData[0].testCase.name}
                    </Col>
                    <Col span={6}>
                        任务状态：{statusStr}
                    </Col>
                </Row>
                <Row gutter={48} style={style}>
                    <Col span={13}>
                        操作人：{exeDetailData.operatorName}
                    </Col>
                    <Col span={10}>
                        执行环境：{exeDetailData.env}
                    </Col>
                </Row>
                <Row gutter={48} style={style}>
                    <Col span={13}>
                        执行时间：{exeDetailData.exeTimeStr}
                    </Col>
                    <Col span={8}>
                        执行结果：{resultStatus}
                    </Col>
                </Row>
                <Row gutter={48} style={style}>
                    <Col span={13}>
                        接口名： {typeof caseData == 'undefined' ? "" : caseData[0].testCase.testApi.name}
                    </Col>
                </Row>
                <Alert message="校验结果" type="info" style={{backgroundColor:'#c7e7ff',border:'0px','marginBottom':'10px'}}/>
                <pre>
                    {typeof caseData == 'undefined' ? "" : caseData[0].message == null ? "暂无结果":caseData[0].message}
                </pre>
                <Alert message="返回结果" type="info" style={{backgroundColor:'#c7e7ff',border:'0px','marginBottom':'10px'}}/>
                <TextArea rows={5} style={{'width':'670px','marginBottom':'6px'}} value={typeof caseData == 'undefined' ? "" : caseData[0].testCase.testApi.resultJsonFormat}/>
                <Alert message="请求入参" type="info" style={{backgroundColor:'#c7e7ff',border:'0px','marginBottom':'10px'}}/>
                <TextArea rows={5} style={{'width':'670px','marginBottom':'6px'}} value={typeof caseData == 'undefined' ? "" : caseData[0].testCase.paramScript}/>
                <Alert message="dubbo contextParams" type="info" style={{backgroundColor:'#c7e7ff',border:'0px','marginBottom':'10px'}}/>
                <TextArea rows={3} style={{'width':'670px','marginBottom':'6px'}} value={typeof caseData == 'undefined' ? "" : caseData[0].testCase.contextParamScript}/>
            </Drawer>
        )
    }
}

export default Form.create()(ExeCaseDrawer)
