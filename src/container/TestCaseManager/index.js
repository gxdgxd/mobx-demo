import React, {Component} from 'react';
import { observable, action, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Table,Pagination,Row, Col,Button} from 'antd';
import {columns} from './config';
import SearchForm from './SearchForm';
import ExeCaseModal from './ExeCaseModal';
import ExeCaseDrawer from './ExeCaseDrawer'
import TreeManager from '../TreeManager/TreeManager';
import {message} from "antd/lib/index";
message.config({
    top: 200
});
@inject('TestCaseManagerStore','CommonStore','SceneManagerStore','ExeRecordStore')
@observer
class TestCaseManagerList extends Component {
    componentDidMount() {
        this.props.setBreadcrumb([
            {name: '用例管理'},
        ]);
        this.props.TestCaseManagerStore.initData(1);

    }
    constructor(props){
        super(props);
        this.state= {
            selectedRowKeys:[],
            selectedRows:[]
        }
    }
    /**
     * 执行用例
     */
    batchExeCase = () => {
        if(this.state.selectedRowKeys.length <= 0){
            message.warn("请先勾选需要执行的用例")
            return
        }
        let rows = this.state.selectedRows
        let caseIds = []
        for (let i = 0; i < rows.length ; i++) {
            caseIds.push(rows[i].id)
        }
        this.showExeCaseModal(caseIds)
        // let params =  {"id":null,"caseIds":this.props.caseIds,"scheduleType":1,"env":this.state.env}
        // this.props.TestCaseManagerStore.exeCase(params,"case");
        // this.props.SceneManagerStore.insertCase(this.state.selectedRows);
        // this.props.history.push("/insert_scene")

        // <Button type="primary" style={{'marginBottom':'7px'}} onClick={this.batchExeCase.bind(this)} >
        // 批量执行
        // </Button>
    }
    onChangePage = page => {
        this.props.TestCaseManagerStore.initData(page);
    };
    showExeCaseModal(caseIds){
        this.props.TestCaseManagerStore.showExeCaseModal(caseIds);
    }
    render(){
        const {dataSource,pageNo,pageSize,totalCount,exeCaseModalVisible,caseIds,drawerVisible} = this.props.TestCaseManagerStore
        const mydataSource = dataSource.toJS()
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.setState({
                    selectedRowKeys: selectedRowKeys,
                    selectedRows: selectedRows
                });
            }
        };
        const {exeDetailData} = this.props.ExeRecordStore
        return(
            <div className="container-bg">
                <Row>
                    <Col span={4}>
                        <TreeManager pageType="case" maxHeight="700px"/>
                    </Col>
                    <Col span={20}>
                        <SearchForm/>

                        <Table
                            bordered
                            columns={columns(this)} pagination={false} scroll={{ x: 1630, y: 600 }}
                            dataSource={mydataSource}  />
                        <Pagination onChange={this.onChangePage} pageSize={pageSize} current={pageNo}  total={totalCount} style={{'marginTop':'6px','float':'right'}}/>
                        <ExeCaseModal exeCaseModalVisible={exeCaseModalVisible} caseIds={caseIds}></ExeCaseModal>
                        <ExeCaseDrawer exeDetailData={exeDetailData} drawerVisible={drawerVisible}></ExeCaseDrawer>

                    </Col>
                </Row>
            </div>
        )
    }
}

export default TestCaseManagerList;