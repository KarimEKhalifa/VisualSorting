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

    endSort = () => {
        clearInterval(this.timer)
        this.steps = []
        this.iteration = 0
        this.IOHandler.clearDiv(outConti)
        this.IOHandler.draw(outConti,this.items,[],0)
        algoDisp.style.display = 'block'
    }

    displayUpdate = (message) =>{
        this.IOHandler.clearDiv(outConti)
        this.IOHandler.draw(outConti,this.items,[],1)
        this.IOHandler.draw(outputDiv,this.items,message,1)
    }



    heapSort = () => {
        this.iteration++
        let myHeap = new Heapify(this.items)
        for(let i = this.items.length-this.iteration; i>-1;i--)
            myHeap.maxHeap(this.items.length-this.iteration,i)

        let temp = this.items[this.items.length-this.iteration]
        this.items[this.items.length-this.iteration] = this.items[0]
        this.items[0] = temp
        myHeap.maxHeap(this.items.length-this.iteration,0)
        
        if (this.iteration == this.items.length ){
            this.endSort()
            return
        }  
        this.displayUpdate([this.items[this.items.length-this.iteration]+" is the maxHeap's leaf node"])

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
            this.endSort()
            return
        }  
        this.displayUpdate(this.steps)
    }



    selectionSort = () => {
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
        }else if(this.iteration != this.items.length){
            this.steps.push(this.items[this.iteration]+" is the sub-list's smallest element")
        }

        if (this.iteration == this.items.length -1){
            this.endSort()
            return 
        }
        this.displayUpdate(this.steps)
        this.iteration++
    }

}