(function () {

    $('#tophead').load('head.html');
    $('#footer').load('footer.html');
    $('.J-shopRec-content ul li').mousemove(function () {
        let index = $(this).index();
        $('.J-shopRec-content ul li .p-name').eq(index)
            .css('display', 'block')

    })

    $('.J-shopRec-content ul li').mouseout(function () {
        let index = $(this).index();
        $('.J-shopRec-content ul li .p-name').eq(index)
            .css('display', 'none')
    })


    //渲染页面数据
    let gid = decodeURI(location.search.slice(1)); //获取商品id显示
    // console.log(gid)

    ajax({
        type: 'post',
        url: '../api/detail.php',
        data: {
            gid: gid
        },
        success: function (str) {
            // create(str);
            // arr = JSON.parse(str)
            // console.log(arr)
            create(str);
        }
    });

    var samllingarr = '';

    function create(str) {
        var arr = JSON.parse(str);
        var samllingstr = arr[0].imgList;
        samllingarr = samllingstr.split(',');
        var html1 = arr.map(function (item) {
            return `<img id="spec-img" data-sku="${item.good_sku}" src="${item.bigImg}" alt="">
            <div class="jqZoomPup">&nbsp;</div>
            <div class="zoomdiv" id="zoomdiv">
                        <img class="bigimg" src="${item.bigImg}">
                    </div>`
        }).join('');
        $('#preview .main-img').html(html1)

        var html2 = samllingarr.map(function (item) {
            return `<li>
            <img src="${item}" data-img="1" width="50" height="50">
        </li>`
        }).join('');

        $('#spec-list .lh').html(html2)

        var html3 = arr.map(function (item) {
            return `<div class="sku-name" data-shop="${item.shop_name}">
            <img src="../img/detailimgs/59b73dbaN9c878bcc.png" alt="">
            ${item.title}
        </div>
        <div class="summary summary-first">
            <div class="summary-price-wrap">
                <div class="summary-price J-summary-price">
                    <div class="dt">京 东 价</div>
                    <div class="dd">
                        <span class="p-price">
                            <span>￥</span>
                            <span class="price J-p-5050569"> ${item.g_price}</span>
                        </span>
                        <a class="notice J-notify-sale" href="###">降价通知</a>
                    </div>
                </div>
                <div class="summary-info J-summary-info clearfix">
                    <div id="comment-count" class="comment-count item fl">
                        <p class="comment">累计评价</p>
                        <a class="count J-comm-5050569" href="#none"> ${item.g_comment}</a>
                    </div>
                </div>
                <div id="summary-quan" class="li p-choose">
                    <div class="dt">优 惠 券</div>
                    <div class="dd">
                        <dl>
                            <dt class="fl"></dt>
                            <dd class="lh">
                                <a class="J-open-tb" href="#none">
                                    <span class="quan-item">
                                        <s></s>
                                        <b></b>
                                        <span class="text">满199减50</span>
                                    </span>
                                    <span class="quan-item">
                                        <s></s>
                                        <b></b>
                                        <span class="text">满299减100</span>
                                    </span>
                                    <span class="quan-item">
                                        <s></s>
                                        <b></b>
                                        <span class="text">满499享5折</span>
                                    </span>
                                    <span class="more-btn">更多&gt;&gt;</span>
                                </a>
                            </dd>
                        </dl>
                    </div>
                </div>

            </div>
        </div>
        <div class="summary p-choose-wrap">
            <div class="summary-stock">
                <div class="dt">配 送 至</div>
                <div class="dd">
                    <div class="store clearfix">
                        <div class="stock-address">
                            <div class="ui-area-text-wrap">
                                <div class="ui-area-text">广东广州市天河区</div>
                                <b></b>
                            </div>
                        </div>
                        <div id="store-prompt" class="store-prompt">
                            <strong>有货</strong>
                        </div>
                        <div class="J-promise-icon promise-icon fl promise-icon-more"
                            style="display: block;">
                            <div class="fl">支持</div>
                            <div class="services services--more" id="ns_services">
                                <div>
                                    <a href="#">京准达</a>
                                    <i>|</i>
                                    <a href="#">自提</a>
                                    <i>|</i>
                                    <a href="#">闪电退款</a>
                                    <i>|</i>
                                    <a href="#">优鲜赔</a>
                                </div>
                                <div>
                                    <a href="#">生鲜99元免基础运费（20kg内）</a>
                                </div>
                                <span class="arrow"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="summary-supply" class="li">
                <div class="dt">　　</div>
                <div class="dd">
                    <div id="summary-service" class="summary-service">由
                        <span class="hl_red">京东</span> 发货,
                        并提供售后服务. 23:10前下单，预计
                        <b>明天(11月19日)</b>送达
                    </div>
                </div>
            </div>
            <div id="summary-weight" class="li">
                <div class="dt">重　　量</div>
                <div class="dd">1.23kg</div>
            </div>
            <div class="summary-line"></div>
            <div id="choose-btns" class="choose-btns clearfix">
                <div class="choose-amount ">
                    <div class="wrap-input">
                        <input class="text buy-num" id="buy-num" value="1" data-max="200">
                        <a class="btn-reduce">-</a>
                        <a class="btn-add" >+</a>
                    </div>
                </div>
                <a href="cart.html" id="InitCartUrl" class="btn-special1 btn-lg">加入购物车</a>
            </div>
            <div id="summary-tips" class="summary-tips">
                <div class="dt">温馨提示</div>
                <div class="dd">
                    <ol class="tips-list clearfix">
                        <li class="local-txt">·不支持7天无理由退货</li>
                    </ol>
                </div>
            </div>
        </div>`
        }).join('');

        $('.main .itemInfo-wrap').html(html3)
    }


    //放大镜
    /* 鼠标移入中图时，显示遮罩层、显示大图并且大图跟随大图移动 */
    $("#preview .jqzoom").on("mouseenter", function () {
        $("#preview .jqZoomPup").show();
        $("#zoomdiv").css("display", "block");

    }).on("mouseleave", function () {

        $("#preview .jqZoomPup").hide();
        $("#zoomdiv").css("display", "none")
    })

    /* 遮罩层随光标的移动而移动 */
    $("#preview .jqzoom").mousemove(function (e) {
        //console.log(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top);
        var l = e.pageX - $(this).offset().left - ($("#preview .jqZoomPup").width() / 2);
        var t = e.pageY - $(this).offset().top - ($("#preview .jqZoomPup").height() / 2);

        if (l < 0) {
            l = 0
        }
        if (l > $(this).width() - $("#preview .jqZoomPup").width()) {
            l = $(this).width() - $("#preview .jqZoomPup").width() - 2
        }
        if (t < 0) {
            t = 0
        }
        if (t > $(this).height() - $("#preview .jqZoomPup").height()) {
            t = $(this).height() - $("#preview .jqZoomPup").height() - 2
        }

        //console.log($(this).width() - $("#shadow").width() - 2, l);
        $("#preview .jqZoomPup").css({
            "left": l,
            "top": t
        })

        var scaleX = l / ($(this).width() - $("#preview .jqZoomPup").width())
        var scaleY = t / ($(this).height() - $("#preview .jqZoomPup").height())
        //console.log(pX, pY);
        // console.log(($(".disBox img").width() - $(".disBox img").width()));
        $("#zoomdiv img").css({
            "left": -scaleX * ($("#zoomdiv img").width() - $("#preview .jqzoom").width()),
            "top": -scaleY * ($("#zoomdiv img").height() - $("#preview .jqzoom").height())
        })
    })


    $("#spec-list .lh").find("li").eq(0).addClass("img-hover"); //默认

    var curPicIndex = 0;
    /* 鼠标移入小图时添加样式并且切换中图(事件委托) */
    $("#spec-list").on("mouseenter", "li", function () {
        curPicIndex = $(this).index();
        $(this).addClass("img-hover").siblings("li").removeClass("img-hover");
        $('#spec-img').attr('src', $(this).find('img').attr('src'));
        $('#zoomdiv img').attr('src', $(this).find('img').attr('src'));
    })



    var curNum = 1;
    // 数量加减
    $('.itemInfo-wrap').on('click', '.btn-add', function () {
        curNum = $(this).prev().prev().val();
        if (curNum >= 999) {
            curNum = 999;
            $(this).addClass('disabled')
        } else {
            $(this).removeClass('disabled')
            curNum++;
        }
        $(this).prev().prev().val(curNum);
    });


    //减
    $('.itemInfo-wrap').on('click', '.btn-reduce', function () {
        curNum = $(this).prev().val();
        if (curNum <= 1) {
            curNum = 1;
            $(this).addClass('disabled')
        } else {
            $(this).removeClass('disabled')
            curNum--;

        }
        $(this).prev().val(curNum);
    });

    $(".itemInfo-wrap").on("focus", '.buy-num', function () {
        $(this).css("outline", "1px solid blue");
    }).on("blur", '.buy-num', function () {
        $(this).css("outline", "none");
        curNum = $(this).val();
        if (curNum <= 1) {
            curNum = 1;
        } else if (curNum >= 999) {
            curNum = 999;
        }
        $(this).val(curNum);
        // console.log(curNum);
    })

    //加入购物车
    if (getCookie('username')) {
        $('.itemInfo-wrap').on('click', '#InitCartUrl', function () {
            // console.log("333")
            var username = getCookie('username');
            // console.log(username)
            var gid = decodeURI(location.search.slice(1));
            // console.log(gid)
            var num = $(this).prev().children(0).children(0).val();
            // console.log(num)
            var describei = $(this).parent().parent().prev().prev().text().trim();
            // console.log(describei)
            var shopname = $(this).parent().parent().prev().prev().attr('data-shop');
            // console.log(shopname)
            var bigimg = $(this).parent().parent().parent().parent().children(0).find('#spec-img').attr('src');
            // console.log(bigimg)
            var price = $(this).parent().parent().prev().children(0).children(0).children(1).find('.price').text();

            var totalprice = $(this).parent().parent().prev().children(0).children(0).children(1).find('.price').text() * num;
            // console.log(price)

            $.ajax({
                type: 'post',
                url: '../api/shop.php',
                data: {
                    gid: gid,
                    username: username,
                    num: num,
                    describei: describei,
                    bigimg: bigimg,
                    shopname: shopname,
                    price: price,
                    totalprice: totalprice
                },
                success: function (str) {
                    console.log(str);
                    if (str == 'yes') {
                        alert('成功加入购物车');
                    } else {
                        alert('加入购物车失败');
                    }
                }
            });

        })


    } else {
        alert('请登录');
    }



    //选项卡模块
    $('.ETab .tab-main li').click(function () {
        $(this).attr('class', 'current')
            .siblings()
            .attr('class', '');

        let index = $(this).index();
        $('.tab-con .tab_item').eq(index)
            .css('display', 'block')
            .siblings()
            .css('display', 'none')
    })


    // //吸顶菜单
    var $sidebar = $('#detail .tab-main');
    var offset = $sidebar.offset();
    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();
        if (offset.top < scrollTop) {
            $sidebar.addClass('pro-detail-hd-fixed').attr('style', 'position:fixed');
        } else {
            $sidebar.removeClass('pro-detail-hd-fixed').attr('style', 'position:relative');
        }
    });


})();