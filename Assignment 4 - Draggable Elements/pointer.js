//Skeleton from CSC220 Example Code 08
function PointerManager() {
    this.pointers = [];
    this.elements = [];
}

PointerManager.prototype.onPointerEnter = function(id, position) {
    this.addPointer(id, position);
}

PointerManager.prototype.onPointerMove = function(id, position) {
    this.movePointer(id, position);
}

PointerManager.prototype.onPointerActivate = function(id, position) {
    this.pointers[id].activate();
}

PointerManager.prototype.onPointerDeactivate = function(id, position) {
    this.pointers[id].deactivate();
}

PointerManager.prototype.onPointerLeave = function(id, position) {
    this.removePointer(id, position);
}

PointerManager.prototype.hasPointer = function(id) {
    return typeof this.pointers[id] != 'undefined';
}

PointerManager.prototype.addPointer = function(id, initialPosition) {
    this.pointers[id] = new Pointer(id, initialPosition);
    this.pointers[id].elements = this.elements;
}

PointerManager.prototype.movePointer = function(id, position) {
    this.pointers[id].move(position);
}

PointerManager.prototype.removePointer = function(id, position) {
    delete this.pointers[id];
}

function Pointer(id, initialPosition) {
    this.id = id;
    this.position = initialPosition.clone();
    this.isActive = false;
    this.elements = [];
}

Pointer.prototype.move = function(position) {
    this.position.setX(position.getX());
    this.position.setY(position.getY());
    var movableList = [];
    for(var i = 0; i < this.elements.length; i++) {
        if('draggable' in this.elements[i] && 
                this.elements[i].draggable === true){
            movableList.push(this.elements[i]);
        };
    }; 
    if(movableList.length !== 0){
        movableList.pop().dragMove(this.position);
    };
}

Pointer.prototype.getPosition = function(position) {
    return this.position.clone();
}

Pointer.prototype.getIsActive = function() {
    return this.isActive;
}

Pointer.prototype.activate = function() {
    this.isActive = true;
    for(var i = 0; i < this.elements.length; i++) {
        if('draggable' in this.elements[i]){
            this.elements[i].activate(this.position);
        };
    };  
}

Pointer.prototype.deactivate = function() {
    this.isActive = false;
    for(var i = 0; i < this.elements.length; i++) {
        if('draggable' in this.elements[i]){
            this.elements[i].draggable = false;
        };
    }; 
}