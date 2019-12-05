import React, {Component} from 'react';
import { observable, action, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Table,Input,Tree,Row, Col,Icon,Pagination} from 'antd';
import {columns} from './config';
import SearchForm from './SearchForm';
import TreeModal from './TreeModal';
import common from "../../style/common.css";

const { TreeNode } = Tree;

@inject('ApiManagerStore')
@observer
class ApiManagerList extends Component {
    componentDidMount() {
        this.props.setBreadcrumb([
            {name: '接口管理'},
        ]);
        this.props.ApiManagerStore.initData(1);
    }
    constructor(props){
        super(props);
        this.state= {
            json_str:{},
            expandedKeys: [],
            autoExpandParent: true,
            selectedKeys: [],
        }

    }
    showDetailDataModal(record){
        this.props.ApiManagerStore.getDetailData(record);
    }
    inputChange(n,e) {
        let obj={};
        obj[n]=e.target.value;
        this.setState(obj);
    }
    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    }

    onExpand = expandedKeys => {
        console.log('onExpand', expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }
    /**
     * 新增节点
     */
    handleAddTree = (e, level, id) => {
        debugger
        e.stopPropagation();
        const mapLevels = ['一', '二', '三', '四'];
        const title = `添加${mapLevels[level]}级模块`;

        if (id) {
            this.props.ApiManagerStore.showTreeModal();
        }
    };
    /**
     * 获取节点的title内容
     */
    getNodeTitle = (title, id, level) => {
        return (
            <div className="tree-title">
                <span >
                    {title}
                </span>
                <div  className="tree-parent-div ">
                    <span className="tree-span" onClick={e => this.handleAddTree(e, level, id)}>
                        {level !== 4 &&
                            <Icon type="plus-circle" theme="outlined"/>
                        }
                    </span>
                    <span className="tree-span"  onClick={e => this.handleAddTree(e, level, id)}>
                        <Icon type="form" theme="outlined" />
                    </span>
                    <span className="tree-span">
                        <Icon type="delete" theme="outlined" />
                    </span>
                </div>
            </div>
        );

    };
    /**
     * 递归生成树节点
     */
    renderTreeNodes = (data, level, parentId) => {
        return (
            data &&
            data.map(item => {
                const title = this.getNodeTitle(item.title, item.id, level, parentId);

                if (item.children && item.children.length > 0) {
                    return (
                        <TreeNode title={title} key={item.id} level={level} nodeHasChildren={true}>
                            {this.renderTreeNodes(item.children, level + 1, item.id)}
                        </TreeNode>
                    );
                }
                return <TreeNode title={title} key={item.id} level={level} nodeHasChildren={false} />;
            })
        );
    };
    onChangePage = page => {
        console.log(page);
        this.props.ApiManagerStore.initData(page);
    };
    render(){
        const {dataSource,treeModalVisible,tagsSearch,creatorList,pageNo,pageSize,totalCount} = this.props.ApiManagerStore
        const mydataSource = dataSource.toJS()

        const treeData = [
            {
                title: '应用A',
                key: '应用A',
                level:1,
                id:110,
                children: [
                    {
                        title: '模块一',
                        key: '模块一',
                        level:2,
                        id:111,
                        children: [
                            {key: '子模块一', title: '子模块一',level: 3,id:112,
                                children: [
                                    { title: '子子模块一', key: '子子模块一',level:4,id:113},
                                    { title: '子子模块二', key: '子子模块二',level:4,id:114},
                                    { title: '子子模块三', key: '子子模块三',level:4,id:115},
                                ],
                            },
                            { title: '子模块二', key: '子模块二',level:3,id:116 },
                            { title: '子模块三', key: '子模块三',level:3,id:117 },
                        ],
                    },
                    {
                        title: '模块二',
                        key: '模块二',
                        level:2,
                        id:118,
                        children: [
                            { title: '子模块一', key: '子模块一',level:3,id:119 },
                            { title: '子模块二', key: '子模块二',level:3,id:120 },
                            { title: '子模块三', key: '子模块三',level:3,id:121 },
                        ],
                    },
                    {
                        title: '模块三',
                        key: '模块三',
                        level:2,
                        id:122
                    },
                ],
            },
            {
                title: '应用B',
                key: '应用B',
                level:1,
                id:123,
                children: [
                    { title: '模块一', key: '模块一',level:2,id:124 },
                    { title: '模块二', key: '模块二',level:2,id:125 },
                ],
            },
            {
                title: '应用C',
                key: '应用C',
                level:1,
                id:126
            },
        ];
        return(
            <div className="container-bg">
                <Row>
                    <Col span={4}>
                        <Tree
                            onExpand={this.onExpand}
                            expandedKeys={this.state.expandedKeys}
                            autoExpandParent={this.state.autoExpandParent}
                            onCheck={this.onCheck}
                            onSelect={this.onSelect}
                            selectedKeys={this.state.selectedKeys}>
                            {this.renderTreeNodes(treeData,1)}
                        </Tree>

                        <TreeModal treeModalVisible={treeModalVisible}></TreeModal>
                    </Col>
                    <Col span={20}>
                        <SearchForm tagsSearch={tagsSearch} creatorList={creatorList} />
                        <Table
                            bordered
                            columns={columns(this)}
                            dataSource={mydataSource} pagination={false}
                        />
                        <Pagination onChange={this.onChangePage} pageSize={pageSize} current={pageNo}  total={totalCount} style={{'marginTop':'6px','float':'right'}}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ApiManagerList;