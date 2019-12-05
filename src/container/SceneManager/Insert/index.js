import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Table, Button, Tag, Select,Icon, Row, Col, Form, Input, Modal } from 'antd';
import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';

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

        this.setState({
            data:this.props.SceneManagerStore.insertDataSource.toJS()
        })
    }
    constructor(props){
        super(props);
        this.state= {
            data:[]
        }
    }
    components = {
        body: {
            row: DragableBodyRow,
        },
    };
    /**
     * 上下移动数据
     * @param dragIndex
     * @param hoverIndex
     */
    moveRow = (dragIndex, hoverIndex) => {
        debugger
        const data = this.state.data
        const dragRow = data[dragIndex];

        this.setState(
            update(this.state, {
                data: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
                },
            }),
        );
    };
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
                        <Tag color="purple" style={{'marginBottom':'8px'}}> <Icon type="smile" /> 上下拖拽可以移动表格中用例顺序 </Tag>

                        <DndProvider backend={HTML5Backend}>
                            <Table
                                bordered
                                columns={insertColumns(this)}
                                dataSource={this.state.data} components={this.components}
                                onRow={(record, index) => ({
                                    index,
                                    moveRow: this.moveRow,
                                })} />
                        </DndProvider>
                    </Row>
                </Form>
            </div>
        )
    }
}

export default Form.create()(InsertIndex)

let dragingIndex = -1;
class BodyRow extends React.Component {
    render() {
        const { isOver, connectDragSource, connectDropTarget, moveRow, ...restProps } = this.props;
        const style = { ...restProps.style, cursor: 'move' };

        let { className } = restProps;
        if (isOver) {
            if (restProps.index > dragingIndex) {
                className += ' drop-over-downward';
            }
            if (restProps.index < dragingIndex) {
                className += ' drop-over-upward';
            }
        }

        return connectDragSource(
            connectDropTarget(<tr {...restProps} className={className} style={style} />),
        );
    }
}

const rowSource = {
    beginDrag(props) {
        dragingIndex = props.index;
        return {
            index: props.index,
        };
    },
};

const rowTarget = {
    drop(props, monitor) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Time to actually perform the action
        props.moveRow(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    },
};

const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
}))(
    DragSource('row', rowSource, connect => ({
        connectDragSource: connect.dragSource(),
    }))(BodyRow),
);