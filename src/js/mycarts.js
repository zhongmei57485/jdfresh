/**

 */

$(function () {
	//渲染数据：jq的ajax
	//购物车渲染
	var username = getCookie('username');
	$.ajax({
		type: "post",
		url: "../api/cart.php",
		data: {
			username: username
		},
		success: function (re) {
			let arr = JSON.parse(re);
			// console.log(arr);
			create(arr);

			//全局的checkbox选中和未选中的样式
			// console.log($('input[type="checkbox"]'));
			var $allCheckbox = $('input[type="checkbox"]'), //全局的全部checkbox
				$wholeChexbox = $('.whole_check'),
				$cartBox = $('.cartBox'), //每个商铺盒子
				$shopCheckbox = $('.shopChoice'), //每个商铺的checkbox
				$sonCheckBox = $('.son_check');
			//每个商铺下的商品的checkbox

			$('#cartMain').on('click', 'input[type="checkbox"]', function () {
				if ($(this).is(':checked')) {
					$(this).next('label').addClass('mark');
				} else {
					$(this).next('label').removeClass('mark')
				}
			});

			$allCheckbox.click(function () {
				console.log($(this));

				if ($(this).is(':checked')) {
					$(this).next('label').addClass('mark');
				} else {
					$(this).next('label').removeClass('mark')
				}
			});

			//===============================================全局全选与单个商品的关系================================
			$wholeChexbox.click(function () {
				var $checkboxs = $cartBox.find('input[type="checkbox"]');
				if ($(this).is(':checked')) {
					$checkboxs.prop("checked", true);
					$checkboxs.next('label').addClass('mark');
				} else {
					$checkboxs.prop("checked", false);
					$checkboxs.next('label').removeClass('mark');
				}
				totalMoney();
			});

			$sonCheckBox.each(function () {
				$(this).click(function () {
					if ($(this).is(':checked')) {
						//判断：所有单个商品是否勾选
						var len = $sonCheckBox.length;
						var num = 0;
						$sonCheckBox.each(function () {
							if ($(this).is(':checked')) {
								num++;
							}
						});
						if (num == len) {
							$wholeChexbox.prop("checked", true);
							$wholeChexbox.next('label').addClass('mark');
						}
					} else {
						//单个商品取消勾选，全局全选取消勾选
						$wholeChexbox.prop("checked", false);
						$wholeChexbox.next('label').removeClass('mark');
					}
				})
			})

			//========================================每个店铺checkbox与其下商品的checkbox的关系======================================================

			//店铺$sonChecks有一个未选中，店铺全选按钮取消选中，若全都选中，则全选打对勾
			$cartBox.each(function () {
				var $this = $(this);
				var $sonChecks = $this.find('.son_check');
				$sonChecks.each(function () {
					$(this).click(function () {
						if ($(this).is(':checked')) {
							// console.log('1');

							// 选中高亮
							$(this).parents('.order_lists').prop('class', 'order_lists boxHighLight');


							//判断：如果所有的$sonChecks都选中则店铺全选打对勾！
							var len = $sonChecks.length;
							var num = 0;
							$sonChecks.each(function () {
								if ($(this).is(':checked')) {
									num++;
								}
							});
							if (num == len) {
								$(this).parents('.cartBox').find('.shopChoice').prop("checked", true);
								$(this).parents('.cartBox').find('.shopChoice').next('label').addClass('mark');
							}

						} else {
							$(this).parents('.order_lists').prop('class', 'order_lists');

							//否则，店铺全选取消
							$(this).parents('.cartBox').find('.shopChoice').prop("checked", false);
							$(this).parents('.cartBox').find('.shopChoice').next('label').removeClass('mark');
						}
						totalMoney();
					});
				});
			});

			//=================================================商品数量==============================================
			var $plus = $('.plus'),
				$reduce = $('.reduce'),
				$all_sum = $('.sum');
			$plus.click(function () {
				var $inputVal = $(this).prev('input'),
					$count = parseInt($inputVal.val()) + 1,
					$obj = $(this).parents('.amount_box').find('.reduce'),
					$priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
					$price = $(this).parents('.order_lists').find('.price').html(), //单价
					$priceTotal = $count * parseInt($price.substring(1));
				$inputVal.val($count);
				$priceTotalObj.html('￥' + $priceTotal);
				if ($inputVal.val() > 1 && $obj.hasClass('reSty')) {
					$obj.removeClass('reSty');
				}
				totalMoney();

				//对应数据库snum
				$gid = $(this).parents('.order_lists').data("id"); //获取data-id
				console.log($priceTotal)
				// console.log($sid);
				//获取snum
				$.ajax({
					type: "post",
					url: "../api/select.php",
					data: {
						sql: `select num from orderlist where g_id=${$gid}`
					},
					success: function (re) {
						// let arr = JSON.parse(re);
						let snum = arr[0].num;
						// console.log(snum);

						snum = snum * 1 + 1;
						$.ajax({
							type: "post",
							url: "../api/other.php",
							data: {
								sql: `UPDATE orderlist SET num='${$count}',totalprice='${$priceTotal}' where g_id=${$gid}`
							},
							success: function () {
								console.log('修改成功');
							}
						});
						console.log(snum);
						console.log($gid);

					}
				});
			});


			$reduce.click(function () {
				var $inputVal = $(this).next('input'),
					$count = parseInt($inputVal.val()) - 1,
					$priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
					$price = $(this).parents('.order_lists').find('.price').html(), //单价
					$priceTotal = $count * parseInt($price.substring(1));
				if ($inputVal.val() > 1) {
					$inputVal.val($count);
					$priceTotalObj.html('￥' + $priceTotal);
				}
				if ($inputVal.val() == 1 && !$(this).hasClass('reSty')) {
					$(this).addClass('reSty');
				}
				totalMoney();

				$gid = $(this).parents('.order_lists').data("id"); //获取data-id
				console.log($priceTotal)
				// console.log($sid);
				//获取snum
				$.ajax({
					type: "post",
					url: "../api/select.php",
					data: {
						sql: `select num from orderlist where g_id=${$gid}`
					},
					success: function (re) {
						// let arr = JSON.parse(re);
						let snum = arr[0].num;
						// console.log(snum);		
						snum = snum * 1 - 1;
						if (snum <= 1) {
							snum = 1;
						}

						$.ajax({
							type: "post",
							url: "../api/other.php",
							data: {
								sql: `UPDATE orderlist SET num='${$count}',totalprice='${$priceTotal}' where g_id=${$gid}`
							},
							success: function () {
								console.log('修改成功');
							}
						});
						console.log(snum);
						console.log($gid);

					}
				});

			});

			$all_sum.keyup(function () {
				var $count = 0,
					$priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
					$price = $(this).parents('.order_lists').find('.price').html(), //单价
					$priceTotal = 0;
				if ($(this).val() == '') {
					$(this).val('1');
				}
				$(this).val($(this).val().replace(/\D|^0/g, ''));
				$count = $(this).val();
				$priceTotal = $count * parseInt($price.substring(1));
				$(this).attr('value', $count);
				$priceTotalObj.html('￥' + $priceTotal);
				totalMoney();

				$gid = $(this).parents('.order_lists').data("id"); //获取data-id
				console.log($priceTotal)
				// console.log($sid);
				//获取snum
				$.ajax({
					type: "post",
					url: "../api/select.php",
					data: {
						sql: `select num from orderlist where g_id=${$gid}`
					},
					success: function (re) {
						let arr = JSON.parse(re);
						let snum = arr[0].num;
						// console.log(snum);
						snum = $count;
						if (snum <= 1) {
							snum = 1;
						}
						console.log(snum);
						console.log($gid);
						$.ajax({
							type: "post",
							url: "../api/other.php",
							data: {
								sql: `UPDATE orderlist SET num='${snum}',totalprice='${$priceTotal}' where g_id=${$gid}`
							},
							success: function () {
								console.log('修改成功');
							}
						});
					}
				});

			})



			//======================================移除商品========================================

			var $order_lists = null;
			var $order_content = '';
			$('.delBtn').click(function () {
				$order_lists = $(this).parents('.order_lists');
				$order_content = $order_lists.parents('.order_content');
				$('.model_bg').fadeIn(300);
				$('.my_model').fadeIn(300);

				$gid = $(this).parents('.order_lists').data("id"); //获取data-id


			});

			//关闭模态框
			$('.closeModel').click(function () {
				closeM();
			});
			$('.dialog-close').click(function () {
				closeM();
			});

			function closeM() {
				$('.model_bg').fadeOut(300);
				$('.my_model').fadeOut(300);
			}
			//确定按钮，移除商品
			$('.dialog-sure').click(function () {
				$order_lists.remove();
				if ($order_content.html().trim() == null || $order_content.html().trim().length == 0) {
					$order_content.parents('.cartBox').remove();
				}
				closeM();
				$sonCheckBox = $('.son_check');
				totalMoney();

				console.log($gid); //利用data-id删除数据库对应的数据
				// console.log($id);
				$.ajax({
					type: "post",
					url: "../api/other.php",
					data: {
						sql: `DELETE from orderlist where g_id= ${$gid}`
					},
					success: function (str) {
						console.log(str);
					}
				});
			})

			//======================================总计==========================================

			function totalMoney() {
				var total_money = 0;
				var total_count = 0;
				var calBtn = $('.calBtn a');
				$sonCheckBox.each(function () {
					if ($(this).is(':checked')) {
						var goods = parseInt($(this).parents('.order_lists').find('.sum_price').html().substring(1));
						var num = parseInt($(this).parents('.order_lists').find('.sum').val());
						total_money += goods;
						total_count += num;
					}
				});
				$('.total_text').html('￥' + total_money);
				$('.piece_num').html(total_count);

				// console.log(total_money,total_count);

				if (total_money != 0 && total_count != 0) {
					if (!calBtn.hasClass('btn_sty')) {
						calBtn.addClass('btn_sty');
					}
				} else {
					if (calBtn.hasClass('btn_sty')) {
						calBtn.removeClass('btn_sty');
					}
				}
			}

			// 结算
			$(".calBtn").click(function () {
				console.log('1');
				alert('结算成功');
			});

		}
	});
});

