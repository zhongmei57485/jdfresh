  /*
        需求：
            * 获取第一页的内容渲染到页面(按需加载)
            * 根据总条数和每页的条数，生成页码  总条数：436  每页显示：60  多少页：2== Math.ceil(15/10)
            * 点击页码可以跳转到对应的页数
    */

  (function () {

      let pages = document.getElementById('pages');
      let ipage = 1; //第一页数据
      let num = 60; //每页显示60条

      let order = ''; //控制升序或降序的功能，默认为空

      //初始化数据渲染
      function init() {
          ajax({
              type: 'get',
              url: '../api/list.php',
              data: {
                  page: ipage,
                  num: num,
                  order: order
              },
              success: str => {
                  // console.log(str);
                  let arr = JSON.parse(str);
                  //渲染数据到页面
                  creat(arr);
              }
          });
      }

      init();

      function creat(arr) {

          // console.log(arr);
          let str = arr.data.map(item => {
              return `<li data-sku="${item.good_sku}" data-id="${item.id}" class="gl-item hover">
              <div class="gl-i-wrap">
                  <div class="p-img">
                      <a href="###">
                          <img src="${item.bigImg}" alt="">
                      </a>
                  </div>
                  <div class="p-price">
                      <strong>
                          <em>￥</em>
                          <i>${item.g_price}</i>
                      </strong>
                  </div>
                  <div class="p-name p-name-type-2">
                      <a href="###">
                          <em>
                          ${item.title}
                              <b class="skcolor_ljg">水果</b>
                            
                          </em>
                      </a>
                  </div>
                  <div class="p-commit">
                      <strong>
                          <a href="###">${item.g_comment}</a>条评价
                      </strong>
                  </div>
                  <div class="p-shop">
                      <span class="J_im_icon">
                          <a href="goodsdetail.html">
                          ${item.shop_name}
                          </a>
                          <b class="im-01" title="联系客服"
                              style="background:url(../img/goodslistimgs/5bc4255bN0776eea6.png) no-repeat;"></b>
                      </span>
                  </div>
                  <div class="p-icons">
                      <i class="goods-icons4 J-picon-tips" data-tips="本商品参与满减促销">满减</i>
                      <i class="goods-icons2 J-picon-tips" data-tips="退换货免运费">险</i>
                  </div>
                  <div class="p-operate">
                      <a href="###" class="p-o-btn contrast J_contrast">
                          <i></i>
                          对比
                      </a>
                      <a href="###" class="p-o-btn focus J_focus">
                          <i></i>
                          关注
                      </a>
                      <a href="cart.html" class="p-o-btn addcart">
                          <i></i>
                          加入购物车
                      </a>
                  </div>
              </div>

          </li>`;
          }).join('');
          $('#J_goodsList .gl-warp').html(str); //渲染数据

          //页码生成
          let total = Math.ceil(arr.total / arr.num);

          let btnstr = '';
          for (let i = 1; i <= total; i++) {
              btnstr += `<a href="#">${i}</a>`;
          }
          pages.innerHTML = btnstr; //渲染页码
          for (let item of pages.children) { //排他
              item.className = '';
          }
          pages.children[arr.page - 1].className = 'curr';

          //给页面绑定事件
          pages.onclick = ev => {
              if (ev.target.tagName.toLowerCase() == 'a') {
                  ipage = ev.target.innerHTML; //点哪页就请求哪页的数据
                  init();
              }
          }
      }


      $('#J_bottomPage').on('click', '.pn-prev', function () {
          ipage--
          if (ipage <= 1) {
              ipage = 1
              this.className = "pn-prev disabled"
          } else {
              this.className = "pn-prev"
          }
          init()
      })

      $('#J_bottomPage').on('click', '.pn-next', function () {
          ipage++
          if (ipage >= 8) {
              ipage = 8
              this.className = "pn-next disabled"
          } else {
              this.className = "pn-next"
          }
          init()
      })


      //升序
      $('#J_filter .f-sort').on('click', '.arrow-top', function () {
          order = 'asc';
          init();
      })

      //降序
      $('#J_filter .f-sort').on('click', '.arrow-bottom', function () {
          order = 'desc';
          init();
      })

      //点击商品跳转到详情页
      $('#J_goodsList').on('click', '.gl-item', function () {
          var gid = $(this).attr('data-id');
          console.log(gid);
          location.href = 'goodsdetail.html?' + gid;

      });

  })();