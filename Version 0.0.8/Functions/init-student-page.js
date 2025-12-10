async function init(){
    mymodule = await import('./tcusias-module-package.js')
    mymodule = mymodule.default
    cookies = new mymodule.CookieHandler
    server = new mymodule.Server
    placeholder = new mymodule.Placeholders("ph")
}
async function retrieveUserInfo(){
    session_id = await cookies.getCookie("session-id")
    const res = await server.getStudentInfo(session_id)
    loadAvatar(session_id)
    console.log(res)
    if(res.id=="SESSION_LOST"){
        window.location.href = "./Login/login.html"
    } else {
        return res
    }
}
async function fillPlaceholders(user){
    placeholder.setPlaceholder("name",user.stud_name)
    placeholder.setPlaceholder("year",user.stud_year+getOrdinalSuffix(user.stud_year))
    placeholder.setPlaceholder("dob", user.dob)
    placeholder.setPlaceholder("course-desc",user.course)
    placeholder.setPlaceholder("contact-number", user.phone_no)
    placeholder.setPlaceholder("current-address", user.current_address)
    placeholder.setPlaceholder("additional-address", (user.additional_address)? user.additional_address : user.current_address)
    placeholder.setPlaceholder("email", user.email)
    placeholder.setPlaceholder("semester-no", ((user.semester_no) ? getOrdinalSuffix(user.semester_no) : "1"+getOrdinalSuffix(1))+ " Year")
    placeholder.setPlaceholder("gender", user.gender)
    placeholder.setPlaceholder("total-units", user.total_units)
    placeholder.setPlaceholder("academic-status", (user.isIrreg==1)? "Irregular":"Regular")
    placeholder.setPlaceholder("gpa", (user.gpa)? user.gpa:"N/A")
    placeholder.setPlaceholder("course-id",user.id)
    var name = divideFullname(user.stud_name)
    placeholder.setPlaceholder("name",user.stud_name)
    placeholder.setPlaceholder("first-name", name.first_name)
    placeholder.setPlaceholder("last-name", name.last_name)
    placeholder.setPlaceholder("middle-initial", name.middle_initial)
}
function getOrdinalSuffix(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
}
function divideFullname(name){
    name = name.split(',')
    last_name = name[0]
    middle_initial = name[1].split(" ")[name[1].split(" ").length-1]
    first_name = name[1].split(" ").splice(1,name[1].split(" ").length-2).join(" ")
    name = {
        last_name:capitalize(last_name),
        middle_initial:capitalize(middle_initial),
        first_name:capitalize(first_name)
    }
    return name
}
function capitalize(str){
    str = str.split(' ')
    var new_str = ""
    for(let words of str){
        new_str += words.charAt(0).toUpperCase() + words.slice(1).toLowerCase()+" "
    }
    return new_str.trim()
}
async function logout(){
    cookies.removeCookie("session-id")
    return
}

async function loadAvatar(session){
    const image_url = await server.getAvatar(session)
    loadImage(image_url)
}
async function loadImage(url) {
    const image_display = document.querySelector(".profile-picture")
    if(image_display)image_display.src = url
}

const file_input = document.querySelector('#profile-upload')
if(file_input)file_input.addEventListener("change", function(){
    if(this.files&&this.files.length>0){
        uploadImage()
    }
})

async function uploadImage(){
    const form_data = new FormData()
    console.log(file_input.files[0])
    form_data.append("avatar",file_input.files[0])
    const res = await server.uploadAvatar(session_id,form_data)
    console.log(res)
    var image_url = await server.getAvatar(session_id)
    console.log("ello")
    window.location.href = "./Student-Prof.html"
    setTimeout(()=>{
        loadImage(image_url)
        console.log("ello")
    },2000)
}
init().then(async ()=>{
    const student = await retrieveUserInfo()
    await fillPlaceholders(student)
})