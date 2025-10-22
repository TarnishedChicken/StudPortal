import * as ph from "./placeholder.js"
import * as ch from "./cookie-handler.js"

const varkeys=["name","course","year"]
const cookies=new ch.default
const placehoders=new ph.default("ph")
var seshvals=[]
cookies.initCookies(varkeys)

var defVals=[
    "Arvin",
    "BSIS",
    2
]
let count=0
for(let key of varkeys){
    let val = cookies.getCache(key)
    if(val==null) {
        cookies.setCookie(key,defVals[count])
        val=defVals[count]
    }
    seshvals[count]=val
    count++
}

placehoders.initPlaceholders(varkeys,seshvals)
