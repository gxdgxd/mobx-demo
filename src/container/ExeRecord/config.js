import React  from 'react';
import { Icon,Popconfirm,Popover,Tag} from 'antd';
import ReactJson from 'react-json-view'
import common from "../../style/common.css";

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
        title: '用例名称',
        dataIndex: 'name',
        key: 'name',
        width:'15%',
        render:function(text, record){
            let testCase = record.testCase
            var name = testCase.name.length > 16 ? testCase.name.substr(0,16) + '...' : testCase.name;
            let str = <div>
                <span>用例ID：{testCase.id}</span><br/>
                <span>用例名称：{testCase.name}</span><br/>
                <span>校验规则：{testCase.validScript}</span><br/>
                <span>入参：{testCase.paramScript}</span><br/>
                <span>其他参数：{testCase.contextParamScript}</span><br/>
                <span>描述：{testCase.desc}</span><br/>
                <span>接口ID：{testCase.apiId}</span><br/>
                <span>接口路径：{testCase.testApi.apiClassName}</span><br/>
                <span>方法名：{testCase.testApi.apiMethodName}</span><br/>
                <span>接口名：{testCase.testApi.name}</span><br/>
            </div>
            return (
                <span>
                    <Popover content={str} >
                       <font color="#d2a216">{name}</font>
                    </Popover>
                </span>
            )
        }
    },
    {
        title: '优先级',
        dataIndex: 'priority',
        key: 'priority',
        width:'7%',
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
        width:'10%',
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
        title: '接口名',
        dataIndex: 'a',
        key: 'a',
        width:'16%',
        render:function(text, record){
            var name = record.testCase.testApi.name
            return (
                <span>
                   {name}
                </span>
            )
        }
    },
    {
        title: '信息',
        dataIndex: 'message',
        key: 'message',
        width:'25%',
        render:function(text, record){
            var message = record.message.length > 25 ? record.message.substr(0,25) + '...' : record.message;
            return (
                <span>
                     <Popover content={record.message} >
                        {message}
                     </Popover>
                </span>
            )
        }
    },
    {
        title: '操作',
        width: '18%',
        key: 'operation',
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




