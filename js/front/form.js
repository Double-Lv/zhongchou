var error = {
    "userisnull": "用户名不能为空",
    "userexist": "用户名已存在",
    "userlenth": "请输入4到20的用户名",
    "userpattern": "用户名格式不正确",
    "userright": "用户名可用",
    "mobileerror": "手机号格式不正确",
    "mobilenull" : "手机号码不能为空",
    "mobileright": "手机号输入正确",
    "coderight": "验证码正确",
    "codeerror": "验证码错误",
    "codeisnull": "请输入验证码",
    "passisnull": "密码不能为空",
    "passwrong" : "密码格式不正确",
    "passnotsame" : "两次输入的密码不一致"
};

// center pop
function centerPop(popId){
  var $popBody = popId,
    _pop_w = $popBody.outerWidth(),
    _pop_h = $popBody.outerHeight(),
    scrollTop = $(window).scrollTop(),
    scrollLeft = $(window).scrollLeft();
  $popBody.css({'margin-left':-_pop_w/2,'margin-top':-_pop_h/2});
}

//弹出层的时候清除之前缓存数据，重置状态
function clearCache(){
  $('.error-text').empty().hide();
  $('input.error').removeClass('error');
  $('.field input').val('');
  $('.mobile-check').val('点击获取')

}

//btn open register login find password

function openPop(layerClass, tpl){
  //btn.on('click',function(){
    if($('#shadeLayer').length != 0){
      $('#shadeLayer').remove();
      $(layerClass).remove();
    }
    $('body').append(tpl);
    $('#shadeLayer').fadeIn();
    clearCache();
    $(layerClass).css('visibility','visible').fadeIn();
    centerPop($(layerClass));

  //});
}

//close pop
$(document).on('click','.pop-close',function(){
  $('#shadeLayer').fadeOut(function(){
    $('#shadeLayer').remove();
  });
  $(this).parents('.pop-container').fadeOut(function(){
    $('.pop-container').remove();
  });

})

var registerTpl = '<div id="shadeLayer" class="pop-bg"></div>\
<div id="pop-body-register" class="pop-container">\
  <div class="pop-form">\
    <div class="title">注册<a class="icon pop-close"></a></div>\
    <div class="form-wrap register-wrap">\
      <form data-form="register" name="registerForm">\
        <div class="left-wrap register-left"><span id="registerFormError" class="error-text"></span>\
          <div class="field">\
            <input type="text" placeholder="用户名" class="userName"/>\
          </div>\
          <div class="field">\
            <input type="text" placeholder="手机号码" class="mobile"/>\
          </div>\
          <div class="field checkcode">\
            <input type="text" placeholder="手机验证码" class="mobileCode"/>\
            <input value="点击获取" type="button" class="mobile-check btn-primary-s"/>\
          </div>\
          <div class="field">\
            <input type="password" placeholder="密码(6-14个字符)" class="password"/>\
          </div>\
          <div class="field">\
            <input type="password" placeholder="确认密码" class="repeatPassword"/>\
          </div>\
          <div class="safe">\
            <label for="">\
              <input type="checkbox" checked="checked"/>我已同意并阅读\
            </label><a href="#">《农大大协议》</a>\
          </div>\
          <div class="submit">\
            <button id="registerFormBtn" class="btn-commit btn-primary btn-register">注册新账户</button>\
          </div>\
        </div>\
        <div class="right-wrap register-right">\
          <h3>已有账户登录</h3>\
          <p>已有您的农大大账户<a href="#" class="forgot-password">忘记密码</a></p><a id="register-login" class="btn-primary btn-login">登 录</a>\
        </div>\
      </form>\
    </div>\
  </div>\
</div>';