function create(str) {
	var list = str.map(function (item) {
		// console.log(item);
		return `<ul class="order_lists"  data-id=${item.g_id}>
				<li class="list_chk">
					<input type="checkbox" id="checkbox_${item.g_id}" class="son_check">
					<label for="checkbox_${item.g_id}"></label>
				</li>
				<li class="list_con">
					<div class="list_img"><a href="goodsdetail.html?${item.g_id}"><img src="${item.gimg}" alt=""></a></div>
					<div class="list_text"><a href="goodsdetail.html?${item.g_id}">${item.g_title}</a></div>
				</li>
				<li class="list_info">
				<p>规格：默认</p>
                <p>重量：5.0kg</p>
				</li>
				<li class="list_price">
					<p class="price">￥${item.price}</p>
				</li>
				<li class="list_amount">
					<div class="amount_box">
						<a href="javascript:;" class="reduce reSty">-</a>
						<input type="text" value="${item.num}" class="sum">
						<a href="javascript:;" class="plus">+</a>
					</div>
				</li>
				<li class="list_sum">
					<p class="sum_price">￥${item.totalprice}</p>
				</li>
				<li class="list_op">
					<p class="del"><a href="javascript:;" class="delBtn">移除商品</a></p>
				</li>
			</ul>
`
	}).join("");
	$(".order_content").html(list);


}

//吸底菜单
$(window).scroll(function () {
	if ($(window).scrollTop() <= 430) {
		$('.bar-wrapper').css('position', 'fixed');
		$('.bar-wrapper').css('bottom', '0');
	} else {
		$('.bar-wrapper').css('position', 'absolute');
		$('.bar-wrapper').css('bottom', '-28px');
	}
});

// 结算
// $(".btn_sty").click(function () {
// 	console.log('1');
// 	alert('余额不足！');
// });

// //获取snum
// function getsnum($id) {
// 	$.ajax({
// 		type: "post",
// 		url: "api/select",
// 		data: { sql: `select snum from ordergoods where sid=${$id}` },
// 		success: function (re) {
// 			let arr = JSON.parse(re);
// 			let snum = arr[0].snum;
// 			console.log(snum);
// 		}

// 	});

// }