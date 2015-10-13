/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Option (label, width, height, x, y) {
    this.label = label;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;      
};

Option.prototype.draw = function (g) {
    g.beginPath();
    g.setLineDash([]);
    g.fillStyle = "black";
    g.strokeRect(this.x, this.y, this.width, this.height);
    g.font = "15px Arial";
    g.fillText(this.label,this.x+5,this.y+20); 
};

Option.prototype.onMouseClick = function (position) {
    if(position.x > this.x && position.x < (this.x + this.width) 
            && position.y > this.y && position.y < (this.y + this.height)){
        return this.label;   
    } else {
        return null;
    }
};
