async function init(){
    mymodule = await import('./tcusias-module-package.js')
    mymodule = mymodule.default
    cookies = new mymodule.CookieHandler
    server = new mymodule.Server
    placeholder = new mymodule.Placeholders("ph")
}
let users = [];
async function loadDatabase(){
    session_id = await cookies.getCookie("session-id")
    students = await server.adminGetStudents(session_id)
    instructors = await server.adminGetInstructors(session_id)
    admins = await server.adminGetAdmins(session_id)
    for(var student of students){
        const user = {
            id : student.year+"-"+String(student.id).padStart(4,"0"),
            name : student.stud_name,
            email : student.email,
            role : "Student"
        }
        users[users.length] = user
    }
    for(var instructor of instructors){
        const user = {
            id : "INS-"+String(instructor.id).padStart(4,"0"),
            name : instructor.prof_name,
            email : instructor.email,
            role : "Professor"
        }
        users[users.length] = user
    }
    for(var admin of admins){
        const user = {
            id : "ADM-"+String(admin.id).padStart(4,"0"),
            name : admin.user+" "+admin.pass,
            email : admin.email,
            role : "Admin"
        }
        users[users.length] = user
    }
}
let editIndex = null;
function renderUsers(){
  const tbody = document.getElementById('usersTbody');
  tbody.innerHTML = '';
  const search = (document.getElementById('globalSearch').value || '').toLowerCase();
  const roleFilter = document.getElementById('roleFilter').value;
  users.filter(u => {
    if(roleFilter !== 'all' && u.role !== roleFilter) return false;
    if(!search) return true;
    return (u.name + ' ' + u.id + ' ' + u.email).toLowerCase().includes(search);
  }).forEach((u,i) => {
    tbody.innerHTML += `
      <tr>
        <td>${u.id}</td>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td><span class="badge ${u.role}">${u.role}</span></td>
        <td>
          <button class="action-btn action-edit" onclick="openEdit(${i})">Edit</button>
          <button class="action-btn action-delete" onclick="removeUser(${i})">Delete</button>
        </td>
      </tr>`;
  });
}
function openModal(){
  editIndex = null;
  document.getElementById('modalTitle').textContent = 'Add User';
  document.getElementById('uid').value = '';
  document.getElementById('fullname').value = '';
  document.getElementById('email').value = '';
  document.getElementById('role').value = 'Student';
  document.getElementById('modalBg').style.display = 'flex';
}
function closeModal(){ document.getElementById('modalBg').style.display = 'none'; }

function saveUser(){
  const id = document.getElementById('uid').value.trim();
  const name = document.getElementById('fullname').value.trim();
  const email = document.getElementById('email').value.trim();
  const role = document.getElementById('role').value;
  if(!id || !name || !email){ alert('Please fill all fields'); return; }
  if(editIndex === null){
    users.push({ id, name, email, role });
  } else {
    users[editIndex] = { id, name, email, role };
  }
  closeModal(); renderUsers();
}
function openEdit(i){
  editIndex = i;
  const u = users[i];
  document.getElementById('modalTitle').textContent = 'Edit User';
  document.getElementById('uid').value = u.id;
  document.getElementById('fullname').value = u.name;
  document.getElementById('email').value = u.email;
  document.getElementById('role').value = u.role;
  document.getElementById('modalBg').style.display = 'flex';
}
function removeUser(i){
  if(confirm('Delete this user?')){ users.splice(i,1); renderUsers(); }
}
document.getElementById('globalSearch').addEventListener('input', renderUsers);
document.getElementById('roleFilter').addEventListener('change', renderUsers);
function exportCSV(){
  const rows = [['User ID','Full Name','Email','Role']];
  users.forEach(u=> rows.push([u.id,u.name,u.email,u.role]));
  const csv = rows.map(r=> r.map(c=> '"'+(c||'')+'"').join(',')).join('\n');
  const blob = new Blob([csv],{type:'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'tcu_users.csv'; a.click(); URL.revokeObjectURL(url);
}
document.addEventListener('DOMContentLoaded', () => {
  // wire buttons from hero/dashboard if present
  const ms = document.getElementById('manage-students'); if(ms) ms.addEventListener('click', ()=>{ document.getElementById('roleFilter').value='Student'; renderUsers(); });
  const mi = document.getElementById('manage-instructors'); if(mi) mi.addEventListener('click', ()=>{ document.getElementById('roleFilter').value='Professor'; renderUsers(); });
  const ma = document.getElementById('manage-admins'); if(ma) ma.addEventListener('click', ()=>{ document.getElementById('roleFilter').value='Admin'; renderUsers(); });
  document.querySelectorAll('.ph-first-name').forEach(el=>el.textContent='Admin');
  document.querySelectorAll('.ph-name').forEach(el=>el.textContent='Administrator');
  const dateEl = document.getElementById('todayDate'); if(dateEl){ const d=new Date(); dateEl.textContent = d.toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'}); }
    init().then(
    async ()=>{
        await loadDatabase()
        renderUsers()
    })
});
