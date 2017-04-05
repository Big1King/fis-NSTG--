define(["jquery","/third_party/md5.min"],function($,md5){
	var aLoad=function (load){
		this.load=load;
	}
	aLoad.prototype.init=function(){
		$(this.load).not(".aloaded").each(function(){
			var loadBox = $(this).attr("data-load")||"#content";
			var loadMode = $(this).attr("data-loadmode")||"load";
			var hrefStr=$(this).attr("href");
			$(this).attr("inner-href",hrefStr);
			$(this).addClass("aloaded");
			$(this).removeAttr("href");
			//load html片段加入路由
			var fg=hrefStr.split('/');
			var route=md5("/"+fg[fg.length-1]);
			var newHref="#"+route;
			$(this).attr("href",newHref);
			Router.route(route,function(){
				if(loadMode == "load"){
					$(loadBox).load(hrefStr);
				}
				if(loadMode == "iframe"){
					$(loadBox).html('<iframe data-src='+loadBox+' border="0" marginwidth="0" marginheight="0" scrolling="no"  frameborder="0" class="data-'+loadBox+'"></iframe>').find("iframe[data-src="+loadBox+"]").attr("src",hrefStr);
				}
				getParamFrom(hrefStr);
			});
		});
	}
	return aLoad;
});