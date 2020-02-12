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
        this.props.TreeManagerStore.getTreeData();
    }
    constructor(props){
        super(props);
        this.state={
            expandedKeys: []
        }
    }
    onNodeSelect = (selectedKeys, info) => {
        console.log(selectedKeys,info.node.props)
        let level = info.node.props.level
        let appId = "";
        let moduleId = ""
        let appName = ""
        let moduleName = ""
        if(level == 1){
            appId = selectedKeys[0]
            appName = info.node.props.title
        }else{
            appId = info.node.props.appId
            moduleId = info.node.props.moduleId
            appName = info.node.props.appName
            moduleName = info.node.props.moduleName
        }
        console.log("appid",appId,"moduleId",moduleId,"appName",appName,"moduleName",moduleName)
        // let appId = info.node.props.dataRef.appId
        // let moduleId = info.node.props.dataRef.moduleId
        // let appName = info.node.props.dataRef.appName
        // let moduleName = info.node.props.dataRef.moduleName
        let pageType = this.props.pageType
        if(pageType == 'case'){
            this.props.TestCaseManagerStore.initData(1,appId,moduleId)
        }
        else if(pageType == "api"){
            this.props.ApiManagerStore.initData(1,appId,moduleId)
        }else if(pageType == "insertApi"){
            this.props.ApiManagerStore.setTreeParams(appId,moduleId,appName,moduleName)
        }else if(pageType == "updateApi"){
            this.props.ApiManagerStore.setTreeParams(appId,moduleId,appName,moduleName)
        }
    };
    /**
     * 点击某个节点展开
     */
    onExpand = expandedKeys => {
        this.setState({
            expandedKeys
        });
    };

    /**
     * 新增节点
     */
    handleAddTree = (e,parentId,item) => {
        e.stopPropagation();
        if (item.id) {
            console.log(e.target.value)
            this.props.TreeManagerStore.showTreeModal({
                moduleName:"添加模块",
                type:"insert",
                item:item,
                parentId:parentId
            })
        }
    };
    /**
     * 编辑节点
     */
    handleEditTree = (e,parentId,item) => {
        e.stopPropagation();
        if (item.id) {
            this.props.TreeManagerStore.showTreeModal({
                moduleName:"修改模块",
                type:"update",
                item:item,
                parentId:parentId
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
    getNodeTitle = (title, id, level,parentId,item) => {
        return (
            <div className="tree-title">
                <span>
                    {title}
                </span>
                <div className="tree-parent-div ">
                    <span className="tree-span" onClick={e => this.handleAddTree(e,parentId,item)}>
                       {level !== 5 &&
                            <Icon type="plus-circle" theme="outlined"/>
                       }
                    </span>
                    <span className="tree-span"  onClick={e => this.handleEditTree(e,parentId,item)}>
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
    /**
     * 递归生成树节点
     */
    renderTree = (data, level, parentId) => {
        return (
            data &&
            data.map(item => {
                const title = this.getNodeTitle(item.name, item.id, level,parentId, item);
                if (item.modules && item.modules.length > 0) {
                    return (
                        <TreeNode title={title} key={item.id} level={level} appId={item.appId} moduleId={item.id} appName={item.appName} moduleName={item.name} >
                            {this.renderTree(item.modules, level + 1, item.id, item.id)}
                        </TreeNode>
                    );
                }
                return <TreeNode title={title} key={item.id} level={level} appId={item.appId} appName={item.appName} moduleId={item.id} moduleName={item.name} />;
            })
        );
    };

    render(){
        const {treeAppDataSource,treeModalVisible,tableRequestData,modalName} = this.props.TreeManagerStore
        return(
            <div style={{'maxHeight':this.props.maxHeight,'overflow-y':'auto' }}>
                <Tree expandedKeys={this.state.expandedKeys} onSelect={this.onNodeSelect} onExpand={this.onExpand}>{this.renderTree(treeAppDataSource,1,0)}</Tree>
                <InsertTreeModal modalName={modalName} treeModalVisible={treeModalVisible} tableRequestData={tableRequestData}></InsertTreeModal>
            </div>
        )
    }
}

export default TreeManager;