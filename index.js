function initArray(arraySize) {
    arr = [...Array(arraySize).keys()].map(i => (i + 1) * 5)
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
        html += `<div class="float-start" style="height: ${arr[i]}px; width: 10px; margin-left: 3px; background-color: #5093e3; color: transparent; font-size: 1px"></div>`
    }
    canvas.innerHTML = html
    return canvas
}

function GenerateArrayBtn() {
    initCanvas(canvas, arraySize)
}

async function SortArrayBtn() { 
    document.getElementById("SortArrayBtn").disabled = true
    document.getElementById("GenerateArrayBtn").disabled = true
    document.getElementById("delayRange").disabled = true

    const sortingAlgo = document.querySelector('input[name="algoRadioBtn"]:checked').id
    const delay = document.getElementById("delayRange").value
    console.log(sortingAlgo)
    await sort(sortingAlgo)


    document.getElementById("SortArrayBtn").disabled = false
    document.getElementById("GenerateArrayBtn").disabled = false
    document.getElementById("delayRange").disabled = false
}

async function sort(sortingAlgo) {
    let elements = canvas.children
    let sortingAlgoMap = {
        "selectionSort": selectionSort,
        "insertionSort": insertionSort,
        "bubbleSort": bubbleSort,
        "mergeSort": mergeSort,
        "quickSort": quickSort,
        "radixSort": radixSort,
        "heapSort": heapSort
    }
    await sortingAlgoMap[sortingAlgo](elements)
}

function currOn(element) {
    element.style.backgroundColor = "#50e366"
}

function currOff(element) {
    element.style.backgroundColor = "#5093e3"
}

async function selectionSort(elements) {
    let min_val, min_idx, curr
    const delay = getDelay()
    for (let i=0; i<elements.length; i++) {
        min_val = getVal(elements.item(i))
        min_idx = i
        for (let j=i+1; j<elements.length; j++) {
            currOn(elements.item(j))
            curr = getVal(elements.item(j))
            if (curr < min_val) {
                min_val = curr
                min_idx = j
            }
            await new Promise(r => setTimeout(r, 2));
            currOff(elements.item(j))
        }
        await swapVal(elements.item(i), elements.item(min_idx), delay)
        
    }
}

async function insertionSort(elements) {
    let target, j
    const delay = getDelay()
    for (let i=1; i<elements.length; i++) {
        if (i+1 < elements.length){
            currOn(elements.item(i+1))
        }
        target = getVal(elements.item(i))
        j = i
        
        while (j > 0 && getVal(elements.item(j-1)) > target) {
            await swapVal(elements.item(j), elements.item(j-1), delay)
            j--
        }
    }
}

async function bubbleSort(elements) {
    const delay = getDelay()
    for (let i=elements.length-1; i>0; i--) {
        for (let j=1; j<=i; j++) {
            if (getVal(elements.item(j-1)) > getVal(elements.item(j))) {
                await swapVal(elements.item(j-1), elements.item(j), delay)
            }
        }
    }
}
function mergeSort() {
    
}
function quickSort() {
    
}
function radixSort() {
    
}
function heapSort() {
    
}

function getVal(element) {
    return parseInt(element.style.height.slice(0, -2))
}

function getDelay() {
    return document.getElementById("delayRange").value
}

async function swapVal(element1, element2, delay) {
    element1.style.backgroundColor = "#ca84dd"
    element2.style.backgroundColor = "#ca84dd"
    const temp = element1.style.height
    element1.style.height = element2.style.height
    element2.style.height = temp
    await new Promise(r => setTimeout(r, delay));
    element1.style.backgroundColor = "#5093e3"
    element2.style.backgroundColor = "#5093e3"
}

arraySize = 99
canvas = document.getElementById("graph-canvas")
canvas = initCanvas(canvas, arraySize)
