import { observable, action, extendObservable } from 'mobx';
import axios from 'axios';
import { message } from 'antd';
import {post} from '../../utils/http'
import {getUrlParam} from "../../utils/common";


class SceneManagerStore {
    @observable dataSource = [];
    @observable insertDataSource = [];
    @observable caseDataSource = [];
    @observable updateCaseDataSource = [];
    @observable insertCaseModalVisible = false
    @observable detailData = [];

    @observable totalCount = 0
    @observable pageSize = 0
    @observable pageNo = 0
    @observable tableRequestData = {}

    @action
    changeTableRequestData(n,v){
        this.tableRequestData[n] = v == "" ? undefined : v ;
    }
    @action
    changeDetailData(n,v){
        this.detailData[n] = v;
    }

    @action
    async initData(pageNo) {
        const params = {"arg0":{"creatorId":this.tableRequestData.creatorId,"env":this.tableRequestData.env,"id":this.tableRequestData.id,"name":this.tableRequestData.name,"pageNo":pageNo,"pageSize":10,"scheduleType":this.tableRequestData.scheduleType,"cron":this.tableRequestData.cron}}
        const result = await post("1.0.0/hipac.gotest.scene.query/",params)
        this.dataSource = result.data;
        this.pageNo = result.pageNo;
        this.pageSize = result.pageSize;
        this.totalCount = result.totalCount;
    }

    @action
    async deleteSceneCase(key){
        this.caseDataSource = this.caseDataSource.filter(it => it.key !== key);
    }

    /**
     * 保存场景信息
     * @returns {Promise<void>}
     */
    @action
    async insertScene(){
        let caseArray  = []
        for (let i = 0; i < this.caseDataSource.length; i++) {
            let obj = {}
            obj.testCaseId = this.caseDataSource[i].id
            caseArray.push(obj)
        }
        const params = {
            "arg0": {
                "env": this.tableRequestData.env,
                "name": this.tableRequestData.name,
                "scheduleType": this.tableRequestData.scheduleType,
                "testCaseSchedules": caseArray,
                "cron":this.tableRequestData.cron,
                "alarmDingUrls":this.tableRequestData.alarmDingUrls
            }
        }
        const result = await post("1.0.0/hipac.gotest.scene.save/",params)
        if(result.code == "200"){
            message.success('添加场景成功，5秒后页面将刷新');
            setTimeout( function(){
                window.location.reload();
            }, 5 * 1000 );
        }
    }

    /**
     * 保存从追加用例弹框中勾选的用例
     * @param data 勾选的list
     * @returns {Promise<void>}
     */
    @action
    async insertCase(data){

        // this.caseDataSource = data
        // let updateCaseDataSourceNew = this.updateCaseDataSource.toJS()
        //
        // if(updateCaseDataSourceNew.length > 0){
        //     let caseDataSourceNew = data
        //     for (let i = 0; i < updateCaseDataSourceNew.length; i++) {
        //         let ret2 = caseDataSourceNew.findIndex((v) =>  v.id == updateCaseDataSourceNew[i].id);
        //         if(ret2 < 0){
        //             caseDataSourceNew.push(updateCaseDataSourceNew[i])
        //         }
        //     }
        //     this.caseDataSource = caseDataSourceNew
        // }
        // let updateCaseDataSource = []
        for (let i = 0; i < data.length; i++) {
            this.caseDataSource.push(data[i])
        }

        this.caseDataSource = this.caseDataSource.map(function(item,i){
            return {
                ...item,
                key:  i + 1
            }
        });

        console.log(JSON.stringify(this.caseDataSource))
        this.hideInsertCaseModal()
    }


    @action
    showInsertCaseModal(){
        this.insertCaseModalVisible = true;
    }

    @action
    hideInsertCaseModal(){
        this.insertCaseModalVisible = false
    }

    /**
     * 上下移动用例
     * @param data
     */
    @action
    orderCase(data){
        this.caseDataSource = data;
    }

    /**
     * 根据场景ID获取场景详细信息包括case和api信息
     * @param record
     * @returns {Promise<void>}
     */
    @action
    async getDetailData() {
        let sceneId = getUrlParam('sceneId',window.location.search);
        const result = await post("1.0.0/hipac.gotest.scene.info/",{id:sceneId})
        this.detailData = result.data;
        let testCaseSchedules = result.data.testCaseSchedules
        let caseDataSource = []
        debugger
        for (let i = 0; i < testCaseSchedules.length ; i++) {
            let testCase = testCaseSchedules[i].testCase
            testCase.key = i + 1
            caseDataSource.push(testCase)
        }
        this.caseDataSource = caseDataSource
    }

    /**
     * 根据id修改场景信息
     * @returns {Promise<void>}
     */
    @action
    async updateScene(){
        let caseArray  = []
        for (let i = 0; i < this.caseDataSource.length; i++) {
            let obj = {}
            obj.testCaseId = this.caseDataSource[i].id
            caseArray.push(obj)
        }
        const params = {
            "arg0": {
                "id":this.detailData.id,
                "env": this.detailData.env,
                "name": this.detailData.name,
                "scheduleType": this.detailData.scheduleType,
                "cron": this.detailData.cron,
                "alarmDingUrls":this.detailData.alarmDingUrls,
                "testCaseSchedules": caseArray
            }
        }
        console.log(params)
        const result = await post("1.0.0/hipac.gotest.scene.save/",params)
        if(result.code == "200"){
            message.success('保存场景成功');
        }
    }


}

export default new SceneManagerStore();
