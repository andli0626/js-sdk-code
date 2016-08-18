/*
 函数名称：wxJSSDK.weChatCardVouchers
 函数功能：为wxJSSDK增加微信卡券服务
 参数：
 weChatCardVouchersApi 微信卡券API Object 配置
 */
wxJSSDK.weChatCardVouchers = function(weChatCardVouchersApi){
    if(wxJSSDK.isReady){//wxJSSDK.isReady 查看微信JSSDK是否初始化完毕
        if(weChatCardVouchersApi){
            weChatCardVouchersApi.addCard && wx.addCard({//批量添加卡券接口
                cardList: weChatCardVouchersApi.addCard.cardList, // 需要添加的卡券列表
                success: function (res) {
                    weChatCardVouchersApi.addCard.success && weChatCardVouchersApi.addCard.success();
                }
            });


            weChatCardVouchersApi.chooseCard && wx.chooseCard({
                shopId: weChatCardVouchersApi.chooseCard.shopId || '', // 门店Id
                cardType: weChatCardVouchersApi.chooseCard.cardType || '', // 卡券类型
                cardId:weChatCardVouchersApi.chooseCard.cardId ||  '', // 卡券Id
                timestamp: weChatCardVouchersApi.chooseCard.timestamp || 0, // 卡券签名时间戳
                nonceStr:weChatCardVouchersApi.chooseCard.nonceStr ||  '', // 卡券签名随机串
                signType:weChatCardVouchersApi.chooseCard.signType ||  '', // 签名方式，默认'SHA1'
                cardSign: weChatCardVouchersApi.chooseCard.cardSign || '', // 卡券签名，详见附录4
                success: function (res) {
                    weChatCardVouchersApi.chooseCard.success && weChatCardVouchersApi.chooseCard.success(res);
                }
            });

            weChatCardVouchersApi.openCard && wx.openCard({
                cardList: weChatCardVouchersApi.openCard.cardList || []// 需要打开的卡券列表，数组形式
            });


        }else{
            console.log("缺少配置参数");
        }
    }else{
        console.log("抱歉，wx没有初始化完毕，请等待wx初始化完毕，再调用JSSDK接口服务。");
    }

}
window.onload = function(){
    $("#addCard").click(function(){
        wxJSSDK.weChatCardVouchers({
            addCard:{
                cardList: [
                    {
                        cardId: 'pDF3iY9tv9zCGCj4jTXFOo1DxHdo',
                        cardExt: '{"code": "", "openid": "", "timestamp": '+Math.round(new Date().getTime()/1000)+', "signature":'+wxJSSDK.config.signature+'}'
                    },
                    {
                        cardId: 'pDF3iY9tv9zCGCj4jTXFOo1DxHdo',
                        cardExt: '{"code": "", "openid": "", "timestamp": '+Math.round(new Date().getTime()/1000)+', "signature":'+wxJSSDK.config.signature+'}'
                    }
                ],
                success: function (res) {
                    var cardList = res.cardList; // 添加的卡券列表信息
                    alert('已添加卡券：' + JSON.stringify(cardList));
                }
            }
        });
    });

    $("#chooseCard").click(function(){
        wxJSSDK.weChatCardVouchers({
            chooseCard:{
                cardSign: '97e9c5e58aab3bdf6fd6150e599d7e5806e5cb91',
                timestamp: Math.round(new Date().getTime()/1000),
                nonceStr: 'k0hGdSXKZEj3Min5',
                success: function (res) {
                    var cardList= res.cardList; // 用户选中的卡券列表信息
                    alert('已选择卡券：' + JSON.stringify(cardList));
                }
            }
        });
    });

    $("#openCard").click(function(){
        alert('只是测试之用···您没有当前公众号的卡券，不能打开卡券。');
        wxJSSDK.weChatCardVouchers({
            openCard:{
                cardList: [
                ]
            }
        });
    });
}


