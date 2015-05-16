//config  域名
var config = {'url':'www.baidu.com'}


$(function(){
	//fixtool--go-to-top
	$(window).scroll(function(){
		//show
		if($(window).scrollTop()>120){
			$('.fixtool').fadeIn(600);
		}
		else{
			$(".fixtool").fadeOut(400);
		}
	});
	$('.fixtool-gotop').on('click',function(){
		$('body,html').animate({scrollTop:0},1000);
	})
});
