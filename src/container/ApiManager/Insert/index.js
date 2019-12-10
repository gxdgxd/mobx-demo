import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Table, Button,Tag, Alert, message, Row, Col, Form, Input,Icon, } from 'antd';
import SearchForm from './SearchForm';
import {insertColumns} from "../config";
import TreeManager from '../../TreeManager/TreeManager';

const FormItem = Form.Item;

message.config({
    top: 200
});
@inject('ApiManagerStore')
@observer
class Index extends Component{
    constructor(props){
        super(props);
        this.state={
            tags: [],
            inputVisible: false,
            inputValue: '',
            selectedRowKeysApis:[],
            selectedRowsApis:[]
        }
    }

    componentDidMount() {
        this.props.setBreadcrumb([
            {name: '接口管理'},
            {name: '添加接口'},
        ]);
        this.props.ApiManagerStore.fetchApiByGAV(1);
    }

    /**
     * tag标签处理 start
     */
    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
    };

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        console.log(tags);
        this.setState({
            tags,
            inputVisible: false,
            inputValue: ''
        });
    };

    saveInputRef = input => (this.input = input);
    /**
     * tag标签处理 end
     */

    /**
     * table中input输入值后触发保存
     * @param row
     */
    handleSave = row => {
        const newData = [...this.props.ApiManagerStore.insertDataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.props.ApiManagerStore.insertDataSource = newData
    };

    /**
     * 单个添加接口
     * @param record
     */
    insertApi(record){
        const array = []
        array.push(record)
        this.props.ApiManagerStore.insertApi(array);
    }

    /**
     * 批量添加
     */
    batchInsertApi = () => {
        debugger

        if(this.state.selectedRowKeysApis.length <= 0){
            message.warn("请先勾选需要添加的接口")
        }else{
            console.log(this.state.selectedRowKeysApis)
            console.log(this.state.selectedRowsApis)
            this.props.ApiManagerStore.insertApi(this.state.selectedRowsApis)
        }
    }

    render(){
        //可编辑单元格
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCellForm,
            },
        };

        const columns = insertColumns(this)
        const columnsValue = columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    desc:col.desc,
                    handleSave: this.handleSave,
                }),
            };
        });
        //复选框操作
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.setState({
                    selectedRowKeysApis: selectedRowKeys,
                    selectedRowsApis: selectedRows
                });
            }
        };

        const {insertDataSource,treeParams} = this.props.ApiManagerStore

        console.log(treeParams.appId)
        return (
            <div className="container-bg">
                <Row>
                    <Col span={4}>
                        <TreeManager pageType="insertApi" maxHeight="870px"/>
                    </Col>
                    <Col span={20}>
                        <SearchForm/>
                        <Alert message="接口信息" type="info" style={{backgroundColor:'#c7e7ff',border:'0px',marginBottom:'13px'}}/>
                        <Button type="primary" style={{marginBottom:'10px'}}   onClick={() => this.batchInsertApi()}><Icon type="plus" /> 批量添加</Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Tag color="geekblue" style={{display: treeParams.appName != "" && typeof treeParams.appName != 'undefined'  ? "" : "none"}}>
                            <span style={{display: treeParams.appName != "" && typeof treeParams.appName != 'undefined'  ? "" : "none"}}>接口归属应用：{treeParams.appName}</span>
                            <span style={{display: treeParams.moduleName != ""  && typeof treeParams.moduleName != 'undefined' ? "" : "none"}}>，接口归属模块：{treeParams.moduleName}</span>
                            <span>（点击左侧切换筛选）</span>
                        </Tag>
                        <Table components={components} rowClassName={() => 'editable-row'}
                            bordered
                            columns={columnsValue}
                            dataSource={insertDataSource} rowSelection={rowSelection}/>
                    </Col>
                </Row>
            </div>
        )
    }
}


export default Form.create()(Index)

/**
 * 编辑单元格
 */
const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);
const EditableContext = React.createContext();


class EditableCellForm extends React.Component {
    state = {
        editing: false,
    };

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    };

    save = e => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    };

    renderCell = form => {
        this.form = form;
        const { children, dataIndex, record, title } = this.props;
        const { editing } = this.state;
        return editing ? (
            <FormItem style={{ margin: 0 }}>
                {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: false,
                            message: `${title} is required.`,
                        },
                    ],
                    initialValue: record[dataIndex],
                })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
            </FormItem>
        ) : (
            <div
                className="editable-cell-value-wrap"
                onClick={this.toggleEdit}>
                {children}
            </div>
        );
    };

    render() {

        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
                ) : (
                    children
                )}
            </td>
        );
    }
}


