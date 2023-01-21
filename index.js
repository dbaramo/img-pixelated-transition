let images = [
    "./images/pic1.jpg",
    "./images/pic2.jpg",
    "./images/pic3.jpg",
    "./images/pic4.jpg",
    "./images/pic5.jpg",
    "./images/pic6.jpg",
    "./images/pic7.jpg",
    "./images/pic8.jpg",
    "./images/pic9.jpg",
    "./images/pic10.jpg"
]
let imageData = []
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext('2d', { willReadFrequently: true });
let secondCanvas = document.createElement('canvas')
let secondCanvasContext = secondCanvas.getContext('2d', { willReadFrequently: true })
let img = new Image();
let imgIndex = 0
img.src = images[imgIndex]

img.onload = function () {
    if(canvas.width === 0){
        canvas.width = img.width;
        canvas.height = img.height;
    }
    secondCanvas.width = img.width;
    secondCanvas.height = img.height;
    resizeImage()
}

let nextBtn = document.getElementById('next-btn')
nextBtn.addEventListener('click', () => {
    imgIndex++
    if(imgIndex >= images.length) imgIndex = 0
    img.src = images[imgIndex]
    resizeImage()
})

let prevBtn = document.getElementById('prev-btn')
prevBtn.addEventListener('click', () => {
    imgIndex--
    if(imgIndex < 0) imgIndex = images.length - 1
    img.src = images[imgIndex]
    resizeImage()
})


function resizeImage(){
    let squareLength = 300

    imageData = []

    secondCanvasContext.drawImage(img, 0, 0, img.width, img.height);

    for(let r = 0; r < img.width; r+=squareLength){
        for(let c = 0; c < img.height; c+=squareLength){
            imageData.push({
                r,
                c,
                data: secondCanvasContext.getImageData(r, c, squareLength, squareLength)
            })
        }
    }
}

setInterval(() => {
    if(imageData.length){
        let index = Math.floor(Math.random() * imageData.length)
        let { data, r, c } = imageData[index]
        ctx.putImageData(data, r, c)
        imageData = imageData.filter((d, i) => i!== index)
    }
}, 10)

