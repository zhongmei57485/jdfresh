<?php

//防止中文乱码
header( 'Content-type:text/html;charset=utf-8' );

$sql = isset( $_REQUEST['sql'] ) ? $_REQUEST['sql'] : 'DELETE from orderlist where g_id= 19';



//接口整理方案二：准备两个接口：update insert delete
include 'conn.php';

// //查询前设置编码，防止输出乱码
$conn->set_charset( 'utf8' );

//sql语句是传过来

$res = $conn->query( $sql );
//执行后得到的是布尔值

// echo $res;

$conn->close();
//关闭数据库
?>