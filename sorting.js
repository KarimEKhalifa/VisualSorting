sortBtn = document.getElementById("sort")
inputTxt = document.getElementById("input")
inputDiv = document.getElementById("inputDiv")
outputDiv = document.getElementById("outputDiv")

class Sorting{

    constructor(A){
        this.items = A
        this.timer = ""
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

    draw = (div,color) => {
        let out = document.createElement("div")
        out.className = "series"
        for( let i of this.items){
            let node = document.createElement("div")
            color==0?node.className = "ball green":node.className = "ball red"
            let textnode = document.createTextNode(i)
            node.appendChild(textnode)
            out.appendChild(node)
            document.getElementById(div).appendChild(out)
        }
    }

    sort = () => {
        let flag = 0
        console.log(this.timer)
        for( let i=0; i< this.items.length-1; i++){
            if(this.items[i] > this.items[i+1]){
                let temp = this.items[i]
                this.items[i] = this.items[i+1]
                this.items[i+1] = temp
                flag = 1
            }
        }
        if (flag ==0 ){
            clearInterval(this.timer);
            let child = outputDiv.lastElementChild;
            if(child)
                outputDiv.removeChild(child);
        }

        this.draw("outputDiv",flag)
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
    mySorting = new Sorting(myInputOutput.getInput())
    mySorting.draw("inputDiv")
}

sortBtn.onclick = () =>{
    
    myInputOutput.clearOutput()
    mySorting.items = myInputOutput.getInput()
    mySorting.Timer = setInterval(mySorting.sort, 1000)
}
