/*
    库：类库,方便以后的调用；
    * 功能：生成任意范围内随机数
    * 参数说明：min：范围里面的小的数；max：范围里面大的数
    * 例如：
        var num = ranNum(10,50);
        就会得到一个10-50之间的随机整数
*/

function ranNum(min, max) {
    //Math.random() 0-0.99 当随机数等于0的时候，整体最小的时候
    //最大的时候，Math.random() 最大就是1(实际没到1)
    return parseInt(Math.random() * (max - min + 1)) + min;
}

//随机颜色  ： #123456  rgb(255,255,255)
function ranColor(type) {
    if (type == 16) {
        //返回一个随机颜色：十六进制
        var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
        var str = '#'; //拼接颜色
        for (var i = 0; i < 6; i++) {
            var num = parseInt(Math.random() * arr.length); //0-length-1整数
            str += arr[num];
        }
        return str;
    } else if (type == 'rgb') {
        //返回rgb颜色
        var num1 = parseInt(Math.random() * 256); //0-255整数
        var num2 = parseInt(Math.random() * 256); //0-255整数
        var num3 = parseInt(Math.random() * 256); //0-255整数
        var str = `rgb(${num1},${num2},${num3})`;
        return str;
    }
}

//字符串转成对象
function strToObj(str) { //key0=0&key1=1&key2=2
    var arr = str.split('&'); //["key0=0", "key1=1", "key2=2"]
    var obj = {};
    arr.forEach(function (item) {
        var arr2 = item.split('=');
        obj[arr2[0]] = arr2[1];
    });
    return obj;
}

//对象转成字符串
function objToStr(obj) { //{name:malin,adr:guangxi}
    var str = ''; //key0=0&key1=1&key2=2
    for (var key in obj) {
        str += key + '=' + obj[key] + '&';
    }
    return str.slice(0, -1);
}

//补零函数
function toDb(num) {
    if (num < 10) {
        return '0' + num;
    } else {
        return '' + num;
    }
}

//需求：给我秒数=>xx天xx时xx分xx秒：放到自己的库里面
function changTime(num) {
    var date = parseInt(num / 3600 / 24); //天
    var hours = parseInt((num - date * 3600 * 24) / 3600); //时
    var minute = parseInt(num % 3600 / 60); //分
    var second = (num % 60 % 60).toFixed(0); //秒
    return { //通过对象可以一次性返回多个值，这样可以把数据的拼接方式放到外部进行，更为灵活
        day: date,
        hours: hours,
        mins: minute,
        secs: second
    };
}

//需求：给秒数==>xx年月日 时分秒
function setTime(secs) {
    let time = new Date(secs * 1000);
    var date = time.toLocaleDateString();
    var hours = time.toLocaleTimeString();
    return '' + date + hours;
}

//通过id获取元素
function getid(id) {
    return document.getElementById(id);
}

//查找第一个子节点
function firstCd(ele) {
    if (ele.firstElementChild) {
        //高级浏览器
        return ele.firstElementChild;
    } else {
        //IE678
        return ele.firstChild;
    }
}


//封装一个方法：css() jq的方法：2个参数获取样式，3个参数设置样式

function css() {
    if (arguments.length == 2) {
        //获取样式
        var attr = arguments[1];
        if (getComputedStyle(arguments[0], false)) {
            //标准浏览器

            return getComputedStyle(arguments[0], false)[attr];
        } else {
            //ie678
            arguments[0].currentStyle[attr];
        }
    } else if (arguments.length == 3) {
        //设置样式 box.style.border = '1px solid #ccc';
        var attr = arguments[1];
        var val = arguments[2];
        arguments[0].style[attr] = val;
    }
}

//封装：兼容性处理，绑定事件函数  bind
function bind(ele, type, fn) {
    if (ele.addEventListener) {
        //标准浏览器
        ele.addEventListener(type, fn, false); //事件冒泡：默认
    } else {
        //IE678
        ele.attachEvent('on' + type, fn);
    }
}

//封装滚动条
function scrollBar(outer, inner, fn) {
    var box = document.querySelector(outer);
    var bar = document.querySelector(inner);
    bar.onmousedown = function (ev) {
        var disY = ev.offsetY;
        document.onmousemove = function (ev) {
            var top = ev.pageY - disY - box.offsetTop;
            //临界值的设置
            if (top <= 0) {
                top = 0;
            } else if (top >= (box.offsetHeight - bar.offsetHeight)) {
                top = box.offsetHeight - bar.offsetHeight;
            }
            bar.style.top = top + 'px';

            //计算比例
            var scal = top / (box.offsetHeight - bar.offsetHeight);
            // console.log(scal);
            // move.style.top = 500 * scal + 'px';
            fn(scal);
        }
        document.onmouseup = function () {
            document.onmousemove = null;
        }
    }
}

