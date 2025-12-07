class CookieHandler{
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
            let ci=cookie.indexOf(varKey)
            if(ci==-1) continue
            let cval=cookie.substring(ci+varKey.length+1)
            if(toCache) this.caches.set(varKey,cval)
            return cval
        }
        if(toCache) this.caches.set(keyVal,null)
        return null
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
class Server{
    static configs={
        http_ips : ["127.0.0.1"],
        header : "http://",
        port : 3001,
        student_info : "/student/info",
        student : "/student/login",
        student_grades : "/student/grades"
    }
    async login(account){
        let configs=Server.configs
        const res = await fetch(`${configs.header}${configs.http_ips[0]}:${configs.port}${configs.student}/${account.username}/${account.password}`)
        const json = await res.json()
        const obj = JSON.parse(JSON.stringify(json))
        return obj
    }
    async getStudentInfo(session){
        let configs=Server.configs
        const res = await fetch(`${configs.header}${configs.http_ips[0]}:${configs.port}${configs.student_info}/${session}`)
        console.log(`${configs.header}${configs.http_ips[0]}:${configs.port}${configs.student_info}/${session}`)
        const json = await res.json()
        const obj = JSON.parse(JSON.stringify(json))
        return obj
    }
}

const server = new Server()

async function init(){
    const LOGINPAGELOCATION = '../Login/login.html'
    const cookie = new CookieHandler()

    var cookiesKey = ['acc-sesh']

    cookie.initCookies(cookiesKey)
    console.log(cookie.getCookie(cookiesKey[0]))
    if (cookie.getCookie(cookiesKey[0])==null){
        window.location.href = LOGINPAGELOCATION
    }
    const session_key = cookie.getCookie(cookiesKey[0])
    console.log(session_key)
    const student = await fetchStudentData(session_key)
    console.log(student)
    cookie.setCookie("student_info", JSON.stringify(student))
}

async function fetchStudentData(session){
    const student = await server.getStudentInfo(session)
    return student
}

init()

