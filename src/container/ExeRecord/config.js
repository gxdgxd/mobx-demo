import React  from 'react';
import {Input,Icon,Popover,Tag,Tooltip} from 'antd';
import common from "../../style/common.css";
import ReactJson from 'react-json-view'

const TextArea  = Input;


export const columns = (context) => [
    {
        title: '场景ID',
        dataIndex: 'testSceneId',
        key: 'testSceneId',
    },
    {
        title: '场景名称',
        dataIndex: 'testSceneName',
        key: 'testSceneName'
    },
    {
        title: '执行时间',
        dataIndex: 'exeTimeStr',
        key: 'exeTimeStr',
    },
    {
        title: '环境',
        dataIndex: 'env',
        key: 'env',
    },
    {
        title: '总用例数',
        dataIndex: 'testCaseCount',
        key: 'testCaseCount',
    },
    {
        title: '成功数',
        dataIndex: 'succeedCount',
        key: 'succeedCount',
    },
    {
        title: '失败数',
        dataIndex: 'failedCount',
        key: 'failedCount',
        render: (row) => {
            return (
                <font color={row > 0 ? "red" : "#696969"}>{row}</font>
            )
        }
    },
    {
        title: '操作人',
        dataIndex: 'operatorName',
        key: 'operatorName',
    },
    {
        title: '执行状态',
        dataIndex: 'status',
        key: 'status',
        render: (row) => {
            let name = ""
            if(row == "0"){
                name = "待执行"
                return (
                    <span><Tag color="#f50">{name}</Tag></span>
                )
            }else if(row == "1"){
                name = "执行中"
                return (
                    <span><Tag color="#2db7f5">{name}</Tag></span>
                )
            }else if(row == "2"){
                name = "已完成"
                return (
                    <span><Tag color="#87d068">{name}</Tag></span>
                )
            }
        }
    },
    {
        title: '操作',
        width: '10%',
        key: 'operation',
        render:(row,record) => {
            return (
                <div>
                    <span>
                        <a onClick={context.showModal.bind(context,record.id)}>详情</a> &nbsp;
                    </span>
                </div>
            )
        }
    }
];

export const detailColumns = (context) => [
    {
        title: '用例ID',
        dataIndex: 'caseId',
        key: 'caseId',
        width:80,
        fixed: 'left',
        render:function(text, record){
            let testCase = record.testCase
            return (
                <span>
                   {testCase.id}
                </span>
            )
        }
    },
    {
        title: '用例名称',
        dataIndex: 'name',
        key: 'name',
        width:350,
        render:function(text, record){
            let testCase = record.testCase
            return (
                <span>
                       {testCase.name}
                </span>
            )
        }
    },
    {
        title: '接口路径',
        dataIndex: 'apiClassName',
        key: 'apiClassName',
        width:330,
        render:function(text, record){
            let testCase = record.testCase
            let str = <div>
                <span>接口名：{testCase.testApi.name}</span><br/>
                <span>接口路径：{testCase.testApi.apiClassName}</span><br/>
                <span>方法名：{testCase.testApi.apiMethodName}</span><br/>
                <span>参数类型：{testCase.testApi.argsTypeNames}</span><br/>
            </div>
            return (
                <span>
                    <Popover content={str} >
                       {testCase.testApi.apiClassName}
                    </Popover>
                </span>
            )
        }
    },
    {
        title: '方法名',
        dataIndex: 'apiMethodName',
        key: 'apiMethodName',
        width:170,
        render:function(text, record){
            let testCase = record.testCase
            return (
                <span>
                    {testCase.testApi.apiMethodName}
                </span>
            )
        }
    },
    {
        title: '优先级',
        dataIndex: 'priority',
        key: 'priority',
        width:80,
        render:function(text, record){
            var priority = record.testCase.priority;
            return (
                <span>
                   {priority}
                </span>
            )
        }
    },
    {
        title: '创建人',
        dataIndex: 'creatorName',
        key: 'creatorName',
        width:150,
        render:function(text, record){
            var creatorName = record.testCase.creatorName;
            return (
                <span>
                   {creatorName}
                </span>
            )
        }
    },
    {
        title: '接口返回结果',
        dataIndex: 'sampleResult',
        key: 'sampleResult',
        width:140,
        render:function(text, record){
            let a = <ReactJson src={typeof record == 'undefined' ? "" : eval("("+record.sampleResult+")")} name={null} style={{border:'1px solid #ccc','height':'173px','marginBottom':'5px','maxHeight':'173px','overflow-y':'auto'  }}/>

            return (
                <Popover content={a} >
                    <font color="#d2a216">(鼠标移入显示)</font>
                </Popover>
            )
        }
    },
    {
        title: '执行结果',
        dataIndex: 'succeed',
        key: 'succeed',
        width:120,
        render:function(row){
            let name = ""
            if(row == true){
                name = "执行成功"
                return (
                    <span><Tag color="#87d068">{name}</Tag></span>
                )
            }else if(row == false){
                name = "执行失败"
                return (
                    <span><Tag color="#f50">{name}</Tag></span>
                )
            }
        }
    },
    {
        title: '信息',
        dataIndex: 'message',
        key: 'message',
        width:80,
        render:function(text, record){
            return (
                <span>
                    <a onClick={context.showResultMessageModal.bind(context,record.message)}><Icon type="message" /></a> &nbsp;
                </span>
            )
        }
    },
    {
        title: '操作',
        width:180,
        key: 'operation',
        fixed: 'right',
        render:(row,record) => {
            let apiHref = '/update_api?apiId=' + record.testCase.apiId
            let updateHref = '/edit_testcase?apiId=' + record.testCase.apiId + "&caseId=" + record.testCase.id
            return (
                <span>
                    <a href={updateHref} target="_blank">查看用例</a>&nbsp;
                    <a href={apiHref} target="_blank" className="vLine"> 查看接口</a>&nbsp;
                </span>
            )
        }
    }
];




