function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // 设置请求头信息
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg("获取用户信息失败")
            }
            renderAvatar(res.data)
        },
        // 无论接口请求成功还是失败  都会执行该函数
        // complete: function (res) {
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token');
        //         location.href = '/login.html';
        //     }

        // }

    })
}
//  渲染用户头像
getUserInfo()

function renderAvatar(user) {
    var name = user.username || user.nickname;
    $("#welcome").html("欢迎&nbsp&nbsp" + name);
    $("#uname").text(name);
    if (user.user_pic !== null) {
        $(".text-avatar").hide();
        $(".layui-nav-img").attr("src", user.user_pic).show();
    } else {
        $(".layui-nav-img").hide();
        var first = name[0].toUpperCase();
        $(".text-avatar").html(first).show();
    }

}
var layer = layui.layer;
$("#btnlogout").click(function () {
    console.log(111);
    layer.confirm('确定退出？', {
        icon: 3,
        title: '提示'
    }, function (index) {
        localStorage.removeItem('token');
        location.href = '/login.html';
        layer.close(index);
    })
})