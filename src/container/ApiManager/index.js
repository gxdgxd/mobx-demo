import React, {Component} from 'react';
import { observable, action, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Table,Row,Input,Button, Col,Icon,Pagination,Layout} from 'antd';
import {columns} from './config';
import SearchForm from './SearchForm';
import TreeManager from '../TreeManager/TreeManager';
import Highlighter from 'react-highlight-words';
import common from '../../style/common.css'
const { Sider } = Layout;


@inject('ApiManagerStore','CommonStore',)
@observer
class ApiManagerList extends Component {
    componentDidMount() {
        this.props.setBreadcrumb([
            {name: '接口管理'},
        ]);
        this.props.ApiManagerStore.initData(1);
        this.props.CommonStore.getAllTags();
    }
    constructor(props){
        super(props);
        this.state= {
            json_str:{},
            expandedKeys: [],
            autoExpandParent: true,
            selectedKeys: [],
            searchText: '',
            searchedColumn: '',
            collapsed:false
        }
    }

    inputChange(n,e) {
        let obj={};
        obj[n]=e.target.value;
        this.setState(obj);
    }

    onChangePage = page => {
        console.log(page);
        this.props.ApiManagerStore.initData(page);
    };
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
        const {dataSource,pageNo,pageSize,totalCount} = this.props.ApiManagerStore
        const {allTags,allCreators} = this.props.CommonStore
        const mydataSource = dataSource.toJS()

        return(
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <TreeManager pageType="api" maxHeight="700px"/>
                </Sider>
                <Layout>
                    <SearchForm allTags={allTags} allCreators={allCreators} />
                    <Table
                        bordered
                        columns={columns(this)} scroll={{ x: 1780, y: 600 }}
                        dataSource={mydataSource} pagination={false}
                    />
                    <Pagination onChange={this.onChangePage} pageSize={pageSize} current={pageNo}  total={totalCount} style={{'marginTop':'6px','float':'right'}}/>
                </Layout>
            </Layout>
        )
    }
}

export default ApiManagerList;