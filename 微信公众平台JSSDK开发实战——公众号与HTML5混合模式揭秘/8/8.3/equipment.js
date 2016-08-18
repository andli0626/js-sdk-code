/*
 函数名称：wxJSSDK.equipment
 函数功能：为wxJSSDK增加智能操作服务
 参数：
 equipmentApi 设备信息API Object 配置
 */

wxJSSDK.equipment = function(equipmentApi){
    if(wxJSSDK.isReady){//wxJSSDK.isReady 查看微信JSSDK是否初始化完毕
        if(equipmentApi){
            equipmentApi.getNetworkType && wx.getNetworkType({
                success: function (res) {
                    equipmentApi.getNetworkType.success && equipmentApi.getNetworkType.success(res)
                }
            });
        }else{
            console.log("缺少配置参数");
        }
    }else{
        console.log("抱歉，wx没有初始化完毕，请等待wx初始化完毕，再调用设备接口服务。");
    }

}

window.onload = function(){
    $("#getNetworkType").click(function(){
        wxJSSDK.equipment({
            getNetworkType:{
                success: function (res) {
                    var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
                    $("#networkType").html(networkType);
                }
            }
        });
    });
}


