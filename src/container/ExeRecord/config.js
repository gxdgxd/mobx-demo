import React  from 'react';
import { Icon,Popconfirm,Popover} from 'antd';
import ReactJson from 'react-json-view'
export const columns = (context) => [
    {
        title: 'ID',
        dataIndex: 'testSceneId',
        key: 'testSceneId',
    },
    {
        title: '场景名称',
        dataIndex: 'testSceneName',
        key: 'testSceneName'
    },
    {
        title: '执行时间',
        dataIndex: 'exeTimeStr',
        key: 'exeTimeStr',
    },
    {
        title: '环境',
        dataIndex: 'env',
        key: 'env',
    },
    {
        title: '总用例数',
        dataIndex: 'testCaseCount',
        key: 'testCaseCount',
    },
    {
        title: '成功数',
        dataIndex: 'succeedCount',
        key: 'succeedCount',
    },
    {
        title: '失败数',
        dataIndex: 'failedCount',
        key: 'failedCount',
    },
    {
        title: '操作人',
        dataIndex: 'operatorName',
        key: 'operatorName',
    },
    {
        title: '执行状态',
        dataIndex: 'status',
        key: 'status',
        render: (row) => {
            let name = ""
            if(row == "0"){
                name = "待执行"
            }else if(row == "1"){
                name = "执行中"
            }else if(row == "2"){
                name = "已完成"
            }
            return (
                <span>{name}</span>
            )
        }
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
                        <a onClick={context.showModal.bind(context,record)}>详情</a> &nbsp;
                    </span>
                </div>
            )
        }
    }
];

export const detailColumns = (context) => [
    {
        title: '用例名称',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '执行结果',
        dataIndex: 'result',
        key: 'result',
    },
    {
        title: '时间',
        dataIndex: 'apiMethodName',
        key: 'apiMethodName',
    },
    {
        title: '环境',
        dataIndex: 'apiMethodName',
        key: 'apiMethodName',
    },
    {
        title: '方法名称',
        dataIndex: 'env',
        key: 'env',
    },
    {
        title: '参数',
        dataIndex: 'env',
        key: 'env',
    },
    {
        title: '接口返回',
        dataIndex: 'env',
        key: 'env',
        // render:function(text, record){
        //     let str = {"itemId":"111067","shopId":"$p.result.id","shopEEId":"6dc677030efb48fcb0c5db98fef8ef99"}
        //     var name = record.name.length > 12 ? record.name.substr(0,12) + '...' : record.name;
        //
        //     let jsonStr = <ReactJson src={str} theme="google" style={{border:'1px solid #ccc','maxHeight':'261px','overflow-y':'auto' }}/>
        //     return (
        //         <span>
        //             <Popover content={jsonStr} >
        //                 <font color="#0c8dbf">{name}</font>
        //             </Popover>
        //         </span>
        //     )
        // }
    }
];




