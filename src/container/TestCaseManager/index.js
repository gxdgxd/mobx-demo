import React, {Component} from 'react';
import { observable, action, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Table,Pagination,Row, Col,Button,Input,Icon,Layout,message} from 'antd';
import Highlighter from 'react-highlight-words';

import {columns} from './config';
import SearchForm from './SearchForm';
import ExeCaseModal from './ExeCaseModal';
import ExeCaseDrawer from './ExeCaseDrawer'
import TreeManager from '../TreeManager/TreeManager';
const { Sider } = Layout;
message.config({
    top: 200
});
@inject('TestCaseManagerStore','CommonStore','SceneManagerStore','ExeRecordStore','GlobalManagerStore')
@observer
class TestCaseManagerList extends Component {
    componentDidMount() {
        this.props.setBreadcrumb([
            {name: '用例管理'},
        ]);
        this.props.TestCaseManagerStore.initData(1);
        this.props.GlobalManagerStore.getVarDetail("default_env");
    }
    constructor(props){
        super(props);
        this.state= {
            selectedRowKeys:[],
            selectedRows:[],
            collapsed:false
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
    deleteCase(caseIds){
        this.props.TestCaseManagerStore.deleteCase(caseIds);
    }
    /**
     * 表头搜索触发
     * @param dataIndex
     * @returns {{filterDropdown: (function({setSelectedKeys: *, selectedKeys?: *, confirm?: *, clearFilters?: *}): *), filterIcon: (function(*): *), onFilter: (function(*, *): boolean), onFilterDropdownVisibleChange: onFilterDropdownVisibleChange, render: (function(*): *)}}
     */
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            ),
    });
    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    /**
     * 表头搜索触发 end
     */
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
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <TreeManager pageType="case" maxHeight="700px"/>
                </Sider>
                <Layout>
                    <SearchForm/>
                    <Table
                        bordered
                        columns={columns(this)} pagination={false} scroll={{ x: 1930, y: 600 }}
                        dataSource={mydataSource}  />
                    <Pagination onChange={this.onChangePage} pageSize={pageSize} current={pageNo}  total={totalCount} style={{'marginTop':'6px','float':'right'}}/>
                    <ExeCaseModal exeCaseModalVisible={exeCaseModalVisible} caseIds={caseIds}   ></ExeCaseModal>
                    <ExeCaseDrawer exeDetailData={exeDetailData} drawerVisible={drawerVisible}></ExeCaseDrawer>

                </Layout>
            </Layout>
        )
    }
}

export default TestCaseManagerList;