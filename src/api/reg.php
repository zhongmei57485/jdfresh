<?php
//防止中文乱码
header( 'Content-type:text/html;charset=utf-8' );

$name = isset( $_REQUEST['username'] ) ? $_REQUEST['username'] : '';
$password = isset( $_REQUEST['password'] ) ? $_REQUEST['password'] : '';

//连接数据库
include 'conn.php';

// //查询前设置编码，防止输出乱码
$conn->set_charset( 'utf8' );

//存入数据库
$sql = "INSERT INTO userinf(username,psw) VALUES('$name','$password')";
//获取查询数据集
$res = $conn->query( $sql );
// var_dump( $res );
//返回状态结果给前端
if ( $res ) {
    echo 'yes';
    //数据插入成功
} else {
    echo 'no';
    //数据插入不成功
}

$conn->close();
//关闭数据库
?>
