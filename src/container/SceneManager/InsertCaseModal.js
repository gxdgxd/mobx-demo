import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Table,Form, Pagination, Modal } from 'antd';
import SearchForm from '../TestCaseManager/SearchForm';
import {caseColumns} from "./config";
import common from "../../style/common.css";
import {message} from "antd/lib/index";
const FormItem = Form.Item;

@inject('SceneManagerStore','TestCaseManagerStore')
@observer
class InsertCaseModal extends Component{
    componentDidMount() {
        this.props.TestCaseManagerStore.initData(1);
    }
    constructor(props){
        super(props);
        this.state={
            selectedRowKeys:[],
            selectedRows:[]
        }
    }

    /**
     * 点击保存时
     */
    okModal(){
        if(this.state.selectedRowKeys.length <= 0){
            message.warn("请先勾选需要追加的用例")
        }else{
            console.log(this.state.selectedRowKeys)
            console.log(this.state.selectedRows)
            this.props.SceneManagerStore.insertCase(this.state.selectedRows);
        }
    }

    hideModal(){
        this.props.SceneManagerStore.hideInsertCaseModal('insert');
    }
    onChangePage = page => {
        this.props.TestCaseManagerStore.initData(page);
        console.log(this.state.selectedRowKeys,this.state.selectedRows)
        // this.setState({
        //     selectedRowKeys: this.state.selectedRowKeys,
        //     selectedRows: this.state.selectedRows
        // });
    };

    render(){
        const {dataSource,pageNo,pageSize,totalCount} = this.props.TestCaseManagerStore
        const { insertCaseModalVisible} = this.props
        const mydataSource = dataSource.toJS()
        var rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.setState({
                    selectedRowKeys: selectedRowKeys,
                    selectedRows: selectedRows
                });
            }
        };
        return (
            <Modal
                destroyOnClose
                title="追加用例"
                width="1100px"
                visible={insertCaseModalVisible}
                onOk={this.okModal.bind(this)}
                onCancel={this.hideModal.bind(this)}
                okText="添加"
                cancelText="取消"
                className="model" style={{'marginTop':'28px'}}>
                <SearchForm />
                <Table rowSelection={rowSelection}
                    bordered
                    columns={caseColumns(this)} pagination={false}
                    dataSource={mydataSource}  size="middle"/>
                <Pagination onChange={this.onChangePage} pageSize={pageSize} current={pageNo}  total={totalCount} style={{'marginTop':'6px','float':'right'}}/>
            </Modal>
        )
    }
}

export default Form.create()(InsertCaseModal)
