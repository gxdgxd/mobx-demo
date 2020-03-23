import React  from 'react';
import { Icon,Popconfirm,Input,Popover} from 'antd';
const { TextArea } = Input;
export const columns = (context) => [
    {
        title: '参数名',
        dataIndex: 'name',
        key: 'name',
        width:'16%',
    },
    {
        title: '参数值',
        dataIndex: 'value',
        key: 'value',
        width:'45%',
        render: (row) => {
            var name = row.length > 80 ? row.substr(0,80) + '...' : row;
            let str = <TextArea rows={10} style={{ width: 650 }} value={row}></TextArea>
            return (
                <Popover content={str} >
                    <pre style={{'whiteSpace': 'pre-wrap'}}>{name}</pre>
                </Popover>
            )
        }
    },
    {
        title: '参数类型',
        dataIndex: 'varType',
        key: 'varType',
        width:'8%',
        render: (row) => {
            return (
                <span>{row == 0 ? "常量":"闭包"}</span>
            )
        }
    },
    {
        title: '更新时间',
        dataIndex: 'editTimeStr',
        key: 'editTimeStr',
        width:'16%',
    },
    {
        title: '操作',
        key: 'operation',
        width:'12%',
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



