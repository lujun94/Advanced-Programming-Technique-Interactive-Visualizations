function Bars () {
    this.dataset = [];
    this.mouseX = 0;
    this.mouseY = 0;
};

Bars.prototype.draw = function(g, dataset){
    this.dataset = dataset;
    for (i = 0; i < this.dataset.length; i++) { 
        var label = this.dataset[i].getLabel();
        var value = this.dataset[i].getValue(); 
        var barHeight = value*2;
        var startX = i*45+65;
        var startY = 300-barHeight;
        if (this.mouseX !== null && this.mouseY !== null && 
                startX <= this.mouseX && this.mouseX <= (startX+40) && 
                startY <= this.mouseY && this.mouseY<= 300){
            var value = new Value(g, value, startX, startY);
            g.fillStyle = "#33CCFF";
        }else{
            g.fillStyle = "blue";
        };
        var bar = new Bar(startX, startY, barHeight, label);
        bar.draw(g);
    };
};

Bars.prototype.onMouseMove = function(position){
    this.mouseX = position.x;
    this.mouseY = position.y;
};

function Bar(startX, startY, barHeight, label) {
     this.startX = startX;
     this.startY = startY;
     this.barHeight = barHeight;
     this.label = label;
}; 

Bar.prototype.draw = function(g){
    g.fillRect(this.startX, this.startY, 40, this.barHeight);
    g.fillStyle = "black";
    g.font = "15px Arial";
    g.fillText(this.label, this.startX,320);    
};

function Lines() {
    this.dataset = [];
    this.mouseX = 0;
    this.mouseY = 0;
};

Lines.prototype.draw = function(g, dataset){
    this.dataset = dataset;
    var prevX = null;
    var prevY = null;
    for (var i = 0; i < this.dataset.length; i++) { 
        var label = this.dataset[i].getLabel();
        var value = this.dataset[i].getValue();
        var barHeight = value*2;
        var startX = i*45+80;
        var startY = 300-barHeight;
        var connection = new Connection(prevX, prevY, startX, startY);
        connection.draw(g);
        prevX = startX;
        prevY = startY;
        if (this.mouseX !== null && this.mouseY !== null && 
                startX <= this.mouseX && this.mouseX <= (startX+40)){
            var value = new Value(g, value, startX, startY);
            g.fillStyle = "#33CCFF";
        }else{
            g.fillStyle = "blue";
        };
        var point = new Point (startX, startY, label);   
        point.draw(g);
    };
};

Lines.prototype.onMouseMove = function(position){
    this.mouseX = position.x;
    this.mouseY = position.y;
};

function Point(startX, startY, label) {
     this.startX = startX;
     this.startY = startY;
     this.label = label;
}; 

Point.prototype.draw = function(g){
        g.beginPath();
        g.arc(this.startX, this.startY,5,0,2*Math.PI);
        g.fill();
        g.stroke();
        g.fillStyle = "black";
        g.font = "15px Arial";
        g.fillText(this.label, this.startX-5,320); 
};

function Connection(prevX, prevY, startX, startY) {
    this.prevX = prevX;
    this.prevY = prevY;
    this.startX = startX;
    this.startY = startY;
}; 

Connection.prototype.draw = function(g){
        if(this.prevX !== null && this.prevY !== null ){
            g.beginPath();
            g.setLineDash([]);
            g.moveTo(this.prevX,this.prevY);
            g.lineTo(this.startX, this.startY);
            g.stroke();
        };
};

function Value(g, value, startX, startY) {
    this.displayValue(g, value, startX, startY);
}

Value.prototype.displayValue = function(g, value, startX, startY){
        g.fillStyle = "black";
        g.font = "15px Arial";
        g.fillText(value.toString(), startX+10, startY-10);  
}

function VerticalScale(x,y) {
    this.x = x;
    this.y = y;
}

VerticalScale.prototype.draw = function(g){
    var endY = this.y+200;
    g.beginPath();
    g.setLineDash([]);
    g.moveTo(this.x, this.y);
    g.lineTo(this.x, endY);
    g.stroke();
    for(var i=0; i<=100; i=i+10){
        if(i%20 === 0){
            g.moveTo(this.x-10, endY-i*2);
            g.lineTo(this.x, endY-i*2);
            g.stroke();
        } else {
            g.moveTo(this.x-5, endY-i*2);
            g.lineTo(this.x, endY-i*2);
            g.stroke();            
        };
        g.font = "10px Arial";
        g.fillText(i.toString(), this.x-25, endY-i*2-2); 
    };
};

function GuideLine(x, width){
    this.x =x;
    this.width = width;
    this.y = null;
};

GuideLine.prototype.draw = function(g){
    g.beginPath();
    g.setLineDash([2]);
    g.moveTo(this.x, this.y);
    g.lineTo(this.x+this.width, this.y);
    g.stroke(); 
    var currentValue = (300 - this.y)/2; // inaccurate position
    g.fillStyle = "black";
    g.font = "15px Arial";
    g.fillText(currentValue.toString(),this.x+this.width, this.y); 
};

GuideLine.prototype.onMouseMove = function (position) {
    if (position.y < 100) {
        this.y = 100;
    } else if(position.y > 300){
        this.y = 300;
    } else {
        this.y = position.y;
    }
};

