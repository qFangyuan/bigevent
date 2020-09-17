$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度在1-6个字符之间'
            }
        }
    })

    // 获取用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('用户信息获取失败')
                }
                form.val('formUserInfo', res.data);
            }
        })
    }
    initUserInfo();

    // 重置按钮

    $("#btnReset").on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    });

    // 提交修改
    $(".layui-form").on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改信息失败')
                }
                console.log(res);
                layer.msg('修改信息成功')
                window.parent.getUserInfo();
            }
        })
    })
})