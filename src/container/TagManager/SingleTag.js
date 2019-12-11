import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Tag,Icon, Input,Tooltip } from 'antd';

@inject('TagManagerStore','ApiManagerStore')
@observer
class SingleTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags:[],
            inputVisible: false,
            inputValue: '',
        }
    }

    handleClose = removedTag => {
        debugger
        const tags = this.props.tags.filter(tag => tag.id !== removedTag);
        console.log(tags);
        this.setState({ tags });
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = async () => {
        const { inputValue } = this.state;
        let { tags } = this.state
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        const result = await this.props.TagManagerStore.postInsertTag(tags[0])
        let tag = {'id':result.data,'value':tags[0]}
        this.props.getTags(tag)
        this.setState({
            inputVisible: false,
            inputValue: '',
        });
    };

    saveInputRef = input => (this.input = input);

    render(){
        const { inputVisible, inputValue} = this.state;
        return(
            <div>
                {this.props.tags.map((tag, index) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        <Tag key={tag.id} closable onClose={() => this.handleClose(tag.id)}>
                            {isLongTag ? `${tag.value.slice(0, 20)}...` : tag.value}
                        </Tag>
                    );
                    return isLongTag ? (
                        <Tooltip title={tag.value} key={tag.id}>
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
        )
    }
}

export default SingleTag