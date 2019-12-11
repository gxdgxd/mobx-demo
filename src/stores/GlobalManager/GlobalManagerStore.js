import { observable, action, extendObservable } from 'mobx';
import axios from 'axios';
import { message } from 'antd';
import {post} from '../../utils/http'


class GlobalManagerStore {
    @observable dataSource = [];
    @observable modalVisible = false;
    @observable updateModalVisible = false;
    @observable detailData = {};
    @observable tableRequestData = {
        name:'',
        value:'',
        var_type:0
    };
    @action
    changeDetailData(n,v){
        this.detailData[n]=v;
    }
    @action
    changeTableRequestData(n,v){
        this.tableRequestData[n]=v;
    }

    /**
     * 初始化table数据
     * @param pageNo
     * @returns {Promise<void>}
     */
    @action
    async initData(pageNo) {
        const result = await post("1.0.0/hipac.api.test.var.userVars/",{})
        console.log(result)
        this.dataSource = result.data;
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
    async insert() {
        const params = {"saveForm":{"ownerId":"","domain":1,"name":this.tableRequestData.name,"value":this.tableRequestData.value,"varType":this.tableRequestData.varType}}
        const result = await post("1.0.0/hipac.api.test.var.saveVar/",params)

        if(result.code == "200"){
            message.success('添加参数成功');
        }
        this.initData(1)
        this.modalVisible = false;
    }

    /**
     * 修改变量
     * @param data
     * @returns {Promise<void>}
     */
    @action
    async update() {
        const params = {"saveForm":{"id":this.detailData.id,"ownerId":"","domain":1,"name":this.detailData.name,"value":this.detailData.value,"varType":this.detailData.varType}}
        const result = await post("1.0.0/hipac.api.test.var.saveVar/",params)

        if(result.code == "200"){
            message.success('修改参数成功');
        }
        this.initData(1)
        this.updateModalVisible = false;
    }

    /**
     * 删除变量
     * @param data
     * @returns {Promise<void>}
     */
    @action
    async delete(data) {
        debugger
        const result = await post("1.0.0/hipac.api.test.var.delVar/",{id:data.id})

        if(result.code == "200"){
            message.success('删除参数成功');
        }
        this.initData(1)
        this.updateModalVisible = false;
    }
}

export default new GlobalManagerStore();
