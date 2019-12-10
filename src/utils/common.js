export function getUrlParam(key, strURL){
    return getUrlParamDefault(key, strURL, "");
}
export function getUrlParamDefault(key, strURL, defaultVal){
    strURL = strURL || window.location.search;
    return new RegExp( "(^|\\?|&)" + key + "=([^&]*)(\\s|&|$)", "i" ).test( strURL ) ?
        decodeURIComponent( RegExp.$2.replace( /\+/g, " " ) ) : defaultVal;
}

export function addUrlParam(paramName,value) {
    var nUrl = addUrlParamTo(window.location.href, paramName, value);
    window.history.replaceState({},"", nUrl);
}

export function addUrlParamTo(url, paramName, value) {
    var currentUrl = url.split('#')[0];
    if (/\?/g.test(currentUrl)) {
        if (/paramName=[-\w]{4,25}/g.test(currentUrl)) {
            currentUrl = currentUrl.replace(/paramName=[-\w]{4,25}/g, paramName + "=" + value);
        } else {
            currentUrl += "&" + paramName + "=" + value;
        }
    } else {
        currentUrl += "?" + paramName + "=" + value;
    }
    var nUrl = "";
    if (url.split('#')[1]) {
        nUrl = currentUrl + '#' + url.split('#')[1];
    } else {
        nUrl = currentUrl;
    }
    return nUrl;
}

export function removeUrlParam(paramName) {
    var nUrl = removeUrlParamFrom(window.location.href.toString(), paramName);
    window.history.replaceState({},"", nUrl);
}

function removeUrlParamFrom(url, paramName) {
    var oUrl = url;
    var re=eval('/(\&'+ paramName+'=)([^&]*)/gi');
    var nUrl = "";
    for(var i=0;i<5;i++){
        nUrl = oUrl.replace(re,"");
        oUrl = nUrl;
    }
    re=eval('/('+ paramName+'=)([^&]*\)/gi');
    nUrl = oUrl.replace(re,"");
    return nUrl;
}


