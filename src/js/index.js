(function () {

    let usname = getCookie('username'); //获取用户名显示
    // console.log(usname)

    $('#logout').click(function () {
        removeCookie('username');
        this.attr('href', 'index.html')
        // $('#loginuser').html("你好，请登录");
        // $('#logout').css('display', 'none');
        // $('#regbtn').css('display', 'block')
    })

    if (usname) {
        $('#loginuser').html("欢迎你！" + usname);
        $('#logout').css('display', 'block');
        $('#regbtn').css('opacity', 0)
    } else {
        $('#loginuser').html("你好，请登录");
        $('#logout').css('display', 'none');
        $('#regbtn').css('opacity', 1)
    }



    // 轮播图模块
    //swiper基本款
    var s1 = new Swiper('.swiper-container', {
        autoplay: { //自动轮播
            delay: 2000, //间隔时间
            disableOnInteraction: false //拖拽完后还能继续自动轮播
        },
        loop: true, //无缝 环路
        navigation: { //上下按钮
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        pagination: { //焦点跟随
            el: '.swiper-pagination',
            clickable: true, //点击焦点跳到指定图片
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>'; //生成焦点数字
            }
        },
        mousewheel: true //滚动滑轮可以切图
        // effect : 'cube'//选用:效果
    });

    var oBox = document.getElementById('swiper-container');
    var prevbtn = document.getElementById('prev');
    var nextbtn = document.getElementById('next');

    oBox.onmouseover = function () { //鼠标经过停止
        prevbtn.style.display = "block";
        nextbtn.style.display = "block";
        s1.autoplay.stop();
    }

    oBox.onmouseout = function () { //鼠标离开就运动
        prevbtn.style.display = "none";
        nextbtn.style.display = "none";
        s1.autoplay.start();
    }


    //导航栏模块
    $('.main_box #navlist .tab_head_item').mouseover(function () {
        $(this).attr('class', 'tab_head_item navselect')
            .siblings()
            .attr('class', 'tab_head_item');

        let index = $(this).index();
        $('.main_box .tab_body .tab_body_item').eq(index)
            .css('display', 'block')
            .siblings()
            .css('display', 'none')
    })

    $('.main_box #navlist .tab_head_item').mouseout(function () {
        $(this).attr('class', 'tab_head_item')
        let index = $(this).index();
        $('.main_box .tab_body .tab_body_item').eq(index)
            .css('display', 'none')
    })

    // 主页身/临/食/感模块

    //选项卡模块
    $('.fresh_slim .tab_head .tab_head_item').click(function () {
        $(this).attr('class', 'tab_head_item active')
            .siblings()
            .attr('class', 'tab_head_item');

        let index = $(this).index();
        $('.fresh_slim .tab_body .tab_body_item').eq(index)
            .css('display', 'block')
            .siblings()
            .css('display', 'none')
    })

    jQuery(".fresh_slim_goods").slide({
        titCell: ".fresh_slim_goods .slider_control",
        mainCell: ".slider_list .slider_wrapper",
        autoPage: true,
        effect: "left",
        autoPlay: true,
        vis: 4
    });



    //评论模块
    var wrap = document.querySelector('#fresh_comments_10')
    var box = wrap.querySelector('.fresh_comments_slider');
    var smaller = wrap.querySelector('.slider_list .slider_wrapper');

    var prev = wrap.querySelector('.fresh_comments_slider .slider_control_prev');
    var next = wrap.querySelector('.fresh_comments_slider .slider_control_next');
    // 点击左右按钮可以让小图显示出来；
    prev.onclick = function () { //切换上一张
        //获取本来的left：offsetLeft。在本来的基础上加去70 缺点：不好控制临界点
        var ileft = smaller.offsetLeft + 1190;
        if (ileft >= 0) {
            ileft = 0;
            prev.className = "slider_control slider_control_prev ";
        } else {
            next.className = "slider_control slider_control_next";
        }
        smaller.style.left = ileft + "px";
    }


    //下一张
    next.onclick = function () {
        if (box.offsetWidth > smaller.offsetLeft) {
            next.className = "slider_control slider_control_next";
        }

        var ileft = smaller.offsetLeft - 1190;
        if (box.offsetWidth < smaller.offsetWidth) {
            if (ileft <= box.offsetWidth - smaller.offsetWidth) {
                ileft = box.offsetWidth - smaller.offsetWidth;
                next.className = "slider_control slider_control_prev";
            } else {
                prev.className = "slider_control slider_control_prev";
            }
            smaller.style.left = ileft + "px";
        }
    }



})();