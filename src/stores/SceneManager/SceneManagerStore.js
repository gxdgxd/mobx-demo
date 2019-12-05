import { observable, action, extendObservable } from 'mobx';
import axios from 'axios';
import { message } from 'antd';
import {post} from '../../utils/http'


class SceneManagerStore {
    @observable dataSource = [];
    @observable insertDataSource = [];
    @observable insertCaseModalVisible = false;
    //查询条件
    @observable tableRequestData = {

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

        this.dataSource = [
            {
                key: '1',
                id: '胡彦斌',
                name: 32,
                env: '西湖区',
            }
        ];

        this.insertDataSource = [
            {
                key: '1',
                id: '胡彦斌',
                name: 32,
                apiMethodName: '西湖区',
            },
            {
                key: '2',
                id: '胡彦dddd斌',
                name: 32,
                apiMethodName: '西22湖区',
            }
        ]


    }
    @action
    async deleteScene(){

    }

    @action
    showInsertCaseModal(){
        this.insertCaseModalVisible = true;
    }
}

export default new SceneManagerStore();
