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
    handleAddTree = (e,id,parentId,appId) => {
        e.stopPropagation();
        if (id) {
            console.log(e.target.value)
            this.props.TreeManagerStore.showTreeModal({
                moduleName:"添加模块",
                parentId:parentId,
                appId:appId,
                type:"insert"
            })
        }
    };
    /**
     * 编辑节点
     */
    handleEditTree = (e, name,id,parentIdF,appId) => {
        e.stopPropagation();
        if (id) {
            this.props.TreeManagerStore.showTreeModal({
                id:id,
                moduleName:"修改模块",
                parentIdF:parentIdF,
                appId:appId,
                name:name,
                type:"update"
            });
        }
    };
    /**
     * 编辑节点
     */
    handleDeleteTree = (id,appId,parentId) => {
        if (id) {
            this.props.TreeManagerStore.deleteTree(id,appId,parentId)
        }
    };
    /**
     * 获取节点的title内容
     */
    getNodeTitle = (title, id, level,parentId,parentIdF,appId) => {
        return (
            <div className="tree-title">
                <span>
                    {title}
                </span>
                <div className="tree-parent-div ">
                    <span className="tree-span" onClick={e => this.handleAddTree(e,id,parentId,appId)}>
                       {level !== 4 &&
                            <Icon type="plus-circle" theme="outlined"/>
                       }
                    </span>
                    <span className="tree-span"  onClick={e => this.handleEditTree(e, title,id,parentIdF,appId)}>
                       {level != 1 &&
                            <Icon type="form" theme="outlined" />
                       }
                    </span>
                    <span className="tree-span" >
                         {level != 1 &&
                              <Popconfirm title="确定删除此参数吗？" onConfirm={() => this.handleDeleteTree(id,appId,parentId)}>
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
        this.props.TreeManagerStore.getTreeModuleDataSouce(treeNode.props.dataRef)
    }

    renderTreeNodes = (data, level) => {
        return (
            data.map(item => {
                const title = this.getNodeTitle(item.title, item.id, level,item.parentId,item.parentIdF,item.appId);
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