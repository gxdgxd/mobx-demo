import React, {Component} from 'react';
import { observable, action, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Table,Row, Pagination} from 'antd';
import {columns} from './config';
import SearchForm from './SearchForm';

@inject('SceneManagerStore','CommonStore','TestCaseManagerStore')
@observer
class SceneManagerList extends Component {
    componentDidMount() {
        this.props.setBreadcrumb([
            {name: '场景管理'},
        ]);
        this.props.SceneManagerStore.initData(1);
    }
    constructor(props){
        super(props);
        this.state= {
        }
    }
    onChangePage = page => {
        this.props.SceneManagerStore.initData(page);
    };
    exeCase =(record) => {
        this.props.TestCaseManagerStore.exeCase(record,'scene')
    }
    render(){
        const {dataSource,pageNo,pageSize,totalCount} = this.props.SceneManagerStore
        const mydataSource = dataSource.toJS()
        return(
            <div className="container-bg">
                <Row>
                    <SearchForm/>
                    <Table
                        bordered
                        columns={columns(this)} pagination={false}
                        dataSource={mydataSource}  />
                    <Pagination onChange={this.onChangePage} pageSize={pageSize} current={pageNo}  total={totalCount} style={{'marginTop':'6px','float':'right'}}/>
                </Row>
            </div>
        )
    }
}

export default SceneManagerList;