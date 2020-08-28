    // 获取元素
    var waterfall = document.getElementById("waterfall");
    // 列容器数组
    var lisArr = [];
    // 定义高度映射数组
    var heightArr = [];
    // 图片数组
    var imgsArr = [];
    // 定义li宽度的值
    var liWidth = 0;

    function render() {
        waterfall.innerHTML = "";
        lisArr = [];
        heightArr = [];
        var num = 0;
        // 当页面加载的时候 根据页面的宽度 设置瀑布流容器的宽度
        var width = window.innerWidth;
        if (width >= 1300) {
            waterfall.style.width = "1200px";
            num = 6;
            liWidth = 200;
        } else if (width >= 950) {
            waterfall.style.width = "900px";
            num = 5;
            liWidth = 900 / 5;
        } else {
            waterfall.style.width = "700px";
            num = 4;
            liWidth = 700 / 4;
        }
        for (var i = 0; i < num; i++) {
            var li = document.createElement("li");
            // 往高度映射数组中push 0
            heightArr.push(0);
            // 根据页面的宽度创建多少个li
            lisArr.push(li);
            // 将这些li放入瀑布流
            waterfall.appendChild(li);
        }
        imgsArr.forEach(value => {
            var min = Math.min.apply("", heightArr);
            var idx = heightArr.indexOf(min);
            lisArr[idx].appendChild(value);
            heightArr[idx] += +value.getAttribute('data-height');
        })

    }


    window.onresize = function () {
        render();
    }

    render();

    var num = 1;

    sendAjax(num);

    // 发送ajax请求数据
    function sendAjax(numb) {
        QF.get(`/data/0${numb}.json`, {}, function (data) {
            console.log(data);
            // 此时要渲染页面 
            // 应该创建元素 
            // 上树 根据列容器的高度决定上哪个树 上最矮的那一列
            data.pins.forEach(value => {
                var div = document.createElement("div");
                
                div.setAttribute("data-height", value.file.height);
                div.setAttribute("data-width", value.file.width);
                div.innerHTML = `
                    <div class='item'>
                        <div class="img">
                            <img src="//hbimg.huabanimg.com/${value.file.key}_/fw/480/format/webp" />
                        </div>
                        <p class="title">
                        ${value.board.title}
                        </p>
                        <div class="author">
                            ${value.user.username}
                        </div>
                    </div>
                `;
                imgsArr.push(div);
            });

            // 拿着imgsArr中的每一个元素 排列到lisArr中
            // 拿着其中一个元素 去lisArr数组中找最矮的那一列
            // 因为有映射数组的原因 我们不直接找li 而是找映射数组的最小值的下标
            imgsArr.forEach(value => {
                // 获取高度映射数组中最小的数
                var min = Math.min.apply("", heightArr);
                // 获取最小的数所在的下标
                var idx = heightArr.indexOf(min);
                // 对应的li元素就是最矮的那个
                lisArr[idx].appendChild(value);
                // 对应的映射数组中的值 也应该发生变化
                heightArr[idx] += +value.getAttribute('data-height') * liWidth / value.getAttribute("data-width");
            });
            num++;
        });
    }

    // 定时器
    var timer = null;
    window.onscroll = function () {
        // 判定用户是否拉到底部 
        // 页面卷动值
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        // 当前视口高
        var clientHeight = window.innerHeight;
        // 整个页面高
        var pageHeight = document.body.clientHeight;
        // 决定放宽一点条件 只要距离页面底部不到500px 就开始发送请求
        if (pageHeight - scrollTop - clientHeight < 500) {
            // sendAjax(num);
            clearTimeout(timer);
            timer = setTimeout(function () {
                sendAjax(num);
            }, 200);
        }
    }
