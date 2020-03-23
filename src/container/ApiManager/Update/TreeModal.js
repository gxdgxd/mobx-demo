import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Table,Tag, Button,Alert, Radio, Select, Row, Col, Form, DatePicker, Input, Modal,Icon,Upload } from 'antd';
import TreeManager from '../../TreeManager/TreeManager';
import common from "../../../style/common.css";



@inject('ApiManagerStore')
@observer
class TreeModal extends Component{
    constructor(props){
        super(props);
        this.state={
        }
    }

    okModal(){
        this.props.ApiManagerStore.setDetailDataTreeParams();
    }

    hideTreeModal(){
        this.props.ApiManagerStore.hideTreeModal();
    }

    render(){
        const { treeModalVisible} = this.props
        return (
            <Modal
                destroyOnClose
                title="添加"
                width="900px"
                visible={treeModalVisible}
                onOk={this.okModal.bind(this)}
                onCancel={this.hideTreeModal.bind(this)}
                okText="保存"
                cancelText="取消"
                className="model" width={500} >
                <span>重新选择应用和模块（点击对应的应用和模块即为选中）</span>
                <TreeManager pageType="updateApi" maxHeight="420px"/>
            </Modal>
        )
    }
}

export default Form.create()(TreeModal)
