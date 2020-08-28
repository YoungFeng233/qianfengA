    // 实现用户名验证功能
    var $username = $("#username");
    var $password = $("#password");
    var $submitBtn = $("#submitBtn");
    // 定义两把锁  一把决定用户名是否验证通过 一把决定密码是否验证通过
    var user_lock = false;
    var pass_lock = false;

    //用户名失焦时
    $username.blur(function(){
         // 获取用户输入的文本
         var val = $username.val();
        // 定义正则表达式
        var reg = /^[^\d]\w{6,10}$/;
        // 验证是否符合正则的规则
        if(!reg.test(val)){
            alert("请输入正确的用于名格式");
            user_lock = false;
            return;
        }
        //如果通过了就开锁
        user_lock = true;
    });

    //当密码失焦时
    $password.blur(function () {
        // 获取用户输入的文本
        var val = $password.val();
        // 定义正则表达式
        var reg = /^[^\d]\w{6,10}$/;
        // 验证是否符合正则的规则
        if (!reg.test(val)) {
            alert("密码不符合正则验证");
            pass_lock = false;
            return;
        }
        //如果通过了就开锁
        pass_lock = true;
    });

    //当点击提交时
    $submitBtn.click(function(){
        //验证两把锁是不是已经开了
        if(!(user_lock && pass_lock)){
            //其中一把锁验证失败后 直接返回
            return;
        }

        //通过之后发送ajax请求
        $.ajax({
            url: "/php/login.php",
            type: "POST",
            data:{
                username: $username.val(),
                password: $password.val()
                

            },
            success: function(data) {
                if(!data.error) {
                    // 需获取URL的hash部分
                     var targetURL = location.hash.slice(1) ||"./index.html"; 

                    //登录成功后跳转到列表页面
                    location.href = targetURL;
                };
            },
            error: function(err) {
                alert("用户名或密码错误");
            }
        });
        
        // QF.pPost("../php/login.php", {username:username.value , password:password.value})
        // .then((data) => { 
        //     //判断用户名和密码是否验证成功
        //     if(!data.error){
        //         // 需获取URL的hash部分
        //         var targetURL = location.hash.slice(1) ||"./list.html";

        //         //登录成功后跳转到列表页面
        //         location.href = targetURL;
        //     }else{
        //         throw new Error(data.msg);
        //     }
        // })
        // .catch(function(data){
        //     console.log(data);
        // })

    });

