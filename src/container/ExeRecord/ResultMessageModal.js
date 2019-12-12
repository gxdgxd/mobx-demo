import React, {Component} from 'react';
import { observable, action, computed ,toJS} from 'mobx';
import { observer, inject } from 'mobx-react';
import { Input,Alert,Modal} from 'antd';

const { TextArea } = Input;

@inject('ExeRecordStore')
@observer
class ResultMessageModal extends Component {

    constructor(props){
        super(props);
        this.state= {
        }
    }

    hideModal(){
        this.props.ExeRecordStore.hideResultMessageModal();
    }
    render(){
        const {resultMessageModalVisible,message} = this.props

        return(
            <div className="container-bg">
                <Modal
                    destroyOnClose
                    title="结果信息"
                    okText="关闭"
                    width="800px"
                    visible={resultMessageModalVisible}
                    onOk={this.hideModal.bind(this)}
                    onCancel={this.hideModal.bind(this)}
                    cancelText="取消"
                    className="model"  width="1100px">
                    <pre>
                        {message}
                    </pre>
                </Modal>
            </div>
        )
    }
}

export default ResultMessageModal;