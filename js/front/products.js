//dropdown
$(function(){
	$('.dropdown .select').on('click',function(){
		$(this).next('.select-list').toggle();
	});
});

