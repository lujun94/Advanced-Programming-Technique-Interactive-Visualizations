function GameEngine() {
}

GameEngine.prototype.initializeGraphics = function() {
    this.g = this.canvas.getContext("2d");
    this.canvas.width = 600;
    this.canvas.height = 400;
};

GameEngine.prototype.initializeInput = function() {
    this.canvas.associatedGameEngine = this;
    this.canvas.onmousemove = function(e) {
        var localCoordinate = 
                this.associatedGameEngine.getLocalCanvasCoordinates(e);
        this.associatedGameEngine.onMouseMove(localCoordinate);
    };
    this.canvas.onclick = function(e) {
        var localCoordinate = 
                this.associatedGameEngine.getLocalCanvasCoordinates(e);
        this.associatedGameEngine.onMouseClick(localCoordinate);
    };
};

GameEngine.prototype.getLocalCanvasCoordinates = function(e) {  
    var offset = this.canvas.getBoundingClientRect();
    var positionOnCanvas = {
        x : e.clientX - offset.left,
        y : e.clientY - offset.top
    };
    return positionOnCanvas;
};

GameEngine.prototype.onMouseClick = function(position) {
    alert(position.x + "; " + position.y);
};

GameEngine.prototype.onMouseMove = function(position) {
    // override
};

GameEngine.prototype.initializeTimer = function() {
    var engine = this;
    setInterval(function() {
        engine.onTimerTick();
    }, 10);
};

GameEngine.prototype.onTimerTick = function() {
    this.update(10);
    this.clear(this.g);
    this.draw(this.g);
};

GameEngine.prototype.clear = function(g) {
    g.fillStyle = "white";
    g.fillRect(0, 0, this.canvas.width, this.canvas.height);
};

GameEngine.prototype.update = function(elapsedMilliseconds) {
    // override
};

GameEngine.prototype.draw = function(g) {
    // override
};

GameEngine.prototype.initialize = function(canvas) {  
    this.canvas = canvas;
    this.initializeGraphics();
    this.initializeInput();
    this.initializeTimer();
};