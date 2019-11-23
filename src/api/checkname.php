<?php

//防止中文乱码
header( 'Content-type:text/html;charset=utf-8' );

//连接数据库
include 'conn.php';

// //查询前设置编码，防止输出乱码
$conn->set_charset( 'utf8' );

//接收前端数据
$name = isset( $_REQUEST['name'] ) ? $_REQUEST['name'] : '';

//查询语句
$sql = "SELECT * FROM userinf WHERE username = '$name'";

//执行语句
$res = $conn->query( $sql );

// var_dump( $res );

if ( $res->num_rows ) {
    //非零，存在数据，不可以注册
    echo 'no';
} else {
    //为空，不存在此用户，可以注册
    echo 'yes';
}

//3.关闭连接

$res->close();
//关闭结果集

$conn->close();
//关闭数据库
?>