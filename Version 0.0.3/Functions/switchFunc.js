const body = document.querySelector("body"),
        sidebar = body.querySelector(".sidebar"),
        toggle = body.querySelector(".toggle"),
        searchBtn = body.querySelector(".search-box"),
        modeSwitch = body.querySelector(".toggle-switch"),
        modeText = body.querySelector(".mode-text");

        toggle.addEventListener("click", () =>{
            sidebar.classList.toggle("close");
        });
        searchBtn.addEventListener("click", () =>{
            sidebar.classList.remove("close");
        });


        modeSwitch.addEventListener("click", () =>{
            body.classList.toggle("dark");

            if(body.classList.contains("dark")){
                modeText.innerText = "Light Mode"
            }else{
                modeText.innerText = "Dark Mode"
            }
        });


    // == for date ==
        document.addEventListener("DOMContentLoaded", function () {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        document.getElementById("current-date").textContent = today.toLocaleDateString('en-US', options);
    });

