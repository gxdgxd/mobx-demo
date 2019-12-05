import React  from 'react';
import { observable, action, extendObservable,toJS} from 'mobx';
import axios from 'axios';
import { message,Tag } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import {post} from '../../utils/http'
import {getUrlParam} from "../../utils/common";

class ApiManagerStore {
    @observable dataSource = [];
    @observable treeModalVisible = false;
    @observable creatorList = ['张三','李四'];
    @observable tags = [];
    @observable tagsSearch = [];
    @observable insertDataSource = [];
    @observable detailData = {};
    @observable totalCount = 0
    @observable pageSize = 0
    @observable pageNo = 0
    //查询条件
    @observable tableRequestData = {
        apiClassName:null,
        apiMethodName:null,
        id:null,
        creatorId:null,
        tagIds:null,
        "artifactId":"pay-api","groupId":"com.yangt.pay","version":"1.0.20"
    };
    @action
    changeTableRequestData(n,v){
        this.tableRequestData[n]=v;
    }
    @action
    changeDetailData(n,v){
        this.detailData[n]=v;
    }

    @action
    async initData(pageNo) {

        var testdata = {"query":{"apiClassName":this.tableRequestData.apiClassName,"apiMethodName":this.tableRequestData.apiMethodName,"appId":this.tableRequestData.appId,"creatorId":this.tableRequestData.creatorId,"id":this.tableRequestData.id,"moduleId":null,"pageNo":pageNo,"pageSize":10,"tagIds":this.tableRequestData.tagIds}}
        const result = await post("1.0.0/hipac.api.test.api.queryApi",testdata)

        console.log(result)
        this.dataSource = result.data;
        this.pageNo = result.pageNo;
        this.pageSize = result.pageSize;
        this.totalCount = result.totalCount;
    }

    /**
     * 接口管理 - 接口详情- 更新接口
     * @param data
     * @returns {Promise<void>}
     */
    @action
    async updateApi() {
        debugger
        const params = {"arg0":{"apiClassName":this.detailData.apiClassName,"apiMethodName":this.detailData.apiMethodName,"appId":1,"argsJsonFormat":this.detailData.argsJsonFormat,"argsTypeNames":this.detailData.argsTypeNames,"artifactId":this.detailData.artifactId,"creatorId":this.detailData.creatorId,"desc":this.detailData.desc,"groupId":this.detailData.groupId,"id":this.detailData.id,"moduleId":this.detailData.moduleId,"name":this.detailData.name,"resultJsonFormat":this.detailData.resultJsonFormat,"type":this.detailData.type}}
        const result = await post("1.0.0/hipac.api.test.api.saveApi",params)
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
        var testdata = {"gav":{"artifactId":"pay-api","groupId":"com.yangt.pay","version":"1.0.20"}}
        const result = await post("1.0.0/hipac.api.test.api.fetchApiByGAV",testdata)
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

        console.log(data)
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
        const params = {"saveForms":array,"gav":{"artifactId":this.tableRequestData.artifactId,"groupId":this.tableRequestData.groupId,"version":this.tableRequestData.version},"appId":1,"moduleId":1}
        const result = await post("1.0.0/hipac.api.test.api.batchAddApi",params)
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
        const result = await post("1.0.0/hipac.api.test.api.info",{id:apiID})
        this.detailData = result.data;
        let tags = []
        if(typeof result.data.tags != "undefined" && result.data.tags != null){
            tags = toJS(result.data.tags)
        }
        // this.tags = tags
        this.tags = [{"id":1,"value":'123'}]
    }

    @action
    hideTreeModal (){
        this.treeModalVisible = false;
    }

    @action
    showTreeModal (){
        debugger
        this.treeModalVisible = true;
    }
    @action
    saveTreeData(){
        this.treeModalVisible = false;
    }

    @action
    async insertTag(value) {
        const result = await post("1.0.0/hipac.api.test.tag.saveTag",{value:value})
        let obj = {'id':result.data,'value':value}
        this.tags.push(obj)
    }
}

export default new ApiManagerStore();
