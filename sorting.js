sortBtn = document.getElementById("sort")
inputTxt = document.getElementById("input")
inputDiv = document.getElementById("inputDiv")
outputDiv = document.getElementById("outputDiv")

class Sorting{

    constructor(A){
        this.items = A
        this.timer = ""
        this.IOHandler = ""
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
        if (flag == 0 )
            clearInterval(this.timer);
        this.IOHandler.draw("outputDiv",this.items,steps,flag)
    }

}

class InputOutput{

    getInput = () => {
        let sortingItems = inputTxt.value
        let iItems = sortingItems.trim().split(' ').map(Number)
        let items = Number.isNaN(iItems[0])? sortingItems.split(',').map(Number) : iItems;
        return items
    }

    clearInput = () => {
        let child = inputDiv.lastElementChild;  
        while (child) { 
            inputDiv.removeChild(child); 
            child = inputDiv.lastElementChild; 
        } 
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
            document.getElementById(div).appendChild(out)
        }

        let step = document.createElement("div")
        let list = document.createElement("ul")
        step.className = "steps"
        for( let i of steps){
            let node = document.createElement("li")
            let textnode = document.createTextNode(i)
            node.appendChild(textnode)
            list.appendChild(node)
        }
        step.appendChild(list)
        out.appendChild(step)
    }

    clearOutput = () => {
        let child = outputDiv.lastElementChild;  
        while (child) { 
            outputDiv.removeChild(child); 
            child = outputDiv.lastElementChild; 
        } 
    }

    
}



var myInputOutput = new InputOutput()


inputTxt.oninput = ()=>{
    
    myInputOutput.clearInput()
    myInput = myInputOutput.getInput()
    mySorting = new Sorting(myInput)
    mySorting.IO = myInputOutput
    myInputOutput.draw("inputDiv",myInput)
}

sortBtn.onclick = () =>{
    
    myInputOutput.clearOutput()
    mySorting.Items = myInputOutput.getInput()
    mySorting.Timer = setInterval(mySorting.bubbleSort, 1000)
}
