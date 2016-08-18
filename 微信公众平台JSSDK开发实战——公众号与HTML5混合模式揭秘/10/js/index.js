$(document).ready(function(){
    localStorage.setItem("main","1");//记录位置---首页，方便进入男生或女生的页面，验证的来源

	$("#caseVerteClaire").addClass("none");//页面载入成功，隐藏loading

	//text1 --- text4的动画
	$(".index_text1").removeClass("aniname_left");
    var setTime = 300,
        i = 0,
        trackFun = [//函数执行
            function(){
                $(".index_text2").removeClass("aniname_right");
            },
            function(){
                $(".index_text3").removeClass("aniname_left");
            },
            function(){
                $(".index_text4").removeClass("aniname_right");
            },
            function(){
                $(".index_text2").removeClass("aniname_right");
                // 设置最小高
                var shanBgHeight = $(".index_bg1").height(),
                    wrap_conHeight = $(".wrap_con").height(),
                    minHeight = shanBgHeight + wrap_conHeight + 30;
                $(".wrap").css({
                    "min-height": minHeight
                });
                //绑定游戏跳转界面事件
                $(".girl_btn").removeClass("aniname_left").bind("click",function(){
                    window.location.href = "./cn/girl_game.html?main=1";
                });
                $(".boy_btn").removeClass("aniname_right").bind("click",function(){
                    window.location.href = "./cn/boy_game.html?main=1";
                });
            }
        ];
    for(;i < 4 ; i++){
        (function(index){//闭包解决循环超时调用i不正确的问题
            setTimeout(function(){
                trackFun[index]();
            },setTime * index);
        })(i);
    }
});