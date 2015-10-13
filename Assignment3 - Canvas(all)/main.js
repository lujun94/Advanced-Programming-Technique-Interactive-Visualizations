/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var DATA_OPTIONS = ["Northampton", "Amherest", "Easthampton"];
var DATA_SELECTOR_X = 100 ;
var DATA_SELECTOR_Y = 10 ;
var TYPE_OPTIONS = ["Bar Chart", "Line Graph"];
var TYPE_SELECTOR_X = 400 ;
var TYPE_SELECTOR_Y = 10 ;
var SCALE_X = 50;
var SCALE_Y = 100;


var CanvasObject = function (canvas) {
    this.dataSelector = new Selector(DATA_OPTIONS, DATA_SELECTOR_X,
    DATA_SELECTOR_Y, 120, "Select Data");
    this.typeSelector = new Selector(TYPE_OPTIONS, TYPE_SELECTOR_X, 
    TYPE_SELECTOR_Y, 120, "Select Type");
    this.verticalScale = new VerticalScale(SCALE_X, SCALE_Y);
    this.guideLine = new GuideLine(60, 510);
    this.lineChart = new Lines();
    this.barChart = new Bars();
};

CanvasObject.prototype = new GameEngine();


CanvasObject.prototype.draw = function (g) {
    this.dataSelector.draw(g);
    this.typeSelector.draw(g);
    
    var dataSeries = null;
    if (this.dataSelector.text === "Northampton") {
        dataSeries = DATA[0];
    } else if (this.dataSelector.text === "Amherest") {
        dataSeries = DATA[1]; 
    } else if (this.dataSelector.text === "Easthampton") {
        dataSeries = DATA[2];
    };
    if(this.dataSelector.haveSelected && this.typeSelector.haveSelected){
        if(this.typeSelector.text === "Line Graph"){
            this.lineChart.draw(g, dataSeries.data);
        }else {
            this.barChart.draw(g, dataSeries.data);           
        };
        this.verticalScale.draw(g);
        this.guideLine.draw(g, this.getLocalCanvasCoordinates(g));
    };

};

CanvasObject.prototype.onMouseMove = function (position) {
    this.dataSelector.onMouseMove(position);
    this.typeSelector.onMouseMove(position);
    this.guideLine.onMouseMove(position);
    this.lineChart.onMouseMove(position);
    this.barChart.onMouseMove(position);
};

CanvasObject.prototype.onMouseClick = function(position) {
    this.dataSelector.onMouseClick(position);    // to sense the position
    this.typeSelector.onMouseClick(position);
};

var initialize = function () {
    var canvasObject = new CanvasObject();
    canvasObject.initialize(document.getElementById("Canvas"));

    
};

window.onload = initialize();