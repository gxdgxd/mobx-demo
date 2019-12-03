import React  from 'react';
import { Icon,Popover} from 'antd';

export const columns = (context) => [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width:'5%'
    },
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
        width:'12%',
        render:function(text, record){
            var name = record.name.length > 16 ? record.name.substr(0,16) + '...' : record.name;
            let str = <div>
                        <span>用例名称：{record.name}</span><br/>
                        <span>更新时间：{record.editTime}</span><br/>
                        <span>描述：{record.desc}</span>
                      </div>

            return (
                <span  >
                    <Popover content={str} >
                       <font color="#0c8dbf">{name}</font>
                    </Popover>
                </span>
            )
        }
    },
    {
        title: '入参',
        dataIndex: 'paramScript',
        key: 'paramScript',
        width:'12%',
        render:function(text, record){
            var name = record.paramScript.length > 16 ? record.paramScript.substr(0,16) + '...' : record.paramScript;
            return (
                <span  >
                    <Popover content={record.paramScript} >
                        {name}
                    </Popover>
                </span>
            )
        }
    },
    {
        title: '校验规则',
        dataIndex: 'validScript',
        key: 'validScript',
        width:'12%',
        render:function(text, record){
            var name = record.validScript.length > 16 ? record.validScript.substr(0,16) + '...' : record.validScript;
            return (
                <span  >
                    <Popover content={record.validScript} >
                        {name}
                    </Popover>
                </span>
            )
        }
    },
    {
        title: '方法名称',
        dataIndex: 'apiMethodName',
        key: 'apiMethodName',
        width:'12%'
    },
    {
        title: '优先级',
        dataIndex: 'priority',
        key: 'priority',
        width:'7%'
    },
    {
        title: '创建人',
        dataIndex: 'creatorName',
        key: 'creatorName',
        width:'8%'
    },
    {
        title: '操作',
        width: '15%',
        key: 'operation',
        render:(row,record) => {
            let insert_href = '/insert_testcase?id=' + record.id
            return (
                <div>
                    <span>
                        <a href={insert_href} target="_blank">编辑</a>&nbsp;
                        <a href={insert_href} target="_blank">接口</a>&nbsp;
                        <a href={insert_href} target="_blank">场景</a>&nbsp;
                        <a href={insert_href} target="_blank">添加</a>
                    </span>
                </div>
            )
        }
    }
];



