/*
 * @Author: yychang 
 * @Date: 2019-10-25 12:14:02 
 * @Last Modified by: yychang
 * @Last Modified time: 2019-11-05 15:29:27
 * 
 * 全局环境变量配置
 */

import * as HR from '@yt/hop-request';

// 当前系统名称
const systemName = '接口自动化平台';
// 业务域，默认hipac，可选hipac、hiqingcang，根据域切换hop调用的域名
const bizDomain = 'hipac';

// 路由组件BrowserRouter的参数
const basename = '';

// 退出登录以及登录时需要在url上携带的参数，用于应用鉴权
// 以下参数后台应用通用，无登录权限限制，如果你的系统有登录权限需求，可以找用户组申请其他appCode
const appCode = 'hioa_platform';
const appSign = '6c66522303e51aedb1c3bc6125e0e768';
const loginCode = `&app=${appCode}&app_=${appSign}`;

// hop请求相关配置，新起应用appKey、secretKey可以找基础组申请
const appKey = '2020';
const secretKey = '569cba1ffb1d6e78ddd0205b754417d7';

// 未登录时，hop接口请求返回code值
const NO_LOGIN_SESSION_CODE = 9001006;

// 按需求修改，本地开发环境下会使用该值
const localhostEnv = 'master';
// hop请求的环境，本地开发环境下，使用自定义的localhostEnv值，生产环境使用HR内置的值
const env = process.env.NODE_ENV === 'development' ? localhostEnv : HR.get('env');

const envMap = (_env) =>  {
    const domainConfig = {
        loginDomain: 'login.hipac.cn',
        hioaDomain: 'hioa.yangtuojia.com',
        kfDomain: 'kf.hipac.cn',
        crmDomain: 'iwork.hipac.cn',
        icmDomain: 'icm.hipac.cn',
        dataDomain: 'data.hipac.cn',
    };

    for (const key of Object.keys(domainConfig)) {
        const domain = domainConfig[key];

        // 特殊处理loginDomain，hione环境下始终使用master域名
        if (key === 'loginDomain' && _env !== 'pre' && _env !== 'prod') {
            domainConfig[key] = `//master-${domain}`;
        } else if (_env === 'prod') {
            domainConfig[key] = `//${domain}`;
        } else {
            domainConfig[key] = `//${_env}-${domain}`;
        }
    }

    return domainConfig;
};
 
const domainConfig = envMap(env);

export {
    env,
    systemName,
    bizDomain,
    basename,
    domainConfig,
    appCode,
    appSign,
    loginCode,
    appKey,
    secretKey,
    NO_LOGIN_SESSION_CODE
};
