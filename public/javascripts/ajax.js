/**
 * javascript:  ajax.js
 * about:       all.html
 * data:        16.10.04
 * author:      zhuxiankang
 * describe:    ajax请求函数
 */


function ajax() {
    function req(request) {
        var defered = $.Deferred();

        $.ajax(request)
            .done(function(data){
                defered.resolve(data);
            })
            .fail(function(){
                defered.reject();
            });

        return defered.promise();
    }

    return {
        //账号注册
        register: function(data) {
            return req({
                type: 'POST',
                url: '/user/register',
                data: data
            });
        }
    };
}
