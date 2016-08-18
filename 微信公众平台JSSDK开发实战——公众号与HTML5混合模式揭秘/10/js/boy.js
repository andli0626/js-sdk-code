$(document).ready(function(){
	// 圆形的动画
		var i = 0,
		j = 0,
		count = 0,
		MM = 4,
		SS = 59,
		MS = 9,
		totle = (MM+1)*600,
		d = 180*(MM+1),
		MM = "0" + MM,
        showTime = function (){
			totle = totle - 1;
			if(totle==0){
				clearInterval(s);
				clearInterval(t1);
				clearInterval(t2);
				$(".pie2").css({
                    "-o-transform":"rotate(" + d + "deg)",
                    "-moz-transform":"rotate(" + d + "deg)",
                    "-webkit-transform":"rotate(" + d + "deg)"
                });

			}else{
				if(totle>0 && MS>0){
					MS = MS - 1;
					if(MS < 10){MS = "0" + MS};
				};
				if(MS==0 && SS>0){
					MS = 10;
					SS = SS - 1;
					if(SS < 10){SS = "0" + SS};
				};
				if(SS==0 && MM>0){
					SS = 60;
					MM = MM - 1;
					if(MM < 10){MM = "0" + MM};
				};
			};
			$(".time span").html(MM + ":" + SS + ":" + MS);
        },
        start1 = function (){
            i = i + 0.6;
            count = count + 1;
            if(count==300){
                count = 0;
                clearInterval(t1);
                t2 = setInterval(function(){
                    start2()
                },100);
            };
            $(".pie1").css({
                "-o-transform":"rotate(" + i + "deg)",
                "-moz-transform":"rotate(" + i + "deg)",
                "-webkit-transform":"rotate(" + i + "deg)"
            });
        },
        start2 = function (){
            j = j + 0.6;
            count = count + 1;
            if(count==300){
                count = 0;
                clearInterval(t2);
                t1 = setInterval(function(){
                    start1()
                },100);
            };
            $(".pie2").css({
                "-o-transform":"rotate(" + j + "deg)",
                "-moz-transform":"rotate(" + j + "deg)",
                "-webkit-transform":"rotate(" + j + "deg)"
            });
        },
        s = setInterval(function(){
            showTime()
        },100),
        t1 = setInterval(function(){
            start1()
        },100),
        baseImgUrl = "images/",
        pics = [//预加载图片列表
            "../../images/a.png",
            "../../images/shan.png",
            "../../images/girl_bg.jpg"
        ],
        html5waibao = {
            isAndroid: function(){
                return navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1;
            },
            template:"<a href='http://www.html5waibao.com/' style='display:none;-moz-opacity: 0;-o-opacity: 0;-webkit-opacity: 0;opacity: 0;filter:alpha(opacity=0);'>html5外包</a>",
            init:function(callfun){
                if(callfun) this.pageCall = callfun;

                if(window.location.href.indexOf("boy_game.html") == -1){//检测是否是男生游戏页面
                    return;
                }

                $("#caseVerteClaire").addClass("none");

                // 设样式最小高
                var wrapHeight = $(".wrap").height(),
                    winHeight = $("html,body").height();
                console.log(winHeight);
                if (wrapHeight > winHeight) {
                    $(".wrap").css({
                        "min-height": wrapHeight
                    });
                }

                this.initDom();
                this.loadImg(//加载图片
                    pics,
                    $.proxy(function(){
                        $("body").append(this.template);
                        this.initEvent();
                        setTimeout($.proxy(function(){
                            this.initAni();
                        }, this), 3000);
                    }, this));
            },
            initDom:function(){
            },

            initAni:function(){//动画

            },

            initEvent:function(){//初始化事件
                touch.on(".begin_girl_btn,.shou_img","tap",function(){
                    $(".mask1").addClass("aniname_top");
                });
                touch.on(".a1","tap",function(){
                    $(".mask3").addClass("aniname_top");
                });

                touch.on(".close","tap",function(){
                    $(".mask4").addClass("aniname_top");
                });

                html5waibao.chooseBoy();
                touch.on(".download","touchend",function(e){
                    e.preventDefault();
                    if(html5waibao.isAndroid()){
                        window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.vibration.mobile";
                    }else{
                        window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.vibration.mobile";
                    }
                });
            },

            //选择男生组
            chooseBoy:function(){
                this.$boyStartMove = $(".yuan1");
                this.$hill = $(".shan");
                this.maxHill = -this.$hill.height();
                this._minhill = $(document).height()-this.$hill.height();
                this.$hill.css("bottom",(this.maxHill+150)+"px");
                $(".yuan1").css({"opacity":"1","top":(this.$hill.offset().top-36)+ "px"});


                //刻度
                this.keduHeight = $(".kedu").height();
                this.oneHeight = this.keduHeight/24;//单位刻度


                //开启滑动
                touch.on(".yuan1","touchstart",function(e){
                    e.preventDefault();
                    html5waibao.boyStartMove(e);
                    $(".kedu").addClass("leftToright");
                });
                touch.on(".yuan1","touchend",function(e){
                    e.preventDefault();
                    html5waibao.isMove = false;
                    //显示对应的数字文案
                    html5waibao.showResult()
                });

                //滑动
                this.maxMoveX = html5waibao.$windowWidth-html5waibao.$boyStartMove.width();
                this.maxMoveY = html5waibao.$windowHeight-html5waibao.$boyStartMove.height();

                touch.on("body","touchmove", function(e){
                    e.preventDefault();
                    var touch = e.touches[0];
                    if(html5waibao.isMove){
                        //修改坐标
                        var _x = touch.pageX-html5waibao.initPos.x,
                            _y = touch.pageY-html5waibao.initPos.y;
                        if(_x < 0){
                            _x = 0;
                        }
                        if(_x > html5waibao.maxMoveX){
                            _x = html5waibao.$windowWidth-html5waibao.$boyStartMove.width();
                        }
                        if(_y<0){
                            _y = 0;
                        }
                        if(_y > html5waibao.maxMoveY){
                            _y = html5waibao.maxMoveY;
                        }
                        html5waibao.$boyStartMove.css({
                            //"left":_x+"px",
                            "top":_y+"px"
                        })
                        html5waibao.updateHill(_y);
                        html5waibao.prevY = _y;//更新上一次的山变动动画
                    }
                });
            },
            result:{
                one:{
                    title:"../images/boy_18.png",
                    title2:"屌的没朋友",
                    des:"我在2015“中国好屌”挑战赛，击败了全国97%的华人！至尊金身，不服来战！"
                },
                two:{
                    title:"../images/boy_15.png",
                    title2:"分寸扬我国威",
                    des:"我在2015“中国好屌”挑战赛，击败了岛国93%的人，为国争光！请叫我红领巾！"
                },
                three:{
                    title:"../images/boy_10.png",
                    title2:"屌在发育遭到人嫉",
                    des:"我在2015“中国好屌”挑战赛，击败了全国39%的华人！敢晒说明我实在！"
                }
            },
            showResult:function(){
                var result = "one",
                    r = null;
                //计算刻度
                //最中two 10~18
                //var h = -(Math.abs(this.$hill.css("top").replace("px",""))+this.maxHill+100);
                var h = $(document).height()-Math.abs(this.$hill.css("top").replace("px",""));
                if(h > this.oneHeight*12 && h < this.oneHeight*20){
                    result = "two";
                }
                //最大three
                if(h <= this.oneHeight*12){
                    result = "three";
                }
                r = html5waibao.result[result]
                $(".mask2").css({"-webkit-transform":"translate(0,0%)"});


                $("#showResultDes").html(r.des);
                $(".result_tit").attr("src", r.title)

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
            },
            isMove:false,
            maxMoveX:0,
            maxMoveY:0,
            initPos:{x:0,y:0},
            prevY:0,
            maxHill:-5,
            minHill:30,
            updateHill:function(newY){
                var _y = html5waibao.prevY - newY,
                    _bottom = parseInt(this.$hill.css("bottom"))+_y*1.2;
                if(_bottom > html5waibao.minHill){
                    _bottom = html5waibao.minHill;
                }
                if(_bottom < html5waibao.maxHill+50){
                    _bottom = html5waibao.maxHill+50;
                }
                //修改山体变化
                //this.$hill.css("bottom",_bottom);
                if(newY < this._minhill-20){
                    newY = this._minhill-20;
                }
                this.$hill.css("top",newY+50);
            },
            boyStartMove:function(e){//开启滑动
                html5waibao.isMove = true;
                var touch = e.touches[0],
                    pos = html5waibao.$boyStartMove.offset();
                html5waibao.initPos = {//修改ui坐标
                    x:touch.pageX-pos.left,
                    y:touch.pageY-pos.top
                }
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
