import { observable, action, extendObservable } from 'mobx';
import axios from 'axios';
import { message } from 'antd';


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
