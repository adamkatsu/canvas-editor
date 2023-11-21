// Environment Setup

var stage = new Konva.Stage({
    container: 'container',   // id of container <div>
    width: window.innerWidth - 100,
    height: window.innerHeight - 100,
});
var layer = new Konva.Layer();
var background = new Konva.Rect({
    x: 0,
    y: 0,
    width: stage.width(),
    height: stage.height(),
    fill: 'white',
    listening: false
});

// Create Shape

var circle = new Konva.Circle({
    id: 'circle',
    x: stage.width() / 2,
    y: stage.height() / 2,
    radius: 100,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4,
    draggable: true
});
var rect1 = new Konva.Rect({
    id: 'rect',
    x: 20,
    y: 20,
    width: 200,
    height: 200,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 2,
    draggable: true
});

let shapes = [circle, rect1];
shapes.forEach((shape) => {
    dragEvent(shape);
});

// Image Upload

const inputImg = document.getElementById('input-img');
const output = document.getElementById('output');

let imagesArr = [];
let currentImg = [];

inputImg.addEventListener("change", () => {
    const file = inputImg.files;
    imagesArr.push(file[0]);
    currentImg.push(file[0]);
    displayImages();
    inputImg.value = "";
});


// Functions

function displayImages() {
    currentImg.forEach((image, index) => {
        Konva.Image.fromURL(`${URL.createObjectURL(image)}`, function (newImage) {
            newImage.setAttrs({
              x: stage.width() / 4,
              y: stage.width() / 4,
              width: image.naturalWidth,
              height: image.naturalHeight,
              draggable: true,
              name: "rect"
            });
            layer.add(newImage);
            dragEvent(newImage);
            currentImg.pop();
        });
        // layer.add(Konva.Transformer.nodes([newImage]));
    });
}
function dragEvent(x) {
    x.on('dragmove', function() {
        x.opacity(0.9);
        x.stroke('black');
        x.strokeWidth(4);

    });
    x.on('dragend', function() {
        x.opacity(1);
        x.strokeWidth(0);
    });
}


// add a new feature, lets add ability to draw selection rectangle
var selectionRectangle = new Konva.Rect({
    fill: 'rgba(0,0,0,0.2)',
    visible: false,
});


// clicks should select/deselect shapes
stage.on('click tap', function (e) {
    // if click on empty area - remove all selections
    console.log(e.target);
    if (e.target === stage) {
      tr.nodes([]);
      return;
    }

    // do we pressed shift or ctrl?
    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    const isSelected = tr.nodes().indexOf(e.target) >= 0;

    if (!metaPressed && !isSelected) {
      // if no key pressed and the node is not selected
      // select just one
      tr.nodes([e.target]);
    } else if (metaPressed && isSelected) {
      // if we pressed keys and node was selected
      // we need to remove it from selection:
      const nodes = tr.nodes().slice(); // use slice to have new copy of array
      // remove node from array
      nodes.splice(nodes.indexOf(e.target), 1);
      tr.nodes(nodes);
    } else if (metaPressed && !isSelected) {
      // add the node into selection
      const nodes = tr.nodes().concat([e.target]);
      tr.nodes(nodes);
    }
});


var tr = new Konva.Transformer();

// add the shape to the layer
layer.add(background);
layer.add(circle);
layer.add(rect1);
layer.add(selectionRectangle);

layer.add(tr)

// add the layer to the stage
stage.add(layer);

// draw the image
layer.draw();


document.getElementById('download').addEventListener('click', function(e) {
    const canvas = document.querySelector('#container canvas');
    let canvasUrl = canvas.toDataURL("image/png", 0.5);
    console.log(canvasUrl);
    const createEl = document.createElement('a');
    createEl.href = canvasUrl;
    createEl.download = "your-canvas-image";
    createEl.click();
    createEl.remove();
  });