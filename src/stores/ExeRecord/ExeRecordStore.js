import { observable, action, extendObservable } from 'mobx';
import axios from 'axios';
import { message } from 'antd';
import {post} from '../../utils/http'
import {getUrlParam} from "../../utils/common";


class ExeRecordStore {
    @observable dataSource = [];
    @observable detailData = [];
    @observable modalVisible = false;
    @observable totalCount = 0
    @observable pageSize = 0
    @observable pageNo = 0
    //查询条件
    @observable tableRequestData = {

    };
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

        var testdata = {"arg0":{'operatorId':this.tableRequestData.operatorId,"env":this.tableRequestData.env,"exeTimeBefore":this.tableRequestData.exeTimeBefore,"finishTimeAfter":this.tableRequestData.finishTimeAfter,"pageNo":pageNo,"pageSize":10,"status":this.tableRequestData.status,"testSceneId":this.tableRequestData.testSceneId}}
        const result = await post("1.0.0/hipac.api.test.exe.record.query",testdata)

        this.dataSource = result.data;
        this.pageNo = result.pageNo;
        this.pageSize = result.pageSize;
        this.totalCount = result.totalCount;
    }

    @action
    async getDetailData(id){
        const result = await post("1.0.0/hipac.api.test.exe.record.info",{id:id})
        this.detailData = result.data;
        this.modalVisible = true;
    }

}

export default new ExeRecordStore();
