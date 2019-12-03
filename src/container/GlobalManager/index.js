import React, {Component} from 'react';
import { observable, action, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Table,Input,Tree,Row, Col,Icon,Button} from 'antd';
import {columns} from './config';
import InsertModal from './InsertModal';
import UpdateModal from './UpdateModal';

const { TextArea } = Input;
const { TreeNode } = Tree;

@inject('GlobalManagerStore')
@observer
class GlobalManagerList extends Component {

    constructor(props){
        super(props);
        this.state= {
            json_str:{},
        }

    }
    componentDidMount() {
        // 设置面包屑
        this.props.setBreadcrumb([
            {name: '参数管理'},
        ]);
        this.props.GlobalManagerStore.initData(1);
    }

    insertShowModal(){
        this.props.GlobalManagerStore.showModal()
    }

    updateShowModal(record){
        debugger
        this.props.GlobalManagerStore.getDetailData(record)
    }

    delete(record){
        debugger
        this.props.GlobalManagerStore.delete(record)
    }

    render(){
        const {dataSource,modalVisible,detailData,updateModalVisible} = this.props.GlobalManagerStore
        const mydataSource = dataSource.toJS()

        return(
            <div className="container-bg">
                <Row>
                    <Col span={20}>
                        <Button type="primary" onClick={this.insertShowModal.bind(this)}><Icon type="plus" /> 添加参数</Button>
                        <InsertModal modalVisible={modalVisible} ></InsertModal>
                    </Col>
                </Row>
                <Row style={{'marginTop':'10px'}}>
                    <Col span={23}>
                        <Table
                            bordered
                            columns={columns(this)}
                            dataSource={mydataSource}  />
                    </Col>
                    <UpdateModal detailData={detailData} updateModalVisible={updateModalVisible} ></UpdateModal>
                </Row>
            </div>
        )
    }
}

export default GlobalManagerList;