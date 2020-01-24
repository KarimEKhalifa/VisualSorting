sortBtn = document.getElementById("sort")
inputTxt = document.getElementById("input")
inputDiv = document.getElementById("inputDiv")
outputDiv = document.getElementById("outputDiv")
algoDisp = document.getElementById("algoDisp")
bubblePre = document.getElementById("bubblePre")
selectionPre = document.getElementById('selectionPre')
algoSel = document.getElementById("algoSel")

class Sorting{

    constructor(items,IO){
        this.items = items
        this.timer = ""
        this.IOHandler = IO
        this.iteration = 0
    }

    set Timer(x){
        this.timer = x
    }

    get Timer(){
        return this.timer
    }

    set Items(x){
        this.items = x
    }

    get Items(){
        return this.items
    }

    set IO(x){
        this.IOHandler = x
    }

    get IO(){
        return this.IOHandler
    }


    bubbleSort = () => {
        let flag = 0
        let steps=[]
        for( let i=0; i< this.items.length-1; i++){
            if(this.items[i] > this.items[i+1]){
                let temp = this.items[i]
                this.items[i] = this.items[i+1]
                this.items[i+1] = temp
                flag = 1
                steps.push(this.items[i]+" has been switch with "+this.items[i+1])
            }
        }

        this.IOHandler.draw(outputDiv,this.items,steps,flag)
        if (flag == 0 ){
            clearInterval(this.timer)
        }
    }

    selectionSort = () => {
        console.log(this.iteration)
        let flag = 1
        let steps=[]
        let minIndex = this.iteration
        for( let i=this.iteration+1; i< this.items.length; i++){
            if(this.items[i] < this.items[minIndex])
                minIndex = i
        }

        if(minIndex != this.iteration){
            let temp = this.items[this.iteration]
            this.items[this.iteration] = this.items[minIndex]
            this.items[minIndex] = temp
            steps.push(this.items[this.iteration]+" has been switch with "+this.items[minIndex])
        }else{
            steps.push(this.items[this.iteration]+" is the list's smallest element")
        }

        this.IOHandler.draw(outputDiv,this.items,steps,flag)
        this.iteration++

        if (this.iteration == this.items.length -1 ){
            clearInterval(this.timer)
            this.iteration = 0
            flag = 0
            steps=[]
        }
    }

}

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
        console.log(selected)

        if (selected == "Bubble")
            bubblePre.style.display = 'block'
        else if (selected == "Selection")
             selectionPre.style.display = 'block'
    }


    draw = (div,items,steps,color) => {
        let out = document.createElement("div")
        out.className = "series"
        for( let i of items){
            let node = document.createElement("div")
            color==0?node.className = "ball green":node.className = "ball red"
            let textnode = document.createTextNode(i)
            node.appendChild(textnode)
            out.appendChild(node)
            div.appendChild(out)
        }

        if(steps){
            let step = document.createElement("div")
            let list = document.createElement("ol")
            step.className = "steps"
            for(let i of steps){
                let node = document.createElement("li")
                let textnode = document.createTextNode(i)
                node.appendChild(textnode)
                list.appendChild(node)           
                step.appendChild(list)
                out.appendChild(step)
            }
        }

        this.endOfPage()
    }

    endOfPage = () => {
        window.scrollTo(0,document.body.scrollHeight)
    }

    
}


inputTxt.oninput = () => {
    myInputOutput.clearDiv(inputDiv)
    myInput = myInputOutput.getInput()
    mySorting = new Sorting(myInput,myInputOutput)
    myInputOutput.draw(inputDiv,myInput)
}

sortBtn.onclick = () => {
    myInputOutput.clearDiv(outputDiv)
    mySorting.Items = myInputOutput.getInput()

    let selectedAlgo = mySorting.bubbleSort
    if(algoSel.value == "Bubble")
        selectedAlgo = mySorting.bubbleSort
    else if(algoSel.value == "Selection")
        selectedAlgo = mySorting.selectionSort

    mySorting.Timer = setInterval(selectedAlgo, 1000)
}

algoSel.onchange = () => {
    myInputOutput.clearAlgo()
    myInputOutput.selectAlgo(algoSel.value)
    clearInterval(mySorting.Timer)
    myInputOutput.clearDiv(outputDiv)
}

let myInputOutput = new InputOutput()
myInputOutput.clearAlgo()
bubblePre.style.display = 'block'
