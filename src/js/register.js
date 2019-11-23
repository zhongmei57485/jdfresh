(function () {

    /*
          1.登陆:select 成功登陆-存入cookie
      */
    let name = document.querySelector('#RUserName');
    let inf = document.querySelectorAll('.r_remind');
    let regbtn = document.querySelector('#RegisterSumbitBtn');
    let psw = document.querySelector('#RPassword');
    let repsw = document.querySelector('#RRePassword');
    let agree = document.querySelector('#agree');
    let isok = false; //开始时，开关都设置为false

    //1.验证用户名是否存在：select
    name.onblur = () => {
        let val = name.value.trim();
        if (val) { //想要后端帮忙查询用户名是否存在
            ajax({
                type: 'get',
                url: '../api/checkname.php',
                data: {
                    name: val
                },
                success: str => {
                    // console.log(str);
                    if (str == 'no') {
                        //不可以注册
                        inf[0].innerHTML = '该用户太受欢迎啦，请换一个';
                        inf[0].style.color = 'red';
                        isok = false;
                    } else {
                        //可以注册
                        inf[0].innerHTML = '验证通过';
                        inf[0].style.color = '#58bc58';
                        isok = true; //开关，可以控制此用户已经通过验证的
                    }
                }
            });
        } else {
            inf[0].innerHTML = '请输入用户名';
            inf[0].style.color = 'red';
        }
    }


    //2.验证密码：
    psw.onblur = () => {
        let val = psw.value.trim();
        let str = checkReg.password(val);
        if (str) { //
            inf[1].innerHTML = '密码设置成功';
            inf[1].style.color = '#58bc58';
            isok = true;
        } else {
            inf[1].innerHTML = '密码设置不正确';
            inf[1].style.color = 'red';
            isok = false;
        }
    }


    repsw.onblur = () => {
        let val1 = psw.value.trim();
        let val2 = repsw.value.trim();

        if (val1 == val2) { //
            inf[2].innerHTML = '密码输入正确';
            inf[2].style.color = '#58bc58';
            isok = true;
        } else {
            inf[2].innerHTML = '两次密码输入不一致';
            inf[2].style.color = 'red';
            isok = false;
        }
    }


    var isTure_verify;
    $(".txt").click(function () {
        // 产生随机验证码  包含数字和大写字母	
        var ret = "";
        for (var i = 0; i < 4; i++) {
            var isTrue = parseInt(Math.random() * 100) % 3; //0 出现数字     1大写字母    2小写字母  
            if (isTrue == 0) {
                var num = parseInt(Math.random() * 100) % 10 + 48;
            } else if (isTrue == 1) {
                var num = parseInt(Math.random() * 100) % 26 + 65;
            } else {
                var num = parseInt(Math.random() * 100) % 26 + 97;
            }
            var s = String.fromCharCode(num);
            ret = ret.concat(s);
        }

        $(".txt").html(ret);

        $('#regValidate').focus().blur(function () {
            var regValidate = $("#regValidate").val();
            if (!regValidate || regValidate.length <= 0) {
                $('.verify_remind').html('请输入验证码！');
                isTure_verify = false;
            } else if (regValidate != ret.toLocaleLowerCase()) {
                $('.verify_remind').html('验证码输入错误');
                isTure_verify = false;
            } else if (regValidate == ret.toLocaleLowerCase()) {
                $('.verify_remind').html('');
                isTure_verify = true;
            }

        })
    }).triggerHandler('click');

    //2.注册
    regbtn.onclick = () => {
        if (isok) { //验证通过才能注册
            // console.log(isok);
            let username = name.value.trim();
            let password = psw.value.trim();

            if (username && password) { //注册
                ajax({
                    type: 'post',
                    url: '../api/reg.php',
                    data: {
                        username: username,
                        password: password
                    },
                    success: str => {
                        // console.log(str);
                        // let html = '';
                        if (str == 'no') {
                            //失败
                            // html = '注册失败';
                            alert('注册失败');
                        } else {
                            //注册成功
                            // html = '注册成功';
                            alert('注册成功');
                            location.href = 'login.html?' + username;
                        }
                        // alert(html);
                    }
                });
            }
        }

    }

})()