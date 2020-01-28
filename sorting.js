sortBtn = document.getElementById("sort")
inputTxt = document.getElementById("input")
outputDiv = document.getElementById("outputDiv")
algoDisp = document.getElementById("algoDisp")
bubblePre = document.getElementById("bubblePre")
selectionPre = document.getElementById('selectionPre')
algoSel = document.getElementById("algoSel")
outConti = document.getElementById("outConti")

class Sorting{

    constructor(items,IO){
        this.items = items
        this.timer = ""
        this.steps = []
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
        this.steps = []
        for( let i=0; i< this.items.length-1; i++){
            if(this.items[i] > this.items[i+1]){
                let temp = this.items[i]
                this.items[i] = this.items[i+1]
                this.items[i+1] = temp
                flag = 1
                this.steps.push(this.items[i]+" has been switch with "+this.items[i+1])
            }
        }

        if (flag == 0 ){
            clearInterval(this.timer)
            this.steps = []
            this.IOHandler.clearDiv(outConti)
            this.IOHandler.draw(outConti,this.items,[],flag)
            algoDisp.style.display = 'block'
            return
        }  
        this.IOHandler.clearDiv(outConti)
        this.IOHandler.draw(outConti,this.items,[],flag)
        this.IOHandler.draw(outputDiv,this.items,this.steps,flag)
    }

    selectionSort = () => {
        let flag = 0
        let minIndex = this.iteration
        this.steps = []
        for( let i=this.iteration; i< this.items.length; i++){
            if(this.items[i] < this.items[minIndex])
                minIndex = i
        }

        if(minIndex != this.iteration){
            let temp = this.items[this.iteration]
            this.items[this.iteration] = this.items[minIndex]
            this.items[minIndex] = temp
            this.steps.push(this.items[this.iteration]+" has been switch with "+this.items[minIndex])
            flag = 1
        }else if(this.iteration != this.items.length){
            this.steps.push(this.items[this.iteration]+" is the list's smallest element")
            flag = 1
        }

        if (this.iteration == this.items.length && flag == 0 ){
            clearInterval(this.timer)
            this.iteration = 0
            this.steps=[]
            this.IOHandler.clearDiv(outConti)
            this.IOHandler.draw(outConti,this.items,[],flag)
            algoDisp.style.display = 'block'
            return 
        }
        this.IOHandler.clearDiv(outConti)
        this.IOHandler.draw(outConti,this.items,[],flag)

        this.IOHandler.draw(outputDiv,this.items,this.steps,flag)

        this.iteration++
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
        if (selected == "Bubble")
            bubblePre.style.display = 'block'
        else if (selected == "Selection")
             selectionPre.style.display = 'block'
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
            step.className = "steps col-3"
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

    endOfPage = () => {
        window.scrollTo(0,document.body.scrollHeight)
    }  
}


inputTxt.oninput = () => {
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
