function Visual() {
    this.width;
    this.height;
    this.position;
  
};

Visual.prototype.setWidth = function(w){
    this.width = w;
};

Visual.prototype.setHeight = function(h){
    this.height = h;
};

Visual.prototype.setPosition = function(P){
    this.position = P;
};

Visual.prototype.draw = function(g){  
};

function BackgroundImage() {
    this.image = new Image();
}

BackgroundImage.prototype = new Visual();

BackgroundImage.prototype.loadUrl = function(file){
    this.image.src = file;
};

BackgroundImage.prototype.draw = function(g){
    g.drawImage(this.image, this.position.getX(), this.position.getY(), this.width, this.height );
};

function HitTestableElement() {
}

HitTestableElement.prototype = new Visual();

HitTestableElement.prototype.hitTest = function(p){
};

function DraggableElement() {
    this.draggable = false;
    this.Xdiff;
    this.Ydiff;
}

DraggableElement.prototype = new HitTestableElement();

DraggableElement.prototype.activate = function(p){
    if(p.getX() >= this.position.getX() && 
            p.getX() <= (this.position.getX()+this.width) && 
            p.getY() >= this.position.getY() && 
            p.getY() <= (this.position.getY()+this.height)){
        this.Xdiff = p.getX() - this.position.getX();
        this.Ydiff = p.getY() - this.position.getY();
        this.draggable = true;
    } else {
        this.draggable = false;
    };
};

DraggableElement.prototype.dragMove = function(p){
    if(this.draggable === true){  
        //console.info(this.position.getX());
        //console.info(this.position.getY());
        this.position.setX(p.getX() - this.Xdiff);
        this.position.setY(p.getY() - this.Ydiff);    
    };
};

function Shape() {
    this.fillColor;
    this.strokeColor;
    this.strokeThickness;

};

Shape.prototype = new DraggableElement();

Shape.prototype.setFillColor = function(color){
    this.fillColor = color;
};

Shape.prototype.setStrokeColor = function(color){
    this.strokeColor = color;
};

Shape.prototype.setStrokeThickness = function(thickness){
    this.strokeThickness = thickness;
};

Shape.prototype.draw = function(g){
    g.beginPath();
    g.fillStyle = this.fillColor;
    g.lineWidth = this.strokeThickness;
    g.strokeStyle = this.strokeColor;
    this.drawPath(g);
    g.stroke();
    g.closePath();
};

Shape.prototype.drawPath = function(g){   
};

function Triangle() {
};

Triangle.prototype = new Shape();

Triangle.prototype.drawPath = function(g){
    g.moveTo(this.position.getX()+this.width/2, this.position.getY());
    g.lineTo(this.position.getX(),this.position.getY()+this.height);
    g.lineTo(this.position.getX()+this.width,this.position.getY()+this.height); 
    g.lineTo(this.position.getX()+this.width/2, this.position.getY());
    g.fill();
};

Triangle.prototype.activate = function(p){
    var xyRatio = (this.width/2)/this.height;
    if( p.getY() >= this.position.getY() && 
            p.getY() <= (this.position.getY()+this.height)){
        var proX = xyRatio*(p.getY()-this.position.getY());  
        if(p.getX() >= (this.position.getX() + this.width/2 - proX) && 
            p.getX() <= (this.position.getX()+ + this.width/2+proX)){
            this.Xdiff = p.getX() - this.position.getX();
            this.Ydiff = p.getY() - this.position.getY();
            this.draggable = true;           
        } else {
            this.draggable = false;
        }
    } else {
        this.draggable = false;
    }
};

function Rectangle() {
};

Rectangle.prototype = new Shape();

Rectangle.prototype.drawPath = function(g){
    g.fillRect(this.position.getX(), this.position.getY(),this.width,this.height);
    g.strokeRect(this.position.getX(), this.position.getY(),this.width,this.height);
};

function Circle() {
};

Circle.prototype = new Shape();

Circle.prototype.drawPath = function(g){
    TOOLS.drawEllipse(g, this.position.getX(), this.position.getY(), this.width, this.height);
    g.fill();
};