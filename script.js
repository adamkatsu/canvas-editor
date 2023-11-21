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
// create our shape
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
  // add the shape to the layer

let shapes = [circle, rect1];
let imagesArr = [];
let currentImg = [];

const inputImg = document.getElementById('input-img');
const output = document.getElementById('output');

inputImg.addEventListener("change", () => {
    const file = inputImg.files;
    imagesArr.push(file[0]);
    currentImg.push(file[0]);
    displayImages();
});

function displayImages() {
    currentImg.forEach((image, index) => {
        Konva.Image.fromURL(`${URL.createObjectURL(image)}`, function (newImage) {
            newImage.setAttrs({
              x: stage.width() / 2,
              y: stage.width() / 2,
              width: image.naturalWidth,
              height: image.naturalHeight,
              draggable: true
            });
            layer.add(newImage);
            dragEvent(newImage);
            currentImg.pop();
        });
        // layer.add(Konva.Transformer.nodes([newImage]));
    });
}
imagesArr.forEach((image) => {
    dragEvent(image);
});
shapes.forEach((shape) => {
    dragEvent(shape);
});
function dragEvent(x) {
    x.on('dragmove', function() {
        x.opacity(0.8);
        x.scaleX(0.9);
        x.scaleY(0.9);
    });
    x.on('dragend', function() {
        x.opacity(1);
        x.scaleX(1);
        x.scaleY(1);
    });
}



var tr = new Konva.Transformer();

// add the shape to the layer
layer.add(background);
layer.add(circle);
layer.add(rect1);

layer.add(tr)
tr.nodes([rect1]);


// add the layer to the stage
stage.add(layer);

// draw the image
layer.draw();