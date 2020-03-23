import React  from 'react';
import { observable, action, extendObservable,toJS} from 'mobx';
import axios from 'axios';
import { message,Tag } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import {post} from '../../utils/http'
import {getUrlParam,removeUrlParam} from "../../utils/common";

class ApiManagerStore {
    @observable dataSource = [];
    @observable tags = [];
    @observable insertDataSource = [];
    @observable detailData = {};
    @observable totalCount = 0
    @observable pageSize = 0
    @observable pageNo = 0
    @observable treeParams = {'appId':'','moduleId':'','appName':'','moduleName':''}
    @observable treeModalVisible = false
    //查询条件
    @observable tableRequestData = {
        apiClassName:null,
        apiMethodName:null,
        id:null,
        creatorId:null,
        tagIds:null,
        // "artifactId":"pay-api","groupId":"com.yangt.pay","version":"1.0.20"
    };
    @action
    changeTableRequestData(n,v){
        this.tableRequestData[n] = v == "" ? undefined : v ;
    }
    @action
    changeDetailData(n,v){
        this.detailData[n]=v;
    }

    @action
    async initData(pageNo,appId,moduleId) {
        debugger
        if(typeof appId != "undefined" || typeof moduleId != "undefined"){
            this.treeParams = {'appId':appId,'moduleId':moduleId}
        }
        let apiId = getUrlParam('apiId',window.location.search);
        if(apiId != ""){
            this.tableRequestData.id = apiId
        }
        var testdata = {"query":{"name":this.tableRequestData.name,"creatorId":this.tableRequestData.creatorId,"apiMethodName":this.tableRequestData.apiMethodName,"appId":this.treeParams.appId,"id":this.tableRequestData.id,"moduleId":this.treeParams.moduleId,"pageNo":pageNo,"pageSize":10,"tagId":this.tableRequestData.tagId}}
        const result = await post("1.0.0/hipac.gotest.api.queryApi/",testdata)

        console.log(result)
        this.dataSource = result.data;
        this.pageNo = result.pageNo;
        this.pageSize = result.pageSize;
        this.totalCount = result.totalCount;
        removeUrlParam("apiId")
    }

    /**
     * 接口管理 - 接口详情- 更新接口
     * @param data
     * @returns {Promise<void>}
     */
    @action
    async updateApi() {
        debugger
        console.log(this.tags)
        let tags = this.tags
        let tagIds = []
        for (let i = 0; i < tags.length; i++) {
            tagIds.push(tags[i].id)
        }
        const params = {"arg0":{"tagIds":tagIds,"apiClassName":this.detailData.apiClassName,"apiMethodName":this.detailData.apiMethodName,"appId":this.detailData.appId,"argsJsonFormat":this.detailData.argsJsonFormat,"argsTypeNames":this.detailData.argsTypeNames,"artifactId":this.detailData.artifactId,"creatorId":this.detailData.creatorId,"desc":this.detailData.desc,"groupId":this.detailData.groupId,"id":this.detailData.id,"moduleId":this.detailData.moduleId,"name":this.detailData.name,"resultJsonFormat":this.detailData.resultJsonFormat,"type":this.detailData.type}}
        const result = await post("1.0.0/hipac.gotest.api.saveApi/",params)
        console.log(result)
        if(result.code == 200){
            message.success("修改接口成功")
        }
    }

