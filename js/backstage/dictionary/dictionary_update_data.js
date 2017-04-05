$(function(){
	function updateData(){
		var  dictId = $("#content").data("dictId");
		var  dictclassId = $("#content").data("dictclassId");
		//获取类型名称
		$.ajax({
			type: "get",
			url: "/dictclass/getAll",
			async: true,
			dataType: "json",
			success: function(data) {
				for(var i = 0; i < data.data.list.length; i++) {
					$("#update_select").append("<option id='" + data.data.list[i].dictclass_id + "'>" + data.data.list[i].vname + "</option>");
				}
				$("#update_select option").each(function(){
					if($(this).attr("id") == dictclassId){
						$(this).attr("selected",true);
					}
				});
			}
		});
		//获取字典类型等
		$.ajax({
			type: "get",
			url: "/dict/get?id="+dictId+"",
			async: true,
			dataType: "json",
			success: function(data) {
				$("input[name='dictclass_id']").val(data.data.dictclass_id);
				$("input[name='vname']").val(data.data.vname);
				$("input[name='vcode']").val(data.data.vcode);
			}
		});
	}
	updateData();
});
