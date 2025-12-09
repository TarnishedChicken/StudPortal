export default class Placeholders{
    constructor(globalKey="default"){
        this.caches=new Map()
        this.globalKey=globalKey
    }
    initPlaceholders(keys,values){
        if(keys.length!=values.length||keys==undefined||values==undefined) {
            console.log("idiot")
            return
        }
        for(let i=0;i<keys.length;i++){
            this.setPlaceholder(keys[i],values[i])
        }
    }
    setPlaceholder(key, value){
        if (value==undefined) return
        this.caches.set(key,value)
        let elems=document.querySelectorAll(`.${this.globalKey}-${key}`)
        for(let elem of elems){
            console.log(elem)
            elem.innerHTML+=value
        }
    }
}