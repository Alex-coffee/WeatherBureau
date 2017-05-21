function authService($cookies){

    var getAuthorizedUser = function(){
        var existing_cookie_user = $cookies.get('userInfo');
        return existing_cookie_user;
    }

    var userAuthorize = function(item){
        $cookies.put('userInfo', item.USER_LOGIN_ATTRIBUTE);
        $cookies.put('jsessionid', item.jsessionid);
    }

    var userInvalid = function(){
        $cookies.remove('userInfo');
        $cookies.remove('jsessionid');
    }

    var getJSessionId = function(){
        return $cookies.get('jsessionid');
    }

    return{
        getAuthorizedUser: getAuthorizedUser,
        userAuthorize: userAuthorize,
        userInvalid: userInvalid,
        getJSessionId: getJSessionId
    }
}

angular
.module('piApp')
.factory('authService', authService);

