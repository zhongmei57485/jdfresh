<?php

//防止中文乱码
header( 'Content-type:text/html;charset=utf-8' );

$sql = isset( $_REQUEST['sql'] ) ? $_REQUEST['sql'] : 'select num from orderlist where g_id=22';
//sql语句是传过来

//接口整理方案二：准备两个接口：select
include 'conn.php';

// //查询前设置编码，防止输出乱码
$conn->set_charset( 'utf8' );


$res = $conn->query( $sql );

$arr = $res->fetch_all( MYSQLI_ASSOC );

echo json_encode( $arr, JSON_UNESCAPED_UNICODE );
//把数组转成字符串，传给前端

//3.关闭连接
$res->close();
//关闭结果集
$conn->close();
//关闭数据库

?>