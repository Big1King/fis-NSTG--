requirejs.s.contexts._.defined.jquery=$;

require("/third_party/bootstrap/css/bootstrap.min.css");
require("/third_party/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css");
require("/third_party/jquery-validationEngine/css/validationEngine.jquery.css");
require(["js/global","third_party/bootstrap/js/bootstrap.min","js/component/pageInit","js/component/jqueryOverride","third_party/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min"],function(){
	require("js/component/pageInit").init();
	$(window).resize();
});
require(["js/component/pageComponent"]);

require(["js/component/share/share"]);

require(["js/component/pagination/pagination"]);

require(["js/component/loading"]);
