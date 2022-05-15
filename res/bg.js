var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
var flag = true;
for (var v = 0; v < Agents.length; v++) {
	if (navigator.userAgent.indexOf(Agents[v]) > 0) {
		flag = false;
		break;
	}
}
if (flag) document.write("\<canvas id=\"canvas\" style=\"position:fixed;top:50%;left:50%;transform:translateX(-50%)translateY(-50%)\"\>\</canvas\>\<script src=\"/res/background.js\"\>\</script\>");
