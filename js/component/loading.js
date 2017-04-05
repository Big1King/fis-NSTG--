define([],function(){
	require("/css/component/loading.css");
	var loading=function(){
		this.tmpl= $('<div class="loading-drop">'+
						'<div class="loading">'+
							'<div class="loading-icon"></div>'+
							'<div class="loading-des">正在加载中...</div>'+
						'</div>'+
					'</div>');
	}
	loading.prototype.start=function(){
		$('body').append(this.tmpl);
	}
	loading.prototype.end=function(){
		this.tmpl.remove();
	}
	return new loading();
});