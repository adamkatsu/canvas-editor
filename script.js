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
    // zIndex: 0
});
// background.moveToBottom();

// Create Placeholder Shape

var circle = new Konva.Circle({
    id: 'circle',
    x: stage.width() / 2,
    y: stage.height() / 2,
    radius: 100,
    fill: 'red',
    draggable: true
});
var rect1 = new Konva.Rect({
    id: 'rect',
    x: 200,
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
              zIndex: 2
            //   cornerRadius: 0  
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
      borderRadius.value = 0;
      return;
    }

    // do we pressed shift or ctrl?
    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    const isSelected = tr.nodes().indexOf(e.target) >= 0;

    if (!metaPressed && !isSelected) {
      // if no key pressed and the node is not selected, select just one
        tr.nodes([e.target]);
        // get border radius value of selected node
        tr.nodes().forEach((node) => {
            if(node.attrs.cornerRadius > 0) {
                borderRadius.value = node.attrs.cornerRadius;
            }
        })
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

    // Manipulate Element
    toTop.addEventListener('click', () => {
        tr.nodes().forEach((node) => {
            node.moveToTop();
        })
    })
    toBottom.addEventListener('click', () => {
        tr.nodes().forEach((node) => {
            node.zIndex(1);
        })
    })
    borderRadius.addEventListener('keyup', () => {
        console.log(borderRadius.value);
        console.log(typeof borderRadius.value)
        tr.nodes().forEach((node) => {
            node.cornerRadius(parseInt(borderRadius.value));
        })
    })
});

function dragEvent(x) {
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
    const canvas = document.querySelector('#container canvas');``
    // set image to base64
    let canvasUrl = canvas.toDataURL("image/png", 1.0);
    // document.getElementById('input-cart-img').setAttribute('value', canvasUrl);

    function dataURItoBlob(dataURI){
        var binary=atob(dataURI.split(',')[1]);
        var array=[];
        for(i=0;i<binary.length;i++){
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)],{type:'image/png'});
    }

    //Function that inserts an array of File objects inside a input type file, because HTMLInputElement.files cannot be setted directly
    function FileListItems(file_objects){
        new_input=new ClipboardEvent("").clipboardData||new DataTransfer()
        for(i=0,size=file_objects.length;i<size;++i){
            new_input.items.add(file_objects[i]);
        }
        return new_input.files;
    }               

    //Create a Blob object
    blob=(dataURItoBlob(canvasUrl));
    //Use the Blob to create a File Object
    file=new File([blob],"custom-sticker.png",{type:"image/png",lastModified:new Date().getTime()});
    //Putting the File object inside an array because my input is multiple
    array_images=[file]; //You can add more File objects if your input is multiple too
    //Modify the input content to be submited
    input_images=document.getElementById("input-cart-img")
    input_images.files=new FileListItems(array_images);
});
