function DataSeries(name)
{
    this.name = name;
    this.data = [];
}

DataSeries.prototype.getData = function()
{
    return this.data;
}

DataSeries.prototype.addDataPoint = function(label, value)
{
    this.data.push(new DataPoint(label, value));
}

DataSeries.prototype.getName = function()
{
    return this.name;
}

function DataPoint(label, value)
{
    this.label = label;
    this.value = value;
}

DataPoint.prototype.getLabel = function()
{
    return this.label;
}

DataPoint.prototype.getValue = function()
{
    return this.value;
}

function initializeData()
{
    var series1 = new DataSeries("Northampton");
    series1.addDataPoint("2000", 70.0);
    series1.addDataPoint("2001", 72.0);
    series1.addDataPoint("2002", 60.0);
    series1.addDataPoint("2003", 55.0);
    series1.addDataPoint("2004", 43.0);
    series1.addDataPoint("2005", 46.0);
    series1.addDataPoint("2006", 56.0);
    series1.addDataPoint("2007", 67.0);
    series1.addDataPoint("2008", 91.0);
    series1.addDataPoint("2009", 90.0);
    series1.addDataPoint("2010", 78.0);
    var series2 = new DataSeries("Amherst");
    series2.addDataPoint("2000", 76.0);
    series2.addDataPoint("2001", 70.0);
    series2.addDataPoint("2002", 65.0);
    series2.addDataPoint("2003", 40.0);
    series2.addDataPoint("2004", 30.0);
    series2.addDataPoint("2005", 46.0);
    series2.addDataPoint("2006", 23.0);
    series2.addDataPoint("2007", 24.0);
    series2.addDataPoint("2008", 27.0);
    series2.addDataPoint("2009", 30.0);
    series2.addDataPoint("2010", 45.0);
    var series3 = new DataSeries("Easthampton");
    series3.addDataPoint("2000", 45.0);
    series3.addDataPoint("2001", 50.0);
    series3.addDataPoint("2002", 28.0);
    series3.addDataPoint("2003", 33.0);
    series3.addDataPoint("2004", 32.0);
    series3.addDataPoint("2005", 56.0);
    series3.addDataPoint("2006", 60.0);
    series3.addDataPoint("2007", 62.0);
    series3.addDataPoint("2008", 45.0);
    series3.addDataPoint("2009", 57.0);
    series3.addDataPoint("2010", 64.0);
    DATA.push(series1);
    DATA.push(series2);
    DATA.push(series3);
}

var DATA = [];
initializeData();