function initArray(arraySize) {
    arr = [...Array(arraySize).keys()].map(i => (i + 1) * 3)
    arr = shuffleArray(arr)
    return arr
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
}

function clearCanvas(canvas) {
    canvas.innerHTML = ""
}

function initCanvas(canvas, arraySize) {
    clearCanvas(canvas)
    arr = initArray(arraySize)
    html = ``
    for (let i = 0; i < arr.length; i++) {
        html += `<div class="float-start bg-primary" style="height: ${arr[i]}px; width: 5px; margin-left: 3px; color: transparent; font-size: 1px"></div>`
    }
    canvas.innerHTML = html
}

function GenerateArrayBtn() {
    initCanvas(canvas, arraySize)
}

function SortArrayBtn() { 
    document.getElementById("SortArrayBtn").disabled = true
    sortingAlgo = document.querySelector('input[name="algoRadioBtn"]:checked').id
    console.log(sortingAlgo)
}

function sort(sortingAlgo) {
    switch(sortingAlgo) {
        case "selectionSort":
        case "insertionSort":
        case "bubbleSort":
        case "mergeSort":
        case "quickSort":
        case "radixSort":
        case "heapSort":
    }
}

function selectionSort() {
    
}
function insertionSort() {
    
}
function bubbleSort() {
    
}
function mergeSort() {
    
}
function quickSort() {
    
}
function radixSort() {
    
}
function heapSort() {
    
}

arraySize = 161
canvas = document.getElementById("graph-canvas")
initCanvas(canvas, arraySize)

