import React, {Component} from 'react';
import { observable, action, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import JSONTree from 'react-json-tree'
import { Table,Input,Tree,Row, Col,Icon} from 'antd';
import {columns} from './config';
import SearchForm from './SearchForm';
import DetailModal from './DetailModal';

const { TextArea } = Input;
const { TreeNode } = Tree;

@inject('ApiManagerStore')
@observer
class ApiManagerList extends Component {
    componentDidMount() {
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
    showModal(record,type){
        this.props.ApiManagerStore.updateDetailData(record,type);
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
     * 获取节点的title内容
     */
    getNodeTitle = (name, id, level) => {
        return (
            <div className="icon-title">
                <span className="mr5">
                    {name}
                </span>
                 
            </div>
        );
    };
    /**
     * 递归生成树节点
     */
    renderTreeNodes = data =>
        data.map(item => {
            if (item.children) {
                const title = this.getNodeTitle(item.title, 1, 1);

                return (
                    <TreeNode title={title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} {...item} />;
        })

    render(){
        const {dataSource,detailModalVisible} = this.props.ApiManagerStore
        const mydataSource = dataSource.toJS()
        let json = {}
        try{
            if(Object.getOwnPropertyNames(this.state.json_str).length > 0){
                json = JSON.parse(this.state.json_str)
            }
        } catch (e){
            json = "JSON串有异常：" + e.toString()
        }
        const treeData = [
            {
                title: '应用A',
                key: '应用A',
                children: [
                    {
                        title: '模块一',
                        key: '模块一',
                        children: [
                            { title: '子模块一', key: '子模块一',
                                children: [
                                    { title: '子子模块一', key: '子子模块一' },
                                    { title: '子子模块二', key: '子子模块二' },
                                    { title: '子子模块三', key: '子子模块三' },
                                ],
                            },
                            { title: '子模块二', key: '子模块二' },
                            { title: '子模块三', key: '子模块三' },
                        ],
                    },
                    {
                        title: '模块二',
                        key: '模块二',
                        children: [
                            { title: '子模块一', key: '子模块一' },
                            { title: '子模块二', key: '子模块二' },
                            { title: '子模块三', key: '子模块三' },
                        ],
                    },
                    {
                        title: '模块三',
                        key: '模块三',
                    },
                ],
            },
            {
                title: '应用B',
                key: '应用B',
                children: [
                    { title: '模块一', key: '模块一' },
                    { title: '模块二', key: '模块二' },
                ],
            },
            {
                title: '应用C',
                key: '应用C',
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
                            {this.renderTreeNodes(treeData)}
                        </Tree>
                    </Col>
                    <Col span={20}>
                        <SearchForm/>
                        <Table
                            bordered
                            columns={columns(this)}
                            dataSource={mydataSource}  />
                        <DetailModal detailModalVisible={detailModalVisible} ></DetailModal>
                    </Col>
                </Row>

                <TextArea rows={4} onChange={this.inputChange.bind(this,'json_str')}/>

                <JSONTree data={json}/>
            </div>
        )
    }
}

export default ApiManagerList;