//封装滚动方向判断
function scrollPosi(ele, type, fnup, fndown) {
    if (type == 'bind') {
        //绑定滚动事件
        //ele:作用的节点  fnup：向上滚执行的回调  fndown：向下滚执行的回调
        ele.onmousewheel = fn; //针对ie和谷歌
        if (ele.addEventListener) { //火狐
            ele.addEventListener('DOMMouseScroll', fn, false);
        }

        function fn(ev) {
            var ev = ev || window.event;
            var b = true; //判断向上或向下 ： true:向上滚，false:向下滚

            if (ev.wheelDelta) { //ie 谷歌
                b = ev.wheelDelta > 0 ? true : false; //大于0就是向上滚
            } else { //火狐
                b = ev.detail < 0 ? true : false; //小于0是向上滚
            }

            if (b) { //向上滚了：
                // this.style.height = this.offsetHeight - 10 + 'px';
                fnup();
            } else { //向下滚了：
                // this.style.height = this.offsetHeight + 10 + 'px';
                fndown();
            }

            if (ev.preventDefault) {
                ev.preventDefault();
            }
            return false;
        }

        if (document.attachEvent) {
            document.attachEvent('oncontextmenu', function () {
                return false;
            });
        } else {
            document.addEventListener('contextmenu', function (ev) {
                ev.preventDefault();
                //return false;
            });
        }
    }
    if (type == 'unbind') {
        //解除绑定
        ele.onmousewheel = null;
        if (ele.addEventListener) { //火狐
            ele.removeEventListener('DOMMouseScroll', fn, false);
        }
    }
}

//表单验证
/*
    checkInput({//验证手机
            ele: checks[1], //要验证的邮箱
            reg: /^1[3-9]\d{9}$/,//正则
            inf: infs[1],//提示信息显示地方
            mes: ['请输入手机号码', '手机验证通过', '验证不通过']//非空、通过、不通过的提示信息
    });
*/
function checkInput(opt) {
    console.log(opt);
    opt.ele.onblur = function () {
        //验证手机
        var val = opt.ele.value.trim();
        // var reg = eval(opt.reg);//eval()把字符串转成js
        var reg = opt.reg;
        // console.log(reg);
        if (val) {
            //非空判断->正则验证->ajax正确性验证
            // console.log(val);
            var res = reg.test(val);
            if (res) {
                //验证通过
                opt.inf.innerHTML = opt.mes[1];
                opt.inf.style.color = '#58bc58';
                //ajax正确性验证
            } else {
                //验证不通过
                opt.inf.innerHTML = opt.mes[2];
                opt.inf.style.color = 'red';
            }
        } else {
            opt.inf.innerHTML = opt.mes[0];
            opt.inf.style.color = 'red';
        }
    }
}

