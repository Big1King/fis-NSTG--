define(function(){
	var defaultOptions={
		url:"",//对应后台请求，返回格式{code: "0",msg:"ok",version:"1.0.0",data:{total:1018,list:[{user_id: "1",user_name: "李三",sex: "男",age: 29},{user_id: "5",user_name: "李萍",sex: "女",age: 17}]}}
		data:{},//参数
		target:"",//内容显示区域，jquery selector
		pageTarget:"",//分页显示位置，jquery selector
		rowTemplate:"",//显示行模板
		success:function(){},//访问url后回调
		pageSize:5,//每页显示多少条信息
		pageSelect:[5,10,20,50,100],
		currentNo:1,
		prevBtnName:"上一页",
		nextBtnName:"下一页"
	}
	var pagination =function(options){
		require("js/component/pagination/pagination.css")
		options=$.extend(true, defaultOptions,options);
		this.options=options;
		var selectStr="";
		for(var i in options.pageSelect){
			var pageSize=options.pageSelect[i];
			selectStr+="<option value='"+pageSize+"'>"+pageSize+"</option>";
		}
		this.template='<div class="myPagination">'+
							'<nav aria-label="Page navigation">'+
							'<div class="page-info-fl"><div class="page-no">共<span>1</span>页</div> <div class="page-to">'+
							'每页<select class="page-select">'+
									selectStr+
								'</select>条'+
							'</div></div>'+
							  '<ul class="pagination">'+
							    '<li>'+
							      '<a  aria-label="Previous">'+options.prevBtnName+
							      '</a>'+
							    '</li>'+
							    '<li>'+
							      '<a  aria-label="Next">'+
							        options.nextBtnName+
							      '</a>'+
							    '</li>'+
							  '</ul>'+
							'<div class="page-info"><div class="page-to">'+
							'到第<input type="text" />页<input type="button" value="确定"/>'+
							'</div></div>'+
							'</nav>'+
						'</div>';
		this.getPageData=function(){
			var parameters={
				page:options.currentNo||1,
				page_size:options.pageSize
			}
			if(typeof options.data=="object"){
				parameters=$.extend(options.data,parameters);
			}
			if(typeof options.data=="string"&&options.data){
				parameters=options.data+"&page="+(options.currentNo||1)+"&page_size="+options.pageSize;
			}
			$.ajax({
				type:"get",
				url:options.url,
				data:parameters,
				async:true,
				dataType:"json",
				success:function(data){
					//成功后回调
					if(options.success){
						options.success.apply(this,arguments);
					}
					var no=getPageNoLi(data);
					var _template=$(template);
					_template.find(".page-no>span").html(options.pageNos);
					_template.find(".page-to>input[type=text]").val(options.currentNo);
					_template.find(".pagination li:first-child").after(no);
					var temp=getRowTemplate(data);
					$(options.target).html(temp);
					_template.find("[aria-label=Previous]").click(function(){
						if(options.currentNo>1){
							options.currentNo=parseInt(options.currentNo)-1;
							getPageData();
						}
					});
					_template.find("[aria-label=Next]").click(function(){
						if(options.currentNo<options.pageNos){
							options.currentNo=parseInt(options.currentNo)+1;
							getPageData();
						}
					});
					_template.find(".page-to>input[type=text]").keyup(function(e){
						if(e.keyCode=="13"){
							var num=$(this).val();
							if(options.pageNos<parseInt(num)) 
							options.currentNo=options.pageNos
							if(parseInt(num)<1)
							options.currentNo=1
							getPageData();
						}
					});
					_template.find(".page-to>input[type=button]").click(function(){
						var num=_template.find(".page-to>input[type=text]").val();
						if(options.pageNos<parseInt(num)) 
						options.currentNo=options.pageNos
						if(parseInt(num)<1)
						options.currentNo=1
						getPageData();
					});
					_template.find(".page-to>select option[value="+options.pageSize+"]").attr("selected","selected")
					_template.find(".page-to>select").change(function(){
						options.pageSize=$(this).val();
						options.currentNo=1;
						getPageData();
					});
					if(!options.pageTarget){
						$(options.target).append(_template);
					}else{
						$(options.pageTarget).append(_template);
					}
				}
			});
		}
		this.getPageNoLi=function(data){
			var temp='<li class="{{active}}"><a >{{pageNo}}</a></li>';
			var _temp="";
			var pageNos=Math.ceil(data.data.total/options.pageSize);
			options.pageNos=pageNos;
			var current=parseInt(options.currentNo);
			if(current>=4){
				_temp+='<li><a >1</a></li>';
			}
			if(current>4){
				_temp+='<li><a class="pagination-more" ><span class="glyphicon glyphicon-option-horizontal"></span></a></li>';
			}
			
			for(var i=(current>2?current-2:1);i<=(current+2>pageNos?pageNos:current+2);i++){
				var li=temp.replace("{{pageNo}}",i);
				if(current==i){
					li=li.replace('{{active}}','active');
				}else{
					li=li.replace("{{active}}","");
				}
				_temp+=li;
			}
			if((current+3)<pageNos){
				_temp+='<li><a class="pagination-more" ><span class="glyphicon glyphicon-option-horizontal"></span></a></li>';
			}
			if((current+3)<=pageNos){
				_temp+='<li><a >'+pageNos+'</a></li>';
			}
			var _temp=$(_temp);
			_temp.find("a:not(.pagination-more)").click(function(){
				var no=$(this).html();
				options.currentNo=no;
				getPageData();
			});
			return _temp;
		}
		this.getRowTemplate=function(data){
			var _temp="";
			if(data){
				for(var i in data.data.list){
					var obj=data.data.list[i];
					var row=options.rowTemplate||"";
					var params=row.match(/\{\{(.+?)\}\}/g);
					for(var j in params){
						var param=params[j];
						row=row.replace(param,(obj[param.replace("{{","").replace("}}","")]||""));
					}
					_temp+=row;
				}
//				console.log(_temp);
			}
			return _temp;
		}
		
		getPageData();
	}
	return pagination;
});