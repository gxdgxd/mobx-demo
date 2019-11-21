import { observable, action, extendObservable } from 'mobx';
import axios from 'axios';
import { message } from 'antd';


class SceneManagerStore {
    @observable dataSource = [];
    @observable detailModalVisible = false;
    //查询条件
    @observable tableRequestData = {

    };

    @action
    async initFormData(){

    }
    @action
    async initData(pageNo) {

        this.dataSource = [
            {
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区',
            },
            {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区',
            },
        ];
    }

    @action
    async updateDetailData(record,type) {
        console.log("updateDetailData:" + record)
        this.detailModalVisible = true;
    }

    @action
    async update(data) {
        this.detailModalVisible = false;
    }

    @action
    hideModal (type){
        this.detailModalVisible = false;
    }
}

export default new SceneManagerStore();
