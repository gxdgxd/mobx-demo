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
    @observable item = {}
    @observable parentId = ""

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
        this.item = params.item
        this.modalName = "添加模块"
        this.parentId = params.parentId
        if(params.type == "update"){
            this.tableRequestData = {
                "name":params.item.name,
                "id":params.item.id
            }
            this.modalName = "修改模块"
        }else{
            this.tableRequestData = {
                "name":"",
                "id":""
            }
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
            obj.parentIdF = 0
            obj.appName = data[i].name
            array.push(obj)
        }
        this.treeAppDataSource = array;
    }

    @action
    async getTreeModuleDataSouce(item,parentId){
        console.log('item', item);
        const moduleResult = await post("1.0.0/hipac.api.test.module.findByAppIdAndParentId/",{"appId":item.appId,"parentId":parentId})
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
        let appId = this.item.appId
        let parentId = this.item.id
        if(typeof this.item.appId == "undefined"){
            appId = this.item.id
            parentId = 0
        }
        if(this.modalName == "修改模块"){
            const result = await post("1.0.0/hipac.api.test.module.save/",{"arg0":{"appId":appId,"id":this.tableRequestData.id,"name":this.tableRequestData.name}})
            if(result.code == 200){
                message.success("保存模块成功")
            }
        }else{
            const result = await post("1.0.0/hipac.api.test.module.save/",{"arg0":{"appId":appId,"name":this.tableRequestData.name,"parentId":parentId}})
            if(result.code == 200){
                message.success("保存模块成功")
            }
        }
        this.getTreeData()
        this.hideTreeModal()
    }

    /**
     * 删除tree
     * @param id
     * @returns {Promise<void>}
     */
    @action
    async deleteTree(item) {
        this.item = item
        const result = await post("1.0.0/hipac.api.test.module.del/",{id:this.item.id})

        if(result.code == "200"){
            message.success('删除模块成功');
            this.getTreeData()
        }
    }

    @action
    async getTreeData() {
        const result = await post("1.0.0/hipac.api.test.module.all/",{})
        let data = result.data
        this.treeAppDataSource = data;

    }

}

export default new TreeManagerStore();
