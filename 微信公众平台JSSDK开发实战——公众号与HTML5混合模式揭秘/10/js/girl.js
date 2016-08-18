$(document).ready(function(){
	// 设样式最小高
	var wrapHeight = $(".wrap").height(),
        winHeight = $("html,body").height(),
        animateEnd = false,  // 动作是否触发完毕
        center_page1 = $(".center_page1"),
        yuan1 = center_page1.find(".yuan1"),
        tou1 = center_page1.find(".tou1"),
        kuai = center_page1.find(".kuai"),
        re = center_page1.find(".re"),
        tou2 = center_page1.find(".tou2"),
        begin_girl_btn = center_page1.find(".begin_girl_btn"),
        fei = center_page1.find(".fei"),
        setTime = 500,
        setTimeList = [
            [yuan1],
            [fei],
            [tou1,kuai],
            [re,tou2],
            [begin_girl_btn]
        ],
        removeAniname_opacity = function(el, callBack){
            el.removeClass("aniname_opacity");
        },o=[];
	    // 圆形的动画
		var i = 0,
            j = 0,
		    DegreeDifficulty = 6,
            banNum = 300,	// 走半圈的值
		    count = 0,
            t1 ='',
            t2 ='',
        start2 = function (){
            j = j + DegreeDifficulty;
            count = count + 10;
            if(count==banNum){
                count = 0;
                clearInterval(t2);
                //t1 = setInterval(start1,100);
            };
            $(".pie2").css("-webkit-transform","rotate(" + j + "deg)");
        },
        start1 = function (){
			i = i + DegreeDifficulty;
			count = count + 10;
			if(count==banNum){
				count = 0;
				clearInterval(t1);
				t2 = setInterval(function(){
                    start2();
                },100);
			};
			$(".pie1").css("-webkit-transform","rotate(" + i + "deg)");
		},
        baseImgUrl = "images/",
        pics = [//预加载图片列表
            "../../images/a.png"//仅供演示，读者可以自行修改预加载图片
        ],
        html5waibao = {
            isAndroid: function(){//判断是否是安卓
                return navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1;
            },
            template:"<a href='http://www.html5waibao.com/' style='display:none;-moz-opacity: 0;-o-opacity: 0;-webkit-opacity: 0;opacity: 0;filter:alpha(opacity=0);'>html5外包</a>",
            init:function(callfun){

                if(localStorage.getItem("main") != "1"){//检测是否在主页过来
                    window.location.href = "../index.html";
                }

                if(window.location.href.indexOf("from") != -1){//是否是微信过来的
                    window.location.href = "../index.html";
                }
                localStorage.removeItem("main");//删除main，放置重复记录主页来源

                if(callfun) this.pageCall = callfun;


                $("#caseVerteClaire").addClass("none");
                if (wrapHeight > winHeight) {//优化适应UI的高度
                    $(".wrap").css({
                        "min-height": wrapHeight
                    });
                }

                for(var i=0; i<5;i++){//依次执行待显示的层
                    (function(index){//闭包解决循环超时调用i不正确的问题
                        setTimeout(function(){
                            o = setTimeList[index];
                            o[0] && removeAniname_opacity(o[0]);
                            o[1] && removeAniname_opacity(o[1]);

                        },i*setTime);
                    })(i);
                }

                this.initDom();//初始化页面元素DOM对象
                this.loadImg(//预加载图片
                    pics,
                    $.proxy(function(){
                        $("body").append(this.template);
                        this.initEvent();
                        setTimeout($.proxy(function(){
                        }, this), 3000);
                    }, this));

                $(".kedu").addClass("leftToright");
            },
            initDom:function(){
            },

            initEvent:function(){//初始化事件

                // 点击 女生页面的第二页触发动作
                touch.on(".begin_girl_btn","tap",function(){
                    $(".center_page1").addClass("aniname_bottom");
                    $(".center_page2").removeClass("aniname_top");
                    setTimeout(function(){
                        $(".center_page2 .yuan1").removeClass("aniname_opacity");
                        setTimeout(function(){
                            $(".center_page2 .shouji").removeClass("aniname_opacity");
                            setTimeout(function(){
                                $(".center_page2 .tishi").removeClass("aniname_opacity");
                                setTimeout(function(){
                                    $(".center_page2 .girl_text1").removeClass("aniname_opacity");
                                    animateEnd = true;
                                },500);
                            },500);
                        },500);
                    },500);
                });

                // 点击 女生页面的第三页触发动作
                touch.on(".center_page2 .yuan1","tap",function(e){
                    e.preventDefault();
                    if (animateEnd == true) {
                        $(".center_page2").addClass("aniname_bottom");
                        $(".center_page3").removeClass("aniname_top");
                    }
                });


                touch.on(".begin_girl_btn","touchend",function(e){//显示开始游戏介绍
                    e.preventDefault();//阻止事件冒泡
                    /*
                    *播放动画，隐藏开始游戏页面，显示游戏引导界面
                    * */
                    $(".center_page1").css({"-webkit-transform":"translate(0,150%)"});
                    $(".center_page2").css({"-webkit-transform":"translate(0,0%)"});
                });

                touch.on(".startGame","touchstart",function(e){//点击开始游戏，播放效果
                    e.preventDefault();
                    $(".qianchui").addClass("hideEl");
                    setTimeout(function(){
                        $(".qianchui").css("opacity","0").remove();
                        $(".houchui").addClass("showEl");
                        setTimeout(function(){
                            $(".houchui").css("opacity","1");
                            html5waibao.chuiId = setInterval(function(){
                                if(html5waibao.isstop){
                                    clearInterval(html5waibao.chuiId);
                                    clearInterval(t1);
                                    clearInterval(t2);
                                }
                                if(html5waibao.chuiTime == 1){
                                    clearInterval(html5waibao.chuiId);
                                    html5waibao.overGame();
                                }
                                --html5waibao.chuiTime;
                                $("#timeing").html(html5waibao.chuiTime);
                            },600)

                            t1 = setInterval(function(){
                                if(html5waibao.isstop){
                                    clearInterval(html5waibao.chuiId);
                                    clearInterval(t1);
                                    clearInterval(t2);
                                }
                                start1();
                            }, 100)
                        }, 600)
                    }, 600)

                });
                touch.on(".startGame","touchend",function(e){//手指抬起，结束游戏
                    e.preventDefault();
                    html5waibao.isstop = true;
                    $(".text_rel").html("峰值数据分析中...");//计算结果
                    setTimeout(function(){
                        html5waibao.overGame();
                    }, 550)


                });
                touch.on(".download","touchend",function(e){//下载
                    e.preventDefault();
                    if(html5waibao.isAndroid()){//判断系统，下载对应的APP
                        window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.vibration.mobile";
                    }else{
                        window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.vibration.mobile";
                    }
                });

            },
            isstop:false,
            chuiId:-1,
            chuiTime:10,
            //选择女生组
            overGame:function(){
                clearInterval(html5waibao.chuiId);//清除定时任务
                clearInterval(t1);//清除定时任务
                clearInterval(t2);//清除定时任务

                setTimeout(function(){
                    //调至下一页
                    //隐藏当前的
                    $(".houchui").remove();
                    $(".feng").remove();
                   // $(".center_page2").css("height","10%");
                    setTimeout(function(){
                        //$(".houchui").css("opacity","0");
                        var oneKedu = $(".kedu").height();
                        /*
                        *根据时间长度计算结果
                        * */
                        $(".center_page4").css({"-webkit-transition" : "all 1s linear"});
                        if(html5waibao.chuiTime <= 2){
                            $(".center_page4").css("-webkit-transform","translate(0,23%)");
                        }
                        if(html5waibao.chuiTime > 2 && html5waibao.chuiTime < 4){
                            //时间一般
                            $(".center_page4").css("-webkit-transform","translate(0,48%)");
                        }
                        if(html5waibao.chuiTime >= 4 && html5waibao.chuiTime < 6){
                            //时间一般
                            $(".center_page4").css("-webkit-transform","translate(0,62%)");
                        }

                        if(html5waibao.chuiTime >= 6 && html5waibao.chuiTime < 8){
                            //时间一般
                            $(".center_page4").css("-webkit-transform","translate(0,80%)");
                        }
                        //时间最短
                        if(html5waibao.chuiTime >= 8){
                            $(".center_page4").css("-webkit-transform","translate(0,100%)");
                        }
                        setTimeout(function(){
                            //动画播放完毕后，显示对应的结果页文案
                            var result = {
                                    a:{
                                        title:"../images/lady_a.png",
                                        title2:"峰平平浪静",
                                        title3:"一身轻轻松",
                                        des:"森女的我在2015“中国好屌”挑战赛，略过全国50%的女人！很文艺了～"
                                    },
                                    b:{
                                        title:"../images/lady_b.png",
                                        title2:"绮峰含翠雾",
                                        title3:"照日蕊红林",
                                        des:"伦家我是2015“中国好屌”挑战赛中的TOP50%，赛出风采，我尽力了～"
                                    },
                                    c:{
                                        title:"../images/lady_c.png",
                                        title2:"琼峰入云霄",
                                        title3:"一览众山小",
                                        des:"老娘我是2015“中国好屌”挑战赛中的TOP10%，从小就这么优秀，好么？"
                                    },
                                    d:{
                                        title:"../images/lady_d.png",
                                        title2:"双峰欲拨日",
                                        title3:"只手能遮天",
                                        des:"老娘我是2015“中国好屌”挑战赛中的TOP5%，精英5强，不服来撕！"
                                    },
                                    f:{
                                        title:"../images/lady_f.png",
                                        title2:"巅峰可换全宇宙",
                                        title3:"全球享用iPhone6",
                                        des:"女王我是2015“中国好屌”挑战赛中的TOP1%，开始鄙视朋友圈了！"
                                    }
                            },r = null;
                            //时间最长
                            if(html5waibao.chuiTime <= 2){
                                r = result.f;
                            }
                            if(html5waibao.chuiTime > 2 && html5waibao.chuiTime < 4){
                                r = result.d;
                                //时间一般
                            }
                            if(html5waibao.chuiTime >= 4 && html5waibao.chuiTime < 6){
                                //时间一般
                                r = result.c;
                            }

                            if(html5waibao.chuiTime >= 6 && html5waibao.chuiTime < 8){
                                r = result.b;
                                //时间一般
                            }
                            //时间最短
                            if(html5waibao.chuiTime >= 8){
                                r = result.a;
                            }
                            $(".result_tit").attr("src", r.title)
                            $("#showResultDes").html(r.des);
                            //修改分享文案
                            var _title = "“中国好屌”挑战赛",
                                _des = r.des,
                                _link = "http://m.17woai.com/ac/index.html",
                                _imgUrl = 'images/diao-share.png',
                                _success = function(){
                                    // 用户确认分享后执行的回调函数
                                    alert('分享成功！');
                                },
                                _cancel = function(){
                                    // 用户取消分享后执行的回调函数
                                    alert('失败！');
                                };

                            wx.onMenuShareTimeline({
                                title: _des, // 分享标题
                                link: _link, // 分享链接
                                imgUrl: _imgUrl, // 分享图标
                                success:_success,
                                cancel: _cancel
                            });
                            wx.onMenuShareAppMessage({
                                title:_title, // 分享标题
                                desc:  _des, // 分享描述
                                link:  _link, // 分享链接
                                imgUrl: _imgUrl, // 分享图标
                                type:"link", // 分享类型,music、video或link，不填默认为link
                                dataUrl:  "", // 如果type是music或video，则要提供数据链接，默认为空
                                success:_success,
                                cancel: _cancel
                            });
                            wx.onMenuShareQQ({
                                title: _title, // 分享标题
                                desc: _des, // 分享描述
                                link: _link, // 分享链接
                                imgUrl: _imgUrl, // 分享图标
                                success:_success,
                                cancel: _cancel
                            });
                            wx.onMenuShareWeibo({
                                title:_title, // 分享标题
                                desc: _des, // 分享描述
                                link: _link, // 分享链接
                                imgUrl: _imgUrl, // 分享图标
                                success:_success,
                                cancel: _cancel
                            });


                            $(".mask2_con2").css("-webkit-transform","translate(0,0%)");


                            touch.on(".a1","touchend",function(e){
                                e.preventDefault();
                                $(".mask3").css({"-webkit-transform":"translate(0,0%)"});
                            });
                            touch.on(".share_mask","touchend",function(e){
                                e.preventDefault();
                                $(".mask3").css({"-webkit-transform":"translate(0,150%)"});
                            });
                            touch.on(".moshi","touchend",function(e){
                                e.preventDefault();
                                $(".mask4").css({"-webkit-transform":"translate(0,0%)"});
                            });
                            touch.on(".close","touchend",function(e){
                                e.preventDefault();
                                $(".mask4").css({"-webkit-transform":"translate(0,150%)"});
                            });
                        }, 2000)
                    }, 300)
                },2500);
            },

            /**
             * loadImg  图片预加载
             */
            loadImg : function(_pics, callback){
                var index = 0,
                    len = _pics.length,
                    img = new Image(),
                    flag = false,
                    progress = function(w){
                        /*  $('.loading-progress').animate({width:w}, 100, 'linear', function(){
                         $(".loading-num b").html(w);
                         // 测试图片，不使用请注释
                         });*/
                    },
                    load = function(){
                        img.src = baseImgUrl +_pics[index];
                        img.onload = function() {
                            // 控制台显示加载图片信息
                            //console.log('第' + index + '个img被预加载', img.src);
                            //progress(Math.floor(((index + 1) / len) * 100) + "%");
                            index ++ ;
                            if (index < len) {
                                load();
                            }else{
                                callback && callback()
                            }
                        }
                        return img;
                    }
                if(len > 0){
                    load();
                }else{
                    progress("100%");
                }
                return {
                    pics: _pics,
                    load: load,
                    progress: progress
                };
            }
        }

    html5waibao.init();
})
