const labels = document.querySelectorAll(".add-wrapper label");

labels.forEach((label) => {
  let input = label.querySelector("input");
  let span = label.querySelector("span");
  input.addEventListener("change", () => {
    span.innerHTML = input.value;
  });
});

let tasksArr = [
 
];
const tasksWrapper = document.querySelector(".tasks-wrapper");

function renderTasks() {
  tasksWrapper.innerHTML = "";

  //taskArray empty
  if (tasksArr.length === 0) {
    tasksWrapper.innerHTML = `<div class="no-tasks">Gada Tugas Nih</div>`;
    return;
  }

  //if tasks arr has tasks

  tasksArr.forEach((task) => {
    //check if expired
    let expired;
    expired = checkExpired(task) ? "TELAT!" : "";

    tasksWrapper.innerHTML += `
              <div class="task">
          <div class="left">
            <div class="radio">
              <ion-icon class="icon" name="checkmark"></ion-icon>
            </div>
          </div>
          <div class="right">
            <p class="title">${task.title}</p>
            <p class="description">${task.description}</p>
            <div class="info ${expired}">
              <p class="date">
                <ion-icon name="calendar-outline"></ion-icon>
                <span>${task.date}</span>
              </p>
              <p class="dot">
                <ion-icon name="ellipse"></ion-icon>
              </p>
              <p class="time">
                <ion-icon name="time-outline"></ion-icon>
                <span>${task.time}</span>
              </p>
            </div>
          </div>
        </div>
      `;
  });

  tasksWrapper.innerHTML += `
     <div class="delete">
          <ion-icon name="trash-outline"></ion-icon>
        </div>`;

  //add event listners

  const tasks = document.querySelectorAll(".task");

  tasks.forEach((task) => {
    task.addEventListener("click", (e) => {
      //if radio clicked
      if (e.target.classList.contains("radio")) {
        task.classList.toggle("selected");
        //show delete button when at leaset one taske selected
        if (document.querySelector(".task.selected")) {
          document.querySelector(".delete").classList.add("show");
        } else {
          document.querySelector(".delete").classList.remove("show");
        }
      }
    });
  });

  //on delete remove task from arr and rerender
  const deleteBtn = document.querySelector(".delete");
  deleteBtn.addEventListener("click", deleteTasks);
}

renderTasks();

function checkExpired(task) {
  let date = new Date(task.date);
  let time = new Date(task.time);
  let now = new Date();
  if (date < now || time < now) {
    return true;
  }
  return false;

  //true if current date or time is less means task has to come yet
}

function deleteTasks() {
  const selectedTasks = document.querySelectorAll(".task.selected");
  if (selectedTasks.length === 0) return;
  //if some taks selected
  let confirmDelete = confirm("Yakin mau hapus tugasnya?");
  if (confirmDelete) {
    selectedTasks.forEach((task) => {
      //get title of task and filter matching title tasks
      let title = task.querySelector(".title").innerHTML;
      tasksArr = tasksArr.filter((task) => task.title !== title);
    });
    renderTasks();
  }
}

const addTaskForm = document.getElementById("add-task-form"),
  titleElem = document.getElementById("title"),
  descriptionElem = document.getElementById("description"),
  dateElem = document.getElementById("date"),
  timeElem = document.getElementById("time");

addTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let title = titleElem.value,
    description = descriptionElem.value,
    date = dateElem.value,
    time = timeElem.value;
  //validate
  if (title === "" || description === "" || date === "" || time === "") {
    //if anything empty
    alert("Isi dulu semua informasinya");
  }

  let task = {
    title,
    description,
    date,
    time,
  };

  //push in arr
  tasksArr.push(task);
  //rerender arr
  renderTasks();
  //clear after adding
  clear();
});

function clear() {
  titleElem.value = "";
  descriptionElem.value = "";
  dateElem.value = "";
  timeElem.value = "";

  dateElem.nextElementSibling.innerHTML = "Batas Tanggal";
  timeElem.nextElementSibling.innerHTML = "Batas Waktu";
}
//clear on clear btn
const clearBtn = document.querySelector(".clear");

clearBtn.addEventListener("click", clear);