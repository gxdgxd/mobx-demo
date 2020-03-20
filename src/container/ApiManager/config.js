import React  from 'react';
import { Icon,Tag,Input,Tooltip,Popconfirm,Popover} from 'antd';
import common from "../../style/common.css";

export const columns = (context) => [
    {
        title: '接口ID',
        dataIndex: 'id',
        key: 'id',
        width:80,
        fixed: 'left',
    },

    {
        title: '接口名',
        dataIndex: 'name',
        key: 'name',
        width:230,
        render:function(text, record){
            var name = record.name.length > 20 ? record.name.substr(0,20) + '...' : record.name;
            return (
                <span  >
                    <Popover content={record.name} >
                        {name}
                    </Popover>
                </span>
            )
        }
    },
    {
        title: '应用',
        dataIndex: 'appName',
        key: 'appName',
        width:100,
        ...context.getColumnSearchProps('appName'),
    },
    {
        title: '接口路径',
        dataIndex: 'apiClassName',
        key: 'apiClassName',
        width:360,
    },
    {
        title: '方法名',
        dataIndex: 'apiMethodName',
        key: 'apiMethodName',
        width:210,
        render:function(text, record){
            let str = <div>
                        <span>方法名：{record.apiMethodName}</span><br/>
                        <span>接口路径：{record.apiClassName}</span><br/>
                        <span>应用：{record.appName}</span><br/>
                        <span>groupId：{record.groupId}</span><br/>
                        <span>artifactId：{record.artifactId}</span><br/>
                        <span>模块：{record.moduleName}</span>
                      </div>
            return (
                <span>
                    <Popover content={str} >
                       {record.apiMethodName}
                    </Popover>
                </span>
            )
        }
    },
    {
        title: '方法参数',
        dataIndex: 'argsTypeNames',
        key: 'argsTypeNames',
        width:360,
    },
    {
        title: '更新时间',
        dataIndex: 'editTimeStr',
        key: 'editTimeStr',
        width:220,
    },
    {
        title: '创建人',
        dataIndex: 'creatorName',
        key: 'creatorName',
        width:150,
    },
    {
        title: '接口标签',
        dataIndex: 'tags',
        key: 'tags',
        width:230,
        render:(row,record) => {

            return (
                <span>
                    {record.tags.map((tag, index) => {
                        const isLongTag = tag.length > 20;
                        const tagElem = (
                            <Tag key={tag.id} color="purple">
                                {isLongTag ? `${tag.value.slice(0, 20)}...` : tag.value}
                            </Tag>
                        );
                        return isLongTag ? (
                            <Tooltip title={tag.value} key={tag.id}>
                                {tagElem}
                            </Tooltip>
                        ) : (
                            tagElem
                        );
                    })}
                </span>
            )
        }
    },
    {
        title: '操作',
        width:230,
        key: 'operation',
        fixed: 'right',
        render:(row,record) => {
            let updateHref = "/update_api?apiId=" + record.id
            let searchCaseHref = "/testcase_manager?apiId=" + record.id
            let insertCaseHref = "/edit_testcase?apiId=" + record.id

            return (
                <span>
                    <a href={updateHref} target="_blank">修改接口</a>&nbsp;
                    <a href={searchCaseHref} target="_blank" className="vLine"> 查看用例</a>&nbsp;
                    <a href={insertCaseHref} target="_blank" className="vLine"> 添加用例</a>
                </span>
            )
        }
    }
];
export const insertColumns = (context) => [
    {
        title: '接口路径',
        dataIndex: 'apiClassName',
        key: 'apiClassName',
        width:'30%',
        ...context.getColumnSearchProps('apiClassName'),
        render:function(text, record){
            var name = record.apiClassName.length > 35 ? record.apiClassName.substr(0,35) + '...' : record.apiClassName;

            let str = <div>
                <span>接口路径：{record.apiClassName}</span><br/>
                <span>方法名：{record.apiMethodName}</span><br/>
                <span>参数类型：{record.argsTypeNames}</span><br/>
            </div>
            return (
                <span>
                    <Popover content={str} >
                       {name}
                    </Popover>
                </span>
            )
        }
    },
    {
        title: '方法名',
        dataIndex: 'apiMethodName',
        key: 'apiMethodName',
        width:'20%',
        ...context.getColumnSearchProps('apiMethodName'),
        render:function(text, record){
            return (
                <span  >
                    <Popover content={record.apiMethodName} >
                        {record.apiMethodName}
                    </Popover>
                </span>
            )
        }
    },

    {
        title: '接口名',
        dataIndex: 'name',
        key: 'name',
        width:'17%',
        editable: true,
        render:(row,record) => {
            if(record.name != null){
                return (
                    <span>{record.name}</span>
                )
            }else{
                return (
                    <span><font color="orange">无</font></span>
                )
            }
        }
    },
    {
        title: '描述',
        dataIndex: 'desc',
        key: 'desc',
        width:'17%',
        editable: true,
        render:(row,record) => {
            if(record.desc != null){
                return (
                    <span>{record.desc}</span>
                )
            }else{
                return (
                    <span><font color="orange">无</font></span>
                )
            }
        }
    },
    // {
    //     title: '打标签',
    //     dataIndex: 'tag',
    //     key: 'tag',
    //     width:'20%',
        // render:(row,record) => {
        //     const {tags,inputVisible, inputValue } = context.state;
        //
        //     return (
        //         <div>
        //             {tags.map((tag, index) => {
        //                 const isLongTag = tag.length > 20;
        //                 const tagElem = (
        //                     <Tag key={tag} closable  onClose={() => context.handleClose(tag)}>
        //                         {isLongTag ? `${tag.slice(0, 20)}...` : tag}
        //                     </Tag>
        //                 );
        //                 return isLongTag ? (
        //                     <Tooltip title={tag} key={tag}>
        //                         {tagElem}
        //                     </Tooltip>
        //                 ) : (
        //                     tagElem
        //                 );
        //             })}
        //             {inputVisible && (
        //                 <Input
        //                 ref={context.saveInputRef}
        //                 type="text"
        //                 size="small"
        //                 style={{ width: 78 }}
        //                 value={inputValue}
        //                 onChange={context.handleInputChange}
        //                 onBlur={context.handleInputConfirm}
        //                 onPressEnter={context.handleInputConfirm}
        //                 />
        //             )}
        //             {!inputVisible && (
        //                 <Tag onClick={context.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
        //                     <Icon type="plus" /> New Tag
        //                 </Tag>
        //             )}
        //         </div>
        //     )
        // }
    // },
    {
        title: '操作',
        width: '7%',
        key: 'operation',
        render:(row,record) => {
            return (
                <div>
                    <span >
                        <Popconfirm title="确定添加此接口吗？" onConfirm={() => context.insertApi(record)} >
                            <a href="#" >添加</a>
                        </Popconfirm>
                    </span>
                </div>
            )
        }
    }

]


