async function init(){
    mymodule = await import('./tcusias-module-package.js')
    mymodule = mymodule.default
    cookies = new mymodule.CookieHandler
    server = new mymodule.Server
    placeholder = new mymodule.Placeholders("ph")
}

async function retrieveAvatars(){
    session_id = await cookies.getCookie("session-id")
    instructors_db = await server.getStudentInstructors(session_id)
}

async function loadProfessorAvatars(){
    const instructors = document.querySelector(".instructors")
    var count = 0
    var max = 4
    for(var instructor of instructors_db){
        if (count++>=max) break
        loadProfAvatar(instructor,instructors)
    }
}

async function loadProfAvatar(instructor,instructors){
    const instructor_elem = document.createElement("div")
    const img = document.createElement("img")
    const avatar_src = await server.getStudentsInstructorAvatar(session_id,instructor.id)
    instructor_elem.classList.add("instructor")
    img.src = avatar_src
    img.alt = instructor.prof_name
    instructor_elem.appendChild(img)
    instructors.appendChild(instructor_elem)
}

init().then(async ()=>{
    await retrieveAvatars()
    loadProfessorAvatars()
})