define(["js/component/distpicker/distpicker"],function(){
	var dispicker = function(select){
		this.select = select;
	}
	dispicker.prototype.init=function(){
		$(this.select).each(function(){
			if($(this).find("select").length<=0){
				$(this).append("<select></select><select></select><select></select>");
			}
			var dataSelect=$(this).attr("data-select");
			var province = $(this).attr("province");
			var city = $(this).attr("city");
			var district = $(this).attr("district");
			var autoSelect = true;
			if(dataSelect =="data-distpicker-noSelect"){
				autoSelect = false;
			}
			var options={province:province,city:city,district:district,autoSelect:autoSelect};
			$(this).distpicker(options);
			
		});
	}
	return dispicker;
	
	
	/*var $distpicker = $('.distpicker');
		  $distpicker.distpicker({
		    province: '福建省',
		    city: '厦门市',
		    district: '思明区'
		  });

		  $('#reset').click(function () {
	  		$distpicker.distpicker('reset');
		  });
		
		  $('#reset-deep').click(function () {
		    $distpicker.distpicker('reset', true);
		  });
		
		  $('#destroy').click(function () {
		    $distpicker.distpicker('destroy');
		  });*/
});