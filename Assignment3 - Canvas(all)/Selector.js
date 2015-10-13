/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Selector (options, x, y, width, text) {
    this.x = x;
    this.y = y;
    this.menuOpen = false;
    this.width = width;
    this.height = 30;
    this.tHeight = 30;
    this.options = this.createOptions(options);
    this.text = text;
    this.haveSelected = false;
};

Selector.prototype.createOptions = function (options) {
    var optionObjects = [];
    for (var i = 0; i < options.length; i++) {
        var optionY = this.y + this.height*i;
        optionObjects.push(new Option(options[i],this.width, this.height,
        this.x, optionY));
    }
    this.tHeight = this.height*(options.length);
    return optionObjects;
};

Selector.prototype.draw = function (g) {   
    if (this.menuOpen) {
        for (var i = 0; i < this.options.length; i++) {
            this.options[i].draw(g);
        };
    } else {
        g.beginPath();
        g.setLineDash([]);
        g.fillStyle = "black";
        g.strokeRect(this.x,this.y, this.width, this.height);
        g.font = "15px Arial";
        g.fillText(this.text,this.x+20,this.y+20); 
    }
};

Selector.prototype.updatePosition = function (x, y) {
    this.x = x;
    this.y = y;
    
};


// should return true or false depending on whether we're hovering over the box
Selector.prototype.onMouseMove = function (position) { 
    if(this.menuOpen){
        if(position.x > this.x && position.x < (this.x + this.width) 
                && position.y > this.y && position.y < (this.y + this.tHeight)){
        } else {
            this.menuOpen = false;
        };
    } else {           
        if(position.x > this.x && position.x < (this.x + this.width) 
                && position.y > this.y && position.y < (this.y + this.height)){
            this.menuOpen = true;
        }
    };
};

Selector.prototype.onMouseClick = function (position) {
    for (var i = 0; i < this.options.length; i++) {
        var result = this.options[i].onMouseClick(position);
        if(result !== null){
            this.haveSelected = true;
            this.text = result; 
        };
    };
};
