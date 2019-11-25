<?php
//防止中文乱码
header( 'Content-type:text/html;charset=utf-8' );

$gid = isset( $_REQUEST['gid'] ) ? ( $_REQUEST['gid'] ) : '1';
$username = isset( $_REQUEST['username'] ) ? ( $_REQUEST['username'] ) : '15918757485';
$num = isset( $_REQUEST['num'] ) ? ( $_REQUEST['num'] ) : '3';
$describei = isset( $_REQUEST['describei'] ) ? ( $_REQUEST['describei'] ) : '【蒲江馆】水果 蒲江猕猴桃奇异果金果黄心猕猴桃 10粒装单果110-150g现摘现发';
$bigimg = isset( $_REQUEST['bigimg'] ) ? ( $_REQUEST['bigimg'] ) : 'https://img10.360buyimg.com/n0/jfs/t1/77357/17/15318/143201/5dce5929Ee4407954/efe69f7c3bd5fac6.jpg';
$shopname = isset( $_REQUEST['shopname'] ) ? ( $_REQUEST['shopname'] ) : '中国特产·蒲江馆';
$price = isset( $_REQUEST['price'] ) ? ( $_REQUEST['price'] ) : '80';
$totalprice = isset( $_REQUEST['totalprice'] ) ? ( $_REQUEST['totalprice'] ) : '180';

//连接数据库
include 'conn.php';

// //查询前设置编码，防止输出乱码
$conn->set_charset( 'utf8' );

if ( $gid && $num && $username ) {
    $sql = "select * FROM orderlist WHERE username = '$username' AND g_id = $gid";
    //是否已有商品
    $res = $conn->query( $sql );
    if ( $res->num_rows ) {
        //是，则增加购物车的数量
        $sql1 = "UPDATE orderlist set num = $num,price = $price,totalprice=$totalprice where g_id = $gid AND username = '$username'";

        $res = $conn->query( $sql1 );

        if ( $res ) {
            echo 'yes';
        } else {
            echo 'no';
        }

    } else {
        //否：则插入数据
        $sql = "INSERT INTO orderlist(username,g_id,gimg,g_title,price,totalprice,num,shop_name) VALUES('$username','$gid','$bigimg','$describei','$price','$totalprice','$num','$shopname')";
        $res = $conn->query( $sql );

        if ( $res ) {
            echo 'yes';
        } else {
            echo 'no';
        }
    }
}

// $res->close();
$conn->close();
?>