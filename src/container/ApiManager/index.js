import React, {Component} from 'react';
import { observable, action, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Table,Row, Col,Icon,Pagination} from 'antd';
import {columns} from './config';
import SearchForm from './SearchForm';
import TreeManager from '../TreeManager/TreeManager';
import common from "../../style/common.css";

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
    render(){
        const {dataSource,pageNo,pageSize,totalCount} = this.props.ApiManagerStore
        const {allTags,allCreators} = this.props.CommonStore
        const mydataSource = dataSource.toJS()

        return(
            <div className="container-bg">
                <Row>
                    <Col span={4}>
                        <TreeManager pageType="api" maxHeight="700px"/>
                    </Col>
                    <Col span={20}>
                        <SearchForm allTags={allTags} allCreators={allCreators} />
                        <Table
                            bordered
                            columns={columns(this)} scroll={{ x: 1780, y: 600 }}
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