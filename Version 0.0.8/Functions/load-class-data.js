async function init(){
    mymodule = await import('./tcusias-module-package.js')
    mymodule = mymodule.default
    cookies = new mymodule.CookieHandler
    server = new mymodule.Server
    placeholder = new mymodule.Placeholders("ph")
}

async function retrieveClassData(){
  session_id = await cookies.getCookie("session-id")
  classes_db = await server.getClasses(session_id)
  schedule_db = await server.getInstructorSchedule(session_id)
  console.log(classes_db)
}

function initTable(){
  const class_table_constainer = document.querySelector(".class-table-container")
  if (!class_table_constainer) return
  for(var classes of classes_db){
    const key = createKey(classes)
    console.log(classes.students)
    addClassItem(key,classes.students)
  }
  loadClassList(createKey(classes_db[0]))
}

var prev_element_key = null

function loadClassList(classKey) {
  if(prev_element_key) class_data[prev_element_key].item.classList.toggle("active")
  class_data[classKey].item.classList.toggle("active")
  prev_element_key = classKey
  const tableBody = document.getElementById("classTableBody")
  const students = Array(...class_data[classKey]).sort((a, b) => 
    a.stud_name.localeCompare(b.stud_name))
  tableBody.innerHTML = students.map(s => `
    <tr>
    <td>${"25-"+String(s.id).padStart(4,"0")}</td>
    <td>${s.stud_name}</td>
    <td>${s.gender}</td>
    <td>${s.course_id}</td>
    <td>${s.phone_no}</td>
    <td>${s.email}</td>
    </tr>
  `).join("");
}

const class_data = {}

function addClassItem(key,class_list){
  class_data[key] = class_list
  const class_switcher = document.querySelector(".class-switcher")
  const class_item = document.createElement("div")
  class_item.classList.add("class-item")
  class_data[key].item = class_item
  class_item.innerHTML = key
  class_item.addEventListener("click",(e)=>{
    loadClassList(key)
  })
  class_switcher.appendChild(class_item)
}

function createKey(classes){
  const key = classes.course_id+" - "+classes.batch_year+classes.section
  return key
}

function displayUnitSchedule(){
    const schedule_grid = document.querySelector(".schedule-grid")
    if(!schedule_grid) return
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
            createSchedule(schedule.timeslot,schedule.subj_desc,schedule.course_id+" - "+schedule.batch_year+schedule.section,week[WEEKDAYS[day.toUpperCase()]])
        }
    }
    for (var day of week){
      let events = day.querySelector(".event")
      if(!events){
          createNullSchedule(day)
      }
    }
}
function createNullSchedule(day){
    const no_classes = document.createElement("div")
    const icon = document.createElement("div")
    const text = document.createElement("div")
    no_classes.classList.add("no-classes")
    icon.classList.add("no-classes-icon")
    text.classList.add("no-classes-text")
    text.innerHTML = "No class schedules"
    no_classes.appendChild(icon)
    no_classes.appendChild(text)
    day.appendChild(no_classes)
}
function createSchedule(time,title,class_key,weekday){
    const event = document.createElement("div")
    const event_time = document.createElement("div")
    const event_title = document.createElement("div")
    event.classList.add("event")
    event_time.classList.add("event-time")
    event_title.classList.add("event-title")
    event_time.innerHTML = time
    event_title.innerHTML = title +"<br><br><strong>"+class_key+"</strong>"
    event.appendChild(event_time)
    event.appendChild(event_title)
    weekday.appendChild(event)
}

const template = {}

async function displayGradeCards() {
    const subject_grid = document.querySelector(".enrolled-subjects .subjects-grid")
    if(!subject_grid) return -1
    for(var classes of classes_db){
      template[classes.subj_desc] = classes.subj_info
      createGradeCard(classes.subj_desc,classes.subj_info,classes.subj_code,subject_grid)
    }
}

function closeModal(e) {
    if (e.target.classList.contains("modal-overlay") || e.target.classList.contains("close-btnE")) {
        document.getElementById("subjectModal").style.display = "none";
    }
}

function openModal(key,code) {
    const subjectData = {
        title : key,
        code : code,
        desc : template[key] 
    }
    document.getElementById("modalTitle").innerText = subjectData.title;
    document.getElementById("modalCode").innerText = subjectData.code;
    document.getElementById("modalDesc").innerText = subjectData.desc;
    document.querySelector(".modal-overlay").style.display = "flex";
}

const classes_grades = {}
var selected_key = null

function displayGradesTable(){
  const grade_table_body = document.querySelector("#gradeTableBody")
  const grade_switch = document.querySelector("#gradeSwitcher")
  if(!grade_table_body) return -1
  for(var classes of classes_db){
    const key = classes.course_id + "-" + classes.batch_year + classes.section
    classes_grades[key] = Array(...classes.students).sort((a, b) => 
    a.stud_name.localeCompare(b.stud_name))
    classes_grades[key].unit_id = classes.unit_id
    const grade_item = document.createElement("div")
    grade_item.classList.add("grade-item")
    classes_grades[key].item = grade_item
    grade_item.innerHTML = key
    grade_item.addEventListener("click",async ()=>{
      fillGradeCell(key)
    })
    grade_switch.appendChild(grade_item)
  }
  const clasp = classes_db[0]
  const key = clasp.course_id + "-" + clasp.batch_year + clasp.section
  fillGradeCell(key)
}

