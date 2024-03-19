const colorPicker = document.getElementById('colorPicker');
const bgColor = document.getElementById('bgColor');
const selectVal = document.getElementById('Font-size');
const myCanva = document.getElementById('mycanvas');
const clearBtn = document.getElementById('clearBtn')
const saveBtn = document.getElementById('saveBtn')
const retrieveBtn = document.getElementById('retrieveBtn')

const ctx = myCanva.getContext('2d');

let isDrawing;
let lastX;
let lastY;

colorPicker.addEventListener('change',(e)=>{
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target,value;
})

myCanva.addEventListener('mousedown',(e)=>{
    isDrawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;
})

myCanva.addEventListener('mousemove',(e)=>{
    if(isDrawing){
        ctx.beginPath()
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(event.offsetX , event.offsetY);
        ctx.stroke()
        lastX = event.offsetX;
        lastY = event.offsetY
    }
});

myCanva.addEventListener('mouseup',()=>{
    isDrawing = false
})

bgColor.addEventListener('change', (e)=>{
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0,0,800,400)
});

selectVal.addEventListener('change' , (e)=>{
    ctx.lineWidth = e.target.value;
})

clearBtn.addEventListener('click',()=>{
    ctx.clearRect(0,0,myCanva.width,myCanva.height)
});

saveBtn.addEventListener('click', ()=>{
    localStorage.setItem('canvasContent' , myCanva.toDataURL());
    let link = document.createElement('a')
    link.download = 'my-canvas.png';
    link.href = myCanva.toDataURL()
    link.click();
})

retrieveBtn.addEventListener('click', ()=>{
    let savedCanvas = localStorage.getItem('canvasContent')
    if(savedCanvas){
        let img = new Image();
        img.src = savedCanvas;
        ctx.drawImage(img,0,0)
    }
})