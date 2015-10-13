function CustomGameLoop() {
    this.elementList = [];
    this.pointerManager = new PointerManager();
};

CustomGameLoop.prototype = new GameLoop();

CustomGameLoop.prototype.setCanvasSize = function(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
};

CustomGameLoop.prototype.addElement = function(element) {
    this.elementList.push(element);
    this.pointerManager.elements.push(element);
};

CustomGameLoop.prototype.draw = function(g) {
    for(var i = 0; i < this.elementList.length; i++) {
        this.elementList[i].draw(g);
    };
    
};

CustomGameLoop.prototype.onPointerEnter = function(id, position) {
    this.pointerManager.onPointerEnter(id, position);
};

CustomGameLoop.prototype.onPointerMove = function(id, position) {
    this.pointerManager.onPointerMove(id, position);
};

CustomGameLoop.prototype.onPointerActivate = function(id, position) {
    this.pointerManager.onPointerActivate(id, position);
};

CustomGameLoop.prototype.onPointerDeactivate = function(id, position) {
    this.pointerManager.onPointerDeactivate(id, position);
};

CustomGameLoop.prototype.onPointerLeave = function(id, position) {
    this.pointerManager.onPointerLeave(id, position);
    for(var i = 0; i < this.elementList.length; i++) {
        if('draggable' in this.elementList[i]){
            this.elementList[i].draggable = false;
        };
    };
};