import { observable, action, extendObservable } from 'mobx';
import axios from 'axios';
import { message } from 'antd';
import {getUrlParam,replaceUrlParamVal,removeUrlParam} from '../../utils/common'
import {post} from '../../utils/http'


class TestCaseManagerStore{
    @observable dataSource = [];
    @observable totalCount = 0
    @observable pageSize = 0
    @observable pageNo = 0
    @observable treeParams = {'appId':'','moduleId':''}
    @observable exeCaseModalVisible = false
    @observable drawerVisible = false
    @observable caseIds = []
    @observable caseDetailData = {

    };
    @observable insertButtonStatus = "";
    @observable updateButtonStatus = "none";

    @observable tableRequestData = {

    };

    @action
    changeDetailData(n,v){
        this.caseDetailData[n]=v;
    }
    @action
    changeTableRequestData(n,v){
        this.tableRequestData[n] = v == "" ? undefined : v ;
    }

    /**
     * 初始化table数据-用例管理
     * @param pageNo
     * @returns {Promise<void>}
     */
    @action
    async initData(pageNo,appId,moduleId) {
        this.treeParams = {'appId':appId,'moduleId':moduleId}
        let apiId = getUrlParam('apiId',window.location.search);
        if(apiId != ""){
            this.tableRequestData.apiId = apiId
        }
        const params = {"query":{"priority":this.tableRequestData.priority,"creatorId":this.tableRequestData.creatorId,"apiId":this.tableRequestData.apiId,"appId":this.treeParams.appId,"moduleId":this.treeParams.moduleId,"name":this.tableRequestData.name,"pageNo":pageNo,"pageSize":10,"tagId":this.tableRequestData.tagId}}
        console.log(JSON.stringify(params))
        const result = await post("1.0.0/hipac.api.test.case.queryCase/",params)
        this.dataSource = result.data;
        this.pageNo = result.pageNo;
        this.pageSize = result.pageSize;
        this.totalCount = result.totalCount;
        removeUrlParam("apiId")
    }

    /**
     * 根据用例ID获取用例详细信息
     * @returns {Promise<void>}
     */
    @action
    async getDetailData() {
        let caseId = getUrlParam('caseId',window.location.search);
        const result = await post("1.0.0/hipac.api.test.case.caseInfo/",{id:caseId})
        this.caseDetailData = result.data;
        this.insertButtonStatus = "none"
        this.updateButtonStatus = ""
    }

    /**
     * 添加用例/修改用例/复制
     * @returns {Promise<void>}
     */
    @action
    async insert(tags,apiDetailData,value) {
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
        const params = {"arg0":{"apiId":apiId,"appId":apiDetailData.appId,"contextParamScript":this.caseDetailData.contextParamScript,"desc":this.caseDetailData.desc,"id":caseId,"moduleId":apiDetailData.moduleId,"name":this.caseDetailData.name,"paramScript":this.caseDetailData.paramScript,"priority":this.caseDetailData.priority,"validScript":this.caseDetailData.validScript}}
        const result = await post("1.0.0/hipac.api.test.case.saveCase/",params)
        if(result.code == 200){
            if(value == true){
                message.success("保存用例成功")
            }
            this.insertButtonStatus = "none"
            this.updateButtonStatus = ""
            replaceUrlParamVal('caseId',result.data)
        }
    }

    /**
     * 执行用例和执行场景
     * @returns {Promise<void>}
     */
    @action
    async exeCase(data,type){
        if(data.env == ""){
            message.warn("请输入dubbo分组再测试！")
            return
        }
        let caseIds = []
        if(type == "scene"){
            let testCaseSchedules = data.testCaseSchedules
            let caseIds = []
            for (let i = 0; i < testCaseSchedules.length ; i++) {
                caseIds.push(testCaseSchedules[i].testCaseId)
            }
        }else if(type == "case"){
            caseIds = data.caseIds
        }
        let params =  {"sceneId":data.id,"caseIds":caseIds,"scheduleType":data.scheduleType,"env":data.env}

        const result = await post("1.0.0/hipac.api.test.exe.apply/",params)
        // if(result.code == 200){
        //     message.success("已经开始执行，请前往执行记录中查看用例执行情况")
        // }
        return result
    }

    @action
    showExeCaseModal(caseIds){
        this.caseIds = caseIds
        this.exeCaseModalVisible = true;
    }

    @action
    hideExeCaseModal(){
        this.exeCaseModalVisible = false
    }

    @action
    showCaseDrawer(){
        this.drawerVisible = true;
    }

    @action
    hideCaseDrawer(){
        debugger
        this.drawerVisible = false
    }
}

export default new TestCaseManagerStore();
