import React, { Component } from 'react';
import { observable, action, computed,toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import TreeModal from './TreeModal'
import { Tag, Button,Alert, Row, Form, Input,Icon } from 'antd';
import SingleTag from "../../TagManager/SingleTag";
const FormItem = Form.Item;
const { TextArea } = Input;


@inject('ApiManagerStore','TagManagerStore')
@observer
class DetailIndex extends Component{
    componentDidMount() {
        this.props.setBreadcrumb([
            {name: '接口管理'},
            {name: '修改接口'},
        ]);
        this.props.ApiManagerStore.getApiDetailData()
    }
    constructor(props){
        super(props);
        this.state={

        }
    }

    /**
     * 获取子组件SingleTag中用户输入的tag标签
     */
    getTags = (tags) => {
        debugger
        this.props.ApiManagerStore.insertTags(tags)
    };

    /**
     * 移除用户输入的tag标签
     */
    deleteTags = (tags) => {
        debugger
        this.props.ApiManagerStore.deleteTags(tags)
    };
    /**
     * 输入框和单选按钮产生的change事件
     * @param n
     * @param e
     */
    inputChange(n,e) {
        let obj={};
        obj[n]=e.target.value;
        this.setState(obj);
        this.props.ApiManagerStore.changeDetailData(n,e.target.value);
    }
    handleSubmit = (e) => {

        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.ApiManagerStore.updateApi(1);
            }
        });
    }

    showTreeModal(){
        this.props.ApiManagerStore.showTreeModal()
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const { detailData,tags,treeModalVisible} = this.props.ApiManagerStore

        return (
            <div  style={{'marginLeft':'15px'}}>
                <Form  layout="inline" className="ant-advanced-search-form p-xs pb-0" onSubmit={this.handleSubmit}>
                    <Alert message="api包信息" type="info" style={{backgroundColor:'#c7e7ff',border:'0px','marginBottom':'10px'}}/>
                    <Row>
                        <FormItem {...this.formItemLayout} label="groupId">
                            {getFieldDecorator('groupId', {
                                initialValue: detailData.groupId,
                                rules: [{ required: true, message: '请填写groupId!' }],
                            })(
                                <Input disabled style={{ width: 190 }} value={detailData.groupId}/>
                            )}
                        </FormItem>
                        <FormItem {...this.formItemLayout} label="artifactId">
                            {getFieldDecorator('artifactId', {
                                initialValue: detailData.artifactId,
                                rules: [{ required: true, message: '请填写artifactId!' }],
                            })(
                                <Input disabled style={{ width: 190 }} value={detailData.groupId}/>
                            )}
                        </FormItem>
                    </Row>
                    <Alert message="接口信息" type="info" style={{backgroundColor:'#c7e7ff',border:'0px','marginBottom':'10px'}}/>
                    <Row>

                        <FormItem {...this.formItemLayout} label="">
                            <Tag color="geekblue">接口归属应用：{detailData.appName}</Tag>
                        </FormItem>
                        <FormItem {...this.formItemLayout} label="">
                            <Tag color="geekblue">接口归属模块：{detailData.moduleName}</Tag>
                        </FormItem>
                        <FormItem {...this.formItemLayout} label="">
                            <a href="#" onClick={this.showTreeModal.bind(this)}><Icon type="edit"></Icon> 编辑</a>
                            <TreeModal treeModalVisible={treeModalVisible}></TreeModal>
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem {...this.formItemLayout} label="接口路径">
                            {getFieldDecorator('apiClassName', {
                                initialValue: detailData.apiClassName,
                                rules: [{ required: true, message: '请填写接口路径!' }],
                            })(
                                <Input disabled style={{ width: 823 }} />
                            )}
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem {...this.formItemLayout} label="方法名">
                            {getFieldDecorator('apiMethodName', {
                                initialValue: detailData.apiMethodName,
                                rules: [{ required: true, message: '请填写方法名!' }],
                            })(
                                <Input disabled style={{ width: 375 }} />
                            )}
                        </FormItem>
                        <FormItem {...this.formItemLayout} label="接口名">
                            {getFieldDecorator('name', {
                                initialValue: detailData.name,
                                rules: [{ required: true, message: '请填写接口名!' }],
                            })(
                                <Input style={{ width: 378 }} onChange={this.inputChange.bind(this,'name')} />
                            )}
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem {...this.formItemLayout} label="创建人">
                            {getFieldDecorator('creatorName', {
                                initialValue: detailData.creatorName,
                                rules: [{ required: true, message: '请填写创建人!' }],
                            })(
                                <Input disabled style={{ width: 145 }} />
                            )}
                        </FormItem>
                        <FormItem {...this.formItemLayout} label="接口标签">
                            <SingleTag tags={tags} getTags={this.getTags} deleteTags={this.deleteTags}/>
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem {...this.formItemLayout} label="描述">
                            {getFieldDecorator('desc', {
                                initialValue: detailData.desc,
                                rules: [{ required: false, message: '请填写描述!' }],
                            })(
                                <TextArea rows={3} style={{ width: 852 }} value={detailData.desc} onChange={this.inputChange.bind(this,'desc')}/>
                            )}
                        </FormItem>
                    </Row>
                    <Row>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" >
                                修改
                            </Button>
                        </Form.Item>
                    </Row>
                </Form>
            </div>
        )
    }
}

export default Form.create()(DetailIndex)
