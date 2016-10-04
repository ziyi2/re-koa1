/**
 * javascript:  user.js
 * about:       register.html,login.html
 * data:        16.10.04
 * author:      zhuxiankang
 * describe:    用户请求登录等
 */



$(function() {

    /**
     * describe: 账号注册表单提交
     * data:     16.10.04
     * author:   zhuxiankang
     * parm:     event
     */
    $('#register').click(function(event){
        event.preventDefault();     //阻止默认的表单提交submit方法
        var user = {
            username:$('#register_username').val(),
            password:$('#register_password').val(),
            email:$('#register_email').val()
        };

        //省略校验步骤


        ajax().register(user).then(
            function(data) {
                console.log(data);
            }
        )

    });











});