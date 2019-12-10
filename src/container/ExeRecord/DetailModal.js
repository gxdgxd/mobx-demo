import React, {Component} from 'react';
import { observable, action, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Table,Input,Tree,Form,Row, Col,Button,Modal,DatePicker} from 'antd';
import {detailColumns} from "./config";


@inject('ExeRecordStore')
@observer
class DetailModal extends Component {

    constructor(props){
        super(props);
        this.state= {
        }
    }

    render(){
        const {modalVisible,detailData} = this.props
        // let caseData = detailData.caseExeRecords
        return(
            <div className="container-bg">
                <Modal
                    destroyOnClose
                    title="执行详情"
                    width="800px"
                    visible={modalVisible}
                    okText="保存"
                    cancelText="取消"
                    className="model">
                    <Row gutter={48}>
                        <Col span={7}>
                           执行结果：{detailData.status}
                        </Col>
                    </Row>
                </Modal>
            </div>
        )
    }
}

export default DetailModal;