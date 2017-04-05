//头部计算当前时间
var currentDate = new Date().getFullYear() + "年" + new Date().getMonth() + "月" + new Date().getDate() + "日"
var week = " 星期" + "日一二三四五六".split("")[new Date().getDay()];
$(".header .time").html("今天是 " + currentDate + week);
//加载菜单
require(["js/backstage/menu"]);
