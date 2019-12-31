import { observable, action, extendObservable } from 'mobx';
import axios from 'axios';
import {post} from '../../utils/http'
import {message} from "antd/lib/index";


class TreeManagerStore {

    @observable treeAppDataSource = []
    @observable treeMoudleDataSource = []
    @observable treeModalVisible = false;
    @observable detailData = {}
    @observable modalName = ""


    @action
    hideTreeModal (){
        this.treeModalVisible = false;
    }
    @observable tableRequestData = {
        "name":"",
    };
    @action
    changeTableRequestData(n,v){
        this.tableRequestData[n]=v;
    }

    @action
    showTreeModal (params){
        this.treeModalVisible = true;
        this.tableRequestData = {
            "parentId":params.parentId,
            "appId":params.appId,
            "appName":params.appName
        }
        this.modalName = "添加模块"
        if(params.type == "update"){
            this.tableRequestData = {
                "parentId":params.parentIdF,
                "appId":params.appId,
                "name":params.name,
                "id":params.id
            }
            this.modalName = "修改模块"
        }
    }


    @action
    async getTreeAppDataSouce(){
        const appResult = await post("1.0.0/hipac.api.test.module.apps/",{})
        let data = appResult.data
        let array = []
        for (let i = 0; i < data.length; i++) {
            let obj = {}
            obj.title = data[i].name
            obj.id = data[i].id
            obj.appId = data[i].id
            obj.parentId = 0
            obj.parentIdF = data[i].parentId
            obj.appName = data[i].name
            array.push(obj)
        }
        this.treeAppDataSource = array;
    }

    @action
    async getTreeModuleDataSouce(item){
        console.log('item', item);
        const moduleResult = await post("1.0.0/hipac.api.test.module.findByAppIdAndParentId/",{"appId":item.appId,"parentId":item.parentId})
        let data = moduleResult.data
        let array = []
        for (let i = 0; i < data.length; i++) {
            let obj = {}
            obj.title = data[i].name
            obj.appId = data[i].appId
            obj.id = data[i].id
            obj.parentId = data[i].id
            obj.parentIdF = data[i].parentId
            obj.moduleId = data[i].id
            obj.moduleName = data[i].name
            obj.appName = item.appName
            array.push(obj)
        }

        console.log("array:",array)
        // return array
        item.children = array;
        this.treeAppDataSource = [...this.treeAppDataSource];
        console.log("treeAppDataSource:",this.treeAppDataSource)
    }

    @action
    async insertTreeModule(){
        debugger
        const result = await post("1.0.0/hipac.api.test.module.save/",{"arg0":{"appId":this.tableRequestData.appId,"id":this.tableRequestData.id,"name":this.tableRequestData.name,"parentId":this.tableRequestData.parentId}})
        if(result.code == 200){
            message.success("保存模块成功")

            console.log("appID:",this.tableRequestData.appId)
            await this.getTreeModuleDataSouce({'appId':this.tableRequestData.appId,"parentId":this.tableRequestData.parentId,"appName":this.tableRequestData.appName})
            this.hideTreeModal()
        }
    }

    /**
     * 删除tree
     * @param id
     * @returns {Promise<void>}
     */
    @action
    async deleteTree(id,appId,parentId) {
        debugger
        const result = await post("1.0.0/hipac.api.test.module.del/",{id:id})

        if(result.code == "200"){
            message.success('删除模块成功');
        }
        // this.getTreeAppDataSouce()
        this.getTreeModuleDataSouce({'appId':appId,"parentId":parentId})
        this.hideTreeModal()
    }

}

export default new TreeManagerStore();
