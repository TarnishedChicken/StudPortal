export default class Server{
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
}