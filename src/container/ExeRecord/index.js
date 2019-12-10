import React, {Component} from 'react';
import { observable, action, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Table,Input,Tree,Form,Row, Col,Button,Icon,DatePicker} from 'antd';
import moment from 'moment';
import {columns} from "./config";
import DetailModal from "./DetailModal";


const { RangePicker } = DatePicker;

@inject('ExeRecordStore')
@observer
class ExeRecordIndex extends Component {
    componentDidMount() {
        this.props.setBreadcrumb([
            {name: '执行记录'},
        ]);
        this.props.ExeRecordStore.initData(1);
    }
    constructor(props){
        super(props);
        this.state= {
            json_str:{}
        }
    }
    inputChange(n,e) {
    }
    onChange(dates, dateStrings) {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    }
    showModal(record){
        this.props.ExeRecordStore.getDetailData(record)
    }
    render(){
        const {dataSource,modalVisible} = this.props.ExeRecordStore
        const mydataSource = dataSource.toJS()
        return(
            <div className="container-bg">
                <Form  className="ant-advanced-search-form p-xs pb-0"  onSubmit={this.handleSubmit}>
                    <Row gutter={48}>
                        <Col span={9}>
                            时间：
                                <RangePicker
                                    ranges={{
                                        Today: [moment(), moment()],
                                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                                    }}
                                    onChange={this.onChange}
                                />
                        </Col>
                        <Col span={5}>
                            场景ID：<Input placeholder="请输入场景ID" style={{'width':'130px'}} onChange={this.inputChange.bind(this,'testSceneId')}/>
                        </Col>
                        <Col span={5}>
                            执行环境：<Input placeholder="请输入执行环境" style={{'width':'130px'}}onChange={this.inputChange.bind(this,'env')}/>
                        </Col>
                        <Col span={3}>
                            <Button type="primary" htmlType="submit" >
                                <Icon type="search" /> 搜索
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Row style={{'marginTop':'8px'}}>
                    <Table
                        bordered
                        columns={columns(this)}
                        dataSource={mydataSource} />
                    <DetailModal modalVisible={modalVisible}/>

                </Row>
            </div>
        )
    }
}

export default ExeRecordIndex;