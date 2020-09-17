$(function () {
    var layer = layui.layer;
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 上传按钮 绑定点击事件
    $("#btnChooseImage").on('click', function () {
        $("#file").click();
    })

    $("#file").on("change", function (e) {
        // 获取用户选择的文件
        var files = e.target.files;
        if (files.length === 0) {
            return layer.msg('请选择想要上传的文件')
        }
        // 拿到用户选择的文件
        var file = e.target.files[0];
        // 把文件转换成路径
        var imgURl = URL.createObjectURL(file);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURl) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    $("#btnUpload").click(function () {
        // 1. 要拿到用户裁剪之后的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // 2. 调用接口，把头像上传到服务器
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('头像更新失败')
                }

                layer.msg('头像更新成功');
                window.parent.getUserInfo();
            }

        })
    })
})