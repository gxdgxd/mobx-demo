import React  from 'react';
import { Popover,Popconfirm} from 'antd';
import common from "../../style/common.css";

export const columns = (context) => [
    {
        title: '场景ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '场景名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '执行方式',
        dataIndex: 'scheduleType',
        key: 'scheduleType',
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
    },

    {
        title: '创建人',
        dataIndex: 'creatorName',
        key: 'creatorName',
    },
    {
        title: '更新时间',
        dataIndex: 'editTime',
        key: 'editTime',
    },
    {
        title: '操作',
        width: '13%',
        key: 'operation',
        render:(row,record) => {
            let href = "/update_scene?sceneId=" + record.id

            return (
                <div>
                    <span>
                        <a href={href} target="_blank">修改场景</a>&nbsp;
                        <a href="#" onClick={context.exeCase.bind(context,record)} className="vLine"> 执行场景</a>
                    </span>
                </div>
            )
        }
    }
];

export const insertCaseColumns = (context) => [
    {
        title: '应用',
        dataIndex: 'appName',
        key: 'appName',
        width:'10%'
    },

    {
        title: '用例名称',
        dataIndex: 'name',
        key: 'name',
        width:'20%',
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
        width:'15%',
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
        title: '更新时间',
        dataIndex: 'editTimeStr',
        key: 'editTimeStr',
        width:'17%'
    },
    {
        title: '操作',
        width: '18%',
        key: 'operation',
        render:(row,record) => {
            let updateHref = '/edit_testcase?apiId=' + record.apiId + "&caseId=" + record.id
            let apiHref = '/api_manager?apiId=' + record.apiId
            return (
                <span>
                    <Popconfirm title="确定从此场景中移除此用例吗？" onConfirm={() => context.deleteSceneCase(record.id)} >
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
        title: '应用',
        dataIndex: 'appName',
        key: 'appName',
        width:'10%'
    },

    {
        title: '用例名称',
        dataIndex: 'name',
        key: 'name',
        width:'20%',
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
                <span>接口名：{record.moduleName}</span><br/>
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
        width:'15%',
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
        width:'12%'
    },
    {
        title: '更新时间',
        dataIndex: 'editTimeStr',
        key: 'editTimeStr',
        width:'15%'
    }
];



