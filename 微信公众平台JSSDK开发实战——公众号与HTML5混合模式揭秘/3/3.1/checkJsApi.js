/*声明：
        为了方便读者朋友，这里省略配置环境
 */

/*
 函数名称：wxJSSDK.checkJsApi
 函数功能：为wxJSSDK增加基础检测服务
 参数：
    jsApiList（Array） 必选项，待检测的API列表
    back（Function）可选项，检测API回调
 */
wxJSSDK.checkJsApi = function(jsApiList, back){
    if(jsApiList && jsApiList.length === 0){
        console.log("抱歉，缺少需要检测的API列表。");
        return this;
    }
    if(wxJSSDK.isReady){//wxJSSDK.isReady 查看微信JSSDK是否初始化完毕
        wx.checkJsApi({// 需要检测的JS接口列表，所有JS接口列表见附录2,
            jsApiList: jsApiList,
            success: function(res) {
                /*
                 结果以键值对的形式返回，可用的api值true，不可用为false
                 */
                back && back(res);
            }
        });
    }else{
        console.log("抱歉，wx没有初始化完毕，请等待wx初始化完毕，再调用检测API服务。");
    }

}

//成功初始化后执行api检测事务
wxJSSDK.readySuccessCall.push(function(){
    wxJSSDK.checkJsApi([
        'onMenuShareTimeline',
        'chooseImage'
    ],function(res){
        //检测结果请查看图示3.1
        alert(JSON.stringify(res));
    })
});

