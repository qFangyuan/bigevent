$(function () {
    $("#link_reg").on('click', function () {
        $(".login-box").hide();
        $(".reg-box").show();
    })
    $("#link_login").on('click', function () {
        $(".reg-box").hide();
        $(".login-box").show();
    });
    // 从layui中获取form对象
    var form = layui.form;
    // 主要用于弹出层
    var layer = layui.layer;
    //自定义表单验证；
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $(".reg-box [name=password]").val();
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 注册功能
    $("#form-reg").on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $("#form-reg [name=username]").val(),
            password: $("#form-reg [name=password]").val()
        };
        $.post("/api/reguser", data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message + "请登录");
            $("#link_login").click();
        })
    })
    // 登录功能
    $("#from-login").on('submit', function (e) {
        e.preventDefault();
        $.post("/api/login", $(this).serialize(), function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            // 把令牌保存到本地；
            localStorage.setItem('token', res.token);
            location.href = "/index.html";
        })
    })


})