
 const subjectData = {
   template: {
     title: "Enterprise and Architecture",
     desc: "Introduction to enterprise architecture principles, frameworks, and methodologies."
   },
   prog1: {
     title: "Science, Technology and Society",
     desc: "Explores the relationship between science, technology, and societal development."
   },
   db: {
     title: "Internet and Advance Office Productivity",
     desc: "Covers advanced internet technologies and office productivity tools for effective work."
   },
   webtech: {
     title: "Ethics/Etika",
     desc: "Examines ethical theories and their application in personal and professional contexts."
   },
   hci: {
     title: "Philippine Indigenous Communities",
     desc: "Studies the cultures, traditions, and contributions of indigenous communities in the Philippines."
   },
   discrete: {
     title: "Dual/Individual/Aquatic/Combative/Sports",
     desc: "Focuses on physical fitness, healthy habits, and sports participation."
   },
   datacom: {
     title: "Organization and Management Concept",
     desc: "Introduction to organizational structures, management theories, and business practices."
   },
   pe: {
     title: "System Analysis and Design",
     desc: "Covers methodologies and tools for analyzing and designing information systems."
   },
   art: {
     title: "Application Development and Emerging Tech",
     desc: "Explores modern application development techniques and emerging technologies in the IT field."
   }
 };

 function openModal(key) {
   document.getElementById("modalTitle").innerText = subjectData[key].title;
   document.getElementById("modalDesc").innerText = subjectData[key].desc;
   document.getElementById("subjectModal").style.display = "flex";
 }

 function closeModal(e) {
   if (e.target.classList.contains("modal-overlay") || e.target.classList.contains("close-btnE")) {
     document.getElementById("subjectModal").style.display = "none";
   }
 }
