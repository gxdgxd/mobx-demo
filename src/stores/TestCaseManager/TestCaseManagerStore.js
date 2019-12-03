import { observable, action, extendObservable } from 'mobx';
import axios from 'axios';
import { message } from 'antd';


class TestCaseManagerStore {
    @observable dataSource = [];

    //查询条件
    @observable tableRequestData = {

    };

    /**
     * 初始化查询表单
     * @returns {Promise<void>}
     */
    @action
    async initFormData(){
    }

    /**
     * 初始化table数据
     * @param pageNo
     * @returns {Promise<void>}
     */
    @action
    async initData(pageNo) {

        this.dataSource = [
            {
                key: '1',
                id: 1,
                appName: 32,
                name:'用例名称',
                apiMethodName: '西湖区',
                priority:1,
                creatorName:"陶燕粉",
                editTime:'2019/01/10 12:00:00',
                paramScript:'abcd',
                validScript:'result != null  && result.data != null && result.data.size() > 0 && result.data.id == $p.result.id'
            }
        ];
    }

}

export default new TestCaseManagerStore();
