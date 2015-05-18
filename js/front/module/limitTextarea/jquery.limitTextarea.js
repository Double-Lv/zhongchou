(function($){
  $.fn.limitTextarea = function(opts){
	  var defaults = {
	  	isByte : false,//是否按字符计算，一个中文算两个字符
        maxNumber:140,//允许输入的最大字数
		position:'bottom',//提示文字的位置，top：文本框上方，bottom：文本框下方
		onOk:function(el){el.removeClass('valid_error').css('background-color','white');},//输入后，字数未超出时调用的函数
		onOver:function(el){el.addClass('valid_error').css('background-color','lightpink');}//输入后，字数超出时调用的函数   
	  }
	  var option = $.extend(defaults,opts);
	  var getByteStrLen = function(str){
        str = str || "";
        return str.replace(/([^\x00-\xff])/g, "$1 ").length;
      }
	  this.each(function(){
		  var _this = $(this);
		  var bytestr = option.isByte ? '符' : '';
		  var info = '<div class="lt_info formtip">剩余<span>'+(option.maxNumber- _this.val().length)+'</span>字'+bytestr+'</div>';
		  var fn = function(){
			var extraNumber = option.isByte ? option.maxNumber - getByteStrLen(_this.val()) : option.maxNumber - _this.val().length;
			var $info = _this.closest('div').find('.lt_info');
			if(extraNumber>=0){
			  $info.html('剩余<span>'+extraNumber+'</span>字'+bytestr);	
			  option.onOk(_this);
			}
			else{
			  $info.html('超出<span>'+(-extraNumber)+'</span>字'+bytestr); 
			  option.onOver(_this);
			}  
		  };
		  switch(option.position){
			  case 'top' :
			    _this.before(info);
			  break;
			  case 'bottom' :
			  default :
			    if(_this.next('.Validform_checktip').length>0){
			    	_this.next('.Validform_checktip').after(info);
			    }
			    else{
			    	_this.after(info);	
			    }
		  }
		  //绑定输入事件监听器
		  if(window.addEventListener) { //先执行W3C
			_this.get(0).addEventListener("input", fn, false);
		  } else {
			_this.get(0).attachEvent("onpropertychange", fn);
		  }
		  if(window.VBArray && window.addEventListener) { //IE9
			_this.get(0).attachEvent("onkeydown", function() {
			  var key = window.event.keyCode;
			  (key == 8 || key == 46) && fn();//处理回退与删除
			});
			_this.get(0).attachEvent("oncut", fn);//处理粘贴
		  }		  
	  });   
  }	
})(jQuery)