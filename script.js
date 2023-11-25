// Environment Setup

var stage = new Konva.Stage({
    container: 'container',   // id of container <div>
    width: 1600,
    height: 900,
});
var layer = new Konva.Layer();
// White Background
var background = new Konva.Rect({
    x: 0,
    y: 0,
    width: stage.width(),
    height: stage.height(),
    fill: 'white',
    listening: false,
    zIndex: 0
});

// Create Placeholder Shape

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
let imagesArr = [];
let currentImg = [];

// Put image in array for further use

inputImg.addEventListener("change", () => {
    const file = inputImg.files;
    imagesArr.push(file[0]);
    currentImg.push(file[0]);
    displayImages();
    inputImg.value = "";
});


// Functions

// Show image in canvas
function displayImages() {
    // take data from currentImg Array
    currentImg.forEach((image, index) => {
        Konva.Image.fromURL(`${URL.createObjectURL(image)}`, function (newImage) {
            newImage.setAttrs({
              x: stage.width() / 4,
              y: stage.width() / 4,
              width: image.naturalWidth,
              height: image.naturalHeight,
              draggable: true,
              cornerRadius: 0  
            });
            layer.add(newImage);
            // dragEvent(newImage);
            // Clear currentImg Array to prevent double image
            currentImg.pop();
        });
    });
}

const toTop = document.getElementById('toTop');
const toBottom = document.getElementById('toBottom');
const layerDown = document.getElementById('down');
const layerUp = document.getElementById('Up');
const borderRadius = document.getElementById('border-radius');

// clicks should select/deselect shapes
stage.on('click tap', function (e) {
    // if click on empty area - remove all selections
    if (e.target === stage) {
      tr.nodes([]);
      return;
    }

    // do we pressed shift or ctrl?
    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    const isSelected = tr.nodes().indexOf(e.target) >= 0;

    if (!metaPressed && !isSelected) {
      // if no key pressed and the node is not selected, select just one
      tr.nodes([e.target]);
    } else if (metaPressed && isSelected) {
      // if we pressed keys and node was selected, remove it from selection:
      const nodes = tr.nodes().slice(); // use slice to have new copy of array
      // remove node from array
      nodes.splice(nodes.indexOf(e.target), 1);
      tr.nodes(nodes);
    } else if (metaPressed && !isSelected) {
      // add the node into selection
      const nodes = tr.nodes().concat([e.target]);
      tr.nodes(nodes);
    }

    toTop.addEventListener('click', () => {
        e.target.moveToTop();
    })
    toBottom.addEventListener('click', () => {
        e.target.setZIndex(1);
    })
    borderRadius.addEventListener('keyup', () => {
        console.log(borderRadius.value);
        console.log(typeof borderRadius.value)
        e.target.cornerRadius(parseInt(borderRadius.value));
    })
});

let dragEvent = (x) => {
    x.on('dragmove', () => {
        x.stroke('blue');
        x.strokeWidth(2);
    });
    x.on('dragend', () => {
        x.strokeWidth(0);
    });
}

var tr = new Konva.Transformer({
    anchorCornerRadius: 10,
    padding: 1
});

// add the shape to the layer
layer.add(background);
layer.add(circle);
layer.add(rect1);
layer.add(tr)

// add the layer to the stage
stage.add(layer);

// draw the image
layer.draw();


document.getElementById('download').addEventListener('click', () => {
    tr.nodes([]);

    const canvas = document.querySelector('#container canvas');
    let canvasUrl = canvas.toDataURL("image/png", 1.0);
    console.log(canvasUrl);
    const createEl = document.createElement('a');
    createEl.href = canvasUrl;
    createEl.download = "your-canvas-image";
    createEl.click();
    createEl.remove();
});
document.getElementById('select-image').addEventListener('click', () => {
    const canvas = document.querySelector('#container canvas');
    let canvasUrl = canvas.toDataURL("image/png", 1.0);
    document.getElementById('input-cart-img').setAttribute('value', canvasUrl);
});
document.getElementById('clear-value').addEventListener('click', () => {
    document.getElementById('input-cart-img').removeAttribute('value');

})