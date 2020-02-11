import React, {Component} from 'react';
import { observable, action, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import {  Icon,Tree, Popconfirm} from 'antd';
import InsertTreeModal from './InsertTreeModal';
import TreeManagerStore from "../../stores/TreeManager/TreeManagerStore";

const { TreeNode } = Tree;

@inject('TreeManagerStore','TestCaseManagerStore','ApiManagerStore')
@observer
class TreeManager extends Component {
    componentDidMount() {
        this.props.TreeManagerStore.getTreeAppDataSouce();
    }
    constructor(props){
        super(props);
    }
    onSelect = (selectedKeys, info) => {
        console.log(info)
        let appId = info.node.props.dataRef.appId
        let moduleId = info.node.props.dataRef.moduleId
        let appName = info.node.props.dataRef.appName
        let moduleName = info.node.props.dataRef.moduleName
        let pageType = this.props.pageType
        if(pageType == 'case'){
            this.props.TestCaseManagerStore.initData(1,appId,moduleId)
        }else if(pageType == "api"){
            this.props.ApiManagerStore.initData(1,appId,moduleId)
        }else if(pageType == "insertApi"){
            this.props.ApiManagerStore.setTreeParams(appId,moduleId,appName,moduleName)
        }else if(pageType == "updateApi"){
            this.props.ApiManagerStore.setTreeParams(appId,moduleId,appName,moduleName)
        }
    };
    /**
     * 新增节点
     */
    handleAddTree = (e,item) => {
        e.stopPropagation();
        if (item.id) {
            console.log(e.target.value)
            this.props.TreeManagerStore.showTreeModal({
                moduleName:"添加模块",
                type:"insert",
                item:item
            })
        }
    };
    /**
     * 编辑节点
     */
    handleEditTree = (e,item) => {
        e.stopPropagation();
        if (item.id) {
            this.props.TreeManagerStore.showTreeModal({
                moduleName:"修改模块",
                type:"update",
                item:item,
            });
        }
    };
    /**
     * 编辑节点
     */
    handleDeleteTree = (item) => {
        if (item.id) {
            this.props.TreeManagerStore.deleteTree(item)
        }
    };
    /**
     * 获取节点的title内容
     */
    getNodeTitle = (title, id, level,item) => {
        return (
            <div className="tree-title">
                <span>
                    {title}
                </span>
                <div className="tree-parent-div ">
                    <span className="tree-span" onClick={e => this.handleAddTree(e,item)}>
                       {level !== 4 &&
                            <Icon type="plus-circle" theme="outlined"/>
                       }
                    </span>
                    <span className="tree-span"  onClick={e => this.handleEditTree(e,item)}>
                       {level != 1 &&
                            <Icon type="form" theme="outlined" />
                       }
                    </span>
                    <span className="tree-span" >
                         {level != 1 &&
                              <Popconfirm title="确定删除此参数吗？" onConfirm={() => this.handleDeleteTree(item)}>
                                 <Icon type="delete" theme="outlined"/>
                              </Popconfirm>
                         }
                    </span>
                </div>
            </div>
        );
    };
    onLoadData = async (treeNode) => {
        if (treeNode.props.children) {
            return;
        }
        await this.props.TreeManagerStore.getTreeModuleDataSouce(treeNode.props.dataRef,treeNode.props.dataRef.parentId)
    }

    renderTreeNodes = (data, level) => {
        return (
            data.map(item => {
                const title = this.getNodeTitle(item.title, item.id, level,item);
                if (item.children) {
                    return (
                        <TreeNode title={title} key={item.id} dataRef={item}>
                            {this.renderTreeNodes(item.children,level + 1)}
                        </TreeNode>
                    );
                }
                return <TreeNode {...item} title={title} key={item.id} dataRef={item} />;
            })
        );
    };

    render(){
        const {treeAppDataSource,treeModalVisible,tableRequestData,modalName} = this.props.TreeManagerStore
        return(
            <div style={{'maxHeight':this.props.maxHeight,'overflow-y':'auto' }}>
                <Tree onSelect={this.onSelect} loadData={this.onLoadData}>{this.renderTreeNodes(treeAppDataSource,1)}</Tree>
                <InsertTreeModal modalName={modalName} treeModalVisible={treeModalVisible} tableRequestData={tableRequestData}></InsertTreeModal>
            </div>
        )
    }
}

export default TreeManager;