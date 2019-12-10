import { observable, action, extendObservable } from 'mobx';
import axios from 'axios';
import { message } from 'antd';
import {post} from '../../utils/http'
import {getUrlParam} from "../../utils/common";


class ExeRecordStore {
    @observable dataSource = [];
    @observable modalVisible = false;
    @observable totalCount = 0
    @observable pageSize = 0
    @observable pageNo = 0
    //查询条件
    @observable tableRequestData = {

    };

    /**
     * 初始化table数据
     * @param pageNo
     * @returns {Promise<void>}
     */
    @action
    async initData(pageNo) {

        var testdata = {"arg0":{"env":this.tableRequestData.env,"exeTimeAfter":"","exeTimeBefore":"","finishTimeAfter":"","finishTimeBefore":"","pageNo":pageNo,"pageSize":10,"status":0,"testSceneId":this.tableRequestData.testSceneId}}
        const result = await post("1.0.0/hipac.api.test.exe.record.query",testdata)

        this.dataSource = result.data;
        this.pageNo = result.pageNo;
        this.pageSize = result.pageSize;
        this.totalCount = result.totalCount;
    }

    @action
    async getDetailData(){
        this.modalVisible = true;
    }

}

export default new ExeRecordStore();
