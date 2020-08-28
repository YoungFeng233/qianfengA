
        //需要得到url中的querystring部分里的id=xxx
        //获取里边的制定部分
        var getParam = function (key) {
            var querystring = location.search.slice(1);
            //该querystring 应该以 & 符号打断
            var arr = querystring.split("&");

            //循环数组里的每一个 让其打断原来的querystring
            for (var i = 0; i < arr.length; i++) {
                var subArr = arr[i].split("=");
                if (key === subArr[0]) {
                    return subArr[1];
                }
            };
        };

        //获取元素
        var id = getParam("id");
        var box = document.getElementById("box");


        //发送ajax请求
        QF.get("/php/getGoodsInfoById.php", { id }, ({ error, data }) => {

            box.innerHTML = `
                    <div class="col-6">
                        <div class="card">
                            <img src="${data.goods_big_logo}" class="card-img-top" alt="...">
                            <div class="card-body">
                            </div>
                        </div>   
                    </div>
                    <div class="col-6">
                        <p class="card-text">${data.goods_name}</p>
                        <h3>库存: ${data.goods_number}</h3>
                        <h3>价格:  ${data.goods_price}</h3>
                        <button type="button" class=" btn btn-dark">添加购物车</button>
                    </div> 
                    ${data.goods_introduce};
                    `
        });