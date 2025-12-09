async function init(){
    mymodule = await import('./tcusias-module-package.js')
    mymodule = mymodule.default
    cookies = new mymodule.CookieHandler
    server = new mymodule.Server
    placeholder = new mymodule.Placeholders("ph")
}

async function loadTheme(){
    var theme = cookies.getCookie("theme")
    console.log(body.classList)
    if(theme){
        body.classList.toggle("disable-transitions")
        if((theme=="dark"&&!body.classList.contains("dark"))||(theme!="dark"&&body.classList.contains("dark"))){
            toggleTheme()
        }
    }
}
function toggleTheme(){
    body.classList.toggle("dark");
    var theme = (body.classList.contains("dark"))? "dark":"light"
    console.log(theme)
    cookies.setCookie("theme",theme)
    if(body.classList.contains("dark")){
        modeText.innerText = "Light Mode"
    }else{
        modeText.innerText = "Dark Mode"
    }
}

init().then(()=>{
    loadTheme()
    setTimeout(()=>{
        body.classList.toggle("disable-transitions")
    })
})