import React  from 'react';
import { Popover,Popconfirm,Icon } from 'antd';
import common from "../../style/common.css";

export const columns = (context) => [
    {
        title: '场景ID',
        dataIndex: 'id',
        key: 'id',
        width: '7%',
    },
    {
        title: '场景名称',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
        render: (row,record) => {
            let dingding = record.alarmDingUrls != null ? <Icon type="dingding" style={{'color':'#30a4ea'}} /> : ""
            let clock = record.cron != null ? <Icon type="clock-circle" style={{'color':'#30a4ea'}}/> : ""
            if(record.cron != null){}
            return (
                <span>{dingding} {clock} {row}</span>
            )
        }
    },
    {
        title: '执行方式',
        dataIndex: 'scheduleType',
        key: 'scheduleType',
        width: '10%',
        render: (row) => {
            var name = ''
            if(row == 0){
                name = "顺序执行"
            }else if(row == 1){
                name = "并行执行"
            }else if(row == 2){
                name = "自定义"
            }
            return (
                <span>{name}</span>
            )
        }
    },
    {
        title: '环境',
        dataIndex: 'env',
        key: 'env',
        width: '12%',
    },

    {
        title: '创建人',
        dataIndex: 'creatorName',
        key: 'creatorName', width: '13%',
    },
    {
        title: '更新时间',
        dataIndex: 'editTimeStr',
        key: 'editTimeStr',
        width: '15%',
    },
    {
        title: '操作',
        width: '12%',
        key: 'operation',
        render:(row,record) => {
            let href = "/update_scene?sceneId=" + record.id

            return (
                <div>
                    <span>

                        <a href={href} target="_blank">修改场景</a>&nbsp;
                        <Popconfirm title="确定执行此场景吗？" onConfirm={() => context.exeCase(record)} >
                            <a href="#"  className="vLine"> 执行场景</a>
                        </Popconfirm>
                    </span>
                </div>
            )
        }
    }
];

export const insertCaseColumns = (context) => [

    {
        title: '用例ID',
        dataIndex: 'id',
        key: 'id',
        width:80,
        fixed: 'left',
    },
    {
        title: '用例名称',
        dataIndex: 'name',
        key: 'name',
        width:350,
    },

    {
        title: '应用',
        dataIndex: 'appName',
        key: 'appName',
        width:100,
    },
    {
        title: '接口路径',
        dataIndex: 'apiClassName',
        key: 'apiClassName',
        width:350,
        render:function(text, record){
            let str = <div>
                <span>接口名：{record.testApi.name}</span><br/>
                <span>接口路径：{record.testApi.apiClassName}</span><br/>
                <span>方法名：{record.testApi.apiMethodName}</span><br/>
                <span>参数类型：{record.testApi.argsTypeNames}</span><br/>
            </div>
            return (
                <span>
                    <Popover content={str} >
                       {record.testApi.apiClassName}
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
            return (
                <span>
                    {record.testApi.apiMethodName}
                </span>
            )
        }
    },
    {
        title: '优先级',
        dataIndex: 'priority',
        key: 'priority',
        width:80
    },
    {
        title: '创建人',
        dataIndex: 'creatorName',
        key: 'creatorName',
        width:150,
    },
    {
        title: '操作',
        width: 230,
        key: 'operation',
        fixed: 'right',
        render:(row,record) => {
            let updateHref = '/edit_testcase?apiId=' + record.apiId + "&caseId=" + record.id
            let apiHref = '/api_manager?apiId=' + record.apiId
            return (
                <span>
                    <Popconfirm title="确定从此场景中移除此用例吗？" onConfirm={() => context.deleteSceneCase(record.key)} >
                      <a href="#">移除用例</a>&nbsp;
                    </Popconfirm>
                    <a href={updateHref} target="_blank"  className="vLine"> 修改用例</a>&nbsp;
                    <a href={apiHref} target="_blank"  className="vLine"> 查看接口</a>
                </span>
            )
        }
    }
];


export const caseColumns = (context) => [
    {
        title: '用例ID',
        dataIndex: 'id',
        key: 'id',
        width:80,
    },
    {
        title: '用例名称',
        dataIndex: 'name',
        key: 'name',
        width:350,
    },

    {
        title: '应用',
        dataIndex: 'appName',
        key: 'appName',
        width:100,
    },
    {
        title: '接口路径',
        dataIndex: 'apiClassName',
        key: 'apiClassName',
        width:300,
        render:function(text, record){
            let str = <div>
                <span>接口名：{record.testApi.name}</span><br/>
                <span>接口路径：{record.testApi.apiClassName}</span><br/>
                <span>方法名：{record.testApi.apiMethodName}</span><br/>
                <span>参数类型：{record.testApi.argsTypeNames}</span><br/>
            </div>
            return (
                <span>
                    <Popover content={str} >
                       {record.testApi.apiClassName}
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
            return (
                <span>
                    {record.testApi.apiMethodName}
                </span>
            )
        }
    },
    {
        title: '优先级',
        dataIndex: 'priority',
        key: 'priority',
        width:80
    },
    {
        title: '创建人',
        dataIndex: 'creatorName',
        key: 'creatorName',
        width:150,
    },
    {
        title: '更新时间',
        dataIndex: 'editTimeStr',
        key: 'editTimeStr',
        width:200,
    },
];



