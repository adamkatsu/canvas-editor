var stage = new Konva.Stage({
    container: 'container',   // id of container <div>
    width: 800,
    height: 800,
  });

  // then create layer
var layer = new Konva.Layer();

// create our shape
var circle = new Konva.Circle({
    x: stage.width() / 2,
    y: stage.height() / 2,
    radius: 100,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4,
    draggable: true
});

var background = new Konva.Rect({
    x: 0,
    y: 0,
    width: stage.width(),
    height: stage.height(),
    fill: 'white',
    listening: false
});

var rect1 = new Konva.Rect({
    x: 20,
    y: 20,
    width: 200,
    height: 200,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 2,
    draggable: true
  });
  // add the shape to the layer


let dragEvent = (x) => {
    x.on('dragmove', function() {
        x.stroke('white');
        x.opacity(0.3);
        x.scaleX(0.8);
        x.scaleY(0.8);
    });
    x.on('dragend', function() {
        x.stroke('black');
        x.opacity(1);
        x.scaleX(1);
        x.scaleY(1);
    });
}  
let shapes = [circle, rect1];



var tr = new Konva.Transformer();

// add the shape to the layer
layer.add(background);
layer.add(circle);
layer.add(rect1);

layer.add(tr)
tr.nodes([rect1]);
tr.nodes([circle]);


// add the layer to the stage
stage.add(layer);

// draw the image
layer.draw();