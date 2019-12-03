import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Table, Button, Radio, Select,Icon, Row, Col, Form, DatePicker, Input, Modal } from 'antd';
import {insertColumns} from '../config';

const FormItem = Form.Item;
const Option = Select.Option;


const { TextArea } = Input;
@inject('TestCaseManagerStore')
@inject('SceneManagerStore')
@observer
class InsertIndex extends Component {
    componentDidMount() {
        this.props.setBreadcrumb([
            {name: '场景管理'},
            {name: '添加场景'}
        ]);
        this.props.SceneManagerStore.initData(1);
    }
    constructor(props){
        super(props);
        this.state= {
        }
    }

    inputChange(n,e) {
        this.props.SceneManagerStore.changeTableRequestData(n,e.target.value);
    }


    handleSubmit = (e) => {
        debugger
        e.preventDefault();
        this.props.SceneManagerStore.initData(1);
    }

    showInsertCaseModal(){
        this.props.SceneManagerStore.showInsertCaseModal()
    }
    formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    }

    render(){
        const {insertDataSource,insertCaseModalVisible} = this.props.SceneManagerStore
        const {dataSource} = this.props.TestCaseManagerStore
        const mydataSource = insertDataSource.toJS()

        return(
            <div style={{width:'96%',marginLeft:'25px'}}>
                <Form  className="ant-advanced-search-form p-xs pb-0"  onSubmit={this.handleSubmit}>
                    <Row gutter={48}>
                        <Col span={7}>
                            <FormItem {...this.formItemLayout} label="场景名">
                                <Input placeholder="请输入场景名" onChange={this.inputChange.bind(this,'name')}/>
                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <FormItem {...this.formItemLayout} label="场景环境">
                                <Input placeholder="请输入场景环境" onChange={this.inputChange.bind(this,'env')}/>
                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" >
                                    添加场景
                                </Button> &nbsp; &nbsp; &nbsp;
                                <Button type="primary" >
                                    执行场景
                                </Button>  &nbsp; &nbsp; &nbsp;
                                <Button  onClick={()=>{window.location.href="/testcase_manager"}}>追加用例</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={48}>
                        <Table
                            bordered
                            columns={insertColumns(this)}
                            dataSource={mydataSource}  />
                    </Row>
                </Form>
            </div>
        )
    }
}

export default Form.create()(InsertIndex)