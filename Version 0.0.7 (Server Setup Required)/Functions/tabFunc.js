const loginContent=document.querySelector('#loginContent')
const enrollContent=document.querySelector('#enrollContent')
const loginTab=document.querySelector('#loginTab')
const enrollTab=document.querySelector('#enrollTab')
let selectedContent=loginContent
let selectedTab=loginTab
function openTab(content,tab){
  selectedContent.classList.remove("selectedTab")
  selectedContent.style.display="none"
  selectedContent=content
  content.classList.remove("selectedTab")
  selectedContent.style.display="block"
  selectedTab.classList.remove("selected")
  selectedTab=tab;
  tab.classList.add("selected")
}
