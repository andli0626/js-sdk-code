/*声明：
        为了方便读者朋友，这里省略配置环境
 */

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

        //获取“分享给朋友”按钮点击状态及自定义分享内容接口
        if(shareList.onMenuShareAppMessage){
            var ParametersAppMessage = shareList.onMenuShareAppMessage;
            wx.onMenuShareAppMessage({
                title: ParametersAppMessage.title, // 分享标题
                desc: ParametersAppMessage.desc, // 分享描述
                link: ParametersAppMessage.link, // 分享链接
                imgUrl: ParametersAppMessage.imgUrl, // 分享图标
                type: ParametersAppMessage.type, // 分享类型,music、video或link，不填默认为link
                dataUrl:  ParametersAppMessage.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                    ParametersAppMessage.success && ParametersAppMessage.success();
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    ParametersAppMessage.cancel && ParametersAppMessage.cancel();
                }
            });
        }

        //获取“分享到QQ”按钮点击状态及自定义分享内容接口
        if(shareList.onMenuShareQQ){
            var ParametersQQ = shareList.onMenuShareQQ;
            wx.onMenuShareQQ({
                title: ParametersQQ.title, // 分享标题
                desc: ParametersQQ.desc, // 分享描述
                link: ParametersQQ.link, // 分享链接
                imgUrl: ParametersQQ.imgUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    ParametersQQ.success && ParametersQQ.success();
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    ParametersQQ.cancel && ParametersQQ.cancel();
                }
            });
        }

        //获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
        if(shareList.onMenuShareWeibo){
            var ParametersWeibo = shareList.onMenuShareWeibo;
            wx.onMenuShareWeibo({
                title: ParametersWeibo.title, // 分享标题
                desc: ParametersWeibo.desc, // 分享描述
                link: ParametersWeibo.link, // 分享链接
                imgUrl: ParametersWeibo.imgUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    ParametersWeibo.success && ParametersWeibo.success();
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    ParametersWeibo.cancel && ParametersWeibo.cancel();
                }
            });
        }

    }else{
        console.log("抱歉，wx没有初始化完毕，请等待wx初始化完毕，再调用分享服务。");
    }

}

//成功初始化后执行api 分享事务
wxJSSDK.readySuccessCall.push(function(){
    var title = "HTML5外包，HTML5外包，HTML5是我们的生活，值得信赖的HTML5解决方案提供商！",
        link = "http://www.html5waibao.com",
        imgUrl = "http://www.html5waibao.com/images/logo_35.png",
        desc = "html5外包,HTML5外包,html5外宝,html5活,html5手机网站",
        success = function(){
            alert("分享成功回调");
        },
        cancel = function(){
            alert("分享失败回调");
        };
    wxJSSDK.shareApi({
        onMenuShareTimeline : {//分享到朋友圈
            title: title, // 分享标题
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                success();

            },
            cancel: function () {
                cancel();

            }
        },
        onMenuShareAppMessage:{
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            type: "link", // 分享类型,music、video或link，不填默认为link
            dataUrl:  "", // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                success();
            },
            cancel: function () {
                cancel();
            }
        },
        onMenuShareQQ:{
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                success();
            },
            cancel: function () {
                cancel();
            }
        },
        onMenuShareWeibo:{
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                success();
            },
            cancel: function () {
                cancel();
            }
        }
    });
});

