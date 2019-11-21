import React  from 'react';
import { Icon} from 'antd';

export const columns = (context) => [
    {
        title: 'ID',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '接口路径',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '方法名',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '接口名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '应用名',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'groupId',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'artifactId',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '是否同步线上',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '创建人',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '更新时间',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '操作',
        width: '7%',
        key: 'operation',
        render:(row,record) => {
            return (
                <div>
                    <div><a onClick={context.showModal.bind(context,record,'update')}>详情</a></div>
                </div>
            )
        }
    }
];

export const insert_columns = (context) => [
    {
        title: '接口路径',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '方法名',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '接口名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '描述',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '标签',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '更新时间',
        dataIndex: 'name',
        key: 'name',
    }
]


