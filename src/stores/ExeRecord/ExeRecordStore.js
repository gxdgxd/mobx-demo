import { observable, action, extendObservable } from 'mobx';
import axios from 'axios';
import { message } from 'antd';


class ExeRecordStore {
    @observable dataSource = [];
    @observable modalVisible = false;

    //查询条件
    @observable tableRequestData = {

    };

    /**
     * 初始化查询表单
     * @returns {Promise<void>}
     */
    @action
    async initFormData(){
    }

    /**
     * 初始化table数据
     * @param pageNo
     * @returns {Promise<void>}
     */
    @action
    async initData(pageNo) {
        this.dataSource = [{
            key:1,
            name:'abc'
        }]
    }

    @action
    async getDetailData(){
        this.modalVisible = true;
    }

}

export default new ExeRecordStore();
