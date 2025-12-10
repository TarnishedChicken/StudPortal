export default class Server{
    static configs={
        http_ips : ["127.0.0.1"],
        header : "http://",
        port : 3001,
        student_info : "/student/info",
        student : "/student/login",
        student_grades : "/student/grades",
        avatar_upload : "/avatar/upload",
        avatar : "/avatar",
        student_schedule : "/student/schedule",
        instructor: "/instructor/login",
        instructor_info : "/instructor/info"
    }
    async login(account){
        let configs=Server.configs
        var res
        if (account.usertype == "STUDENT"){
            res = await fetch(`${configs.header}${configs.http_ips[0]}:${configs.port}${configs.student}/${account.username}/${account.password}`)
        } else if(account.usertype == "INSTRUCTOR"){
            res = await fetch(`${configs.header}${configs.http_ips[0]}:${configs.port}${configs.instructor}/${account.username}/${account.password}`)
        }
        console.log(res)
        const json = await res.json()
        const obj = JSON.parse(JSON.stringify(json))
        return obj
    }
    async getStudentInfo(session){
        let configs=Server.configs
        const res = await fetch(`${configs.header}${configs.http_ips[0]}:${configs.port}${configs.student_info}/${session}`)
        const json = await res.json()
        const obj = JSON.parse(JSON.stringify(json))
        return obj
    }
    async getInstructorInfo(session){
        let configs=Server.configs
        const res = await fetch(`${configs.header}${configs.http_ips[0]}:${configs.port}${configs.instructor_info}/${session}`)
        const json = await res.json()
        const obj = JSON.parse(JSON.stringify(json))
        return obj
    }
    async getStudentGrades(session){
        let configs=Server.configs
        console.log(`${configs.header}${configs.http_ips[0]}:${configs.port}${configs.student_grades}/${session}`)
        const res = await fetch(`${configs.header}${configs.http_ips[0]}:${configs.port}${configs.student_grades}/${session}`)
        const json = await res.json()
        const obj = JSON.parse(JSON.stringify(json))
        return obj
    }
    async getAvatar(session){
        let configs= Server.configs
        const res = await fetch(`${configs.header}${configs.http_ips[0]}:${configs.port}${configs.avatar}/${session}`)
        console.log(res)
        const imageblob = await res.blob()
        const imageurl = URL.createObjectURL(imageblob)
        console.log(imageurl)
        return imageurl
    }
    async uploadAvatar(session,file){
        let configs= Server.configs
        const res = await fetch(`${configs.header}${configs.http_ips[0]}:${configs.port}${configs.avatar_upload}/${session}`,{
            method: "POST",
            body: file
        })
        return setTimeout(()=>{
            return this.getAvatar(session)
        },2000)
    }
    async getStudentSchedule(session){
        let configs = Server.configs
        const res = await fetch(`${configs.header}${configs.http_ips[0]}:${configs.port}${configs.student_schedule}/${session}`)
        const json = await res.json()
        const obj = await JSON.parse(JSON.stringify(json))
        return obj
    }
}