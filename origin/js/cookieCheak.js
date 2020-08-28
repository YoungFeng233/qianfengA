
        //前端操作cookie
        //获取cookie
        console.log(document.cookie)

        //浏览器没有提供操纵cookie的api ，只能自己封装方法
        function getCookie(key) {
            var cookieStr = document.cookie;
            var arr = cookieStr.split("; ");

            //循环
            for (var i = 0; i < arr.length; i++) {
                var subArr = arr[i].split("=");
                //判断
                if (arr[i].split("=")[0] === key) {
                    return subArr[1];
                }

            }

        }
        var isLogin = getCookie("islogin");
        //判断
        if (!isLogin) {
            location.href = "./login.html#" + location.href;
        }


        function setCookie(key, value) {
            document.cookie = key + "=" + value;
        };

        function clearCookie(key) {
            document.cookie = key + "=" + "aaa;max-age=-1";
        }

