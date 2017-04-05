define(["/third_party/icheck/js/icheck","/third_party/icheck/js/custom"],function(){
require("/third_party/icheck/skins/all.css");
require("/css/component/icheck/icheckload.css");
 	var icheckBox=function (icheckObj){
		this.icheckObj=icheckObj;
	}
	icheckBox.prototype.init=function(){
		$(this.icheckObj).not("icheckedloaded").each(function(){
	        $(this).iCheck({
	            checkboxClass: 'icheckbox_minimal-green',
	            radioClass: 'icheckbox_minimal-green',
	            increaseArea: '20%'
	        });
	 	});
	 	$(this.icheckObj).addClass("icheckedloaded");
	}
	return icheckBox;
});