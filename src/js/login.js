(function () {
    /*
        1.登陆:select 成功登陆-存入cookie
    */
    let name = document.querySelector('#phone');
    let loginbtn = document.querySelector('#loginbtn');
    let psw = document.querySelector('#password');
    let usname = decodeURI(location.search.slice(1)); //获取用户名显示


    // console.log(usname);
    name.value = usname;
    psw.focus(); //聚焦

    loginbtn.onclick = () => {
        let username = name.value.trim();
        let password = psw.value.trim();
        if (username && password) { //登录
            ajax({
                type: 'post',
                url: '../api/login.php',
                data: {
                    username: username,
                    password: password
                },
                success: str => {
                    // console.log(str);
                    //获取cookie判断是否是登陆的，如果没有登陆才可以存cookie
                    if (str == "yes") {
                        let nnn = getCookie('username');
                        if (nnn) {
                            //拿到了：已经登陆，不允许登陆
                            alert('您已经登陆，请退出账号');
                        } else {
                            //可以登陆

                            setCookie('username', username, 7);
                            location.href = '../index.html?' + username;

                        }
                    } else {
                        alert("用户名和密码输入不正确")
                    }

                }
            });
        } else {
            alert("用户名和密码输入不正确")
        }
    }
})();