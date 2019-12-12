import React  from 'react';
import { Popover} from 'antd';
import common from "../../style/common.css";

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
        width:200,
        render:function(text, record){
            var name = record.name.length > 16 ? record.name.substr(0,16) + '...' : record.name;
            let str = <div>
                        <span>用例名称：{record.name}</span><br/>
                        <span>校验规则：{record.validScript}</span><br/>
                        <span>入参：{record.paramScript}</span><br/>
                        <span>其他参数：{record.contextParamScript}</span><br/>
                        <span>描述：{record.desc}</span><br/>
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
        width:80
    },
    {
        title: '应用',
        dataIndex: 'appName',
        key: 'appName',
        width:100,
    },
    {
        title: '模块',
        dataIndex: 'moduleName',
        key: 'moduleName',
        width:150,
    },
    {
        title: '接口ID',
        dataIndex: 'apiId',
        key: 'apiId',
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
        width:267,
        fixed: 'right',
        render:(row,record) => {
            let insertHref = '/edit_testcase?apiId=' + record.apiId
            let apiHref = '/update_api?apiId=' + record.apiId
            let updateHref = '/edit_testcase?apiId=' + record.apiId + "&caseId=" + record.id
            return (
                <span>
                    <a href={updateHref} target="_blank">修改用例</a>&nbsp;
                    <a href={insertHref} target="_blank" className="vLine"> 追加用例</a>&nbsp;
                    <a href={apiHref} target="_blank" className="vLine"> 查看接口</a>&nbsp;
                    <a onClick={context.showExeCaseModal.bind(context,[record.id])} className="vLine"> 执行</a>
                </span>
            )
        }
    }
];



