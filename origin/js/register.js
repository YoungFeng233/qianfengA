
    // 实现用户名验证功能
    var $username = $("#username");
    var $password = $("#password");
    var $submitBtn = $("#submitBtn");

    //定义两把锁 一把决定用户名是否通过  一把验证密码石头通过
    var user_lock = false;
    var pass_lock = false;
   
    //当输入框失去焦点的时候 发送请求
    $username.blur(function() {
        // debugger
        //获取用户输入的文本
        var val = $username.val();

        //定义正则表达式
        var reg = /^[^\d]\w{6,10}$/;

        //验证是否符合规则
        if(!reg.test(val)){ 
            //如果不通过 则直接返回
            alert("请输入正确的格式");
            user_lock = false;
            return;
        };
           // debugger
        $.ajax({
               
            url:"/php/checkusername.php",
            data:{
                username:$username.val()
            },
            type:"GET",
            dataType:"json",
            success: function(data) {
                alert(data.msg);
                user_lock = true;
            },
            error: function(err) {
                alert(err.msg);
                user_lock = false;
            }
        });

        // //通过验证之后发送ajax请求
        // QF.pGet("../php/checkusername.php",{username:val})
        // .then(function(data) {
        //     console.log(data);
        //     //判定是否成功注册
        //     if (!data.error) {
        //         //如果注册成功则直接提示成功
        //        
        //         user_lock = true;
        //     } else {
        //         //如果失败  则强制抛出一个错误 则直接被catch 接收
        //         throw new Error(data.msg);
        //     };
        // })
        // .catch(function(err) {
        //     console.log(err);
        //     user_lock = false;
        // });
    });
   
    //当密码框失去焦点时 发送请求
    $password.blur(function() {
        //获取密码框输入的内容
        var val = $password.val();

        //写正则表达式
        var reg = /^\w{8,16}$/;

        //判断是否符合表达式
        if(!reg.test(val)) {
            //如果不符合
            alert("密码不符合，请重新输入8-16位数字或字母");
            pass_lock = false;
            return;
        }
        pass_lock = true;
    });

    //点击注册按钮
    $submitBtn.click(function() {
        //思路：不可直接发送请求，必须先看用户名与密码是否都完全正确且通过验证之后 才可发送请求

        //通过判定两把锁的状态决定是否发送请求
        if(!(user_lock && pass_lock)) {
            return;
        }

        //通过之后就发送ajax
        // QF.pPost("../php/regist.php", {username: username.value, password: password.value})
        // .then(function(data) {
        //    location.href = "./login.html";
        // }); 

        $.ajax({
            url:"../php/regist.php",
            type:"POST",
            data:{
                username:$username.val(),
                password:$password.val()
            },
            success: function(data) {
            location.href = "./login.html";
            },
            error: function(err) {
                alert("err.msg");
                
            },
            dataType:"json"
        });

    });
