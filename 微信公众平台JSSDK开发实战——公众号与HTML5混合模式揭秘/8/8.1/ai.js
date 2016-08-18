/*
 函数名称：wxJSSDK.ai
 函数功能：为wxJSSDK增加智能操作服务
 参数：
 aiApi 智能API Object 配置
 */

var localId; // 本地语音id

wxJSSDK.audio = function(audioApi){
    if(wxJSSDK.isReady){//wxJSSDK.isReady 查看微信JSSDK是否初始化完毕
        if(audioApi){
            audioApi.startRecord && wx.startRecord();//开始录音

            audioApi.stopRecord && wx.stopRecord({//停止录音接口
                success: function (res) {
                    audioApi.stopRecord.success && audioApi.stopRecord.success(res);
                }
            });

            audioApi.onVoiceRecordEnd && wx.onVoiceRecordEnd({//监听录音自动停止接口
                // 录音时间超过一分钟没有停止的时候会执行 complete 回调
                complete: function (res) {
                    audioApi.onVoiceRecordEnd.complete && audioApi.onVoiceRecordEnd.complete(res);
                }
            });
        }else{
            console.log("缺少配置参数");
        }
    }else{
        console.log("抱歉，wx没有初始化完毕，请等待wx初始化完毕，再调用JSSDK接口服务。");
    }

}

wxJSSDK.ai = function(aiApi){
    if(wxJSSDK.isReady){//wxJSSDK.isReady 查看微信JSSDK是否初始化完毕
        if(aiApi){

            aiApi.translateVoice && wx.translateVoice({
                localId: aiApi.translateVoice.localId || '', // 需要识别的音频的本地Id，由录音相关接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                    aiApi.translateVoice.success && aiApi.translateVoice.success(res);
                }
            });

        }else{
            console.log("缺少配置参数");
        }
    }else{
        console.log("抱歉，wx没有初始化完毕，请等待wx初始化完毕，再调用智能接口服务。");
    }

}
window.onload = function(){
    /*智能API*/
    var translateVoice = function(){
        wxJSSDK.location({
            getLocation:{
                localId: localId, // 需要识别的音频的本地Id，由录音相关接口获得
                success: function (res) {
                    $("#ai").html(res.translateResult); // 语音识别的结果
                }
            }
        });
    }

    /*音频*/
    $("#startRecord").click(function(){//开始录音
        wxJSSDK.audio({
            startRecord:true
        });
    });

    $("#stopRecord").click(function(){//停止录音
        wxJSSDK.audio({
            stopRecord:{
                success:function(res){
                    localId = res.localId;
                    translateVoice();
                }
            }
        });
    });

    wxJSSDK.audio({//录音超时监听
        onVoiceRecordEnd:{
            complete:function(res){
                localId = res.localId;
                alert("监听录音已自动停止");
                translateVoice();
            }
        }
    });
}


