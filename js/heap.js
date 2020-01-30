class Heapify{

    constructor(list){
        this.list = list
    }

    set List(x){
        this.list = x
    }

    get List(){
        return this.list
    }

    getRoot(){
        return this.list.shift()
    }

    minHeap = () => {
        let min = this.list[0]
        let minIndex = 0
        for( let i in this.list){
            if(this.list[i]<min){
                min = this.list[i]
                minIndex = i
            }
        }

        if(minIndex!=0){
            let temp = this.list[0]
            this.list[0] = this.list[minIndex]
            this.list[minIndex] = temp
        }
    }
}
