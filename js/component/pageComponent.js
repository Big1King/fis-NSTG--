define(['jquery','third_party/bootstrap/js/bootstrap.min'],function(){
	var components=function(){}
	components.prototype.modalView=function(options){
		var defaultOptions={
			id:"modalView",
			title:"",
			width:"",
			height:"",
			content:"",//直接显示到内容，content内容区域显示内容与URL只能显示一个。
			url:"",//加载URL显示到内容区域显示内容与content只能显示一个
			okBtnName:"确定",
			canelBtnName:"取消",
			okClick:function(){},
			canelClick:function(){},
			modalFooterShow:"true"
		}
		options=$.extend({},defaultOptions,options);
		var template='<div class="modal fade" id="'+options.id+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'+
						  '<div class="modal-dialog" role="document">'+
						'<div class="modal-content" style="left: -10000px;">'+
						  '<div class="modal-header">'+
						'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
						'<h4 class="modal-title" id="myModalLabel">'+options.title+'</h4>'+
						  '</div>'+
						  '<div class="modal-body">'+options.content+
						  '</div>'+
						  '<div class="modal-footer '+(options.modalFooterShow=='true'?'':'hide')+'">'+
								'<button type="button" class="btn btn-primary">'+options.okBtnName+'</button>'+
								'<button type="button" class="btn btn-default" data-dismiss="modal">'+options.canelBtnName+'</button>'+
					      '</div>'+
					    '</div>'+
					 ' </div>'+
					'</div>';
		$("#"+options.id).remove();
		$('body').append(template);
		if(typeof options.okClick=="function"){
			$('#'+options.id+' .modal-footer .btn-primary').unbind().click(function(){
				options.okClick();
			});
		}
		if(typeof options.canelClick=="function"){
			$('#'+options.id+' .modal-footer .btn-default').unbind().click(function(){
				options.canelClick();
			});
			$('#'+options.id+' .close').unbind().click(function(){
				options.canelClick();
			});
		}
		if(options.url){
			$('#'+options.id+' .modal-body').load(options.url);
		}
		$('#'+options.id).unbind().on('shown.bs.modal', function () {
		  var _content=$('#'+options.id+' .modal-content');
		  if(options.width){
		  	 _content.css({"width":options.width});
		  }
		  if(options.height){
		  	 _content.css({"height":options.height});
		  }
		  var h=document.documentElement.clientHeight/2-_content.height()/2-50;
		  _content.css({"margin-top":h,"left":"auto"});
		})
		$('#'+options.id).modal();
	}
	return components;
});