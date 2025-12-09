
  const classData = {
    BSIT2A: [
      { id: "2023-001", name: "Andrea Santos", sex: "F", course: "BSIT 2 - A", cp: "09123456789", email: "andrea@tcu.edu.ph" },
      { id: "2023-013", name: "Bryan Dela Cruz", sex: "M", course: "BSIT 2 - A", cp: "09234567891", email: "bryan@tcu.edu.ph" },
      { id: "2023-010", name: "Diana Lopez", sex: "F", course: "BSIT 2 - A", cp: "09122334455", email: "diana@tcu.edu.ph" }
    ],

    BSIT2B: [
      { id: "2023-021", name: "Ethan Villanueva", sex: "M", course: "BSIT 2 - B", cp: "09198765432", email: "ethan@tcu.edu.ph" },
      { id: "2023-018", name: "Fatima Ramirez", sex: "F", course: "BSIT 2 - B", cp: "09221133445", email: "fatima@tcu.edu.ph" },
      { id: "2023-027", name: "Gabriel Sy", sex: "M", course: "BSIT 2 - B", cp: "09988776655", email: "gabriel@tcu.edu.ph" }
    ],

    BSCS1A: [
      { id: "2024-004", name: "Hanz Mercado", sex: "M", course: "BSCS 1 - A", cp: "09177665544", email: "hanz@tcu.edu.ph" },
      { id: "2024-011", name: "Isabella Cruz", sex: "F", course: "BSCS 1 - A", cp: "09334455667", email: "isabella@tcu.edu.ph" },
      { id: "2024-007", name: "Joshua Ramirez", sex: "M", course: "BSCS 1 - A", cp: "09223344556", email: "joshua@tcu.edu.ph" }
    ]
  };

  function loadClassList(classKey) {
    const tableBody = document.getElementById("classTableBody");
    
    const students = [...classData[classKey]].sort((a, b) => 
      a.name.localeCompare(b.name)
    );

    tableBody.innerHTML = students.map(s => `
      <tr>
        <td>${s.id}</td>
        <td>${s.name}</td>
        <td>${s.sex}</td>
        <td>${s.course}</td>
        <td>${s.cp}</td>
        <td>${s.email}</td>
      </tr>
    `).join("");
  }

  // event listener for clicking class items
  document.querySelectorAll(".class-item").forEach(item => {
    item.addEventListener("click", () => {
      
      // remove active from all
      document.querySelectorAll(".class-item").forEach(i => i.classList.remove("active"));

      // set active
      item.classList.add("active");

      // load class
      loadClassList(item.dataset.class);
    });
  });

  // load first class by default
  document.querySelector(".class-item").classList.add("active");
  loadClassList("BSIT2A");
