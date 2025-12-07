async function init(){
    mymodule = await import('./tcusias-module-package.js')
    mymodule = mymodule.default
    cookies = new mymodule.CookieHandler
    server = new mymodule.Server
    placeholder = new mymodule.Placeholders("ph")
}

async function retrieveUserGrades(){
    const session_id = cookies.getCookie("session-id")
    const res = await server.getStudentGrades(session_id)
    if(res.id=="SESSION_LOST"){
        window.location.href = "./Login/login.html"
    } else {
        console.log(res)
        return res
    }
}

async function displayGrades(grades){
    const grade_table = document.querySelectorAll(".grades-table")
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
        for(let grade of grades){
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

init().then(async ()=>{
    const grades = await retrieveUserGrades()
    displayGrades(await grades)
})