import React, {Component} from 'react';
import { observable, action, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Table,Pagination,Icon,Tree,Row, Col} from 'antd';
import {columns} from './config';
import SearchForm from './SearchForm';
import TreeManager from '../TreeManager/TreeManager';
import TreeManagerStore from "../../stores/TreeManager/TreeManagerStore";
import {message} from "antd/lib/index";

@inject('TestCaseManagerStore','CommonStore')
@observer
class TestCaseManagerList extends Component {
    componentDidMount() {
        this.props.setBreadcrumb([
            {name: '用例管理'},
        ]);
        this.props.TestCaseManagerStore.initData(1);
        this.props.CommonStore.getAllTags();
        this.props.CommonStore.getAllCreators();
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
            message.warn("请先勾选需要添加的接口")
        }else{
            this.props.TestCaseManagerStore.batchExeCase(this.state.selectedRows)
        }
    }
    onChangePage = page => {
        this.props.TestCaseManagerStore.initData(page);
    };
    render(){
        const {dataSource,pageNo,pageSize,totalCount} = this.props.TestCaseManagerStore
        const mydataSource = dataSource.toJS()
        const {allTags,allCreators} = this.props.CommonStore
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.setState({
                    selectedRowKeys: selectedRowKeys,
                    selectedRows: selectedRows
                });
            }
        };
        return(
            <div className="container-bg">
                <Row>
                    <Col span={4}>
                        <TreeManager pageType="case" maxHeight="700px"/>
                    </Col>
                    <Col span={20}>
                        <SearchForm allTags={allTags} allCreators={allCreators}/>
                        <Table
                            bordered
                            columns={columns(this)} pagination={false}
                            dataSource={mydataSource}  rowSelection={rowSelection}/>
                        <Pagination onChange={this.onChangePage} pageSize={pageSize} current={pageNo}  total={totalCount} style={{'marginTop':'6px','float':'right'}}/>

                    </Col>
                </Row>
            </div>
        )
    }
}

export default TestCaseManagerList;