function fillGradeCell(key){
  if (selected_key)classes_grades[selected_key].item.classList.toggle("active")
  selected_key = key
  const grade_table_body = document.querySelector("#gradeTableBody")
  classes_grades[key].item.classList.toggle("active")
  console.log(key)
  console.log(classes_grades[key])
  grade_table_body.innerHTML = ""
  var count = 0
  for(var s of classes_grades[key]){
    grade_table_body.innerHTML += `
    <tr>
      <td>${s.id}</td>
      <td>${s.stud_name}</td>
      <td>${s.course_id}</td>
      <td><input id="midterms-${s.class_id}-${s.id}" placeholder="${(s.midterms)? s.midterms: "—"}" value="${(s.midterms)? s.midterms: 0}" type="number" min="0" max="100" class="grade-input midterm" oninput="this.value = Math.min(this.value, 100); recalc(${count})"></td>
      <td><input id="finals-${s.class_id}-${s.id}" placeholder="${(s.midterms)? s.finals: "—"}"  value="${(s.finals)? s.finals: 0}" type="number" min="0" max="100" class="grade-input finals" oninput="this.value = Math.min(this.value, 100); recalc(${count++})"></td>
      <td class="final-percent">${(s.mark)? s.mark:"—"}</td>
      <td class="final-grade">${(s.midterms)? s.midterms: "—"}</td>
      <td class="remark">${(s.finals)? (parseInt(s.finals)>70)?"PASSED":"FAILED": "—"}</td>
    </tr>`
  }
}

function recalc(i){
  const grade_table_body = document.querySelector("#gradeTableBody")
  const row = grade_table_body.querySelectorAll("tr")[i]
  const midterms = row.querySelector(".midterm")
  const finals = row.querySelector(".finals")
  const final_grade = (parseInt(midterms.value)+parseInt(finals.value))/2
  const remark = (final_grade>70)? "PASSED" :"FAILED"
  row.querySelector(".remark").innerHTML = remark
  row.querySelector(".final-grade").innerHTML = final_grade
  row.querySelector(".final-percent").innerHTML = final_grade+"%"

}

async function submitGrades(){
  const student_grades = []
  const grade_table_body = document.querySelector("#gradeTableBody")
  const rows = grade_table_body.querySelectorAll("tr")
  const students = classes_grades[selected_key]
  var count = 0
  for(var student of students){
    console.log(student)
    console.log(rows[count])
    const midterms = rows[count].querySelector(".midterm")
    const finals = rows[count].querySelector(".finals")
    console.log(classes_db.unit_id)
    student_grades[count++] = {
      id:student.id,
      unit_id: classes_grades[selected_key].unit_id,
      midterms: midterms.value,
      finals:finals.value
    }
  }
  console.log("here")
  const res = await server.postClassGrades(session_id,student_grades)
}

function createGradeCard(subject_name,subject_info_mess,subj_code,grid){
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
    icon.classList.add(getAppropriateIcon(subj_code))
    subject_info.appendChild(header)
    subject_info.appendChild(view_button)
    subject_icon.appendChild(icon)
    template[subject_name] = subject_info_mess
    grade_card.appendChild(subject_info)
    grade_card.appendChild(subject_icon)
    header.innerHTML=subject_name
    view_button.innerHTML = "VIEW"
    view_button.addEventListener("click",()=>{
      console.log("ello")
      openModal(subject_name,subj_code)
    })
    grid.appendChild(grade_card)
}

function displayActiveClasses(){
    const classes_grid = document.querySelector("#homesun.subjects-grid")
    console.log(classes_grid)
    if(!classes_grid) return
    var count = 0 
    for (var classes of classes_db){
        if (count++>=3) break 
        createClassCard(classes.subj_code,classes.subj_desc,classes_grid)
    }
}

function createClassCard(subj_code,subj_info,grid){
    const subject_card = document.createElement("div")
    const subject_info = document.createElement("div")
    const text = document.createElement("h3")
    const subject_icon = document.createElement("div")
    const icon = document.createElement("i")
    const button = document.createElement("button")
    subject_card.classList.add("subject-card")
    subject_info.classList.add("subject-info")
    subject_icon.classList.add("subject-icon")
    icon.classList.add(getAppropriateIcon(subj_code))
    button.classList.add("btn-view")
    text.innerHTML = subj_info
    button.innerHTML = "View"
    subject_info.appendChild(text)
    subject_icon.appendChild(icon)
    subject_card.appendChild(subject_info)
    subject_card.appendChild(subject_icon)
    subject_card.appendChild(button)
    grid.appendChild(subject_card)
}

function getAppropriateIcon(subj_code){
    const icon_lib = {
        "CC 106": "ri-robot-3-fill",
        "DM 101": "ri-football-fill",
        "GE 7": "ri-microscope-fill",
        "GE 8": "ri-scales-3-fill",
        "GEE 6": "ri-home-6-fill",
        "IS 104": "ri-computer-fill",
        "IS 105": "ri-building-2-fill",
        "IT 100": "ri-global-line",
        "PE 3A": "ri-football-fill"
    }
    const icon = icon_lib[subj_code]
    return (icon) ? icon : "ri-survey-line"
}




init().then(async ()=>{
  await retrieveClassData()
  initTable()
  displayUnitSchedule()
  displayGradesTable()
  displayGradeCards()
  displayActiveClasses()
})