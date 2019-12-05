import React  from 'react';
import { Popover} from 'antd';
import ReactJson from 'react-json-view'
import common from "../../style/common.css";

export const columns = (context) => [
    {
        title: '应用',
        dataIndex: 'appName',
        key: 'appName',
        width:'8%'
    },

    {
        title: '用例名称',
        dataIndex: 'name',
        key: 'name',
        width:'15%',
        render:function(text, record){
            var name = record.name.length > 16 ? record.name.substr(0,16) + '...' : record.name;
            let str = <div>
                        <span>用例ID：{record.id}</span><br/>
                        <span>用例名称：{record.name}</span><br/>
                        <span>更新时间：{record.editTimeStr}</span><br/>
                        <span>创建人：{record.creatorName}</span><br/>
                        <span>校验规则：{record.validScript}</span><br/>
                        <span>入参：{record.paramScript}</span><br/>
                        <span>其他参数：{record.contextParamScript}</span><br/>
                        <span>描述：{record.desc}</span><br/>
                        <span>接口ID：{record.apiId}</span><br/>
                        <span>接口路径：{record.testApi.apiClassName}</span><br/>
                        <span>方法名：{record.testApi.apiMethodName}</span><br/>
                        <span>接口名：{record.testApi.name}</span><br/>
                      </div>
            return (
                <span  >
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
        width:'7%'
    },
    {
        title: '接口ID',
        dataIndex: 'apiId',
        key: 'apiId',
        width:'7%',
    },
    {
        title: '方法名称',
        dataIndex: 'apiMethodName',
        key: 'apiMethodName',
        width:'12%',
        render:function(text, record){
            var name = record.testApi.apiMethodName.length > 12 ? record.testApi.apiMethodName.substr(0,12) + '...' : record.testApi.apiMethodName;
            return (
                <span>
                    <Popover content={record.testApi.apiMethodName} >{name}</Popover>
                </span>
            )
        }
    },

    {
        title: '创建人',
        dataIndex: 'creatorName',
        key: 'creatorName',
        width:'8%'
    },
    {
        title: '更新时间',
        dataIndex: 'editTimeStr',
        key: 'editTimeStr',
        width:'10%'
    },
    {
        title: '操作',
        width: '20%',
        key: 'operation',
        render:(row,record) => {
            let insertHref = '/edit_testcase?apiId=' + record.apiId
            let apiHref = '/update_testcase?apiId=' + record.apiId
            let updateHref = '/edit_testcase?apiId=' + record.apiId + "&caseId=" + record.id
            return (
                <span>
                    <a href={updateHref} target="_blank">修改用例</a>&nbsp;
                    <a href={apiHref} target="_blank" className="vLine"> 查看接口</a>&nbsp;
                    <a href={insertHref} target="_blank" className="vLine"> 追加用例</a>
                </span>
            )
        }
    }
];



