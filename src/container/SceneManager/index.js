import React, {Component} from 'react';
import { observable, action, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Table,Input,Tree,Row, Col} from 'antd';
import {columns} from './config';
import SearchForm from './SearchForm';


const { TextArea } = Input;
const { TreeNode } = Tree;

@inject('SceneManagerStore')
@observer
class SceneManagerList extends Component {
    componentDidMount() {
        this.props.setBreadcrumb([
            {name: '场景管理'},
            {name: '添加场景'}
        ]);
        this.props.SceneManagerStore.initData(1);
    }
    constructor(props){
        super(props);
        this.state= {
        }

    }

    render(){
        const {dataSource} = this.props.SceneManagerStore
        const mydataSource = dataSource.toJS()

        return(
            <div className="container-bg">
                <Row>

                        <SearchForm/>
                        <Table
                            bordered
                            columns={columns(this)}
                            dataSource={mydataSource}  />

                </Row>
            </div>
        )
    }
}

export default SceneManagerList;