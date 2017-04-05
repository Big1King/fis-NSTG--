define(["third_party/jquery-validationEngine/js/jquery.validationEngine","third_party/jquery-validationEngine/js/jquery.validationEngine-zh_CN"],function(){
	require("js/component/form/form.css");
	var formValidation=function(selector){
		var form=$(selector);
		// 自定义参数调用
		form.validationEngine('attach', {
		  promptPosition: 'centerRight',
		  addPromptClass: 'formError-text',
		  validationEventTrigger:'change blur',
		  scroll: false
		});
		$(".submit",form).click(function(){
			var url=form.attr("action");
			var successFun=form.attr("successFun");
			var beforeFun=form.attr("beforeFun");
			var successTarget=form.attr("successTarget");
			
			var options={
				url:url,
				data:form.serialize(),
				beforeSend:function(){
					if(beforeFun){
						var fun=eval("("+beforeFun+")");
						if(typeof fun ==="function"){
							fun()
						}
					}
					var flag=form.validationEngine('validate');
					return flag;
				},
				success:function(data){
					if(successFun){
						var fun=eval("("+successFun+")");
						if(typeof fun ==="function"){
							fun()
						}
					}
					if(successTarget){
						$("#content").load(successTarget);
					}
				},
				error:function(){
					
				}
			};
			$.ajax(options);
		});
	}
	return formValidation;
});