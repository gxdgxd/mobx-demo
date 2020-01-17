import React  from 'react';
import { Popover,Popconfirm} from 'antd';
import common from "../../style/common.css";
import {getUrlParam} from "../../utils/common";

export const columns = (context) => [

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
        width:200
    },
    {
        title: '操作',
        width: '27%',
        key: 'operation',
        width:250,
        fixed: 'right',
        render:(row,record) => {
            let insertHref = '/edit_testcase?apiId=' + record.apiId
            let apiHref = '/update_api?apiId=' + record.apiId
            let updateHref = '/edit_testcase?apiId=' + record.apiId + "&caseId=" + record.id
            return (
                <span>
                    <a href={updateHref} target="_blank">修改</a>&nbsp;
                    <a onClick={()=>{window.open("/edit_testcase?type=copy&apiId=" + record.apiId + "&caseId=" + record.id)}} className="vLine"> 复制</a>&nbsp;
                    <a href={insertHref} target="_blank" className="vLine"> 追加</a>&nbsp;
                    <a href={apiHref} target="_blank" className="vLine"> 接口</a>&nbsp;
                    <a onClick={context.showExeCaseModal.bind(context,[record.id])} className="vLine"> 执行</a>&nbsp;
                    <Popconfirm title="确定删除此用例吗？" onConfirm={() => context.deleteCase([record.id])} >
                        <a href="#"  className="vLine"> 删除</a>
                    </Popconfirm>
                </span>
            )
        }
    }
];



