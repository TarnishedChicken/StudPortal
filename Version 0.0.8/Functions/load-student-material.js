async function init(){
    mymodule = await import('./tcusias-module-package.js')
    mymodule = mymodule.default
    cookies = new mymodule.CookieHandler
    server = new mymodule.Server
    placeholder = new mymodule.Placeholders("ph")
}
async function retrieveMaterials(){
    session_id = cookies.getCookie("session-id")
    materials_db = await server.getStudentMaterials(session_id)
    classes_db = await server.getClasses(session_id)
    console.log(materials_db)
}

async function displayModuleGrid(){
    const modules_grid = document.querySelector(".modules-grid")
    if (!modules_grid) return
    for(var material of materials_db){
        createModuleCard(material.id,material.subj_code,material.subj_info,material.subj_desc,modules_grid)

    }
}

async function createModuleCard(material_id,subj_code,subj_info,subj_desc,grid){
    const module_card = document.createElement("div")
    const module_icon = document.createElement("div")
    const icon = document.createElement("i")
    const title = document.createElement("h3")
    const desc = document.createElement("p")
    const button = document.createElement("button")
    module_card.classList.add("module-card")
    module_icon.classList.add("module-icon")
    button.classList.add("btn-download")
    icon.classList.add(getAppropriateIcon(subj_code))
    title.innerHTML = subj_desc
    desc.innerHTML = subj_info
    button.innerHTML = "Download"
    button.addEventListener("click",async ()=>{
        const objurl = await server.getMaterial(session_id,material_id)
        const link = document.createElement("a")
        console.log(objurl)
        link.href = objurl
        document.body.appendChild(link)
        link.click()
    })
    module_icon.appendChild(icon)
    module_card.appendChild(module_icon)
    module_card.appendChild(title)
    module_card.appendChild(desc)
    module_card.appendChild(button)
    grid.appendChild(module_card)
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
    await retrieveMaterials()
    displayModuleGrid()
})