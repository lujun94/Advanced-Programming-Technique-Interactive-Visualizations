function setupTestScenario() {
    var gameLoop = new CustomGameLoop();
    gameLoop.initialize(document.getElementById("canvas"));
    gameLoop.setCanvasSize(640, 480);
    
    var backgroundImage = new BackgroundImage();
    backgroundImage.loadUrl("kitten1.jpg");
    backgroundImage.setPosition(new Point(200, 30));
    backgroundImage.setWidth(350);
    backgroundImage.setHeight(420);
    gameLoop.addElement(backgroundImage);
  
    var rectangle = new Rectangle();
    rectangle.setPosition(new Point(100, 60));
    rectangle.setWidth(200);
    rectangle.setHeight(150);
    rectangle.setFillColor("red");
    rectangle.setStrokeColor("orange");
    rectangle.setStrokeThickness(5);
    gameLoop.addElement(rectangle);
  
    var circle = new Circle();
    circle.setPosition(new Point(170, 140));
    circle.setWidth(150);
    circle.setHeight(110);
    circle.setFillColor("#2BBDBD");
    circle.setStrokeColor("orange");
    circle.setStrokeThickness(5);
    gameLoop.addElement(circle);

    var triangle = new Triangle();
    triangle.setPosition(new Point(500, 200));
    triangle.setWidth(100);
    triangle.setHeight(200);
    triangle.setFillColor("purple");
    triangle.setStrokeColor("white");
    triangle.setStrokeThickness(2);
    gameLoop.addElement(triangle);
    

}

function initialize() {
    setupTestScenario();
}

window.onload = initialize;