/*
 函数名称：wxJSSDK.shareApi
 函数功能：为wxJSSDK增加分享模块
 参数：
 shareList（Array） 必选项，待分享的API配置表
 */
wxJSSDK.shareApi = function(shareList){
    if(wxJSSDK.isReady){//wxJSSDK.isReady 查看微信JSSDK是否初始化完毕

        //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
        if(shareList.onMenuShareTimeline){
            var ParametersTimeline = shareList.onMenuShareTimeline;
            wx.onMenuShareTimeline({
                title: ParametersTimeline.title, // 分享标题
                link: ParametersTimeline.link, // 分享链接
                imgUrl: ParametersTimeline.imgUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    ParametersTimeline.success && ParametersTimeline.success();
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    ParametersTimeline.cancel && ParametersTimeline.cancel();
                }
            });
        }

    }else{
        console.log("抱歉，wx没有初始化完毕，请等待wx初始化完毕，再调用分享服务。");
    }

}

/*
 函数名称：wxJSSDK.imageApi
 函数功能：为wxJSSDK增加图像服务
 参数：
 imageApi 图像API Object 配置
 */
wxJSSDK.imageApi = function(imageApi){
    if(wxJSSDK.isReady){//wxJSSDK.isReady 查看微信JSSDK是否初始化完毕
        if(imageApi){

            imageApi.chooseImage && wx.chooseImage({//拍照或从手机相册中选图接口
                success: function (res) {
                    imageApi.chooseImage.success && imageApi.chooseImage.success(res);
                }
            });

            imageApi.previewImage && wx.previewImage({// 预览图片接口
                current: imageApi.previewImage.current, // 当前显示的图片链接
                urls: imageApi.previewImage.urls // 需要预览的图片链接列表
            });

            imageApi.uploadImage && wx.uploadImage({//上传图片接口
                localId: imageApi.uploadImage.localId, // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: imageApi.uploadImage.isShowProgressTips || 1, // 默认为1，显示进度提示
                success: function (res) {
                    imageApi.uploadImage.success && imageApi.uploadImage.success(res);
                }
            });

            imageApi.downloadImage && wx.downloadImage({//下载图片接口
                serverId:imageApi.downloadImage.serverId, // 需要下载的图片的服务器端ID，由uploadImage接口获得
                isShowProgressTips: imageApi.downloadImage.isShowProgressTips || 1, // 默认为1，显示进度提示
                success: function (res) {
                    imageApi.downloadImage.success && imageApi.downloadImage.success(res);
                }
            });
        }else{
            console.log("缺少配置参数");
        }
    }else{
        console.log("抱歉，wx没有初始化完毕，请等待wx初始化完毕，再调用图像接口服务。");
    }

}

window.onload = function(){
    var chooseImageID,//拍照或从手机相册中选图接口
        shareImage,
        uploadImage = function(back){
            wxJSSDK.imageApi({//上传图片···
                uploadImage:{
                    localId:chooseImageID.toString(),
                    success:function(res){//临时access_token，上传图片成功之后，执行分享操作
                        shareImage = "http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=eQv3HPwEFxwsw8cyh5O7DjaNOoGd4d-jYtG_ZtmX8ZWr8np0Q5CqAox7lghNkNuiNHU8M6c9uW-YbwUYxkMywh_O3LCC18jbRvcaLjQuHq8&media_id="+res.serverId; // 返回图片的服务器端ID
                        back && back();
                    }
                }
            });
        },
        shareTimeline = function(){
            uploadImage(function(){
                wxJSSDK.shareApi({//分享图片···
                    onMenuShareTimeline : {//分享到朋友圈
                        title: "实例：从手机相册中选照片然后分享！", // 分享标题
                        link: 'http://weibo.com/xixinliang', // 分享链接
                        imgUrl: shareImage, // 分享图标
                        success: function () {

                        },
                        cancel: function () {

                        }
                    }
                });
            });
        };
    $("#chooseImage").click(function(){
        wxJSSDK.imageApi({
            chooseImage:{
                success:function(res){
                    chooseImageID =  res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    $("#imageContainer").html("<img style='width: 30%' src='"+chooseImageID+"'>");
                    $("#selectImg").html("已选择图片，请点击右上角分享到朋友圈按钮");
                    shareTimeline();
                }
            }
        });
    });
}