var loginTpl ='<div id="shadeLayer" class="pop-bg"></div>\
<div id="pop-body-login" class="pop-container">\
  <div class="pop-form">\
    <div class="title">登 录<a class="icon pop-close"></a></div>\
    <div class="form-wrap login-wrap">\
      <form data-form="login" name="loginForm">\
        <div class="left-wrap login-left"><span id="registerFormError" class="error-text"></span>\
          <div class="field">\
            <input type="text" placeholder="手机号码" class="mobile"/>\
          </div>\
          <div class="field">\
            <input type="password" placeholder="密码" class="password"/>\
          </div>\
          <div class="field checkcode">\
            <input type="text" placeholder="验证码" class="mobileCode"/><a><img src="http://placehold.it/80x32" alt=""/><span class="change">换一张</span></a>\
          </div>\
          <div class="safe">\
            <label for="">\
              <input type="checkbox" checked="checked"/>记住帐号\
            </label><a href="#" class="forgot-password">忘记密码</a>\
          </div>\
          <div class="submit">\
            <button id="loginFormBtn" class="btn-commit btn-primary btn-login">登 录</button>\
          </div>\
        </div>\
        <div class="right-wrap login-right">\
          <h3>新用户注册</h3>\
          <p>如果您还没有属于您的农大大账户</p><a id="login-register" class="btn-primary btn-register">注册新帐户</a>\
        </div>\
      </form>\
    </div>\
  </div>\
</div>';

var resetTpl = '<div id="shadeLayer" class="pop-bg"></div>\
<div id="pop-body-reset" class="pop-container">\
  <div class="pop-form">\
    <div class="title">密码重置<a class="icon pop-close"></a></div>\
    <div class="form-wrap col-1 reset-wrap">\
      <form data-form="resetPassword" name="resetForm"><span class="error-text"></span>\
        <div class="field">\
          <input type="password" placeholder="新密码 (6-14个字符)"/  class="password">\
        </div>\
        <div class="field">\
          <input type="password" placeholder="确认新密码"  class="repeatPassword"/>\
        </div>\
        <div class="submit">\
          <button class="btn-commit btn-primary btn-reset-confirm">确 认</button>\
        </div>\
      </form>\
    </div>\
  </div>\
</div>'

var resetSuccessTpl = '<div id="shadeLayer" class="pop-bg"></div>\
<div id="pop-body-reset-success" class="pop-container">\
  <div class="pop-form">\
    <div class="title">密码重置<a class="icon pop-close"></a></div>\
    <div class="form-wrap col-1 reset-wrap reset-success-wrap">\
      <form action="" name="resetForm"><span class="icon icon-success"></span>\
        <p>重置成功</p>\
        <div class="submit">\
          <button type="submit" id="reset-login" class="btn-primary btn-reset-confirm">登录</button>\
        </div>\
      </form>\
    </div>\
  </div>\
</div>';

var forgotTpl = '<div id="shadeLayer" class="pop-bg"></div>\
<div id="pop-body-find" class="pop-container">\
  <div class="pop-form">\
    <div class="title">找回密码<a class="icon pop-close"></a></div>\
    <div class="form-wrap col-1 reset-wrap">\
      <form data-form="forgot"  name="resetForm"><span class="error-text"></span>\
        <div class="field">\
          <input type="text" placeholder="手机号" class="mobile"/>\
        </div>\
        <div class="field checkcode">\
          <input type="text" placeholder="手机验证码" class="mobileCode"/><input type="button" class="mobile-check btn-primary-s" value="点击获取">\
        </div>\
        <div class="submit">\
          <button class="btn-commit btn-primary btn-reset-confirm">确认找回</button>\
        </div>\
      </form>\
    </div>\
  </div>\
</div>';





$(document).on('click','#register-login,#user_login',function(){
  openPop('.pop-container',loginTpl); //头部点击登录
});
$(document).on('click','#user_register,#login-register',function(){
  openPop('.pop-container',registerTpl); //头部点击zhuce
});
$(document).on('click','.forgot-password',function(){
  openPop('.pop-container',forgotTpl); //头部点击zhuce
});


