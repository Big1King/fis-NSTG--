$(function(){
	$(".leftMenu ul li").click(function(){
		$(".leftMenu ul li").removeClass("active");
		$(this).addClass("active");
	});
})
