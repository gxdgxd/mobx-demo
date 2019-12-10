/*
 * @Author: yychang 
 * @Date: 2019-10-25 12:06:00 
 * @Last Modified by: yychang
 * @Last Modified time: 2019-11-04 18:05:53
 * 
 * 请求相关工具方法
 */

import { message } from 'antd';
import * as HR from '@yt/hop-request';
import { 
    domainConfig, 
    NO_LOGIN_SESSION_CODE, 
    appKey, 
    secretKey,
    loginCode, 
    bizDomain,
    env 
} from '@/config/env';

// 前往登录页
export const goLogin = () => {
    const encodedHref = encodeURIComponent(window.location.href);

    window.location.replace(`${domainConfig.loginDomain}/sso/login.do?returnURL=${encodedHref}${loginCode}`);
};

// 初始化hop请求
export const initHttp = () => {
    // 全局错误请求的回调
    const onReject = (error) => {
        let msg = '请求错误，请重试';

        if (error && error.data && error.data.code === NO_LOGIN_SESSION_CODE) {
            goLogin();
            return;
        }

        if (error && error.data && error.data.message) {
            msg = error.data.message;
        }

        message.error(msg);
    };

    HR.set({
        // 仅本地开发环境，使用自定义的env
        //forceEnv: process.env.NODE_ENV === "development" ? env : undefined,
        domain: bizDomain,
        appKey,
        secretKey,
        onSuccess: (data) => {
            return data;
        },
        onReject,
    });

    window.HRDevtool && window.HRDevtool.showPopup(env);
};

// hop统一使用post请求
export const post = (url, data, options = {}) => {
    return HR.request({ url, data, method: 'POST', ...options });
};