var global=function(){
	this.language=navigator.browserLanguage?navigator.browserLanguage:navigator.language; 
};
global=new global();

//定义窗口大小发生改变时触发
$(window).resize(function(){
	var bodyH=window.document.documentElement.clientHeight<window.document.documentElement.scrollHeight?window.document.documentElement.scrollHeight:window.document.documentElement.clientHeight;
	var contentH=bodyH-140;
	//左侧树赋高度
	$(".leftMenu").height(contentH);
});
//浏览记录路由
function Router(){ 
    this.routes = {}; 
    this.curUrl = ''; 
 
    this.route = function(path, callback){ 
        this.routes[path] = callback || function(){}; 
    }; 
 
    this.refresh = function(){ 
        this.curUrl = location.hash.slice(1) || '/'; 
        this.routes[this.curUrl](); 
    }; 
 
    this.init = function(){ 
        window.addEventListener('load', this.refresh.bind(this), false); 
        window.addEventListener('hashchange', this.refresh.bind(this), false); 
    } 
}
Router =new Router();
Router.init();
Router.route("/",function(){
//		$(loadBox).load(hrefStr);
		$("#content").html("");
});

//进入主页面时自动清空锚链接
location.hash="";

//
function getParamFrom(url){
	$("#content").removeData();
	var params=url.split("?")[1];
	if(params){
		params=params.split("&");
		for(var i in params){
			var param=params[i].split("=");
			$("#content").data(param[0],param[1]);
		}
	}
}
