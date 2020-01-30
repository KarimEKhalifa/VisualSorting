class Sorting{

    constructor(items,IO){
        this.items = items
        this.oItems = [...items]
        this.timer = ""
        this.steps = []
        this.heapRes = []
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

    heapSort = () => {
        let flag = 1
        let myHeap = new Heapify(this.items)
        myHeap.minHeap()
        let rootCheck = myHeap.getRoot()

        if(rootCheck == undefined){
            clearInterval(this.timer)
            this.heapRes=[]
            algoDisp.style.display = 'block'
            return
        }

        this.heapRes.push(rootCheck)
        if(this.items.length == 0)
            flag = 0

        this.IOHandler.clearDiv(outConti)
        this.IOHandler.doneSorting(outConti,this.oItems,this.heapRes)

        this.IOHandler.draw(outputDiv,this.heapRes,[rootCheck+" is the min heap's root"],flag)

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
            this.steps.push(this.items[this.iteration]+" is the sub-list's smallest element")
            flag = 1
        }

        if (this.iteration == this.items.length -1){
            clearInterval(this.timer)
            this.iteration = 0
            flag = 0
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