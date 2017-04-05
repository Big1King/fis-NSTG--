$(function(){
	function getAll(){
		//获取查询条件
		$.ajax({
			type: "get",
			url: "/dictclass/getAll",
			async: true,
			dataType: "json",
			success: function(data) {
				for(var i = 0; i < data.data.list.length; i++) {
					$("#add_select").append("<option id='" + data.data.list[i].dictclass_id + "'>" + data.data.list[i].vname + "</option>");
				}
			}
		});
	}
	getAll();
});
