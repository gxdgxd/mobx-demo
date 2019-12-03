import { observable, action, extendObservable } from 'mobx';
import axios from 'axios';
import { message } from 'antd';


class GlobalManagerStore {
    @observable dataSource = [];
    @observable modalVisible = false;
    @observable updateModalVisible = false;
    @observable detailData = {};
    @observable tableRequestData = {
        name:'',
        value:'',
        var_type:''
    };

    /**
     * 初始化table数据
     * @param pageNo
     * @returns {Promise<void>}
     */
    @action
    async initData(pageNo) {
        this.dataSource = [
            {
                key: '1',
                name: '胡彦斌',
                value: 32,
                var_type: 0,
                edit_time:'2019/01/10 12:00:00'
            },
            {
                key: '2',
                name: '胡彦祖',
                value: 42,
                var_type: 1,
                edit_time:'2019/01/10 12:00:00'
            },
            {
                key: '2',
                name: '胡彦祖',
                value: 42,
                var_type: 1,
                edit_time:'2019/01/10 12:00:00'
            }
        ];
    }

    @action
    showModal(){
        this.modalVisible = true;
    }
    @action
    hideModal(type){
        if(type == "insert"){
            this.modalVisible = false;
        }else if(type == "update"){
            this.updateModalVisible = false;
        }
    }
    @action
    changeTableRequestData(n,v){
        this.tableRequestData[n]=v;
    }

    @action
    async getDetailData(record) {
        console.log("getDetailData:" + record)
        debugger
        this.detailData = record;
        this.updateModalVisible = true;
    }

    /**
     * 添加变量
     * @param data
     * @returns {Promise<void>}
     */
    @action
    async insert(data) {

        let defaultData = {
            name:this.tableRequestData.name,
            value:this.tableRequestData.value,
            var_type:this.tableRequestData.var_type
        };
        extendObservable(defaultData,data);
        const result = await axios({
            method:"get",
            url:"userfeedback/insertUserFeedback?",
            params: defaultData
        });

        if(result.code == "200"){
            message.success('添加变量成功');
        }else{
            message.error('添加变量失败，请重试！');
        }
        this.modalVisible = false;
    }

    /**
     * 修改变量
     * @param data
     * @returns {Promise<void>}
     */
    @action
    async update(data) {
        this.updateModalVisible = false;
    }

    /**
     * 删除变量
     * @param data
     * @returns {Promise<void>}
     */
    @action
    async delete(data) {
        this.updateModalVisible = false;
    }
}

export default new GlobalManagerStore();
