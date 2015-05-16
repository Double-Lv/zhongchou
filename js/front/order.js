$(function(){
  $('.invoice .choose input').on('click',function(){
    var item = $("#yes:radio:checked");
    if(item.length){
      $('.invoice .choose-yes').show();
    }else{
      $('.invoice .choose-yes').hide();
    }
    
  });
  $('.address-list li').on('click',function(){
  	$(this).addClass('selected').siblings('li').removeClass('selected');
  });
  $('.add-address').on('click',function(){
  	$('#shadeLayer').fadeIn();
  	$('.pop-container').css('visibility','visible');
  	centerPop($('#pop-body-address'));
  })
  	// center pop
	function centerPop(popId){
	  var $popBody = popId,
	    _pop_w = $popBody.outerWidth(),
	    _pop_h = $popBody.outerHeight(),
	    scrollTop = $(window).scrollTop(),
	    scrollLeft = $(window).scrollLeft();
	  $popBody.css({'margin-left':-_pop_w/2,'margin-top':-_pop_h/2});
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
});