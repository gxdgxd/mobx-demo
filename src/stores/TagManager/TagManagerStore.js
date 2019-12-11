import { observable, action, extendObservable } from 'mobx';
import axios from 'axios';
import {post} from '../../utils/http'
import {toJS} from "mobx/lib/mobx";


class TagManagerStore {
    @observable tags = [];

    @action
    async postInsertTag(value) {
        return await post("1.0.0/hipac.api.test.tag.saveTag",{value:value})
    }


}

export default new TagManagerStore();
