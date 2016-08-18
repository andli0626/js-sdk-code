/*
 函数名称：wxJSSDK.ui
 函数功能：为wxJSSDK增加界面操作服务
 参数：
    ui 界面API Object 配置
 */

wxJSSDK.ui = function(uiApi){
    if(wxJSSDK.isReady){//wxJSSDK.isReady 查看微信JSSDK是否初始化完毕
        if(uiApi){

            uiApi.hideOptionMenu && wx.hideOptionMenu();//隐藏右上角菜单接口

            uiApi.showOptionMenu && wx.showOptionMenu();//显示右上角菜单接口

            uiApi.closeWindow && wx.closeWindow();//关闭当前网页窗口接口

            uiApi.hideMenuItems && wx.hideMenuItems({//批量隐藏功能按钮接口
                menuList: uiApi.hideMenuItems.menuList || [] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
            });

            uiApi.showMenuItems && wx.showMenuItems({//批量显示功能按钮接口
                menuList: uiApi.showMenuItems.menuList || [] // 要显示的菜单项，所有menu项见附录3
            });

            uiApi.hideAllNonBaseMenuItem && wx.hideAllNonBaseMenuItem();//隐藏所有非基础按钮接口

            uiApi.showAllNonBaseMenuItem && wx.showAllNonBaseMenuItem();//显示所有功能按钮接口

            /*
            *
             传播类|
                 发送给朋友: "menuItem:share:appMessage"
                 分享到朋友圈: "menuItem:share:timeline"
                 分享到QQ: "menuItem:share:qq"
                 分享到Weibo: "menuItem:share:weiboApp"
                 收藏: "menuItem:favorite"
                 分享到FB: "menuItem:share:facebook"
                 分享到 QQ 空间/menuItem:share:QZone

             保护类|
                 调试: "menuItem:jsDebug"
                 编辑标签: "menuItem:editTag"
                 删除: "menuItem:delete"
                 复制链接: "menuItem:copyUrl"
                 原网页: "menuItem:originPage"
                 阅读模式: "menuItem:readMode"
                 在QQ浏览器中打开: "menuItem:openWithQQBrowser"
                 在Safari中打开: "menuItem:openWithSafari"
                 邮件: "menuItem:share:email"
                 一些特殊公众号: "menuItem:share:brand"
            * */

        }else{
            console.log("缺少配置参数");
        }
    }else{
        console.log("抱歉，wx没有初始化完毕，请等待wx初始化完毕，再调用界面接口服务。");
    }

}
window.onload = function(){
    $("#hideOptionMenu").click(function(){//隐藏右上角菜单接口
        wxJSSDK.ui({
            hideOptionMenu:true
        });
    });

    $("#showOptionMenu").click(function(){//显示右上角菜单接口
        wxJSSDK.ui({
            showOptionMenu:true
        });
    });

    $("#closeWindow").click(function(){//关闭当前网页窗口接口
        wxJSSDK.ui({
            closeWindow:true
        });
    });

    $("#hideMenuItems").click(function(){//批量隐藏功能按钮接口
        wxJSSDK.ui({
            hideMenuItems:{
                menuList:[
                    "menuItem:share:timeline",//隐藏分享到朋友圈
                    "menuItem:share:qq"//隐藏分享到QQ
                ]//
            }
        });
    });

    $("#showMenuItems").click(function(){//批量显示功能按钮接口
        wxJSSDK.ui({
            showMenuItems:{
                menuList:[
                    "menuItem:share:timeline",//显示分享到朋友圈
                    "menuItem:share:qq"//显示分享到QQ
                ]//
            }
        });
    });

    $("#hideAllNonBaseMenuItem").click(function(){//隐藏所有非基础按钮接口
        wxJSSDK.ui({
            hideAllNonBaseMenuItem:true
        });
    });

    $("#showAllNonBaseMenuItem").click(function(){//显示所有功能按钮接口
        wxJSSDK.ui({
            showAllNonBaseMenuItem:true
        });
    });
}

