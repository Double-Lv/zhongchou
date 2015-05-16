$(function(){
	var $textarea = $(".publish-block .textarea");
	$textarea.keyup(function(){
        show_key();
    });
	$(".publish-btn").click(function(){
	    var topicContent= $textarea.val();
	    var len = topicContent.length;
	    if(len > 140){
	        alert("输入字符不能超过140字！请重新输入！");
	        return;
	    }
	    if(topicContent != ""){
	        
	        jQuery.ajax({
	            type: "get",
	            url: url,
	            data: {},
	            dataType: "jsonp",
	            success: function(data){
	                if(data.msg=="true"){
	                    $textarea.val("");
	                    $(".publish-block .more-word").html(140);
	                }else{
	                	alert(data.msg);
	                }
	            },
	            error:function(e){
	                alert("error");
	            }
	        });

	    }else{
	        alert("请输入话题内容！")
	    }
	});
	function show_key(){
	    var text= $textarea.val();
	    var len;//记录剩余字符串的长度
	    if(text.length>=140)
	    {
	        $textarea.val(text.substr(0,140));
	        len=0;
	    }
	    else
	    {
	        len=140-text.length;
	    }
	    $(".publish-block .more-word").html(len);
	}
})
