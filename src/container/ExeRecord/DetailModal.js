import React, {Component} from 'react';
import { observable, action, computed ,toJS} from 'mobx';
import { observer, inject } from 'mobx-react';
import { Table,Alert,Tree,Form,Row, Col,Tag,Modal,DatePicker} from 'antd';
import {detailColumns} from "./config";


@inject('ExeRecordStore')
@observer
class DetailModal extends Component {

    constructor(props){
        super(props);
        this.state= {
        }
    }

    hideModal(){
        this.props.ExeRecordStore.hideModal();
    }
    render(){
        const {modalVisible,detailData} = this.props
        let caseData = toJS(detailData.caseExeRecords)
        let statusStr = ""
        if(detailData.status == 0){
            statusStr = <Tag color="#f50">待执行</Tag>
        }else if(detailData.status == 1){
            statusStr = <Tag color="#2db7f5">执行中</Tag>
        }else if(detailData.status == 2){
            statusStr = <Tag color="#87d068">已完成</Tag>
        }
        const style = {
            'marginBottom':'8px'
        }
        return(
            <div className="container-bg">
                <Modal
                    destroyOnClose
                    title="执行详情"
                    width="800px"
                    visible={modalVisible}
                    onOk={this.hideModal.bind(this)}
                    onCancel={this.hideModal.bind(this)}
                    cancelText="取消"
                    className="model"  width="1100px">
                    <Alert message="执行情况" type="info" style={{backgroundColor:'#c7e7ff',border:'0px','marginBottom':'10px'}}/>

                    <Row gutter={48} style={style}>
                        <Col span={4}>
                           &nbsp;执行结果：{statusStr}
                        </Col>
                        <Col span={6}>
                            执行时间：{detailData.exeTimeStr}
                        </Col>
                        <Col span={7}>
                            执行环境：{detailData.env}
                        </Col>
                        <Col span={4}>
                            操作人：{detailData.operatorName}
                        </Col>
                    </Row>
                    <Row gutter={48} style={style}>
                        <Col span={4}>
                            &nbsp;总用例数：{detailData.testCaseCount}
                        </Col>
                        <Col span={6}>
                            成功数：{detailData.succeedCount}
                        </Col>
                        <Col span={5}>
                            失败数：{detailData.failedCount}
                        </Col>
                    </Row>
                    <Alert message="用例信息" type="info" style={{backgroundColor:'#c7e7ff',border:'0px','marginBottom':'10px'}}/>
                    <Table
                        bordered
                        columns={detailColumns(this)}
                        dataSource={caseData} />
                </Modal>
            </div>
        )
    }
}

export default DetailModal;