<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<title>js-orgChart by Rchockxm</title>
<script language="javascript" src="js-orgchart.js"></script>
<link rel="stylesheet" type="text/css" href="js-orgchart.css">
<style type="text/css">
body {
    background-color: #F8F8F8;
}
#form_title {
    border-radius: 10px 10px 0px 0px;
    -moz-border-radius: 10px 10px 0px 0px;
    -webkit-border-radius: 10px 10px 0px 0px;
    border:1px solid #C0C0C0;
    margin: 0 auto; 
    padding: 10px 10px 10px 10px; 
    width: 640px; 
    height: 16px;
    background-color: #282828;
}
#form_title .form_title_content {
    color: #FFFFFF;
    font-weight: bold;
    font-size: 1.0em !important;
    font-family: "Times New Roman", Times, serif;
    float: left;
}
#form_title .form_title_log {
    color: #FFFFFF;
    font-weight: bold;
    font-size: 0.8em !important;
    font-family: "Times New Roman", Times, serif;
    float: left;
    padding: 2px 0px 0px 50px;
}
#form_title .form_title_search {
    color: #FFFFFF;
    float: right;
    margin: -4px 40px 0 0; 
}
#form_title .form_title_search input[type="text"] {
    border: 1px solid #ccc;
    border-radius: 3px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-box-shadow: 2px 2px 3px #666;
    -webkit-box-shadow: 2px 2px 3px #666;
    box-shadow: 2px 2px 3px #666;
    outline: 0;
    -webkit-appearance: none;
}
#form_content {
    border-radius: 0px 0px 10px 10px;
    -moz-border-radius: 0px 0px 10px 10px;
    -webkit-border-radius: 0px 0px 10px 10px;
    border: 1px solid #C0C0C0;
    margin: 0 auto; 
    padding: 10px 10px 10px 10px; 
    width: 640px; 
    height: 480px;
    background-color: #FFFFFF;
}
</style>
</head>

<body>
    <div id="form_title">
        <div class="form_title_content">js-OrgChart Example</div>
        <div class="form_title_log"></div>
        <div class="form_title_search">Search: <input type="text" id="search_item" onkeydown="input_keydown_event(event);" /></div>
    </div>
    <div id="form_content" style="">        
        <div id="OrgChart"></div>        
    </div>
</body>

<script language="javascript">
// js-orgChart Demo by rchockxm
var oriWidth = 640;
var oriHeight = 480;

// Demo Data
var P = ['Bell', 'Bob', 'Frank', 'James', 'Alex', 'Edward', 'Tony', 'Jonic', 'Shannon', 'cwc', 'Benny', 'Tom', 'Alice', 'Fred', 'Eric', 'Mal'];
var S = [];
var tRootNode = new OrgNode();
tRootNode.customParam.Caption = "Root";
tRootNode.customParam.Description = "Demo";

var HwndNode;
var HwndObject = {};
var ChildNode;
for (var i=0; i<P.length; i++) {
    var Data = P[i];
    var Caption = Data;

    HwndObject[Caption] = new OrgNode();
    HwndObject[Caption].customParam.Caption = Caption;
    HwndObject[Caption].customParam.Description = "Demo";

    S[i] = Caption;

    if (i == 0) {
        ChildNode = HwndObject[Caption];
    }
    else if (i > 1) { 
        var index = Math.round(Math.random() * (S.length - 0));
        if (index > S.length) {
            index = 0;
        }
        if (typeof S[index] == "string") {
            HwndObject[S[index]].Nodes.Add(HwndObject[Caption]);
        }
    }
}

tRootNode.Nodes.Add(ChildNode);

/*var tGoogleData = [
          [{v:'Mike', f:'Mike<div style="color:red; font-style:italic">President</div>'}, '', 'The President'],
          [{v:'Jim', f:'Jim<div style="color:red; font-style:italic">Vice President</div>'}, 'Mike', 'VP'],
          ['Alice', 'Mike', ''],
          ['Bob', 'Jim', 'Bob Sponge'],
          ['Carol', 'Bob', '']];
 
tRootNode = LoadGoogleOrgChartData(tGoogleData);*/

// Options
var tOptions = new OrgOptions();
tOptions.AutoPos = true;
tOptions.Top = 8;
tOptions.Left = 20;
//tOptions.paddingOffsetTop = 0;
//tOptions,paddingOffsetLeft = 0;
//tOptions.IntervalWidth = 100;
//tOptions.IntervalHeight = 60;
tOptions.LineColor = "#3388dd";
tOptions.LineSize = 1;
tOptions.EdgeTemplet = "<div id=\"{Id}\" class=\"OrgEdge\"><span>{Caption}</span><div>{Description}</div></div>";

// StyleSheet
var tStyleSheet = new OrgStyleSheet();
tStyleSheet.CssText = "";

// Render Chart
var ogChart = new OrgChart();
ogChart.RootNodes = tRootNode;
ogChart.Options = tOptions;
ogChart.StyleSheet = tStyleSheet;
ogChart.NodeOnClick = function() {
    var hwnd = document.getElementById(this.id).getElementsByTagName("span");
    var name = hwnd[0].firstChild.data;

    document.getElementById("form_title").getElementsByTagName("div")[1].innerHTML = "Click: Name = " + name;
};
ogChart.NodeOnMouseMove = function() {
    var hwnd = document.getElementById(this.id).getElementsByTagName("span");
    var name = hwnd[0].firstChild.data;

    //document.getElementById("form_title").getElementsByTagName("div")[1].innerHTML = "MouseMove: Name = " + name;
};
ogChart.NodeOnMouseOver = function() {
    var hwnd = document.getElementById(this.id).getElementsByTagName("span");
    var name = hwnd[0].firstChild.data;

    document.getElementById("form_title").getElementsByTagName("div")[1].innerHTML = "MouseOver: Name = " + name;
};
ogChart.NodeOnMouseOut = function() {
    var hwnd = document.getElementById(this.id).getElementsByTagName("span");
    var name = hwnd[0].firstChild.data;

    document.getElementById("form_title").getElementsByTagName("div")[1].innerHTML = "MouseOut: Name = " + name;
};
ogChart.Render();

// ReSet Div Content Width and Height
var oDivStyle = ogChart.GetContainerStyle();
var newWidth = oDivStyle.width;
var newHeight = oDivStyle.height;

if (newWidth > oriWidth) {
    document.getElementById("form_title").style.width = newWidth + "px";
    document.getElementById("form_content").style.width = newWidth + "px";
}

if (newHeight > oriHeight) {
    document.getElementById("form_content").style.height = newHeight + "px";
}

// Search Function
function input_keydown_event(event) {
    event = (event == undefined) ? window.event : event;
    if (event.keyCode == 13) {
        var search_val = document.getElementById("search_item").value;
        var childs = document.getElementById("OrgChart").getElementsByTagName("div");
        for (var i=0; i<childs.length; i++) {
            var span_name = childs[i].getElementsByTagName("span")[0];
            if (span_name != undefined || span_name != null) {
                if (search_val != "" && span_name.innerHTML.indexOf(search_val) >= 0) {
                    span_name.parentNode.setAttribute("class", "OrgEdge_Hight");
                }
                else {
                    span_name.parentNode.setAttribute("class", "OrgEdge");
                }
            }
        }
    }
}
</script>

</html>
