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
  console.log(classes_db)
}

function initTable(){
  for(var classes of classes_db){
    const key = createKey(classes)
    console.log(classes.students)
    addClassItem(key,classes.students)
  }
}

function loadClassList(classKey) {
  const tableBody = document.getElementById("classTableBody");
  const students = Array(...class_data[classKey]).sort((a, b) => 
    a.stud_name.localeCompare(b.stud_name)
  );
  console.log(students)
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
  console.log("ello")
  const class_switcher = document.querySelector(".class-switcher")
  const class_item = document.createElement("div")
  class_item.classList.add("class-item")
  class_item.innerHTML = key
  class_item.addEventListener("click",(e)=>{
    
    console.log("ello")
    loadClassList(key)
  })
  class_switcher.appendChild(class_item)
}

function createKey(classes){
  const key = classes.course_id+" - "+classes.batch_year+classes.section
  return key
}

init().then(async ()=>{
  await retrieveClassData()
  initTable()
  document.querySelector(".class-item").classList.add("active")
  loadClassList(createKey(classes_db[0]))
})