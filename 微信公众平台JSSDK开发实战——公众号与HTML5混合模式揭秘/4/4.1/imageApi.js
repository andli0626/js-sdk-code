/*声明：
        为了方便读者朋友，这里省略配置环境
 */

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
        uploadImageID;
    $("#chooseImage").click(function(){
        wxJSSDK.imageApi({
            chooseImage:{
                success:function(res){
                    chooseImageID =  res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    alert('选择的图片ID'+chooseImageID);
                }
            }
        });
    });

    $("#previewImage").click(function(){//预览图片接口
        wxJSSDK.imageApi({
            previewImage:{
                current:"http://www.html5waibao.com/images/logo_35.png",
                urls:[
                    "http://www.html5waibao.com/images/logo_35.png",
                    "http://b56.photo.store.qq.com/psu?/91eb5965-6d53-482d-94b8-3cc8ac32c4aa/XnjRhEBNo.AOERhm.rc2LA4PutmYBucIMM2muWyJexM!/b/Yc*NMiAaYgAAYg.QaCF5PQAA&a=54&b=56&bo=ngL2AQAAAAABBEg!&rf=viewer_4"
                ]
            }
        });
    });

    $("#uploadImage").click(function(){//上传图片接口
        if(!chooseImageID){
            alert('请先选择图片，再上传！');
            return;
        }
        wxJSSDK.imageApi({
            uploadImage:{
                localId:chooseImageID.toString(),
                success:function(res){
                    uploadImageID = res.serverId; // 返回图片的服务器端ID
                    alert("上传的图片ID"+uploadImageID);// 返回图片的服务器端ID
                }
            }
        });
    });

    $("#downloadImage").click(function(){//下载图片接口
        if(!uploadImageID){
            alert('请先上传图片，再下载！');
            return;
        }

        wxJSSDK.imageApi({
            downloadImage:{
                serverId:uploadImageID,
                success:function(res){
                    alert("下载的图片ID"+res.serverId);// 返回图片的服务器端ID
                },
                fail:function(res){
                    alert(JSON.stringify(res));
                }
            }
        });
    });
}