//正则大全
var checkReg = {
    email: function (str) {
        var reg = /^[\w#$!\-]+@[\w#$!\-]+\.[a-zA-Z]+$/;
        return reg.test(str);
    },
    tel: function (str) {
        var reg = /^1[3-9]\d{9}$/;
        return reg.test(str);
    }
}

/*
	运动框架封装：startMove()过渡    jq animate() 因为后期有animate可以用，所以不做要求
	最终版：多对象，多属性，链式运动框架(运动队列)
	参数一：对象名
	参数二：属性，目标值  键名：属性名，键值：目标值    {'width':200,'heigth':400}  实现：宽度和高度一起改变，宽度变成200，高度变成400
	参数三：回调函数(可选参数)
 */

function startMove(obj, json, fn) {
    clearInterval(obj.timer); //防止定时器的叠加
    obj.timer = setInterval(() => {
        let isok = false;
        for (let key in json) {
            //1.获取初始值
            let cur = 0;
            if (key == 'opacity') {
                //要改变透明度
                cur = css(obj, key) * 100; //获取透明度扩大100倍方便后期计算
            } else {
                //要的是以px为单位
                cur = parseInt(css(obj, key));
            }
            //2.准备缓冲运动的 步长==距离/比例系数==终点-起点/比例系数
            let speed = (json[key] - cur) / 6;
            //防止晃动
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if (cur != json[key]) {
                //只要有一个属性未到达终点，动画就还不算完成，不能开始下个运动
                isok = false;
            } else {
                isok = true;
            }
            //3.开始运动
            let val = cur + speed;
            if (key == 'opacity') {
                css(obj, key, val / 100); //btn.style.opacity=20/100
            } else {
                //以px为单位
                css(obj, key, val + 'px');
            }

            //4.判断属性是否都已经到达临界点，全部到达了就是运动完成了，如果有下一个运动，继续开始
            if (isok) {
                //真：已经完成
                if (fn) { //fn可选参数
                    fn();
                }
            }
        }
    }, 30);
}


/*
            ajax封装：仿jqajax
            ajax({
                type : 'get',
                url : 'xxx',
                data :{//name=malin&age=30  选填
                    name : 'malin',
                    age : 30
                },
                asyn : true,//默认是异步 选填
                success : function(str) {
                    //数据渲染 成功回调
                },
                failure : function(str) { 选填
                    //失败回调：选填
                }
            });

        */

function ajax(opt) {
    //默认参数
    let defaultOpt = {
        asyn: true, //默认是异步
        data: '', //默认没有数据传输
        failure: null
    }

    //替补方案
    Object.assign(defaultOpt, opt); //用默认参数

    //创建对象
    let xhr = new XMLHttpRequest();

    //open()设置参数
    if (defaultOpt.type.toLowerCase() == 'get') {
        //get方式发送请求
        if (defaultOpt.data) {
            //判断是否有数据，有就拼接在url后面
            let str = objToStr(defaultOpt.data);
            defaultOpt.url += '?' + str;
        }
        xhr.open('get', defaultOpt.url, defaultOpt.asyn);
        xhr.send(null);
    } else if (defaultOpt.type.toLowerCase() == 'post') {
        //post方式发送请求
        xhr.open('post', defaultOpt.url, defaultOpt.asyn);
        let str = '';
        if (defaultOpt.data) {
            str = objToStr(defaultOpt.data);
        }
        xhr.setRequestHeader('content-type', "application/x-www-form-urlencoded"); //设置请求头
        xhr.send(str);
    }

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) { //完成
            if (xhr.status == 200 || xhr.status == 304) {
                //成功了
                defaultOpt.success(xhr.responseText); //把数据返回
            } else {
                if (defaultOpt.failure) {
                    defaultOpt.failure(xhr.status); //失败的回调：接收http状态码
                }
            }
        }
    }
}


//设置/修改
function setCookie(key, val, iday) {
    //key 键名，val 键值， iday 多少天后失效
    let time = new Date();
    let today = time.getDate(); //日
    time.setDate(today + iday);
    document.cookie = key + '=' + val + ';expires=' + time + ';path=/';
}

//获取
function getCookie(key) {
    let str = document.cookie;
    console.log(str); //name=小虎; age=18; adr=广东广州
    let arr = str.split('; ');
    console.log(arr);
    for (let item of arr) {
        let arr2 = item.split('=');
        if (key == arr2[0]) {
            return arr2[1];
        }
    }
}

//删除cookie
function removeCookie(key) {
    setCookie(key, '', -1);
}


/*
 	表单验证的方法： 调用里面的子功能  (json对象里面有很多子功能)
 	var checkReg = {
 		tel : function() {}
 	}
 	
 	调用方法：
     checkReg.tel();
     
 	
*/

var checkReg = {
    trim: function (str) { //去掉前后空格
        var reg = /^\s+|\s+$/g;
        return str.replace(reg, '');
    },
    tel: function (str) { //号码
        var reg = /^1[3-9]\d{9}$/
        return reg.test(str);
    },
    email: function (str) { //邮箱正则:a_a2-+.s @ a_a+2-.s  .s_a2
        var reg = /^\w+([\-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //网上推荐
        return reg.test(str);
    },
    idcard: function (str) { //身份证
        var reg = /^(\d{17}|\d{14})[\dX]$/;
        return reg.test(str);
    },
    password: function (str) { //6-18位字母或数字组成
        var reg = /^\w{6,18}$/;
        return reg.test(str);
    },
    pswagain: function (str1, str2) { //确认密码
        return str1 === str2; //全等 恒等
    },
    urladr: function (str) { //路径：网址规则
        var reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
        return reg.test(str);
    },
    name: function (str) { //账号字母开头,4-20位
        var reg = /^[a-zA-Z][\w\-]{3,19}$/;
        return reg.test(str);
    },
    chinese: function (str) { //中文
        var reg = /^[\u2E80-\u9FFF]+$/;
        return reg.test(str);
    },
    birthday: function (str) { //生日
        var reg = /^((((19|20)\d{2})-(0?[13-9]|1[012])-(0?[1-9]|[12]\d|30))|(((19|20)\d{2})-(0?[13578]|1[02])-31)|(((19|20)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$/;
        return reg.test(str);
    }
}

// let res = checkReg.email('23wed@qqq.com');
// console.log(res)