$(function(){
  $(document).on('click','[data-form] .btn-commit',function(e){
     var index = 0, theform = $(this).parents('[data-form]'),
         type = theform.attr('data-form');
     var checklist = checkMap[type];

     function checking(){
        if(typeof checklist[index] == 'function' && checklist[index]() && index < checklist.length){
           index++;
           return checking();
        }else{
          theform.find('input.error').removeClass('error');
          theform.find('input[type!=button]').eq(index).addClass('error');
        }
        return true;
     }
     if(checking()){
        successCallback[type]();
     }
     return false;
  });

  var successCallback = {
      login : function(){

      },
      register : function(){},
      resetPassword : function(){
        $('#shadeLayer').remove();
        $('.pop-container').remove();

        $('body').append(resetSuccessTpl);
        $('.pop-container').css('visibility','visible');
      },
      forgot : function(){

      }
  };

  $(document).on('click','#reset-login',function(){
    $('#user_login').trigger('click');
  });

  var CheckConfig = [
        function(){
          var userName = $(".userName").val();
          if(userName == ''){
            $(".error-text").html(error.userisnull).css('display','inline-block');
            return false;
          }
          if(userName.length < 4 || userName.length > 20){
            $(".error-text").html(error.userlenth).css('display','inline-block');
            return false;
          }      
          if(/^[A-Za-z0-9_\u4e00-\u9fa5]+$/.test(userName) == false){
            $(".error-text").html(error.userpattern).css('display','inline-block');
            return false;
          }
          return true;
        },
        function(){
          var phone = $('.mobile').val();  
          if(phone == ''){
            $(".error-text").html(error.mobilenull).css('display','inline-block');
            return false;    
          }
          if(/1\d{10}$/.test(phone) == false){
            $(".error-text").html(error.mobileerror).css('display','inline-block');
            return false;    
          }
          return true;
        },
        function(){
          var vcode = $('.mobileCode').val();
          if(vcode == ''){
            $(".error-text").html(error.codeisnull).css('display','inline-block');
            return false;    
          }
          return true;  
        },
        function(){
          var passwd = $('.password').val();
          if(passwd == ''){
            $(".error-text").html(error.passisnull).css('display','inline-block');
            return false;
          }
          if(/^[0-9A-Za-z_]{6,14}$/.test(passwd) == false){
            $(".error-text").html(error.passwrong).css('display','inline-block');
            return false;
          }
          return true;  
        },
        function(){
          var repeatPassWd = $('.repeatPassword').val();
          var passwd = $('.password').val();
          if(passwd == ''){
            $(".error-text").html(error.passisnull).css('display','inline-block');
            return false;
          }
          if(repeatPassWd != passwd){
            $(".error-text").html(error.passnotsame).css('display','inline-block');
            return false;
          }
          return true;    
        }
  ];
  var checkMap = {
      login : [CheckConfig[1], CheckConfig[3], CheckConfig[2]],
      register : CheckConfig,
      resetPassword : [CheckConfig[3], CheckConfig[4]],
      forgot : [CheckConfig[1],CheckConfig[2]]
  };


  $(document).on('blur', '[data-form] input[type!=button]', function(){
      var self = this;
      var level = $('[data-form] input[type!=button]').index(self);
      var type = $(this).parents('[data-form]').attr('data-form');
      var checklist = checkMap[type];

      console.log(type);
      if(checklist[level]() == false){
        $('.form-wrap input.error').removeClass('error');
        $('.form-wrap input[type!=button]').eq(level).addClass('error');
      }else{
        $('.form-wrap input.error').removeClass('error');
        $(".error-text").html('').hide();
      }
  });

 
  $(document).on('click','.mobile-check',function(){
    console.log(0);
    if($('.mobile').val()==''){
      $('.mobile').addClass('error')
      $('.error-text').html(error.mobilenull).css('display','inline-block');
    }else{
      countDown($('.mobile-check')[0]);
    }
  });

  //验证码倒计时
  function countDown(element){
    var timer;
    var count = 60;
    var curCount;
    curCount = count;
    
     $(element).attr("disabled", "true").addClass('disabled');

     $(element).val(curCount + "秒后再试");
     timer = window.setInterval(SetRemainTime, 1000);

    function SetRemainTime() {
        if (curCount == 0) {
            window.clearInterval(timer);
            $(element).removeAttr("disabled");
            $(element).val("重新发送").removeClass('disabled');
        }
        else {
            curCount--;
            $(element).val(curCount + "秒后再试");
        }
    }
  }
  
})





