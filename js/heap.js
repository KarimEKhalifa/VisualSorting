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

    maxHeap = (subRoot,i) => {
        let largest = i
        let left = 2*i+1
        let right = 2*i+2

        if(left < subRoot && this.list[i] < this.list[left])
            largest = left
        
        if(right < subRoot && this.list[largest] < this.list[right])
            largest = right
        
        if(largest != i){
            let temp = this.list[i]
            this.list[i] = this.list[largest]
            this.list[largest] = temp
            this.maxHeap(subRoot,largest)
        }

    }
}
