/*
 函数名称：wxJSSDK.weChatShopApi
 函数功能：为wxJSSDK增加微信小店服务
 参数：
 weChatShopApi 微信小店API Object 配置
 */
wxJSSDK.weChatShop = function(weChatShopApi){
    if(wxJSSDK.isReady){//wxJSSDK.isReady 查看微信JSSDK是否初始化完毕
        if(weChatShopApi){
            weChatShopApi.openProductSpecificView && wx.openProductSpecificView({
                productId: weChatShopApi.openProductSpecificView.productId || "", // 商品id
                viewType: weChatShopApi.openProductSpecificView.viewType || '0' // 0.默认值，普通商品详情页1.扫一扫商品详情页2.小店商品详情页
            });


        }else{
            console.log("缺少配置参数");
        }
    }else{
        console.log("抱歉，wx没有初始化完毕，请等待wx初始化完毕，再调用JSSDK接口服务。");
    }

}
window.onload = function(){
    $("#openProductSpecificView").click(function(){
        wxJSSDK.weChatShop({
            openProductSpecificView:{
                productId: 'pDF3iY_m2M7EQ5EKKKWd95kAxfNw', // 商品id，此处是参考商品id，会显示商品下架
                viewType: '' // 0.默认值，普通商品详情页1.扫一扫商品详情页2.小店商品详情页
            }
        });
    });
}


