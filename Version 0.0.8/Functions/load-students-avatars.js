async function init(){
    mymodule = await import('./tcusias-module-package.js')
    mymodule = mymodule.default
    cookies = new mymodule.CookieHandler
    server = new mymodule.Server
    placeholder = new mymodule.Placeholders("ph")
}

async function retrieveAvatars(){
    session_id = await cookies.getCookie("session-id")
    students_db = await server.getInstructorStudents(session_id)
}

async function loadProfessorAvatars(){
    const students = document.querySelector(".instructors")
    var count = 0
    var max = 4
    console.log("ello")
    console.log(students_db)
    for(var student of students_db){
        if (count++>=max) break
        loadStudentAvatar(student,students)
    }
}

async function loadStudentAvatar(student,students){
    const student_elem = document.createElement("div")
    const img = document.createElement("img")
    const avatar_src = await server.getInstructorStudentsAvatar(session_id,student.id)
    student_elem.classList.add("instructor")
    img.src = avatar_src
    img.alt = student.stud_name
    student_elem.appendChild(img)
    students.appendChild(student_elem)
}

init().then(async ()=>{
    await retrieveAvatars()
    loadProfessorAvatars()
})