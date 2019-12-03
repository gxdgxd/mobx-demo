import React  from 'react';
import { observable, action, extendObservable } from 'mobx';
import axios from 'axios';
import { message,Tag } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import {post} from '../../utils/http'

class ApiManagerStore {
    @observable dataSource = [];
    @observable treeModalVisible = false;
    @observable creatorList = ['张三','李四'];//创建人
    @observable tagList = [{"id":1,"value":"米粒专用"},{"id":2,"value":"主流程"}];
    @observable insertDataSource = [];
    @observable detailData = {};
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
    async initFormData(){

    }
    @action
    async initData(pageNo) {
        var testdata = {"query":{"apiClassName":this.tableRequestData.apiClassName,"apiMethodName":this.tableRequestData.apiMethodName,"appId":this.tableRequestData.appId,"creatorId":this.tableRequestData.creatorId,"id":this.tableRequestData.id,"moduleId":null,"pageNo":1,"pageSize":10,"tagIds":this.tableRequestData.tagIds}}
        const result = await post("1.0.0/hipac.api.test.api.queryApi",testdata)
        console.log(result)
        // this.dataSource = result.data;
        this.dataSource = [{
            id:1,
            tags:[{"id":1,"value":"米粒22专用"}],
            apiClassName:'abc',
            apiMethodName:'aaa',
            name:'abcaa'
        }]
        this.fetchApiByGAV({})
    }

    /**
     * 接口管理 - 接口详情- 更新接口
     * @param data
     * @returns {Promise<void>}
     */
    @action
    async update(data) {
        debugger
        console.log(data)
    }

    /**
     * 添加接口界面的接口搜索，根据artifactId、groupId、version
     * @param data： {artifactId、groupId、version}
     * @returns {Promise<void>}
     */
    @action
    async fetchApiByGAV(data){
        var testdata = {"gav":{"artifactId":"pay-api","groupId":"com.yangt.pay","version":"1.0.20"}}
        const result = await post("1.0.0/hipac.api.test.api.fetchApiByGAV",testdata)
        const result_data = result.data;
        // let array = [{id:1,apiClassName:'111',tags:['Unremovable', 'Tag 2', 'Tag 3']}]
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
        console.log(JSON.stringify(params))
        debugger
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
    async getDetailData(record) {
        console.log("getDetailData:" + record)
        this.detailData = record;
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
}

export default new ApiManagerStore();
