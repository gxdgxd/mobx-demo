import { observable, action, extendObservable } from 'mobx';
import axios from 'axios';
import { message } from 'antd';
import {post} from '../../utils/http'
import {getUrlParam} from "../../utils/common";


class ExeRecordStore {
    @observable dataSource = [];
    @observable exeDetailData = [];
    @observable modalVisible = false;
    @observable resultMessageModalVisible = false;
    @observable totalCount = 0
    @observable pageSize = 0
    @observable pageNo = 0
    @observable message = ""
    //查询条件
    @observable tableRequestData = {

    };
    @action
    changeTableRequestData(n,v){
        this.tableRequestData[n] = v == "" ? undefined : v ;
    }
    @action
    hideModal(){
        this.modalVisible = false;
    }
    @action
    hideResultMessageModal(){
        this.resultMessageModalVisible = false;
    }
    @action
    showResultMessageModal(message){
        this.resultMessageModalVisible = true;
        console.log('message:',message)
        this.message = message
    }
    /**
     * 初始化table数据
     * @param pageNo
     * @returns {Promise<void>}
     */
    @action
    async initData(pageNo) {

        var testdata = {"arg0":{'operatorId':this.tableRequestData.operatorId,"env":this.tableRequestData.env,"exeTimeBefore":this.tableRequestData.exeTimeBefore,"finishTimeAfter":this.tableRequestData.finishTimeAfter,"pageNo":pageNo,"pageSize":10,"status":this.tableRequestData.status,"testSceneId":this.tableRequestData.testSceneId}}
        const result = await post("1.0.0/hipac.gotest.exe.record.query/",testdata)

        this.dataSource = result.data;
        this.pageNo = result.pageNo;
        this.pageSize = result.pageSize;
        this.totalCount = result.totalCount;
    }

    @action
    async getDetailData(id){
        const result = await post("1.0.0/hipac.gotest.exe.record.info/",{id:id})
        this.exeDetailData = result.data;
        this.modalVisible = true;
        return result.data
    }

}

export default new ExeRecordStore();
