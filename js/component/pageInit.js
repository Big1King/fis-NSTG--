define(function(){
	var pageInit ={};
	pageInit.init=function(){
		//时间控件初始化
		require(["js/component/datetimepicker"],function(datetimepicker){
			var datetimepicker=new datetimepicker(".datetimepicker");
			datetimepicker.init();
		});
		//表单
		require(["js/component/form/form"],function(form){
			var form=new form("form.validation");
		});
		//省市区下拉
		require(["js/component/distpicker/dispicker_choose"],function(dispicker){
			var dispicker=new dispicker(".distpicker");
			dispicker.init();
		});
		//load
		require(["js/component/aload/aload"],function(aload){
			var aload=new aload("[data-loadmode]");
			aload.init();
		});
		//icheck
		require(["js/component/icheck/icheckload"],function(icheckBox){
			var icheckBox=new icheckBox("input[icheck-checkbox]");
			icheckBox.init();
		});
		
		//弹出框
		require(["js/component/pageComponent"],function(pageComponent){
			$('[data-trigger=modal]').attr("inner-href",$('[data-trigger=modal]').attr("href"));
			$('[data-trigger=modal]').removeAttr("href");
			$('[data-trigger=modal]').click(function(e){
				var url=$(this).attr("inner-href")||"";
				var title=$(this).attr("data-title")||"";
				var okclick=$(this).attr("okclick")||"";
				var canelClick=$(this).attr("canelClick")||"";
				var modalFooterShow=$(this).attr("modalFooterShow")||"true";
				var component=new pageComponent();
				component.modalView({url:url,title:title,okClick:okclick,canelClick:canelClick});
			});
		});
		
		require(["js/component/pageComponent"],function(pageComponent){
			$('[data-trigger=modal-content]').click(function(e){
				var content=$(this).attr("inner-content")||"";
				console.log(content)
				var title=$(this).attr("data-title")||"";
				var okclick=$(this).attr("okclick")||"";
				var canelClick=$(this).attr("canelClick")||"";
				var modalFooterShow=$(this).attr("modalFooterShow")||"true";
				var component=new pageComponent();
				component.modalView({content:content,title:title,okClick:okclick,canelClick:canelClick});
			});
		});
		//tooltip悬浮提示
		$("[data-trigger=tooltip]").each(function(){
			$(this).attr("data-toggle","tooltip");
			$(this).attr("data-placement","bottom");
			$(this).attr("title",$(this).attr("data-content"));
			$(this).tooltip({trigger:"hover"});
		});
		//popover弹出框
		$("[data-trigger=popover]").each(function(){
			$(this).attr("data-toggle","popover");
			$(this).attr("data-placement","bottom");
			$(this).attr("data-container","body");
			$(this).popover({trigger:"hover"});
		});
		//IE8 placeholder
		if(navigator.userAgent.indexOf("MSIE 8.0")){
			require(["third_party/jquery/jquery.placeholder.min"],function(){
				$('input, textarea').placeholder();
			});
		}
	}
	return pageInit;
});