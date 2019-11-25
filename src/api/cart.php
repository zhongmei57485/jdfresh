<?php
//防止中文乱码
header( 'Content-type:text/html;charset=utf-8' );

$username = isset( $_REQUEST['username'] ) ? ( $_REQUEST['username'] ) : '15918757485';

//连接数据库
include 'conn.php';

// //查询前设置编码，防止输出乱码
$conn->set_charset( 'utf8' );

$sql2 = "SELECT * FROM orderlist WHERE username ='$username'";

// 获取结果集
$res = $conn->query( $sql2 );

// 获取具体数据
$content = $res->fetch_all( MYSQLI_ASSOC );

// var_dump( $conttmlent );
echo json_encode( $content, JSON_UNESCAPED_UNICODE );

$res->close();
$conn->close();
?>