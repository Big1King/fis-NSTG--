define(["js/component/pageInit","js/component/loading"],function(){
	var _load=$.fn.load;
	var loading=require("loading");
	
	$.fn.load=function(url, data, callback, type){
		var params=[url,data,callback,type];
		if(typeof data =="function"){
			var _data=data;
			data=function(){
				_data(arguments);
				require("pageInit").init();
			}
			arguments[1]=data;
		}else{
			var _callback=callback;
			callback=function(){
				if(typeof _callback=="function"){
					_callback(arguments);
				}
				require("pageInit").init();
			}
			params[2]=callback;
		}
		_load.apply(this,params);
	}
	
	
    //备份jquery的ajax方法  
    var _ajax=$.ajax;  
    //重写jquery的ajax方法  
    $.ajax=function(opt){  
        //备份opt中error和success方法  
        var fn = {  
            error:function(XMLHttpRequest, textStatus, errorThrown){},  
            success:function(data, textStatus){}  ,
            beforeSend:function(XMLHttpRequest){return true}
        }  
        if(opt.error){  
            fn.error=opt.error;  
        }  
        if(opt.success){  
            fn.success=opt.success;  
        }
        if(opt.beforeSend){
        		fn.beforeSend=opt.beforeSend;
        }
          
        //扩展增强处理  
        var _opt = $.extend(opt,{  
            error:function(XMLHttpRequest, textStatus, errorThrown){  
                //错误方法增强处理  
                fn.error(XMLHttpRequest, textStatus, errorThrown);  
                loading.end();
            },
            beforeSend:function(){
            		if(!fn.beforeSend.apply(this,arguments)){
            			return false;
            		}
            		loading.start();
            },
            success:function(data, textStatus){  
                //成功回调方法增强处理  
                fn.success(data, textStatus);
                loading.end();
                $(window).resize();
            }  
        });  
        return _ajax(_opt);
     }
});