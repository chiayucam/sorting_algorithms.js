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
async function mergeSort(elements) {
    async function merge(elements, leftStart, leftEnd, rightStart, rightEnd, delay) {
        let mergedArray = []
        let leftVal, rightVal
        let startIdx = leftStart
        let timeout = 10
        while ((leftStart <= leftEnd) && (rightStart <= rightEnd)) {
            leftVal = getVal(elements.item(leftStart))
            rightVal = getVal(elements.item(rightStart))
            if (leftVal <= rightVal) {
                currOn(elements.item(leftStart))
                mergedArray.push(leftVal)
                await new Promise(r => setTimeout(r, timeout));
                currOff(elements.item(leftStart))
                leftStart++
            }
            else {
                currOn(elements.item(rightStart))
                mergedArray.push(rightVal)
                await new Promise(r => setTimeout(r, timeout));
                currOff(elements.item(rightStart))
                rightStart++
            }
        }
        while (leftStart <= leftEnd) {
            leftVal = getVal(elements.item(leftStart))
            currOn(elements.item(leftStart))
            mergedArray.push(leftVal)
            await new Promise(r => setTimeout(r, timeout));
            currOff(elements.item(leftStart))
            leftStart++
        }
        while (rightStart <= rightEnd) {
            rightVal = getVal(elements.item(rightStart))
            currOn(elements.item(rightStart))
            mergedArray.push(rightVal)
            await new Promise(r => setTimeout(r, timeout));
            currOff(elements.item(rightStart))
            rightStart++
        }
        await mergeVal(elements, mergedArray, startIdx, delay)
    }

    const delay = getDelay()
    let length = 2
    let leftStart, leftEnd, rightStart, rightEnd
    while (~~(length/2)<elements.length) {
        for (let i=0; i<elements.length; i+=length) {
            leftStart = i
            leftEnd = i+~~(length/2)-1
            rightStart = i+~~(length/2)
            rightEnd = i+~~(length)-1
            if (leftEnd >= elements.length-1) {
                break
            }
            else if (rightEnd > elements.length-1) {
                rightEnd = elements.length-1
            }
            await merge(elements, leftStart, leftEnd, rightStart, rightEnd, delay)
        }
        length *= 2
    }

}
async function quickSort(elements) {
    async function partition(elements, left, right, delay) {
        let i = left - 1
        currOn(elements.item(right))
        for (let j=left; j<right; j++) {
            if (getVal(elements.item(j)) <= getVal(elements.item(right))) {
                i++
                await swapVal(elements.item(i), elements.item(j), delay)
            }
        }
        i++
        await swapVal(elements.item(i), elements.item(right), delay)
        return i
    }

    const delay = getDelay()
    let stack = [[0, elements.length-1]]
    let left, mid, right
    do {
        [left, right] = stack.pop()
        mid = await partition(elements, left, right, delay)
        if (mid + 1 < right) {
            stack.push([mid+1, right])
        }
        if (left < mid - 1) {
            stack.push([left, mid-1])
        }
    } while (stack.length !== 0)
}
function radixSort() {
    
}
function heapSort() {
    
}

function getVal(element) {
    return parseInt(element.style.height.slice(0, -2))
}

function setVal(element, val) {
    element.style.height = val.toString()+"px"
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

async function mergeVal(elements, mergedArray, startIdx, delay) {
    for (let i=0; i<mergedArray.length; i++) {
        setVal(elements.item(startIdx+i), mergedArray[i])
        elements.item(startIdx+i).style.backgroundColor = "#ca84dd"
        await new Promise(r => setTimeout(r, delay));
        elements.item(startIdx+i).style.backgroundColor = "#5093e3"
    }
    
}


let arraySize = 99
let canvas = document.getElementById("graph-canvas")
canvas = initCanvas(canvas, arraySize)
