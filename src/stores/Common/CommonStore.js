import { observable, action, extendObservable } from 'mobx';
import axios from 'axios';
import {post} from '../../utils/http'
import {toJS} from "mobx/lib/mobx";


class CommonStore {
    @observable allTags = [];
    @observable allCreators = []
    @observable treeAppDataSource = []
    @observable treeMoudleDataSource = []

    /**
     * 获取所有标签列表
     * @returns {Promise<void>}
     */
    @action
    async getAllTags(){
        const result = await post("1.0.0/hipac.gotest.tag.all/",{})
        this.allTags = result.data;
    }

    /**
     * 获取所有小二用户
     * @returns {Promise<void>}
     */
    @action
    async getAllCreators(realName){
        const result = await post("1.0.0/hipac.gotest.user.query/",{"realName":realName})
        this.allCreators = result.data;
    }


}

export default new CommonStore();
