import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Table, Button, Alert,Tree, Select, Row, Col, Form, DatePicker, Input, Modal,Icon,Upload, } from 'antd';
import SearchForm from './SearchForm';
import {insert_columns} from "../config";

const { TreeNode } = Tree;
const FormItem = Form.Item;


@inject('ApiManagerStore')
@observer
class Index extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    componentDidMount() {
        this.props.ApiManagerStore.initData(1);

    }

    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    }

    onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
    }
    render(){
        const {dataSource} = this.props.ApiManagerStore
        const mydataSource = dataSource.toJS()

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };
        return (
            <div className="container-bg">
                <Row>
                    <Col span={4}>
                        <Tree
                            defaultExpandedKeys={['0-0-0', '0-0-1']}
                            defaultSelectedKeys={['0-0-0', '0-0-1']}
                            defaultCheckedKeys={['0-0-0', '0-0-1']}
                            onSelect={this.onSelect}
                            onCheck={this.onCheck}
                            >
                            <TreeNode title="parent 1" key="0-0">
                                <TreeNode title="parent 1-0" key="0-0-0" >
                                    <TreeNode title="leaf" key="0-0-0-0"  />
                                    <TreeNode title="leaf" key="0-0-0-1" />
                                </TreeNode>
                            </TreeNode>
                        </Tree>
                    </Col>
                    <Col span={20}>
                        <SearchForm/><br/>
                        <Alert message="接口信息" type="info" style={{backgroundColor:'#c7e7ff',border:'0px',marginBottom:'13px'}}/>
                        <Button type="primary" style={{marginBottom:'10px'}}><Icon type="plus" /> 批量添加</Button>
                        <Table
                            bordered
                            columns={insert_columns(this)}
                            dataSource={mydataSource} rowSelection={rowSelection} />
                    </Col>
                </Row>

            </div>
        )
    }
}

export default Index

