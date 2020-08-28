    //从本地获取存储中把数据拿出来    
     var shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];


    //根据数组渲染购物车
    var $table = $("#table");
    var $sum = $("#sum");

    
