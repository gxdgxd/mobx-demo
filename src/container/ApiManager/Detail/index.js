import React, { Component } from 'react';
import { observable, action, computed,toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Table,Tag, Button,Tooltip,Alert, Radio, Select, Row, Col, Form, DatePicker, Input, Modal,Icon,Upload } from 'antd';
const { Column, ColumnGroup } = Table;


const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const { TextArea } = Input;


@inject('ApiManagerStore')
@observer
class DetailIndex extends Component{
    constructor(props){
        super(props);
        this.state={
            tags:[],
            inputVisible: false,
            inputValue: '',
        }
    }
    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { tags } = this.state
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        console.log(tags);
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    };

    saveInputRef = input => (this.input = input);

    /**
     * 输入框和单选按钮产生的change事件
     * @param n
     * @param e
     */
    inputChange(n,e) {
        let obj={};
        obj[n]=e.target.value;
        this.setState(obj);
        this.props.ApiManagerStore.changeTableRequestData(n,e.target.value);
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const { detailData} = this.props
        const { inputVisible, inputValue } = this.state;
        debugger
        let tags = []
        if(typeof detailData.tags != "undefined"){
            tags = toJS(detailData.tags)
        }
        return (
            <div>


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
                        <FormItem {...this.formItemLayout} label="version">
                            {getFieldDecorator('version', {
                                initialValue: detailData.version,
                                rules: [{ required: true, message: '请填写version!' }],
                            })(
                                <Input disabled style={{ width: 190 }} value={detailData.version}/>
                            )}
                        </FormItem>
                    </Row>
                    <Alert message="接口信息" type="info" style={{backgroundColor:'#c7e7ff',border:'0px','marginBottom':'10px'}}/>
                    <Row>
                        <FormItem {...this.formItemLayout} label="应用名">
                            {getFieldDecorator('version', {
                                initialValue: detailData.version,
                                rules: [{ required: true, message: '请填写version!' }],
                            })(
                                <Select style={{ width: 145 }}  showSearch >
                                    <Option key="1" value="1">1</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem {...this.formItemLayout} label="一级模块">
                            {getFieldDecorator('version', {
                                initialValue: detailData.version,
                                rules: [{ required: false, message: '请填写version!' }],
                            })(
                                <Select style={{ width: 145 }}  showSearch >
                                    <Option key="1" value="1">1</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem {...this.formItemLayout} label="二级模块">
                            {getFieldDecorator('version', {
                                initialValue: detailData.version,
                                rules: [{ required: false, message: '请填写version!' }],
                            })(
                                <Select style={{ width: 145 }}  showSearch >
                                    <Option key="1" value="1">1</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem {...this.formItemLayout} label="三级模块">
                            {getFieldDecorator('version', {
                                initialValue: detailData.version,
                                rules: [{ required: false, message: '请填写version!' }],
                            })(
                                <Select style={{ width: 145 }}  showSearch >
                                    <Option key="1" value="1">1</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem {...this.formItemLayout} label="接口路径">
                            {getFieldDecorator('apiClassName', {
                                initialValue: detailData.apiClassName,
                                rules: [{ required: true, message: '请填写接口路径!' }],
                            })(
                                <Input disabled style={{ width: 823 }} value={detailData.apiClassName}/>
                            )}
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem {...this.formItemLayout} label="方法名">
                            {getFieldDecorator('apiMethodName', {
                                initialValue: detailData.apiMethodName,
                                rules: [{ required: true, message: '请填写方法名!' }],
                            })(
                                <Input disabled style={{ width: 375 }} value={detailData.apiMethodName}/>
                            )}
                        </FormItem>
                        <FormItem {...this.formItemLayout} label="接口名">
                            {getFieldDecorator('name', {
                                initialValue: detailData.name,
                                rules: [{ required: true, message: '请填写name!' }],
                            })(
                                <Input style={{ width: 378 }} value={detailData.name}/>
                            )}
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem {...this.formItemLayout} label="创建人">
                            {getFieldDecorator('creatorName', {
                                initialValue: detailData.creatorName,
                                rules: [{ required: true, message: '请填写name!' }],
                            })(
                                <Input disabled style={{ width: 145 }} value={detailData.creatorName}/>
                            )}
                        </FormItem>
                        <FormItem {...this.formItemLayout} label="标签">
                            <div>
                                {tags.map((tag, index) => {
                                    const isLongTag = tag.length > 20;
                                    const tagElem = (
                                        <Tag key={tag.key} closable={index !== 0} onClose={() => this.handleClose(tag.value)}>
                                            {isLongTag ? `${tag.value.slice(0, 20)}...` : tag.value}
                                        </Tag>
                                    );
                                    return isLongTag ? (
                                        <Tooltip title={tag.value} key={tag.key}>
                                            {tagElem}
                                        </Tooltip>
                                    ) : (
                                        tagElem
                                    );
                                })}
                                {inputVisible && (
                                    <Input
                                        ref={this.saveInputRef}
                                        type="text"
                                        size="small"
                                        style={{ width: 78 }}
                                        value={inputValue}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleInputConfirm}
                                        onPressEnter={this.handleInputConfirm}
                                    />
                                )}
                                {!inputVisible && (
                                    <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                                        <Icon type="plus" /> New Tag
                                    </Tag>
                                )}

                            </div>
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem {...this.formItemLayout} label="描述">
                            {getFieldDecorator('desc', {
                                initialValue: detailData.desc,
                                rules: [{ required: true, message: '请填写描述!' }],
                            })(
                                <TextArea rows={3} style={{ width: 852 }} value={detailData.desc} onChange={this.inputChange.bind(this,'desc')}/>
                            )}
                        </FormItem>
                    </Row>
                </Form>
            </div>
        )
    }
}

export default Form.create()(DetailIndex)
