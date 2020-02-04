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

    heapSort = () => {
        let flag = 1
        this.iteration++
        let myHeap = new Heapify(this.items)
        for(let i = this.items.length-this.iteration; i>-1;i--)
            myHeap.maxHeap(this.items.length-this.iteration,i)

        let temp = this.items[this.items.length-this.iteration]
        this.items[this.items.length-this.iteration] = this.items[0]
        this.items[0] = temp
        myHeap.maxHeap(this.items.length-this.iteration,0)
        


        if (this.iteration == this.items.length ){
            flag = 0
            clearInterval(this.timer)
            this.steps = []
            this.IOHandler.clearDiv(outConti)
            this.IOHandler.draw(outConti,this.items,[],flag)
            algoDisp.style.display = 'block'
            this.iteration = 0
        }  

        this.IOHandler.clearDiv(outConti)

        this.IOHandler.draw(outConti,this.items,[],flag)
        this.IOHandler.draw(outputDiv,this.items,flag==1?[this.items[this.items.length-this.iteration]+" is the maxHeap's leaf node"]:[],flag)

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