<?php

//防止中文乱码
header( 'Content-type:text/html;charset=utf-8' );

//连接数据库
include 'conn.php';

// //查询前设置编码，防止输出乱码
$conn->set_charset( 'utf8' );

//接收前端数据
$gid = isset( $_REQUEST['gid'] ) ? $_REQUEST['gid'] : '1';

//查询语句
$sql = "SELECT * FROM goodslist WHERE id = $gid";

//执行语句
$res = $conn->query( $sql );


// var_dump($res);
$arr = $res->fetch_all(MYSQLI_ASSOC);//得到数组  [{},{},{}]

// var_dump($arr);

//返回给前端


echo json_encode($arr,JSON_UNESCAPED_UNICODE);//把数组转成字符串，传给前端


$res->close();
//关闭结果集

$conn->close();
//关闭数据库

?>