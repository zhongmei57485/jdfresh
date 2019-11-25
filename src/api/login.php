<?php

//防止中文乱码
header( 'Content-type:text/html;charset=utf-8' );

//连接数据库
include 'conn.php';

// //查询前设置编码，防止输出乱码
$conn->set_charset( 'utf8' );

//接收前端数据
$name = isset( $_REQUEST['username'] ) ? $_REQUEST['username'] : '15918757485';
$password = isset( $_REQUEST['password'] ) ? $_REQUEST['password'] : 'a123456';

//查询语句
$sql = "SELECT * FROM userinf WHERE username='$name' AND psw='$password'";

//执行语句
$res = $conn->query( $sql );
//insert语句执行后得到的是布尔值

// var_dump( $res );
if ( $res->num_rows ) {
    //true：可以登陆
    echo 'yes';
} else {
    //false：不可以登陆
    echo 'no';
}

//3.关闭连接
$res->close();
//关闭结果集
$conn->close();
//关闭数据库
?>