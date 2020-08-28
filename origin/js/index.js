
        //获取元素
        var $box = $("#box");
        var $leftBtn = $("#leftBtn");
        var $rightBtn = $("#rightBtn");
        var $carousel = $("#carousel");
        var $cirs = $("#cirs li");
        var $paginationContainer = $("#paginationContainer");

        //获取第一个元素的图片 放到列表的最后
        $carousel.children("li").eq(0).clone().appendTo($carousel);

        //需要获取宽度去让动画动起来
        var width = $box.width();

        //由于jQuery无法帮我们完成信号量问题 只能完成 元素操作 需要自己定义信号量
        var idx = 0;

        //添加 有按钮事件
        $rightBtn.click(function () {
            //当点击信号量的时候 idx自增
            idx++;

            //当点击右键时  让动画动起来(UL动)
            //由于点击多次有按钮时 动画会累加 所以 需要用 .stop来停止累加
            $carousel.stop().animate({
                //left动画需要乘以图片的宽度（整个容器的宽度
                left: -idx * width
            }, 1000, "linear", function () {
                //需要做边界判定 防止 轮播图 点到最后 还可以一直点下去到空白页面
                if (idx >= 6) {
                    //如果下表到达第七张图 则让left值回到0
                    $(this).css("left", 0);
                    //信号量下标也需要回到0,否则不同步
                    idx = 0;
                };
                //需要同步小圆点样式 所以需要调用 change();
                change();
            });

        });

        //添加 左按钮事件
        $leftBtn.click(function () {
            //当点击左边按钮的时候 信号量自减
            idx--;

            //需要做边界判定 因为 左边按钮一按直接会出现白图现象 
            if (idx < 0) {
                //如果idx小于0 则让idx等于下标为6的图片
                idx = 6;

                //动画需要乘以图片的宽度(就是整个box的宽度)
                $carousel.css("left", -idx * width);

                //信号量下表也需要自减
                idx--;
            }

            //此时 需要让ul动起来
            $carousel.stop().animate({
                left: -idx * width
            }, 1000, function () {
                //需要同步小圆点样式 所以需要调用 change();
                change();
            });
        });

        //添加小圆点 点击事件 
        //使用循环绑定事件  利用的是作用域的分隔的原理（闭包
        $cirs.each(function (index, value) {
            //该循环的函数第一个参数  是循环目标的索引 第二个为成员
            $(value).click(function () {
                //判断是否点到重复的小圆点 如果点到 则不需要再次运行
                if (index === idx) {
                    return; 
                };

                //需要让idx 成为 参数中的index
                idx = index;

                //之后直接写动画即可
                $carousel.stop().animate({
                    left: -idx * width
                }, 1000, function () {
                    //需要同步小圆点样式 所以需要调用 change();
                    change();
                });

            });
        });

        //小圆点的样式 只跟idx有关系
        function change() {
            //循环小圆点
            $cirs.each(function (index, value) {
                //判断  如果index === idx 则表示当前点的这一个小圆点就是点击的小圆圆
                if (index === idx) {
                    //是的话 则让小圆点添加样式
                    $(value).addClass("active");
                } else {
                    //如果不是 则移除样式
                    $(value).removeClass("active");
                };
            });
        };

        //设置定时器

        var timer = setInterval(function () {
            //设置给右按钮
            $rightBtn.trigger("click");
        }, 2000);

        //设置鼠标移入事件 当鼠标移入的时候 则清除定时器
        $box.mouseenter(function () {
            clearInterval(timer);
        });

        //设置鼠标移出事件 当鼠标移出的时候 轮播图自动播放
        $box.mouseleave(function () {
            timer = setInterval(function () {
                $rightBtn.trigger("click");
            }, 2000);
        });


        // content

        var goodsArr = [];

        //发送请求服务器上的数据之后渲染结构
        $.ajax({
            url: "../php/getGoods.php",
            type: "GET",
            dataType: "json",
            success: function (data) {

                if (!data.error) {
                    goodsArr = data.msg;
                    var p = new Pagination($paginationContainer[0], goodsArr, 0, 12);
                    //需要一个方法
                    p.display(function (arr) {8
                        //如何渲染12条数据
                        var str = `<ul class="row wrap-column list-group list-group-horizontal">`;
                        //魂环12条li出来
                        arr.forEach(value => {
                            str += ` 
                                <li class="col col-4 list-group-item" style="padding: 0 10px; border: none;" >
                            <div class="card">
                                <img src="${value.goods_small_logo}" class="card-img-top" alt="...">
                                <div class="card-body">
                                <p class="card-text"><a href="./detail.html?id=${value.goods_id}">${value.goods_name}</a></p>
                                <p class=" d-flex justify-content-md-between align-items-center card-text"><span>${value.goods_price}</span><button type="button" data-id="${value.goods_id}" class=" btn btn-dark">添加购物车</button></p>
                                </div>
                            </div>   
                        </li>
                        `;
                        });
                        str += `</ul>`;

                        return str;
                    });
                } else {
                    throw new Error("请求失败");
                }
            }

        })


