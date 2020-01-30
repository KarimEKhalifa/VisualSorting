sortBtn = document.getElementById("sort")
inputTxt = document.getElementById("input")
outputDiv = document.getElementById("outputDiv")
algoDisp = document.getElementById("algoDisp")
bubblePre = document.getElementById("bubblePre")
selectionPre = document.getElementById('selectionPre')
heapPre = document.getElementById("heapPre")
algoSel = document.getElementById("algoSel")
outConti = document.getElementById("outConti")

class InputOutput{

    getInput = () => {
        let sortingItems = inputTxt.value
        let iItems = sortingItems.trim().split(' ').map(Number)
        let items = Number.isNaN(iItems[0])? sortingItems.split(',').map(Number) : iItems;
        return items
    }

    clearDiv = (divName) => {
        let child = divName.lastElementChild;  
        while (child) { 
            divName.removeChild(child); 
            child = divName.lastElementChild; 
        } 
    }

    clearAlgo = () => {
        [].forEach.call(document.querySelectorAll('.Algo'), function (el) {
        el.style.display = 'none'})
    }

    selectAlgo = (selected) => {
        if (selected == "Bubble")
            bubblePre.style.display = 'block'
        else if (selected == "Selection")
             selectionPre.style.display = 'block'
        else if (selected == "Heap")
            heapPre.style.display = 'block'
    }


    draw = (div,items,steps,color) => {
        let sortedItems = [...items].sort((a, b) => a - b)
        let itemsSize = items.length
        let out = document.createElement("div")
        let balls = document.createElement("div")
        balls.className = "col"
        out.className = "series row col-12"
        for( let i of items){
            let node = document.createElement("div")
            color==0?node.className = "ball green":node.className = "ball red"
            let textnode = document.createTextNode(i)
            node.appendChild(textnode)
            node.style.transform = "scale("+(0.4+(sortedItems.indexOf(i)+1)/itemsSize)+")"
            balls.appendChild(node)
        }
        out.appendChild(balls)
        div.appendChild(out)

        if(steps){
            let step = document.createElement("div")
            let list = document.createElement("ol")
            step.className = "steps col"
            for(let i of steps){
                let node = document.createElement("li")
                let textnode = document.createTextNode(i)
                node.appendChild(textnode)
                list.appendChild(node)           
                step.appendChild(list)
                out.appendChild(step)
            }
        }

    }

    doneSorting = (div,items,doneItem) =>{
        let sortedItems = [...items].sort((a, b) => a - b)
        let itemsSize = items.length
        let out = document.createElement("div")
        let balls = document.createElement("div")
        balls.className = "col"
        out.className = "series row col-12"
        for( let i of items){
            let node = document.createElement("div")
            doneItem.includes(i)?node.className = "ball blue":node.className = "ball red"
            let textnode = document.createTextNode(i)
            node.appendChild(textnode)
            node.style.transform = "scale("+(0.4+(sortedItems.indexOf(i)+1)/itemsSize)+")"
            balls.appendChild(node)
        }
        out.appendChild(balls)
        div.appendChild(out)
    }

    endOfPage = () => window.scrollTo(0,document.body.scrollHeight) 
}


inputTxt.oninput = () => {
    algoDisp.style.display = 'none'
    myInputOutput.clearDiv(outputDiv)
    myInputOutput.clearDiv(outConti)
    myInput = myInputOutput.getInput()
    mySorting = new Sorting(myInput,myInputOutput)
    myInputOutput.draw(outConti,myInput)
}

sortBtn.onclick = () => {
    myInputOutput.clearDiv(outputDiv)
    mySorting.Items = myInputOutput.getInput()

    let selectedAlgo = mySorting.bubbleSort
    if(algoSel.value == "Bubble")
        selectedAlgo = mySorting.bubbleSort
    else if(algoSel.value == "Selection")
        selectedAlgo = mySorting.selectionSort
    else if(algoSel.value == "Heap")
        selectedAlgo = mySorting.heapSort

    mySorting.Timer = setInterval(selectedAlgo, 1000)
}

algoSel.onchange = () => {
    myInputOutput.clearAlgo()
    myInputOutput.selectAlgo(algoSel.value)
    clearInterval(mySorting.Timer)
    myInputOutput.clearDiv(outputDiv)
    myInputOutput.clearDiv(outConti)
    myInputOutput.draw(outConti,myInput)
    algoDisp.style.display = 'none'
}

let myInputOutput = new InputOutput()
myInputOutput.clearAlgo()
bubblePre.style.display = 'block'