    /**
     * 添加接口界面的接口搜索，根据artifactId、groupId、version
     * @param data： {artifactId、groupId、version}
     * @returns {Promise<void>}
     */
    @action
    async fetchApiByGAV(pageNo){
        // var testdata = {"gav":{"artifactId":"pay-api","groupId":"com.yangt.pay","version":"1.0.20"}}
        let testdata = {"gav":{"artifactId":this.tableRequestData.artifactId,"groupId":this.tableRequestData.groupId,"version":this.tableRequestData.version}}
        const result = await post("1.0.0/hipac.gotest.api.fetchApiByGAV/",testdata)
        const result_data = result.data;
        let array = []
        for (let i = 0; i < result_data.length ; i++) {
            let obj = {}
            obj.key = i
            obj.argsTypeNames = result_data[i].argsTypeNames
            obj.apiMethodName = result_data[i].apiMethodName
            obj.groupId = result_data[i].groupId
            obj.creatorName = result_data[i].creatorName
            obj.creatorId = result_data[i].creatorId
            obj.editTime = result_data[i].editTime
            obj.type = result_data[i].type
            obj.tags =  result_data[i].tags
            obj.apiClassName = result_data[i].apiClassName
            obj.createTime = result_data[i].createTime
            obj.resultJsonFormat = result_data[i].resultJsonFormat
            obj.appId = result_data[i].appId
            obj.name = result_data[i].name
            obj.argsJsonFormat = result_data[i].argsJsonFormat
            obj.artifactId = result_data[i].artifactId
            obj.id = result_data[i].id
            obj.moduleId = result_data[i].moduleId
            obj.desc = result_data[i].desc
            obj.argsTypeNames = result_data[i].argsTypeNames
            array.push(obj)
        }
        this.insertDataSource = array;
    }

    /**
     * 添加接口和批量添加接口
     * @param data
     * @returns {Promise<void>}
     */
    @action
    async insertApi(data){
        debugger
        if(this.treeParams.appId == "" || this.treeParams.moduleId == ""){
            message.warn("请在左侧树状菜单中选择该接口归属的应用和模块")
            return
        }
        if(typeof this.treeParams.moduleId == "undefined"){
            message.warn("请在左侧树状菜单中选择该接口归属的模块")
            return
        }
        var array = []
        for (let i = 0; i < data.length; i++) {
            if(data[i].name == "" || data[i].name == null){
                message.warn("接口名不允许为空！")
                return
            }
            var obj = {}
            obj.apiClassName = data[i].apiClassName
            obj.apiMethodName = data[i].apiMethodName
            obj.argsTypeNames = data[i].argsTypeNames
            obj.desc = data[i].desc
            obj.name = data[i].name
            obj.type = data[i].type
            array.push(obj)
        }

        const params = {"saveForms":array,"appId":this.treeParams.appId,"moduleId":this.treeParams.moduleId,"gav":{"artifactId":this.tableRequestData.artifactId,"groupId":this.tableRequestData.groupId,"version":this.tableRequestData.version}}
        const result = await post("1.0.0/hipac.gotest.api.batchAddApi/",params)
        console.log(result)
        if(result.code == 200){
            message.success("添加接口成功")
        }
    }

    /**
     * 接口管理界面获取接口详情
     * @param record
     * @returns {Promise<void>}
     */
    @action
    async getApiDetailData() {
        var apiID = getUrlParam('apiID',window.location.search);
        const result = await post("1.0.0/hipac.gotest.api.info/",{id:apiID})
        this.detailData = result.data;
        let tags = []
        if(typeof result.data.tags != "undefined" && result.data.tags != null){
            tags = toJS(result.data.tags)
        }
        this.tags = tags
    }

    @action
    async setTreeParams(appId,moduleId,appName,moduleName) {
        this.treeParams = {'appId':appId,'moduleId':moduleId,'appName':appName,'moduleName':moduleName}
    }
    @action
    async setDetailDataTreeParams() {
        debugger
        if(this.treeParams.appId == ""){
            message.warn("请选择应用后再点击保存")
            return
        }
        if(typeof this.treeParams.moduleId == "undefined"){
            message.warn("只选中应用不行，还需要选择应用下的模块级别")
            return
        }
        this.detailData.appId =  this.treeParams.appId
        this.detailData.appName =  this.treeParams.appName
        this.detailData.moduleId =  this.treeParams.moduleId
        this.detailData.moduleName =  this.treeParams.moduleName
        this.hideTreeModal()
    }

    @action
    hideTreeModal(){
        this.treeModalVisible = false;
    }
    @action
    showTreeModal(){
        this.treeModalVisible = true;
    }
    @action
    async insertTags(tags){
        this.tags.push(tags)
    }
}

export default new ApiManagerStore();
