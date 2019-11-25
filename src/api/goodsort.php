<?php
    
    //防止中文乱码
    header("Content-type:text/html;charset=utf-8");

    
    include 'conn.php';//引入外部文件

    // //查询前设置编码，防止输出乱码
    $conn->set_charset('utf8');

    // var_dump($conn);
    //2.书写查询语句->执行语句->得到结果->返回给前端
    //接收前端数据
    $page = isset($_REQUEST['page']) ? $_REQUEST['page'] : '1';//第几页
    $num = isset($_REQUEST['num']) ? $_REQUEST['num'] : '5';//每页几条数据
    $order = isset($_REQUEST['order']) ? $_REQUEST['order'] : '';//每页几条数据
    /*
        SELECT * FROM goodslist LIMIT 0,5

        page（第几页）  num（每页显示条数）  index（下标）
        1              5                   0
        2              5                   5
        3              5                   10
        4              5                   15
    
        推导公式：index==(page - 1) * num
    */


    //书写查询语句
    $index = ($page - 1) * $num;
    if($order) {
        $sql = "SELECT * FROM goodslist ORDER BY g_price $order LIMIT $index,$num";
    }else{
        $sql = "SELECT * FROM goodslist LIMIT $index,$num";
    }
    //记得现在navicat检测没有问题再拿过来用

    //执行语句
    $res = $conn->query($sql);//得到的是结果集，如果想要查询到的数据部分还有继续提取

    // var_dump($res);
    $arr = $res->fetch_all(MYSQLI_ASSOC);//得到数组  [{},{},{}]

    // var_dump($arr);


    // //查询总条数
    // $sql2 = 'SELECT * FROM goodslist';
    // $res2 = $conn->query($sql2);

    // //关联数组，可以一次性返回多个数据
    // $list = array(
    //     'data' => $arr,
    //     'total' => $res2->num_rows,
    //     'page' => $page,
    //     'num' => $num
    // );
    // // echo $res2->num_rows;

    // //返回给前端
    // echo json_encode($list,JSON_UNESCAPED_UNICODE);//把数组转成字符串，传给前端

    //3.关闭连接
    $res->close();//关闭结果集
    $conn->close();//关闭数据库
?>