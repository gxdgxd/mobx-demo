import React  from 'react';
import { Icon,Popconfirm} from 'antd';

export const columns = (context) => [
    {
        title: '参数名',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: '参数值',
        dataIndex: 'value',
        key: 'value',
    },
    {
        title: '参数类型',
        dataIndex: 'var_type',
        key: 'var_type',
        render: (row) => {
            return (
                <span>{row == 0 ? "常量":"必包"}</span>
            )
        }
    },
    {
        title: '更新时间',
        dataIndex: 'edit_time',
        key: 'edit_time',
    },
    {
        title: '操作',
        key: 'operation',
        render:(row,record) => {
            return (
                <div>
                    <span><a onClick={context.updateShowModal.bind(context,record)}><Icon type="edit" />修改</a></span>
                    <span >
                        <Popconfirm title="确定删除此参数吗？" onConfirm={() => context.delete(record)} >
                            &nbsp;&nbsp; <a href="#" ><Icon type="delete" />删除</a>
                        </Popconfirm>
                    </span>
                </div>
            )
        }
    }
];



