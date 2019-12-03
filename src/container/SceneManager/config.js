import React  from 'react';
import { Icon,Popconfirm} from 'antd';

export const columns = (context) => [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '场景名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '执行计划',
        dataIndex: 'cron',
        key: 'cron',
    },
    {
        title: '环境',
        dataIndex: 'env',
        key: 'env',
    },
    {
        title: '用例组',
        dataIndex: 'apiMethodName',
        key: 'apiMethodName',
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
        width: '10%',
        key: 'operation',
        render:(row,record) => {
            let href = "/api_detail?id=" + record.id
            return (
                <div>
                    <span>
                        <a href={href} target="_blank">详情</a> &nbsp;
                        <a href={href} target="_blank">执行</a>
                    </span>
                </div>
            )
        }
    }
];

export const insertColumns = (context) => [
    {
        title: '用例名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '接口名称',
        dataIndex: 'nama',
        key: 'nama',
    },
    {
        title: '方法名称',
        dataIndex: 'apiMethodName',
        key: 'apiMethodName',
    },
    {
        title: '应用',
        dataIndex: 'appName',
        key: 'appName',
    },
    {
        title: '入参',
        dataIndex: 'paramScript',
        key: 'paramScript',
    },
    {
        title: '校验规则',
        dataIndex: 'validScript',
        key: 'validScript',
    },
    {
        title: '操作',
        width: '15%',
        key: 'operation',
        render:(row,record) => {
            let href = "/api_detail?id=" + record.id
            return (
                <div>
                    <span>
                        <a href={href} target="_blank">详情</a> &nbsp;
                        <a href={href} target="_blank">执行</a> &nbsp;
                        <Popconfirm title="确定删除此参数吗？" onConfirm={() => context.delete(record)} >
                            &nbsp;&nbsp; <a href="#" >删除</a>
                        </Popconfirm>
                    </span>
                </div>
            )
        }
    }
];



