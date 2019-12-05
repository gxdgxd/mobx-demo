import { observable, action, extendObservable } from 'mobx';
import axios from 'axios';
import { message } from 'antd';
import {getUrlParam,addUrlParam,removeUrlParam} from '../../utils/common'

import {post} from '../../utils/http'
import {inject} from "mobx-react/dist/mobx-react";

class TestCaseManagerStore {
    @observable dataSource = [];
    @observable caseDetailData = {
        "appId":1,
        "moduleId":1,
        "priority":2
    };
    @observable insertButtonStatus = "";
    @observable updateButtonStatus = "none";

    @observable tableRequestData = {
        "appId":1,
        "moduleId":1,
        "priority":2
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
     * 初始化查询表单
     * @returns {Promise<void>}
     */
    @action
    async initFormData(){
    }

    /**
     * 初始化table数据-用例管理
     * @param pageNo
     * @returns {Promise<void>}
     */
    @action
    async initData(pageNo) {
        debugger
        const params = {"query":{"apiId":this.tableRequestData.apiId,"appId":this.tableRequestData.appId,"creatorId":this.tableRequestData.creatorId,"id":this.tableRequestData.caseId,"moduleId":this.tableRequestData.moduleId,"name":this.tableRequestData.name,"pageNo":1,"pageSize":10,"tagId":this.tableRequestData.tagId}}
        const result = await post("1.0.0/hipac.api.test.case.queryCase",params)
        this.dataSource = result.data;
    }

    /**
     * 根据用例ID获取用例详细信息
     * @returns {Promise<void>}
     */
    @action
    async getDetailData() {
        var caseId = getUrlParam('caseId',window.location.search);
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
        debugger
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
        const params = {"arg0":{"apiId":apiId,"appId":this.caseDetailData.appId,"contextParamScript":this.caseDetailData.contextParamScript,"desc":this.caseDetailData.desc,"id":caseId,"moduleId":this.caseDetailData.moduleId,"name":this.caseDetailData.name,"paramScript":JSON.stringify(this.caseDetailData.paramScript),"postScript":"","preScript":"","priority":this.caseDetailData.priority,"tagIds":tagIds,"validScript":this.caseDetailData.validScript}}
        const result = await post("1.0.0/hipac.api.test.case.saveCase",params)
        debugger
        if(result.code == 200){
            message.success("保存用例成功")
            this.insertButtonStatus = "none"
            this.updateButtonStatus = ""
            addUrlParam('caseId',result.data)
        }
    }
}

export default new TestCaseManagerStore();
