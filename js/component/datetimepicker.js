define(["/third_party/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min","third_party/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN"],function(){
	var datetimepicker=function (selector){
		this.selector=selector;
	}
	datetimepicker.prototype.init=function(){
		$(this.selector).each(function(){
			var format=$(this).attr("data-date-format")||"yyyy-mm-dd";
			var weekStart=$(this).attr("weekStart")||0;
			var startDate=$(this).attr("startDate");
			var endDate=$(this).attr("endDate");
			var daysOfWeekDisabled=$(this).attr("daysOfWeekDisabled")||[];
			var autoclose=$(this).attr("autoclose")||true;
			var startView=$(this).attr("startView")||2;
			var minView=$(this).attr("minView")||0;
			var maxView=$(this).attr("maxView")||4;
			var todayBtn=$(this).attr("todayBtn")||false;
			var todayHighlight=$(this).attr("todayHighlight")||false;
			var keyboardNavigation=$(this).attr("keyboardNavigation")||true;
			var forceParse=$(this).attr("forceParse")||true;
			var minuteStep=$(this).attr("minuteStep")||5;
			if(format=="yyyy"){
				minView=4;
			}
			if(format=="yyyy-mm"){
				minView=3;
			}
			if(format=="yyyy-mm-dd"){
				minView=2;
			}
			if(format=="yyyy-mm-dd hh"){
				minView=1;
			}
			if(format=="yyyy-mm-dd hh:ii"){
				minView=0;
			}
			
			var options={language:global.language,format:format,weekStart:weekStart,startDate:startDate};
			options.endDate=endDate;
			options.daysOfWeekDisabled=daysOfWeekDisabled;
			options.autoclose=autoclose;
			options.startView=startView;
			options.minView=minView;
			options.maxView=maxView;
			options.todayBtn=todayBtn;
			options.todayHighlight=todayHighlight;
			options.keyboardNavigation=keyboardNavigation;
			options.forceParse=forceParse;
			options.minuteStep=minuteStep;
			options.bootcssVer=3;
			$(this).datetimepicker(options);
		});
	}
	return datetimepicker;
});