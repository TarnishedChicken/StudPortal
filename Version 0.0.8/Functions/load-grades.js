async function init(){
    mymodule = await import('./tcusias-module-package.js')
    mymodule = mymodule.default
    cookies = new mymodule.CookieHandler
    server = new mymodule.Server
    placeholder = new mymodule.Placeholders("ph")
}

async function retrieveUserGrades(){
    const session_id = cookies.getCookie("session-id")
    grades_db = await server.getStudentGrades(session_id)
    schedule_db = await server.getStudentSchedule(session_id)
    console.log(schedule_db)
    if(grades_db.id=="SESSION_LOST"){
        window.location.href = "./Login/login.html"
    }
}

async function displayGradesTable(){
    const grade_table = document.querySelectorAll(".grades-table")
    if(!grade_table) return -1
    const column_ids = {
        "SUBJECT CODE" : "subj_code",
        "UNITS" : "units",
        "PROFESSOR" : "prof_name",
        "SUBJECT TITLE" : "subj_name", 
        "MARK" : "mark"
    }
    for(let table of grade_table){
        const headers = table.querySelectorAll("th")
        const columns = []
        for (let header of headers){
            columns[columns.length] = header.innerHTML
        }
        console.log(columns)
        const table_body = (table.querySelector("tbody")==null) ? table : table.querySelector("tbody")
        for(let grade of grades_db){
            const row = document.createElement("tr")
            table_body.appendChild(row)
            for(let column of columns){
                const cell = document.createElement("td")
                cell.innerHTML = (grade[column_ids[column.toUpperCase()]]===undefined) ? "N/A" : grade[column_ids[column.toUpperCase()]]
                row.appendChild(cell)
            }
            console.log(row)
        }  
    }
}

const template = {}

async function displayGradeCards() {
    const subject_grid = document.querySelector(".subjects-grid")
    if(!subject_grid) return -1
    for(var subj of grades_db){
        createGradeCard(subj.subj_name,subj.subj_info,subject_grid)
    }
    console.log(grades_db)
}

function closeModal(e) {
    if (e.target.classList.contains("modal-overlay") || e.target.classList.contains("close-btnE")) {
        document.getElementById("subjectModal").style.display = "none";
    }
}

function openModal(key) {
    const subjectData = {
        title : key,
        code : "M",
        desc : template[key] 
    }
    document.getElementById("modalTitle").innerText = subjectData.title;
    document.getElementById("modalCode").innerText = subjectData.code;
    document.getElementById("modalDesc").innerText = subjectData.desc;
    document.getElementById("subjectModal").style.display = "flex";
}

async function createGradeCard(subject_name,subject_info_mess,grid){
    const grade_card = document.createElement("div")
    const subject_info = document.createElement("div")
    const header = document.createElement("h3")
    const view_button = document.createElement("button")
    const subject_icon = document.createElement("div")
    const icon = document.createElement("i")
    grade_card.classList.add("subject-cardE")
    subject_info.classList.add("subject-infoE")
    view_button.classList.add("view-btnE")
    subject_icon.classList.add("subject-icon")
    icon.classList.add("ri-building-2-fill")
    subject_info.appendChild(header)
    subject_info.appendChild(view_button)
    subject_icon.appendChild(icon)
    template[subject_name] = subject_info_mess
    grade_card.appendChild(subject_info)
    grade_card.appendChild(subject_icon)
    header.innerHTML=subject_name
    view_button.innerHTML = "VIEW"
    view_button.addEventListener("click",()=>{
        openModal(subject_name)
    })
    console.log(grade_card)
    grid.appendChild(grade_card)
}

function displayUnitSchedule(){
    const schedule_grid = document.querySelector(".schedule-grid")
    const week = document.querySelectorAll(".day-column")
    const WEEKDAYS = {
        "MONDAY":0,
        "TUESDAY":1,
        "WEDNESDAY":2,
        "THURSDAY":3,
        "FRIDAY":4,
        "SATURDAY":5
    }
    for (var schedule of schedule_db){
        const days = schedule.week_days.split(",")
        for(var day of days){
            console.log(week[WEEKDAYS[day.toUpperCase()]])
            createSchedule(schedule.timeslot,schedule.subj_desc,week[WEEKDAYS[day.toUpperCase()]])
        }
    }
}

function createSchedule(time,title,weekday){
    const event = document.createElement("div")
    const event_time = document.createElement("div")
    const event_title = document.createElement("div")
    event.classList.add("event")
    event_time.classList.add("event-time")
    event_title.classList.add("event-title")
    event_time.innerHTML = time
    event_title.innerHTML = title
    event.appendChild(event_time)
    event.appendChild(event_title)
    weekday.appendChild(event)
}

init().then(async ()=>{
    await retrieveUserGrades()
    displayGradesTable()
    displayGradeCards()
    displayUnitSchedule()
})