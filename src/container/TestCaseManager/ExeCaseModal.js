import React, { PureComponent } from 'react';
import { observer, inject } from 'mobx-react';
import { Form, Input, Modal, Tag } from 'antd';
import { message } from "antd/lib/index";

const FormItem = Form.Item;

@inject('TestCaseManagerStore', 'ExeRecordStore', 'GlobalManagerStore')
@observer
class ExeCaseModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            scheduleType: '',
            recordId: 0,
            loading: false,
        };
    }


    okModal = () => {
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                let params = { "id": null, "caseIds": this.props.caseIds, "scheduleType": 1, "env": this.props.GlobalManagerStore.varValue };

                this.setState({ loading: true });
                let result = await this.props.TestCaseManagerStore.exeCase(params, 'case');
                this.setState({ loading: false });

                if (result.code == 200) {
                    this.setState({
                        recordId: result.data
                    });

                    // action
                    this.hideExeCaseModal();
                    this.props.TestCaseManagerStore.showCaseDrawer();

                    // async
                    this.props.ExeRecordStore.getDetailData(this.state.recordId);
                    this.timerExe();

                } else {
                    message.warn("执行出现错误");
                }
            }
        });
    }
    timerExe = () => {
        this.timerDate = setInterval(() => this.tick(), 3000);
    }
    handleClearTimeout = () => {
        this.timerDate && clearInterval(this.timerDate);
    }
    componentWillUnmount() {
        this.handleClearTimeout();
    }

    tick = async () => {
        let detailData = await this.props.ExeRecordStore.getDetailData(this.state.recordId);

        if (detailData.status == 2) {
            this.handleClearTimeout();
        }
    }
    changeInput(e) {
        this.props.GlobalManagerStore.varValue = e.target.value;
    }
    hideExeCaseModal() {
        this.props.TestCaseManagerStore.hideExeCaseModal();
    }

    formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { exeCaseModalVisible } = this.props;
        const { loading } = this.state;
        const { varValue } = this.props.GlobalManagerStore;

        return (
            <Modal
                destroyOnClose
                title="执行用例"
                width="800px"
                visible={exeCaseModalVisible}
                onOk={this.okModal.bind(this)}
                onCancel={this.hideExeCaseModal.bind(this)}
                okText="执行"
                cancelText="取消"
                confirmLoading={loading}
                className="model">
                <Form className="ant-advanced-search-form p-xs pb-0" >
                    <FormItem {...this.formItemLayout} label="执行环境">
                        {getFieldDecorator('env', {
                            initialValue: varValue,
                            rules: [{ required: true, message: '请输入执行环境!' }],
                        })(
                            <Input placeholder="请输入执行环境" allowClear={true} style={{ width: 220 }} onChange={this.changeInput.bind(this)} />
                        )}
                    </FormItem>
                    <span style={{ 'paddingLeft': '160px' }}><Tag color="orange">可以在参数管理中配置默认的环境变量，参数名称必须为:default_env <a href="/global_manager" target="_blank">前往配置</a></Tag></span>
                    <FormItem {...this.formItemLayout} label="执行方式">
                        <span>并行执行</span>
                    </FormItem>
                </Form>

            </Modal>
        );
    }
}

export default Form.create()(ExeCaseModal);
