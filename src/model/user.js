/*
 * @Author: yychang 
 * @Date: 2019-08-29 14:38:15 
 * @Last Modified by: yychang
 * @Last Modified time: 2019-08-30 09:54:36
 */

import { post } from '@/utils/http';

export const fetchUser = () => {
    return post('1.0.0/ustone.user.admin.getLoginUser/');
};

