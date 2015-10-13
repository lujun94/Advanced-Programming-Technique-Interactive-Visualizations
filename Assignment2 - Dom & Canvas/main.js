var dataSeries = null;
var type = null;
var c = null;

function AreaText (selected) {
    this.changeText(selected);
}

AreaText.prototype.changeText = function(selected){
    var nameElement = document.getElementById('area');
    nameElement.innerHTML = selected;
};

function TypeSelector (){
    var selector = document.getElementById("type");
    selector.onchange = function() {
        var value = selector.options[selector.selectedIndex].value;
        if (value === "barChart") {
            type = "bar";
        } else if (value === "lineChart") {
            type = "line";
        };
        var chart = new Chart();
    };
};

function DataSelector (){
    var e = document.getElementById("dropDown");
    e.onchange = function() {
        var value = e.options[e.selectedIndex].value;
        if (value === "Northampton") {
            var areatext = new AreaText("Northampton");
            dataSeries = DATA[0];
        } else if (value === "Amherest") {
            var areatext = new AreaText("Amherest");
            dataSeries = DATA[1];
        } else if (value === "Easthampton") {
            var areatext = new AreaText("Easthampton");
            dataSeries = DATA[2];
        }else {
            var areatext = new AreaText("Please Select An Area");
        };
        var chart = new Chart();
    };
};

function Chart() {
    if(dataSeries !== null && type !== null){
        var dataset = dataSeries.getData();
        c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        var mouseX = null;
        var mouseY = null;
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.setLineDash([]);
        var scale = new VerticalScale(ctx);
        scale.displayScale();
        if(type === "line"){
            var drawLine = new Lines(dataset,ctx, mouseX, mouseY);
        } else if (type === "bar" ) {
            var drawBars = new Bars(dataset,ctx, mouseX, mouseY);
        };
        this.listener(c, ctx, dataset);
    };
};

Chart.prototype.listener = function(c, ctx, dataset){
    // The following 4 lines of the following code cited from
    //http://www.html5canvastutorials.com/advanced/
    //html5-canvas-mouse-coordinates/
    c.addEventListener('mousemove', function(evt) {
                       var mousePos = getMousePos(c, evt);
                       mouseX = mousePos.x;
                       mouseY = mousePos.y;
                       ctx.clearRect(0, 0, c.width, c.height);
                       ctx.setLineDash([]);
                       var scale = new VerticalScale(ctx);
                       scale.displayScale();
                       if(50<= mouseY && mouseY<= 250){
                       var guideLine = new GuideLine(ctx, mouseX, mouseY);
                       guideLine.displayLine();
                       };
                       if(type === "line"){
                       var drawLine = new Lines(dataset,ctx, mouseX, mouseY);
                       } else if (type === "bar"){
                       var drawBars = new Bars(dataset,ctx, mouseX, mouseY);
                       };
                       
                       }, false);
    
};

function Bars (dataset, ctx, mouseX, mouseY) {
    this.drawBars(dataset, ctx, mouseX, mouseY);
};

Bars.prototype.drawBars = function(dataset, ctx, mouseX, mouseY){
    for (i = 0; i < dataset.length; i++) {
        var label = dataset[i].getLabel();
        var value = dataset[i].getValue();
        var barHeight = value*2;
        var startX = i*60+40;
        var startY = 250-barHeight;
        if (mouseX !== null && mouseY !== null && startX <= mouseX &&
            mouseX <= (startX+40) && startY <= mouseY && mouseY<= 250){
            var value = new Value(ctx, value, startX, startY);
            ctx.fillStyle = "#33CCFF";
        }else{
            ctx.fillStyle = "blue";
        };
        var bar = new Bar(ctx, startX, startY, barHeight, label);
    };
};

function Bar(ctx, startX, startY, barHeight, label) {
    this.drawBar(ctx, startX, startY, barHeight, label);
};

Bar.prototype.drawBar = function(ctx, startX, startY, barHeight, label){
    ctx.fillRect(startX, startY, 40, barHeight);
    ctx.fillStyle = "black";
    ctx.font = "15px Arial";
    ctx.fillText(label,startX,270);
};

function Lines(dataset, ctx, mouseX, mouseY) {
    this.drawLines(dataset, ctx, mouseX, mouseY);
};

Lines.prototype.drawLines = function(dataset, ctx, mouseX, mouseY){
    var prevX = null;
    var prevY = null;
    for (i = 0; i < dataset.length; i++) {
        var label = dataset[i].getLabel();
        var value = dataset[i].getValue();
        var barHeight = value*2;
        var startX = i*60+40;
        var startY = 250-barHeight;
        var connection = new Connection(ctx, prevX, prevY, startX, startY)
        prevX = startX;
        prevY = startY;
        if (mouseX !== null && mouseY !== null && startX <= mouseX &&
            mouseX <= (startX+40)){
            var value = new Value(ctx, value, startX, startY);
            ctx.fillStyle = "#33CCFF";
        }else{
            ctx.fillStyle = "blue";
        };
        var point = new Point(ctx, startX, startY, label);
    };
};

function Point(ctx, startX, startY, label) {
    this.drawPoint(ctx, startX, startY, label);
};

Point.prototype.drawPoint = function(ctx, startX, startY, label){
    ctx.arc(startX,startY,5,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.font = "15px Arial";
    ctx.fillText(label,startX-5,270);
};

function Connection(ctx, prevX, prevY, startX, startY) {
    this.drawConnection(ctx, prevX, prevY, startX, startY);
};

Connection.prototype.drawConnection = function(ctx, prevX, prevY, startX, startY){
    if(prevX !== null && prevY !== null ){
        ctx.moveTo(prevX,prevY);
        ctx.lineTo(startX,startY);
        ctx.stroke();
    };
    ctx.beginPath();
};

function Value(ctx, value, startX, startY) {
    this.displayValue(ctx, value, startX, startY);
}

Value.prototype.displayValue = function(ctx, value, startX, startY){
    ctx.fillStyle = "black";
    ctx.font = "15px Arial";
    ctx.fillText(value.toString(), startX+10, startY-10);
}

function VerticalScale(ctx) {
    this.ctx = ctx;
}

VerticalScale.prototype.displayScale = function(){
    this.ctx.moveTo(30,50);
    this.ctx.lineTo(30,250);
    this.ctx.stroke();
    for(var i=0; i<=100; i=i+10){
        if(i%20 === 0){
            this.ctx.moveTo(20,250-i*2);
            this.ctx.lineTo(30,250-i*2);
            this.ctx.stroke();
        } else {
            this.ctx.moveTo(25,250-i*2);
            this.ctx.lineTo(30,250-i*2);
            this.ctx.stroke();
        };
        this.ctx.font = "10px Arial";
        this.ctx.fillText(i.toString(), 5, 250-i*2-2);
    };
};

function GuideLine(ctx, mouseX, mouseY){
    this.ctx = ctx;
    this.mouseX = mouseX;
    this.mouseY = mouseY;
    
};

GuideLine.prototype.displayLine = function(){
    this.ctx.setLineDash([2]);
    this.ctx.moveTo(40,this.mouseY);
    this.ctx.lineTo(690,this.mouseY);
    this.ctx.stroke();
    this.ctx.setLineDash([]);
    var currentValue = (250-this.mouseY)/2;
    this.ctx.fillStyle = "black";
    this.ctx.font = "15px Arial";
    this.ctx.fillText(currentValue.toString(),690, this.mouseY);
};
// The getMousePos cited from
//http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
    };
}

function initialize() {
    var dataSelector = new DataSelector(); 
    var typeSelector = new TypeSelector(); 
};

window.onload = initialize;