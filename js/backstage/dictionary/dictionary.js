	$(function() {
		var dataSelect = {
			//获取查询条件
			getDictClass: function() {
				$.ajax({
					type: "get",
					url: "/dictclass/getAll",
					async: true,
					dataType: "json",
					success: function(data) {
						for(var i = 0; i < data.data.list.length; i++) {
							$("#condition_select").append("<option id='" + data.data.list[i].dictclass_id + "'>" + data.data.list[i].vname + "</option>");
						}
					}
				});
			},
			//根据条件获取数据
			getSearchData: function(dictclassId, vcode, page, pageSize) {
				var getUrl = "/dict/search?dictclass_id=" + dictclassId + "&vcode =" + vcode + "&page=" + page + "&page_size=" + pageSize + "";
				require("js/component/pagination/pagination")({
					type: "get",
					url: getUrl,
					async: true,
					target: "#page",
					pageSize:pageSize,
					dataType: "json",
					success: function(data) {
						var tdList = "";
						for(var i = 0; i < data.data['list'].length; i++) {
							tdList += "<tr><td class='table_td'><input type='checkbox' icheck-checkbox='icheck-checkbox' dataid='" + data.data.list[i].dict_id + "'/></td><td class='table_td'>" + (i + 1) + "</td><td class='table_td'>" + data.data.list[i].dictclass_id + "</td><td class='table_td'>" + data.data.list[i].dictclass_vname + "</td><td class='table_td'>" + data.data.list[i].vname + "</td><td class='table_td'>" + data.data.list[i].vcode + "</td><td class='table_td'>0</td><td class='table_td'>" + data.data.list[i].createtime + "</td><td class='table_td'><a href='/page/backstage/dictionary/dictionary_update_data.html?dictId=" + data.data.list[i].dict_id + "&dictclassId=" + data.data.list[i].dictclass_id + "' data-loadmode><span class='table_change01'>修改</span></a><span class='table_del01' id='" + data.data.list[i].dict_id + "'>删除</span></td></tr>";
						}
						var tfootHtml = "<tr><td><div id='checkall'><input type='checkbox' id='square-checkbox' icheck-checkbox='icheck-checkbox' /></div></td><td><label for='square-checkbox' class='square_checkbox'><span class='table_btn checkbox_btn'>全选</span></label></td><td colspan='7'><div id='page'></td></tr>";
						$(".table_box tbody").empty().append(tdList);
						$(".table_box tfoot").empty().append(tfootHtml);
						require("js/component/pageInit").init();
						icheckClick();
					}
				});
			},
			//删除数据
			dictDeleteData: function(id) {
				var delUrl = "/dict/delete?id=" + id + "";
				$.ajax({
					type: "get",
					url: delUrl,
					async: true,
					dataType: "json",
					success: function(data) {
						console.log(data);
					}
				});
			}
		}
		
		//获取查询条件
		dataSelect.getDictClass();
		//根据条件获取数据
		$("#search_btn").on("click", function() {
			dataSelect.getSearchData($('#condition_select option:selected').attr("id"), $("#condition_input").val(), 1, 10);
		});
		//删除数据
		$(".table_box").on("click", ".table_del01", function() {
			var  modalPrompt= require("js/component/pageComponent");
			modalPrompt=new modalPrompt();
			modalPrompt.modalView({
				content:"是否要删除?",
				title:"提示",
				okClick:function(){
					dataDelete();
				}
			});
			function dataDelete(){
				dataSelect.dictDeleteData($(this).attr("id"));
				dataSelect.getSearchData($('#condition_select option:selected').attr("id"), $("#condition_input").val(), 1, 10);
				$("#modalView").remove();
				$(".modal-backdrop").remove();
			}
		});
		//批量删除
		$("#tdDel").click(function(){
			var innerContent = "";
			var dataDel = {};
			if($(".table_box tbody input[icheck-checkbox]:checked").length == 0){
				innerContent ="请先选择要删除的数据";
				dataDel = function(){
					$("#modalView").remove();
					$(".modal-backdrop").remove();
				}
			}
			else{
				innerContent ="是否要删除?";
				dataDel = function(){
					$(".table_box tbody input[icheck-checkbox]:checked").each(function(){
						dataSelect.dictDeleteData($(this).attr("dataid"));
						dataSelect.getSearchData($('#condition_select option:selected').attr("id"), $("#condition_input").val(), 1, 10);
					});
					$("#modalView").remove();
					$(".modal-backdrop").remove();
				}
			}
			var  modal= require("js/component/pageComponent");
			modal=new modal();
			modal.modalView({
				content:innerContent,
				title:"提示",
				okClick:function(){
					dataDel();
				}
			});
		});
	

		
		//全选反选
		function icheckClick(){
			var icheckOff = true;
			$(".table_box tbody input[icheck-checkbox]").on("ifChanged", function(event) {
				$(".table_box tbody input[icheck-checkbox]").each(function() {
					//总的checkbox的个数
        			var len = $(".table_box tbody input[icheck-checkbox]").length;
        			//已选中的checkbox的个数
        			var checkedLen  =  $(".table_box tbody input[icheck-checkbox]:checked").length;
        			if(len  ==  checkedLen){
			            $(".table_box tfoot input[icheck-checkbox]").iCheck("check");
			            icheckOff = false;
			        }else{
			            $(".table_box tfoot input[icheck-checkbox]").iCheck("uncheck");
			            icheckOff = true;
			        }
				});
			});
			
			$('.table_box tfoot input[icheck-checkbox]').on("ifClicked",function(){
				if(icheckOff){
					$(".table_box tbody input[icheck-checkbox]").each(function() {
						$(this).iCheck("check");
						icheckOff = false;
					});
				}
				else{
					$(".table_box tbody input[icheck-checkbox]").each(function() {
						$(this).iCheck("uncheck");
						 icheckOff = true;
					});
				}
			});
			
		}
		
	});
