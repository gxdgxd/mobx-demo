import React, {Component} from 'react';
import { observable, action, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import JSONTree from 'react-json-tree'
import { Table,Input,Tree,Row, Col} from 'antd';
import {columns} from './config';
import SearchForm from './SearchForm';


const { TextArea } = Input;
const { TreeNode } = Tree;

@inject('SceneManagerStore')
@observer
class SceneManagerList extends Component {
    componentDidMount() {
        this.props.SceneManagerStore.initData(1);
    }
    constructor(props){
        super(props);
        this.state= {
            json_str:{}
        }

    }

    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    }

    onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
    }
    render(){
        const {dataSource,detailModalVisible} = this.props.SceneManagerStore
        const mydataSource = dataSource.toJS()

        return(
            <div className="container-bg">
                <Row>
                    <Col span={4}>
                        <Tree
                            defaultExpandedKeys={['0-0-0', '0-0-1']}
                            defaultSelectedKeys={['0-0-0', '0-0-1']}
                            defaultCheckedKeys={['0-0-0', '0-0-1']}
                            onSelect={this.onSelect}
                            onCheck={this.onCheck}>
                            <TreeNode title="parent 1" key="0-0">
                                <TreeNode title="parent 1-0" key="0-0-0" >
                                    <TreeNode title="leaf" key="0-0-0-0"  />
                                    <TreeNode title="leaf" key="0-0-0-1" />
                                </TreeNode>
                            </TreeNode>
                        </Tree>
                    </Col>
                    <Col span={20}>
                        <SearchForm/>
                        <Table
                            bordered
                            columns={columns(this)}
                            dataSource={mydataSource}  />
                    </Col>
                </Row>

            </div>
        )
    }
}

export default SceneManagerList;