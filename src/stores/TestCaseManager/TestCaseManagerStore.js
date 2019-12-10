import { observable, action, extendObservable } from 'mobx';
import axios from 'axios';
import { message } from 'antd';
import {getUrlParam,addUrlParam,removeUrlParam} from '../../utils/common'
import {post} from '../../utils/http'


class TestCaseManagerStore{
    @observable dataSource = [];
    @observable totalCount = 0
    @observable pageSize = 0
    @observable pageNo = 0
    @observable treeParams = {'appId':'','moduleId':''}

    @observable caseDetailData = {
        "appId":1,
        "moduleId":1,
        "priority":2
    };
    @observable insertButtonStatus = "";
    @observable updateButtonStatus = "none";

    @observable tableRequestData = {
        "apiId":"",
        "appId":1,
        "moduleId":"",
        "priority":2,
        "name":"",
        "tagId":""
    };

    @action
    changeDetailData(n,v){
        this.caseDetailData[n]=v;
    }
    @action
    changeTableRequestData(n,v){
        this.tableRequestData[n]=v;
    }

    /**
     * 初始化table数据-用例管理
     * @param pageNo
     * @returns {Promise<void>}
     */
    @action
    async initData(pageNo,appId,moduleId) {
        this.treeParams = {'appId':appId,'moduleId':moduleId}
        const params = {"query":{"creatorId":this.tableRequestData.creatorId,"apiId":this.tableRequestData.apiId,"appId":this.treeParams.appId,"moduleId":this.treeParams.moduleId,"name":this.tableRequestData.name,"pageNo":pageNo,"pageSize":10,"tagId":this.tableRequestData.tagId}}
        console.log(JSON.stringify(params))
        const result = await post("1.0.0/hipac.api.test.case.queryCase",params)
        this.dataSource = result.data;
        this.pageNo = result.pageNo;
        this.pageSize = result.pageSize;
        this.totalCount = result.totalCount;
    }

    /**
     * 根据用例ID获取用例详细信息
     * @returns {Promise<void>}
     */
    @action
    async getDetailData() {
        let caseId = getUrlParam('caseId',window.location.search);
        const result = await post("1.0.0/hipac.api.test.case.caseInfo",{id:caseId})
        this.caseDetailData = result.data;
        this.insertButtonStatus = "none"
        this.updateButtonStatus = ""
    }

    /**
     * 添加用例/修改用例/复制
     * @returns {Promise<void>}
     */
    @action
    async insert(tags) {
        let tagIds = []
        if(tags.length > 0){
            for (let i = 0; i < tags.length; i++) {
                tagIds.push(tags[i].id)
            }
        }

        let apiId = getUrlParam('apiId',window.location.search);
        let caseId = getUrlParam('caseId',window.location.search);
        let type = getUrlParam('type',window.location.search);
        if(type == "copy"){
            caseId = ""
        }
        const params = {"arg0":{"apiId":apiId,"appId":this.caseDetailData.appId,"contextParamScript":this.caseDetailData.contextParamScript,"desc":this.caseDetailData.desc,"id":caseId,"moduleId":this.caseDetailData.moduleId,"name":this.caseDetailData.name,"paramScript":this.caseDetailData.paramScript,"postScript":"","preScript":"","priority":this.caseDetailData.priority,"tagIds":tagIds,"validScript":this.caseDetailData.validScript}}
        const result = await post("1.0.0/hipac.api.test.case.saveCase",params)
        if(result.code == 200){
            message.success("保存用例成功")
            this.insertButtonStatus = "none"
            this.updateButtonStatus = ""
            addUrlParam('caseId',result.data)
        }
    }

    /**
     * 执行用例
     * @returns {Promise<void>}
     */
    @action
    async batchExeCase(data) {
        var array = []
        for (let i = 0; i < data.length; i++) {
            var obj = {}
            obj.apiClassName = data[i].apiClassName
            obj.apiMethodName = data[i].apiMethodName
            obj.argsTypeNames = data[i].argsTypeNames
            obj.desc = data[i].desc
            obj.name = data[i].name
            obj.type = data[i].type
            array.push(obj)
        }
        const params =  {"caseIds":array,"scheduleType":null,"env":""}
        const result = await post("1.0.0/hipac.api.test.exe.apply",params)
        if(result.code == 200){
            message.success("用例已经开始执行")
        }
    }

}

export default new TestCaseManagerStore();
