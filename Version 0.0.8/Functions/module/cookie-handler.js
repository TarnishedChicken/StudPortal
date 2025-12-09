export default class CookieHandler{
    constructor(){
        this.caches=new Map()
    }
    setCookie(varKey, val,expDays,toCache=true){
        const d=new Date()
        d.setTime(d.getTime()+this.toMs(expDays))
        document.cookie=`${varKey}=${val}; expires=${d.toUTCString()}; path=/`
        if(toCache) this.caches.set(varKey,val)
    }
    getCookie(varKey, toCache=false){
        let cookies=decodeURIComponent(document.cookie).split(";")
        for(let cookie of cookies){
            let cval = cookie.split("=")[1].trim()
            let ckey = cookie.split("=")[0].trim()
            console.log(ckey+ ', ' + cval)

            if (ckey != varKey) continue
            if(toCache) this.caches.set(varKey,cval)
            return cval
        }
        if(toCache) this.caches.set(keyVal,null)
        return null
    }
    removeCookie(varkey){
        this.caches.delete(varkey)
        document.cookie = `${varkey}= ;Expires=Thu, 01 Jan 1970 00:00:01 GMT;path = '/'`
    }  
    getCache(varKey){
        return this.caches.get(varKey)
    }
    toMs(days){
        return days*24*60*60*1000
    }
    initCookies(varKeys){
        for(let varKey of varKeys){
            this.getCookie(varKey,true)
        }
    }
}